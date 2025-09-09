import { defineQuery } from "groq";
import { useQuery } from "@tanstack/react-query";
import { client } from "~/lib/sanity/client";
import { GetExercisesQueryResult } from "~/lib/sanity/types";

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
