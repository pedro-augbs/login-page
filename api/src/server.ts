import { fastify } from 'fastify'
import { fastifyCors } from '@fastify/cors'

import { registerUser } from './routes/register-user'

const app = fastify()

app.register(fastifyCors, {
  origin: '*',
})

app.register(registerUser)

app.listen({ port: 3333 }).then(() => {
  console.log('listening on port 3333')
})
