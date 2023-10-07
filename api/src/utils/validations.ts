import { z } from 'zod'

const emailSchema = z.string().email()

export const validateEmail = (email: string) => {
  try {
    emailSchema.parse(email)
    return true
  } catch (err) {
    return false
  }
}
