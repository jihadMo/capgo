import { formatLeaderboardTimestamp } from './date';

describe('formatLeaderboardTimestamp', () => {
  it('formats valid ISO string with locale timezone', () => {
    const iso = '2026-08-05T12:00:00Z';
    const formatted = formatLeaderboardTimestamp(iso, 'en-US');
    expect(formatted).toContain('2026');
    expect(formatted).toContain('Aug');
  });

  it('handles invalid dates gracefully', () => {
    expect(formatLeaderboardTimestamp('invalid-date')).toBe('Invalid Date');
    expect(formatLeaderboardTimestamp('')).toBe('N/A');
  });
});
