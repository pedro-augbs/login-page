import { FastifyInstance } from 'fastify'
import z from 'zod'

import { prisma } from '../lib/prisma'

export async function getUser(app: FastifyInstance) {
  const BodySchema = z.object({
    token: z.string(),
  })

  app.post('/get-user', async (req, res) => {
    try {
      const { token } = BodySchema.parse(req.body)

      const userInfo = await prisma.user.findFirst({
        where: { token },
      })

      if (!userInfo) {
        return res.status(400).send({ error: 'User not found' })
      }

      const { password: _, ...user } = userInfo

      return user
    } catch (err) {
      res.status(500).send(err)
    }
  })
}
