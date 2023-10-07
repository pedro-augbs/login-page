import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Login } from './login/Login'
import { Register } from './register/Register'

export const UserAccess = () => {
  return (
    <Tabs
      suppressHydrationWarning
      defaultValue="login"
      className="absolute flex self-center justify-self-center w-full h-full px-4 py-8 flex-col justify-center max-w-lg"
    >
      <TabsList className="hidden">
        <TabsTrigger value="login"></TabsTrigger>
        <TabsTrigger value="register"></TabsTrigger>
      </TabsList>
      <Login />
      <Register />
    </Tabs>
  )
}
