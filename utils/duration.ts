export function formatDuration(seconds: number): string {
  if (seconds < 60) {
    return `${seconds} s`;
  }

  const hour = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  if (hour > 0) {
    if (remainingSeconds > 0) {
      return `${hour}h ${minutes}min ${remainingSeconds}s`;
    } else if (minutes > 0) {
      return `${hour}h ${minutes}min`;
    } else {
      return `${hour}h`;
    }
  } else {
    if (remainingSeconds > 0) {
      return `${minutes}min ${remainingSeconds}s`;
    } else {
      return `${minutes}min`;
    }
  }
}
