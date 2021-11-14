## Configuration

### Step 7. Start building the Demo Page
#### Add a title to the document
#### Add the proprty for slug
```
  {
  title: 'Slug',
  name: 'slug',
  type: 'slug',
  options: {
    source: 'title',
    maxLength: 200
  }
 },
 ```
 #### Add the conditional hidden field to the slug. When no title is present the slug should be hidden
 
 ```hidden: ({document}) => !document?.title, ```
 
 #### Add the published date field
 
 ```
{
  title: 'Publish Date',
  name: 'date',
  type: 'datetime',
},
 ```
 
 #### Add an initial value to the published date field
 
``` initialValue: (new Date()).toISOString()```

### Add a poster image field

```
{
    title: 'Poster',
    name: 'poster',
    type: 'image',
    options: {
        hotspot: true
    },
},
```
#### Add additional fields to the image property

```
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
```
#### Add a reference to the author document type

```
{
  title: 'Author',
  name: 'author',
  type: 'reference',
  to: [{type: 'author'}]
},
```

#### Add references to multiple post documents

```
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
```

#### Add portable text

```
{
  name: 'content',
  title: 'Content',
  type: 'array',
  of: [
    {
      type: 'block'
    },
  ]
},
```

#### Add an image to the portable text
```
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
```

#### Add a YouTube video to the portable text

```
 {
   type: 'youtube'
 },
```
Create a youtube object type
```
import React from 'react'
import getYouTubeId from 'get-youtube-id'
import YouTube from 'react-youtube'

const Preview = ({value}) => {
	const { url } = value
	const id = getYouTubeId(url)
	return (<YouTube videoId={id} />)
}

export default {
  name: 'youtube',
  type: 'object',
  title: 'YouTubefilm',
  fields: [
    {
      name: 'url',
      type: 'url',
      title: 'YouTube video URL'
    },
    {
      name: 'videoLabel',
      type: 'string',
      title: 'Descriptive video title'
    }
  ],
  preview: {
  	select: {
  		url: 'url'
  	},
  	component: Preview
  }
}
```

#### Add a location property
```
{
  title: 'Location',
  name: 'location',
  type: 'geopoint'
 },
 ```
 

 
### Step 1. Create an account and a project on Sanity

First, [create an account on Sanity](https://sanity.io).

After creating an account, install the Sanity cli from npm `npm i -g @sanity/cli`.

### Step 2. Create a new Sanity project

In a separate folder run `sanity init` to initialize a new studio project.

This will be where we manage our data.

When going through the init phase make sure to select **Yes** to the **Use the default dataset configuration** step and select **Clean project with no predefined schemas** for the **Select project template** step.

### Step 3. Generate an API token

Log into https://manage.sanity.io/ and choose the project you just created. Then from **Settings**, select **API**, then click **Add New Token** and create a token with the **Read** permission.

### Step 4. Set up environment variables

Copy the `.env.local.example` file in this directory to `.env.local` (which will be ignored by Git):

```bash
cp .env.local.example .env.local
```

Then set each variable on `.env.local`:

- `NEXT_PUBLIC_SANITY_PROJECT_ID` should be the `projectId` value from the `sanity.json` file created in step 2.
- `NEXT_PUBLIC_SANITY_DATASET` should be the `dataset` value from the `sanity.json` file created in step 2 - defaults to `production` if not set.
- `SANITY_API_TOKEN` should be the API token generated in the previous step.
- `SANITY_PREVIEW_SECRET` can be any random string (but avoid spaces), like `MY_SECRET` - this is used for [Preview Mode](https://nextjs.org/docs/advanced-features/preview-mode).

Your `.env.local` file should look like this:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=...
NEXT_PUBLIC_SANITY_DATASET=...
SANITY_API_TOKEN=...
SANITY_PREVIEW_SECRET=...
```




### Step 5. Populate Content

To add some content go to your Sanity studio project directory and run `sanity start`.

After the project has started and you have navigated to the URL given in the terminal, select **Author** and create a new record.

- You just need **1 Author record**.
- Use dummy data for the text.
- For the image, you can download one from [Unsplash](https://unsplash.com/).

Next, select **Post** and create a new record.

- We recommend creating at least **2 Post records**.
- Use dummy data for the text.
- You can write markdown for the **Content** field.
- For the images, you can download ones from [Unsplash](https://unsplash.com/).
- Pick the **Author** you created earlier.

**Important:** For each post record, you need to click **Publish** after saving. If not, the post will be in the draft state.

### Step 6. Run Next.js in development mode

```bash
npm install
npm run 
```




