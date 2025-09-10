import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { v4 as uuidv4 } from "uuid";

export type WorkoutSet = {
  id: string;
  reps: string;
  weight: string;
  weightUnit: "kg" | "lbs";
  isCompleted: boolean;
};

type WorkoutExercise = {
  id: string;
  sanityId: string;
  name: string;
  sets: Array<WorkoutSet>;
};

type WorkoutStore = {
  workoutExercises: Array<WorkoutExercise>;
  weightUnit: "kg" | "lbs";

  addExerciseToWorkout: (exercise: { name: string; sanityId: string }) => void;
  setWorkoutExercises: (
    exercises: WorkoutExercise[] | ((prev: Array<WorkoutExercise>) => Array<WorkoutExercise>)
  ) => void;
  setWeightUnit: (unit: "kg" | "lbs") => void;
  resetWorkout: () => void;
};

export const useWorkoutStore = create<WorkoutStore>()(
  persist(
    (set) => ({
      workoutExercises: [],
      weightUnit: "kg",

      addExerciseToWorkout: (exercise) =>
        set((state) => {
          const newExercise: WorkoutExercise = {
            id: uuidv4(),
            sanityId: exercise.sanityId,
            name: exercise.name,
            sets: []
          };
          return { workoutExercises: [...state.workoutExercises, newExercise] };
        }),
      setWorkoutExercises: (exercises) =>
        set((state) => ({
          workoutExercises: typeof exercises === "function" ? exercises(state.workoutExercises) : exercises
        })),
      setWeightUnit: (unit) => set(() => ({ weightUnit: unit })),
      resetWorkout: () => set({ workoutExercises: [] })
    }),
    {
      name: "workout-store",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        weightUnit: state.weightUnit
      })
    }
  )
);
