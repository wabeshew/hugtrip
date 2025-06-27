import { cn } from '@/lib/utils'
import Link from 'next/link'

interface HeaderProps {
  className?: string
}

export function Footer({ className }: HeaderProps) {
  return (
    <footer className={cn('border-t bg-background', className)}>
      <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0 p-4">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} HUGTRIP. All rights reserved.
        </p>
        <p className="text-sm text-muted-foreground">
          Made with ❤️ for travelers worldwide
        </p>
      </div>
    </footer>
  )
}
