import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { compare } from "bcrypt";
import { SignJWT } from "jose";
import { cookies } from "next/headers";
import { apiResponse } from "@/lib/api-response";

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login to the application
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid credentials
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { username, password } = body;

    if (!username || !password) {
      return apiResponse("error", "Please provide both username and password.", null, [], null, 400);
    }

    const user = await prisma.user.findUnique({
      where: { username },
      include: { events: true },
    });

    if (!user) {
      return apiResponse("error", "Invalid username or password.", null, [], null, 401);
    }

    const passwordsMatch = await compare(password, user.password);

    if (!passwordsMatch) {
      return apiResponse("error", "Invalid username or password.", null, [], null, 401);
    }

    const secret = new TextEncoder().encode(process.env.JWT_SECRET || "your-secret-key");
    const alg = "HS256";

    const jwt = await new SignJWT({
      userId: user.id,
      role: user.role,
      events: user.events.map((e) => e.eventId),
    })
      .setProtectedHeader({ alg })
      .setExpirationTime("2h")
      .setIssuedAt()
      .sign(secret);

    const cookieStore = await cookies();
    cookieStore.set("token", jwt, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
    });

    return apiResponse("success", "Login successful", { role: user.role, token: jwt }, null, null, 200);
  } catch (err) {
    if (err instanceof Error) {
      return apiResponse("error", err.message, null, [], null, 400);
    }
    return apiResponse("error", "An unknown error occurred", null, [], null, 500);
  }
}