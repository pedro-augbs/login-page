import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { FormLogin } from './FormLogin'

export const Login = () => {
  return (
    <TabsContent value="login">
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between">
            <div className="space-y-10">
              <span>
                Welcome to <b className="text-primary">TEST</b>
              </span>
              <h2 className="font-medium text-4xl">Login</h2>
            </div>
            <div className="flex flex-col">
              No account?
              <TabsList className="bg-transparent w-fit p-0 h-fit">
                <TabsTrigger
                  value="register"
                  className="text-left hover:underline transition-all px-0 py-1 text-md"
                >
                  Sign up
                </TabsTrigger>
              </TabsList>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <FormLogin />
        </CardContent>
      </Card>
    </TabsContent>
  )
}
