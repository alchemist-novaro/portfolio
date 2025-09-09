import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  project_type: z.string().min(1, "Please select a project type"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export const registerSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  first_name: z.string().min(2, { message: "First name must be at least 2 characters" }),
  last_name: z.string().min(2, { message: "Last name must be at least 2 characters" }),
  pwd: z.string().min(6, { message: "Password must be at least 6 characters" }),
  con_pwd: z.string().min(6, { message: "Confirm password must be at least 6 characters" }),
  agree_to_terms: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions",
  }),
  avatar: z.instanceof(File).optional()
}).refine((data) => data.pwd === data.con_pwd, {
  message: "Passwords don't match",
  path: ["con_pwd"],
});

export const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" })
})