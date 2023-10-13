import { randomUUID } from 'crypto'
import { z } from 'zod'

export const User = z.object({
  id: z.string().default(randomUUID),
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  createdAt: z.date(),
  token: z?.string(),
})
