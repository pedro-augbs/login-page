import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Login } from './login/Login'

export const UserAccess = () => {
  return (
    <Tabs
      suppressHydrationWarning
      defaultValue="login"
      className="absolute flex self-center justify-self-center w-full h-full px-4 py-8 flex-col justify-center max-w-lg"
    >
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="login">Account</TabsTrigger>
        <TabsTrigger value="register">Password</TabsTrigger>
      </TabsList>
      <Login />
      <TabsContent value="register">
        <Card>
          <CardHeader>
            <CardTitle>Password</CardTitle>
            <CardDescription>
              {"Change your password here. After saving, you'll be logged out."}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="current">Current password</Label>
              <Input id="current" type="password" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="new">New password</Label>
              <Input id="new" type="password" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save password</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
