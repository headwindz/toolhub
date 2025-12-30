import { Button } from '@/components/ui/button'
import { Check, Copy } from 'lucide-react'
import { useState } from 'react'

interface CopyButtonProps {
  text: string
  variant?: 'default' | 'ghost' | 'outline'
  size?: 'default' | 'sm' | 'lg'
  className?: string
  showText?: boolean
  disabled?: boolean
}

export function CopyButton({
  text,
  variant = 'outline',
  size = 'sm',
  className = '',
  showText = false,
  disabled = false,
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Button
      variant={variant}
      size={size}
      disabled={disabled}
      onClick={handleCopy}
      className={`gap-2 flex-shrink-0 ${copied ? 'text-green-600 dark:text-green-500' : ''} ${className}`}
    >
      {copied ? (
        <>
          <Check className="h-4 w-4" />
          {showText && 'Copied!'}
        </>
      ) : (
        <>
          <Copy className="h-4 w-4" />
          {showText && 'Copy'}
        </>
      )}
    </Button>
  )
}
