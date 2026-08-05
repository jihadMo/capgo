/**
 * Formats ISO timestamps consistently across leaderboard views using Intl.DateTimeFormat
 * with user locale auto-detection and UTC fallback.
 */
export function formatLeaderboardTimestamp(timestampISO: string, locale?: string): string {
  if (!timestampISO) return 'N/A';
  try {
    const date = new Date(timestampISO);
    if (isNaN(date.getTime())) return 'Invalid Date';
    
    const userLocale = locale || (typeof navigator !== 'undefined' ? navigator.language : 'en-US');
    return new Intl.DateTimeFormat(userLocale, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZoneName: 'short',
    }).format(date);
  } catch (err) {
    return timestampISO;
  }
}
