import { FastifyInstance } from 'fastify'
import bcrypt from 'bcrypt'
import { z } from 'zod'

import { prisma } from '../lib/prisma'
import { userEmail } from '../utils/info'

export async function registerUser(app: FastifyInstance) {
  const BodySchema = z.object({
    email: z.string(),
    password: z.string(),
  })

  app.post('/register', async (req, res) => {
    try {
      const { email, password } = BodySchema.parse(req.body)

      const existingUser = await userEmail(email)

      if (existingUser) {
        return res.status(400).send({ error: 'User already exists' })
      }

      const hashPassword = await bcrypt.hash(password, 10)

      await prisma.user.create({
        data: {
          email,
          password: hashPassword,
        },
      })

      res.status(200).send('User created!')
    } catch (err) {
      res.status(500).send(err)
    }
  })
}
