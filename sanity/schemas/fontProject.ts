import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'fontProject',
  title: 'Font Project',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'sampleText',
      title: 'Sample text',
      type: 'string',
    }),
    defineField({
      name: 'fontFiles',
      title: 'Font Files',
      type: 'array',
      of: [
        {
          type: 'file',
          options: {
            accept: '.woff,.woff2,.ttf,.otf,.eot',
          },
        },
      ],
      description: 'Upload font files (WOFF, WOFF2, TTF, OTF, EOT)',
    }),
    defineField({
      name: 'fontVariationSettings',
      title: 'Font Variation Settings',
      type: 'string',
      description: 'CSS font-variation-settings for variable fonts (e.g., "wght" 400 or "wght" 400, "wdth" 100)',
    }),
    defineField({
      name: 'githubUrl',
      title: 'GitHub URL',
      type: 'url',
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
})

