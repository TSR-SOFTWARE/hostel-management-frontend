import { z } from 'zod';

const passwordRules = z
  .string()
  .min(8, 'Min 8 characters')
  .regex(/[A-Z]/, 'Must contain uppercase')
  .regex(/[a-z]/, 'Must contain lowercase')
  .regex(/[0-9]/, 'Must contain a digit')
  .regex(/[^A-Za-z0-9]/, 'Must contain a special character');

export const createUserSchema = z
  .object({
    first_name: z.string().min(1, 'First name is required'),
    last_name: z.string().min(1, 'Last name is required'),
    email: z.string().email('Invalid email').or(z.literal('')).optional(),
    mobile: z.string().min(10, 'Min 10 digits').or(z.literal('')).optional(),
    password: passwordRules,
    confirm_password: z.string().min(1, 'Please confirm password'),
    role_id: z.string().min(1, 'Role is required'),
  })
  .refine((d) => d.password === d.confirm_password, {
    message: 'Passwords do not match',
    path: ['confirm_password'],
  })
  .refine((d) => d.email || d.mobile, {
    message: 'Email or mobile is required',
    path: ['email'],
  });

export const updateUserSchema = z.object({
  first_name: z.string().min(1, 'First name is required'),
  last_name: z.string().min(1, 'Last name is required'),
  mobile: z.string().min(10, 'Min 10 digits').or(z.literal('')).optional(),
  role_id: z.string().min(1, 'Role is required'),
  status: z.string().min(1, 'Status is required'),
});

export type CreateUserFormValues = z.infer<typeof createUserSchema>;
export type UpdateUserFormValues = z.infer<typeof updateUserSchema>;
