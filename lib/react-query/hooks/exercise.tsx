import { defineQuery } from "groq";
import { useQuery } from "@tanstack/react-query";
import { client } from "~/lib/sanity/client";
import { GetExerciseByIdQueryResult, GetExercisesQueryResult } from "~/lib/sanity/types";

export const getExercisesQuery = defineQuery(`*[_type == "exercise"] {
  ...
}`);

export function useExercisesQuery() {
  return useQuery<GetExercisesQueryResult>({
    queryKey: ["exercises"],
    queryFn: async () => await client.fetch(getExercisesQuery),
    initialData: []
  });
}

export const getExerciseByIdQuery = defineQuery(`*[_type == "exercise" && _id == $id][0]`);
export function useExerciseByIdQuery(exerciseId?: string) {
  return useQuery<GetExerciseByIdQueryResult>({
    queryKey: ["exercise", exerciseId],
    queryFn: async () => await client.fetch(getExerciseByIdQuery, { id: exerciseId }),
    enabled: !!exerciseId
  });
}
