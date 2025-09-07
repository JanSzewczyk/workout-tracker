import { defineArrayMember, defineField, defineType } from "sanity";
import { Hand } from "lucide-react";

export default defineType({
  name: "workout",
  title: "Workout",
  type: "document",
  icon: Hand,
  fields: [
    defineField({
      name: "userId",
      title: "User ID",
      description: "Clerk user identifier for workout ownership",
      type: "string",
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "date",
      title: "Workout Date",
      description: "Date when the workout was performed",
      type: "datetime",
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "duration",
      title: "Duration (seconds)",
      description: "Total workout duration in seconds",
      type: "number",
      validation: (Rule) => Rule.required().min(0)
    }),
    defineField({
      name: "exercises",
      title: "Exercises",
      description: "List of exercises performed with their details",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "workoutExercise",
          title: "Workout Exercise",
          description: "Details of a single exercise within the workout",
          fields: [
            defineField({
              name: "exercise",
              title: "Exercise",
              type: "reference",
              to: [{ type: "exercise" }],
              validation: (Rule) => Rule.required()
            }),
            defineField({
              name: "sets",
              title: "Sets",
              description: "Number of sets performed for this exercise",
              type: "array",
              of: [
                defineArrayMember({
                  type: "object",
                  name: "exerciseSet",
                  title: "Exercise Set",
                  fields: [
                    defineField({
                      name: "reps",
                      title: "Repetitions",
                      type: "number",
                      validation: (Rule) => Rule.required().min(0)
                    }),
                    defineField({
                      name: "weight",
                      title: "Weight",
                      type: "number",
                      validation: (Rule) => Rule.min(0)
                    }),
                    defineField({
                      name: "weightUnit",
                      title: "Weight Unit",
                      type: "string",
                      options: {
                        list: [
                          { title: "Kilograms", value: "kg" },
                          { title: "Pounds", value: "lbs" }
                        ],
                        layout: "radio"
                      },
                      initialValue: "kg"
                    })
                  ]
                })
              ]
            })
          ],
          preview: {
            select: {
              title: "exercise.name",
              subtitle: "sets.length"
            },
            prepare({ title, subtitle }) {
              return {
                title: title || "Unnamed Exercise",
                subtitle: `${subtitle || 0} set(s)`
              };
            }
          }
        })
      ],
      validation: (Rule) => Rule.required().min(1)
    })
  ],
  preview: {
    select: {
      date: "date",
      duration: "duration",
      exercises: "exercises"
    }
  }
});
