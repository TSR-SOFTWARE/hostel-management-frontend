import { z } from 'zod';

export const createRoleSchema = z.object({
  role_name: z.string().min(1, 'Role name is required'),
  description: z.string().optional(),
});

export const createHostelSchema = z.object({
  name: z.string().min(1, 'Hostel name is required'),
  address: z.string().min(1, 'Address is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  pincode: z.string().min(4, 'Pincode is required'),
  phone: z.string().optional(),
  email: z.string().email('Invalid email').or(z.literal('')).optional(),
  total_rooms: z.coerce.number().min(1, 'Must have at least 1 room'),
});

export type CreateRoleFormValues = z.infer<typeof createRoleSchema>;
export type CreateHostelFormValues = z.infer<typeof createHostelSchema>;
