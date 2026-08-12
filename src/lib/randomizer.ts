export function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

export function getNextChallenge<T extends { id: string | number, difficulty?: string }>(
  allChallenges: T[],
  recentIds: (string | number)[],
  currentDifficulty: string = 'easy'
): T {
  // Filter by difficulty if applicable
  let available = allChallenges.filter(c => !c.difficulty || c.difficulty === currentDifficulty);
  
  // Exclude recent
  let unplayed = available.filter(c => !recentIds.includes(c.id));
  
  // If we ran out of unplayed for this difficulty, reset history for this pool
  if (unplayed.length === 0) {
    unplayed = available;
  }
  
  // If STILL empty (e.g. no questions for this difficulty), fallback to any difficulty
  if (unplayed.length === 0) {
    unplayed = allChallenges.filter(c => !recentIds.includes(c.id));
    if (unplayed.length === 0) unplayed = allChallenges;
  }
  
  return unplayed[Math.floor(Math.random() * unplayed.length)];
}

export function generateDailySeed(dateStr: string): number {
  let hash = 0;
  for (let i = 0; i < dateStr.length; i++) {
    const char = dateStr.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash);
}
