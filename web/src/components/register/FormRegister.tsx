'use client'

import { useContext, useState } from 'react'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, FormProvider } from 'react-hook-form'

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { AuthContext } from '@/contexts/auth-context'

export const FormRegister = () => {
  const [loading, setLoading] = useState(false)
  const { signIn } = useContext(AuthContext)

  const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8).max(50),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  async function onSubmit(data: z.infer<typeof formSchema>) {
    setLoading(true)
    await signIn(data)
    console.log('deu bom')
    setLoading(false)
  }

  return (
    <FormProvider {...form}>
      <form
        suppressHydrationWarning
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="px-3">Email</FormLabel>
              <FormControl>
                <Input placeholder="example@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="px-3">Password</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={loading}>
          Entrar
        </Button>
      </form>
    </FormProvider>
  )
}
