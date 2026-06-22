export function computeStreakFromDates(dates: string[]): number {
  if (!dates.length) return 0;

  const uniqueDates = [...new Set(dates)].sort((a, b) => b.localeCompare(a));

  const today = new Date().toISOString().slice(0, 10);
  const yesterday = new Date(Date.now() - 86_400_000).toISOString().slice(0, 10);

  if (uniqueDates[0] !== today && uniqueDates[0] !== yesterday) return 0;

  let streak = 1;
  for (let i = 1; i < uniqueDates.length; i++) {
    const prev = new Date(uniqueDates[i - 1]).getTime();
    const curr = new Date(uniqueDates[i]).getTime();
    if (Math.round((prev - curr) / 86_400_000) === 1) {
      streak++;
    } else {
      break;
    }
  }
  return streak;
}
