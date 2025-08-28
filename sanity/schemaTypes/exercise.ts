import {defineField, defineType} from 'sanity'
import {Dumbbell} from 'lucide-react'

export default defineType({
  name: 'exercise',
  title: 'Exercise',
  type: 'document',
  icon: Dumbbell,
  fields: [
    defineField({
      name: 'name',
      title: 'Exercise Name',
      description: 'Name of the exercise that will be displayed to users',
      type: 'string',
      validation: (Rule) => Rule.required().min(2).max(100),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      description: 'Detailed instructions and information about how to perform the exercise',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'difficulty',
      title: 'Difficulty',
      description: 'The skill level required to perform this exercise',
      type: 'string',
      options: {
        list: [
          {title: 'Beginner', value: 'beginner'},
          {title: 'Intermediate', value: 'intermediate'},
          {title: 'Advanced', value: 'advanced'},
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Exercise Image',
      description: 'Visual representation of the exercise form or technique',
      type: 'image',
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alt Text',
          description: 'Describe the image for accessibility and SEO purposes',
        },
      ],
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'videoUrl',
      title: 'Video URL',
      description: 'Link to a video demonstration of the exercise',
      type: 'string',
    }),
    defineField({
      name: 'isActive',
      title: 'Active Status',
      description: 'Toggle to control whether this exercise is visible to users',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image',
      difficulty: 'difficulty',
    },
  },
})
