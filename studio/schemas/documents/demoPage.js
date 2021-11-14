import CustomString from "../objects/customString"
import StringWithLimits from "../objects/StringWithLimits"
export default {
    name: 'demoPage',
    type: 'document',
    title: 'Demo Page',
   // icon: () => '🤩',
    fields: [
        {
          name: 'title',
          type: 'string',
          title: 'Title',
        },
        {
          title: 'Slug',
          name: 'slug',
          type: 'slug',
          hidden: ({document}) => !document?.title,
          options: {
            source: 'title',
            maxLength: 200
          }
        },
        {
          title: 'Publish Date',
          name: 'date',
          type: 'datetime',
          initialValue: (new Date()).toISOString()
        },
        {
          title: 'Poster',
          name: 'poster',
          type: 'image',
          options: {
            hotspot: true
          },
          fields: [
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
              options: {
                isHighlighted: true
              }
            },
            {
              name: 'attribution',
              type: 'string',
              title: 'Attribution',
            }
          ]
        },
        {
          title: 'Author',
          name: 'author',
          type: 'reference',
          to: [{type: 'author'}]
        },
        {
          title: 'Multiple related posts',
          name: 'relatedPosts',
          type: 'array',
          of: [
            {
              type: 'reference',
              to: [
                {type: 'post'}
              ]
            }
          ]
        },
        {
          name: 'content',
          title: 'Content',
          type: 'array',
          of: [
            {
              type: 'block'
            },
            {
              type: 'youtube'
            },
            {
              type: 'image',
              fields: [
                {
                  type: 'text',
                  name: 'alt',
                  title: 'Alternative text',
                  options: {
                    isHighlighted: true
                  }
                }
              ]
            }
          ]
        },
        {
          title: 'Location',
          name: 'location',
          type: 'geopoint'
        },
        {
          name: 'customString',
          title: 'This is a cool custom string',
          type: 'string',
          inputComponent: CustomString
        },
        {
          name: 'stringWithLimit',
          title: 'This is a string with validation',
          type: 'string',
          inputComponent: StringWithLimits,
          validation: Rule => Rule.max(10)
        },
    ],
    preview: {
      select: {
        title: 'title',
        subtitle: 'author.name',
        media: 'poster'
      }
    }
}