interface StatusProps {
  isOnline: boolean
  className?: string
}

export function ConversationStatus({ isOnline, className = '' }: StatusProps) {
  return (
    <div
      className={`w-2.5 h-2.5  ${isOnline ? 'rounded-full bg-green-500' : ' squared-full bg-transparent'} ${className}`}
      role='status'
      aria-label={isOnline ? 'En ligne' : 'Hors ligne'}
    />
  )
}
