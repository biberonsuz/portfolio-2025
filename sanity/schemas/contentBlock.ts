import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'contentBlock',
  title: 'Content Block',
  type: 'object',
  fields: [
    defineField({
      name: 'blockType',
      title: 'Block Type',
      type: 'string',
      options: {
        list: [
          { title: 'Image', value: 'image' },
          { title: 'Video', value: 'video' },
          { title: 'Text Editor', value: 'text' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      hidden: ({ parent }) => parent?.blockType !== 'image',
    }),
    defineField({
      name: 'videoUrl',
      title: 'Video URL',
      type: 'url',
      description: 'URL for YouTube, Vimeo, or other video platforms',
      hidden: ({ parent }) => parent?.blockType !== 'video',
    }),
    defineField({
      name: 'videoFile',
      title: 'Video File',
      type: 'file',
      options: {
        accept: 'video/*',
      },
      hidden: ({ parent }) => parent?.blockType !== 'video',
    }),
    defineField({
      name: 'textContent',
      title: 'Text Content',
      type: 'array',
      of: [{ type: 'block' }],
      hidden: ({ parent }) => parent?.blockType !== 'text',
    }),
  ],
  preview: {
    select: {
      blockType: 'blockType',
      image: 'image',
      text: 'textContent',
    },
    prepare({ blockType, image, text }) {
      const title = blockType ? blockType.charAt(0).toUpperCase() + blockType.slice(1) : 'Content Block'
      let subtitle = ''
      
      if (blockType === 'image' && image) {
        subtitle = 'Image block'
      } else if (blockType === 'video') {
        subtitle = 'Video block'
      } else if (blockType === 'text' && text && text.length > 0) {
        const firstBlock = text[0]
        if (firstBlock.children && firstBlock.children[0]) {
          subtitle = firstBlock.children[0].text || 'Text block'
        }
      }
      
      return {
        title,
        subtitle,
        media: image,
      }
    },
  },
})

