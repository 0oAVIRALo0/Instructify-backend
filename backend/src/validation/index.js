import { z } from 'zod';

const registerUserValidation = z.object({
  fullName: z.string().min(1, "Full name is required").max(50).trim(), 
  username: z.string().min(1, "Username is required").max(50).trim().toLowerCase(), 
  email: z.string().email("Invalid email format").min(1, "Email is required").trim().toLowerCase(), 
  role: z.enum(["student", "instructor"]).optional(), 
  password: z.string().min(1, "Password must be at least 6 characters long"), 
});

const loginUserValidation = z.object({
  username: z.string().min(1, "Username is required").max(50).trim().toLowerCase(), 
  password: z.string().min(1, "Password must be at least 6 characters long"), 
});

const addCourseValidation = z.object({
  title: z.string().min(1, "Title is required").trim(), 
  description: z.string().min(1, "Description is required").trim(), 
  price: z.string(), 
});

export { registerUserValidation, loginUserValidation, addCourseValidation };

// .positive("Price must be a positive number").min(0, "Price must be at least 0")