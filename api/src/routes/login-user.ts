import { FastifyInstance } from 'fastify'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { z } from 'zod'

import { prisma } from '../lib/prisma'
import { userEmail } from '../utils/info'

export async function loginUser(app: FastifyInstance) {
  const BodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
  })

  app.post('/login', async (req, res) => {
    try {
      const { email, password } = BodySchema.parse(req.body)

      const existingUser = await userEmail(email)

      if (!existingUser) {
        console.log('not existingUser')
        return res.status(400).send({ error: 'Email or Password incorrect!' })
      }

      const correctPass = await prisma.user.findUnique({
        select: {
          password: true,
        },
        where: {
          email,
        },
      })

      if (!correctPass) {
        console.log('not correctPass')
        return res.status(400).send({ error: 'Email or Password incorrect!' })
      }

      const verifyPass = await bcrypt.compare(password, correctPass?.password)

      if (!verifyPass) {
        console.log('not verifyPass')
        return res.status(400).send({ error: 'Email or Password incorrect!' })
      }

      const userId = await prisma.user.findUnique({
        select: {
          id: true,
        },
        where: {
          email,
        },
      })

      const token = jwt.sign({ id: userId?.id }, process.env.JWT_PASS ?? '', {
        expiresIn: '1800',
      })

      await prisma.user.update({
        data: {
          token,
        },
        where: {
          id: userId?.id,
        },
      })

      const { password: _, ...userLogin } = existingUser

      console.log('Deu bom')
      res.status(200).send({ user: userLogin, token })
    } catch (err) {
      res.status(500).send(err)
    }
  })
}
