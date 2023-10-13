import { FastifyInstance } from 'fastify'
import { z } from 'zod'

import { prismaUser } from '../utils/prisma-user'

const BodySchema = z.object({ email: z.string().email() })

export async function deleteUser(app: FastifyInstance) {
  app.delete('/delete-user', async (req, res) => {
    const { email } = BodySchema.parse(req.body)
    try {
      await prismaUser.delete({
        where: { email },
      })
      res.status(200).send('Delete Successful!')
    } catch (err) {
      res.status(500).send(err)
    }
  })
}
