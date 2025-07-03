interface StatusProps {
  is_online: boolean
  className?: string
}

export function ConversationStatus({ is_online, className = '' }: StatusProps) {
  return (
    <div
      className={`w-2.5 h-2.5  ${is_online ? 'rounded-full bg-green-500' : ' squared-full bg-transparent'} ${className}`}
      role='status'
      aria-label={is_online ? 'En ligne' : 'Hors ligne'}
    />
  )
}
