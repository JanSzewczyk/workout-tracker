import { GetWorkoutsQueryResult } from "~/lib/sanity/types";
import { formatDuration } from "~/utils/duration";

export function formatWorkoutDuration(seconds?: number | null) {
  if (!seconds) {
    return "Duration not recorded";
  }
  return formatDuration(seconds);
}

export function getTotalSets(workout: GetWorkoutsQueryResult[number]) {
  return (
    workout.exercises?.reduce((total, exercise) => {
      return total + (exercise?.sets?.length || 0);
    }, 0) ?? 0
  );
}
