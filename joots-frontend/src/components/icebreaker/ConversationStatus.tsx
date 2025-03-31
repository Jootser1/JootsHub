interface StatusProps {
  isOnline: boolean
  className?: string
}

export const ConversationStatus = ({ isOnline, className = '' }: StatusProps) => {
  return (
    <div 
      className={`w-2.5 h-2.5 rounded-full ${isOnline ? 'bg-green-500' : 'bg-gray-400'} ${className}`}
      role="status"
      aria-label={isOnline ? 'En ligne' : 'Hors ligne'}
    />
  )
}