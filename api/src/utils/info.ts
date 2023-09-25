import { prisma } from '../lib/prisma'

export const userEmail = async (email: string) => {
  const a = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  return a
}
