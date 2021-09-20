export default {
    name: 'post',
    type: 'document',
    title: 'Post',
    fields: [
      {
        name: 'title',
        title: 'Title',
        type: 'string',
      },
      {
        name: 'keywords',
        title: 'SEO keywords',
        type: 'string',
      },
      {
        name: 'synonyms',
        title: 'SEO synonyms',
        type: 'string',
      },
      {
        name: 'slug',
        title: 'Slug',
        type: 'slug',
        options: {
          source: 'title',
        },
      },
      {
        name: 'content',
        title: 'Content',
        type: 'array',
        of: [{ type: 'block' }],
      },
      {
        name: 'excerpt',
        title: 'Excerpt',
        type: 'string',
      },
      {
        name: 'coverImage',
        title: 'Cover Image',
        type: 'image',
      },
      {
        name: 'date',
        title: 'Date',
        type: 'datetime',
      },
      {
        name: 'author',
        title: 'Author',
        type: 'reference',
        to: [{ type: 'author' }],
      },
    ],
  }