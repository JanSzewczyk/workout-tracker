import { defineQuery } from "groq";
import { GetWorkoutByIdQueryResult, GetWorkoutsQueryResult } from "~/lib/sanity/types";
import { adminClient, client } from "~/lib/sanity/client";
import { useMutation, useQuery } from "@tanstack/react-query";

export const getWorkoutsQuery = defineQuery(`*[_type == "workout" && userId == $userId] | order(date desc) {
  _id,
  date,
  duration,
  exercises[] {
    exercise-> {
      _id,
      name
    },
    sets[] {
      reps,
      weight,
      weightUnit,
      _type,
      _key
    },
    _type,
    _key
  }
}`);

export function useWorkoutsQuery(userId?: string) {
  return useQuery<GetWorkoutsQueryResult>({
    queryKey: ["workouts", userId],
    queryFn: async () => await client.fetch(getWorkoutsQuery, { userId }),
    enabled: !!userId,
    initialData: []
  });
}

export const getWorkoutByIdQuery = defineQuery(`*[_type == "workout" && _id == $workoutId][0] {
  _id,
  date,
  duration,
  exercises[] {
    exercise-> {
      _id,
      name
    },
    sets[] {
      reps,
      weight,
      weightUnit,
      _type,
      _key
    },
    _type,
    _key
  }
}`);

export function useWorkoutByIdQuery(workoutId?: string) {
  return useQuery<GetWorkoutByIdQueryResult>({
    queryKey: ["workout", workoutId],
    queryFn: async () => await client.fetch(getWorkoutByIdQuery, { workoutId }),
    enabled: !!workoutId
  });
}

export function useWorkoutDelete() {
  return useMutation({
    mutationFn: async (workoutId: string) => await adminClient.delete(workoutId)
  });
}

export type WorkoutPayload = {
  _type: string;
  userId: string;
  date: string;
  duration: number;
  exercises: Array<{
    _type: string;
    _key: string;
    exercise: {
      _type: string;
      _ref: string;
    };
    sets: Array<{
      _type: string;
      _key: string;
      reps: number;
      weight: number;
      weightUnit: "kg" | "lbs";
    }>;
  }>;
};

export function useCreateWorkout() {
  return useMutation({
    mutationFn: async (workout: WorkoutPayload) => await adminClient.create(workout)
  });
}
