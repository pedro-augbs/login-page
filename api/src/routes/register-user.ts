import { FastifyInstance } from 'fastify'
import { z } from 'zod'

import { prismaUser } from '../utils/prisma-user'

import bcrypt from 'bcrypt'

import { randomUUID } from 'node:crypto'

const BodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
})

export async function registerUser(app: FastifyInstance) {
  app.post('/register', async (req, res) => {
    const { email, password, name } = BodySchema.parse(req.body)
    try {
      const existingUser = await prismaUser.findUnique({
        where: {
          email,
        },
      })

      if (existingUser) {
        return res.status(400).send({ error: 'User already exists' })
      }

      const hashPassword = await bcrypt.hash(password, 10)

      await prismaUser.create({
        data: {
          id: randomUUID(),
          name,
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
