import { z } from "zod";

export const eventSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  isActive: z.boolean().optional(),
});

export const guestCategorySchema = z.object({
  name: z.string().min(1, "Name is required"),
});

export const guestSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address").optional().or(z.literal("")),
  phoneNumber: z.string().optional(),
  notes: z.string().optional(),
  guestCategoryId: z.string().min(1, "Guest category is required"),
});

export const broadcastTemplateSchema = z.object({
  name: z.string().min(1, "Name is required"),
  type: z.enum(["Email", "WhatsApp"]),
  content: z.string().min(1, "Content is required"),
});

export const claimableItemSchema = z.object({
  name: z.string().min(1, "Name is required"),
  quantity: z.number().int().positive("Quantity must be a positive number"),
});

export const userSchema = z.object({
  username: z.string().min(1, "Username is required"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .optional(),
  role: z.enum(["SuperAdmin", "AdminEvents"]),
  isActive: z.boolean().optional(),
  eventId: z.string().optional(),
});

export const resetPasswordSchema = z.object({
  token: z.string().min(1, "Token is required"),
  newPassword: z.string().min(6, "Password must be at least 6 characters long"),
});

export const resetPasswordRequestSchema = z.object({
  email: z.string().email("Invalid email address"),
});