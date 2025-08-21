import { NextRequest } from "next/server";
import { updateUser, deleteUser } from "@/lib/services/userService";
import { jwtVerify } from "jose";
import { apiResponse } from "@/lib/api-response";
import { userSchema } from "@/lib/validations";
import { z } from "zod";
import prisma from "@/lib/prisma";

const secret = new TextEncoder().encode(process.env.JWT_SECRET || "your-secret-key");

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Update a user
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User updated successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 */
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return apiResponse("error", "Unauthorized", null, [], null, 401);
  }

  try {
    await jwtVerify(token, secret);
    const body = await req.json();
    const validation = userSchema.safeParse(body);
    if (!validation.success) {
      return apiResponse("error", "Invalid input", null, validation.error.errors, null, 400);
    }
    const { id } = await params;
    const user = await updateUser(id, validation.data);
    return apiResponse(
      "success",
      "User updated successfully",
      user,
      null,
      null,
      200
    );
  } catch (err) {
    if (err instanceof Error) {
      return apiResponse("error", err.message, null, [], null, 400);
    }
    return apiResponse("error", "Unauthorized", null, [], null, 401);
  }
}

// Profile update schema for PATCH requests
const profileUpdateSchema = z.object({
  fullname: z.string().min(1, "Full name is required").optional(),
  username: z.string().min(1, "Username is required").optional(),
  email: z.string().email("Invalid email format").optional(),
});

/**
 * @swagger
 * /api/users/{id}:
 *   patch:
 *     summary: Update user profile (partial update)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullname:
 *                 type: string
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *       400:
 *         description: Invalid input or duplicate data
 *       404:
 *         description: User not found
 */
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    
    // Validate the request body
    const validation = profileUpdateSchema.safeParse(body);
    if (!validation.success) {
      return apiResponse("error", "Invalid input", null, validation.error.errors, null, 400);
    }
    
    const validatedData = validation.data;
    
    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { id },
    });
    
    if (!existingUser) {
      return apiResponse("error", "User not found", null, [], null, 404);
    }
    
    // Check if username or email already exists (if being updated)
    if (validatedData.username && validatedData.username !== existingUser.username) {
      const existingUsername = await prisma.user.findUnique({
        where: { username: validatedData.username },
      });
      
      if (existingUsername) {
        return apiResponse("error", "Username already exists", null, [], null, 400);
      }
    }
    
    if (validatedData.email && validatedData.email !== existingUser.email) {
      const existingEmail = await prisma.user.findUnique({
        where: { email: validatedData.email },
      });
      
      if (existingEmail) {
        return apiResponse("error", "Email already exists", null, [], null, 400);
      }
    }
    
    // Update the user
    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        ...validatedData,
      },
      select: {
        id: true,
        fullname: true,
        username: true,
        email: true,
        role: true,
        isActive: true,
      },
    });
    
    return apiResponse(
      "success",
      "Profile updated successfully",
      updatedUser,
      null,
      null,
      200
    );
  } catch (error) {
    console.error("Error updating profile:", error);
    return apiResponse("error", "Internal server error", null, [], null, 500);
  }
}

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Delete a user
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       401:
 *         description: Unauthorized
 */
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return apiResponse("error", "Unauthorized", null, [], null, 401);
  }

  try {
    await jwtVerify(token, secret);
    const { id } = await params;
    await deleteUser(id);
    return apiResponse(
      "success",
      "User deleted successfully",
      null,
      null,
      null,
      200
    );
  } catch {
    return apiResponse("error", "Unauthorized", null, [], null, 401);
  }
}