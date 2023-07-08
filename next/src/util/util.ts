export function parsePostgresDate(date: string): string {
  return new Date(date.replace(' ', 'T')).toLocaleDateString()
}