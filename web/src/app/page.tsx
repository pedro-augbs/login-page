import { UserAccess } from '@/components/UserAccess'
import { ModeToggle } from '@/components/mode-toggle'

export default function Home() {
  return (
    <main
      className="grid grid-cols-2 min-h-screen relative"
      suppressHydrationWarning
    >
      <div className="bg-primary"></div>
      <div></div>
      <UserAccess />
      <ModeToggle />
    </main>
  )
}
