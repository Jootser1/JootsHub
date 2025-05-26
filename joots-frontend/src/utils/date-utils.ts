export function ensureDate(date: string | Date | number | undefined): Date {
  if (typeof date === 'string') return new Date(date)
  if (date instanceof Date) return date
  if (typeof date === 'number') return new Date(date)
  return new Date()
}
