import { NextRequest, NextResponse } from "next/server";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";
import csurf from "csurf";

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

const csrfProtection = csurf({ cookie: true });

const corsOptions = {
  origin: process.env.CORS_ORIGIN || "http://localhost:3000",
  optionsSuccessStatus: 200,
};

export async function securityMiddleware(req: NextRequest, res: NextResponse) {
  await new Promise((resolve, reject) => {
    helmet()(req as any, res as any, (err: any) => {
      if (err) reject(err);
      else resolve(null);
    });
  });

  await new Promise((resolve, reject) => {
    cors(corsOptions)(req as any, res as any, (err: any) => {
      if (err) reject(err);
      else resolve(null);
    });
  });

  await new Promise((resolve, reject) => {
    limiter(req as any, res as any, (err: any) => {
      if (err) reject(err);
      else resolve(null);
    });
  });

  await new Promise((resolve, reject) => {
    csrfProtection(req as any, res as any, (err: any) => {
      if (err) reject(err);
      else resolve(null);
    });
  });

  return NextResponse.next();
}