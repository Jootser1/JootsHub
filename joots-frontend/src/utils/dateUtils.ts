export function ensureDate(date: any): Date {
  if (typeof date === 'string') return new Date(date);
  if (date instanceof Date) return date;
  return new Date();
}
