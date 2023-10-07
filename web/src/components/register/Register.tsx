import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { FormRegister } from './FormRegister'

export const Register = () => {
  return (
    <TabsContent value="register">
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between">
            <div className="space-y-10">
              <span>
                Welcome to <b className="text-primary">TEST</b>
              </span>
              <h2 className="font-medium text-4xl">Register</h2>
            </div>
            <div className="flex flex-col">
              Already registered?
              <TabsList className="bg-transparent w-fit p-0 h-fit">
                <TabsTrigger
                  value="login"
                  className="text-left hover:underline transition-all px-0 py-1 text-md"
                >
                  Sign in
                </TabsTrigger>
              </TabsList>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <FormRegister />
        </CardContent>
      </Card>
    </TabsContent>
  )
}
