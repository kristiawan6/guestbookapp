import { z } from "zod";

export const eventSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  isActive: z.boolean().optional(),
});

export const guestCategorySchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  quota: z.number().int().min(0, "Quota must be a non-negative number").optional(),
  isActive: z.boolean().optional(),
});

export const guestSchema = z.object({
  name: z.string().min(1, "Fullname is required"),
  email: z.string().email("Invalid email address").min(1, "Email Address is required"),
  phoneNumber: z.string().min(1, "Phone Number is required").transform((val) => {
    // Auto-convert phone numbers starting with 0 to start with 62
    if (val.startsWith('0')) {
      return '62' + val.slice(1);
    }
    return val;
  }),
  guestCategoryId: z.string().min(1, "Guest Category is required"),
  address: z.string().optional(),
  numberOfGuests: z.number().int().min(1).default(1).optional(),
  session: z.string().optional(),
  tableNumber: z.string().optional(),
  notes: z.string().optional(),
});

export const broadcastTemplateSchema = z.object({
  name: z.string().min(1, "Name is required"),
  type: z.enum(["Email", "WhatsApp"]),
  content: z.string().min(1, "Content is required"),
  subject: z.string().optional(),
  footer: z.string().optional(),
  button: z.string().optional(),
  imageAttachment: z.string().optional(),
  imageAttachmentType: z.string().optional(),
  coordinateFields: z.string().optional(),
});

export const claimableItemSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
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