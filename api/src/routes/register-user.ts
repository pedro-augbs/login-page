import { FastifyInstance } from 'fastify'
import { z } from 'zod'

import { prisma } from '../lib/prisma'

export async function registerUser(app: FastifyInstance) {
  const BodySchema = z.object({
    email: z.string(),
    password: z.string(),
  })

  app.post('/register', async (req, res) => {
    try {
      const { email, password } = BodySchema.parse(req.body)

      const existingUser = await prisma.user.findUnique({
        where: {
          email,
        },
      })

      if (existingUser) {
        return res.status(400).send({ error: 'User already exists' })
      }

      const newUser = await prisma.user.create({
        data: {
          email,
          password,
        },
      })

      res.status(200).send(newUser)

      return newUser
    } catch (err) {
      res.status(500).send(err)
    }
  })
}
