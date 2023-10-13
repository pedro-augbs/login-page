import { fastify } from 'fastify'
import { fastifyCors } from '@fastify/cors'

import { registerUser } from './routes/register-user'
import { loginUser } from './routes/login-user'
import { getUser } from './routes/get-user'
import { deleteUser } from './routes/delete-user'

const app = fastify()

app.register(fastifyCors, {
  origin: '*',
})

app.register(registerUser)
app.register(loginUser)
app.register(getUser)
app.register(deleteUser)

app.listen({ port: 3333 }).then(() => {
  console.log('listening on port 3333')
})
