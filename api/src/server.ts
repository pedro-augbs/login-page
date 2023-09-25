import { fastify } from 'fastify'
import { fastifyCors } from '@fastify/cors'

import { registerUser } from './routes/register-user'
import { loginUser } from './routes/login-user'

const app = fastify()

app.register(fastifyCors, {
  origin: '*',
})

app.register(registerUser)
app.register(loginUser)

app.listen({ port: 3333 }).then(() => {
  console.log('listening on port 3333')
})
