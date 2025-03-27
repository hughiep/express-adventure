import z from "zod";

export const userRegisterSchema = z.object({
  email: z.string().regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/),
  password: z.string().min(8),
  name: z.string().min(3).max(16),
});

export const userLoginSchema = z.object({
  email: z.string(),
});
