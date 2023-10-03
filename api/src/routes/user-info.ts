import { FastifyInstance } from 'fastify'
import z from 'zod'

import { prisma } from '../lib/prisma'

export async function userInfo(app: FastifyInstance) {
  const BodySchema = z.object({
    token: z.string(),
  })

  app.post('/user-info', async (req, res) => {
    try {
      const { token } = BodySchema.parse(req.body)

      const userInfo = await prisma.user.findFirst({
        select: {
          id: true,
          email: true,
        },
        where: { token },
      })

      if (!userInfo) {
        return res.status(400).send({ error: 'User not found' })
      }

      return { userInfo }
    } catch (err) {
      res.status(500).send(err)
    }
  })
}
