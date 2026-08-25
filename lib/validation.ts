import { z } from 'zod'

export const contactMessageInputSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(254),
  phone: z.string().trim().max(30),
  subject: z.string().trim().max(160),
  message: z.string().trim().min(10).max(5000),
})
