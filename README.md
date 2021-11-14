## Configuration

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
 #### Add a media plugins to the studio
 Add ``` "media"``` and ``` "asset-source-unsplash"``` to the plugin section in sanity.json and restart the studio from terminal
 
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

Add the following Youtube video to the document: https://www.youtube.com/watch?v=2ceM_tSus_M&t=5s

#### Add a location property
```
{
  title: 'Location',
  name: 'location',
  type: 'geopoint'
 },
 ```
 
 #### Add a map plugin to the studio
 Add ``` "leaflet-input"``` to the plugin section in sanity.json and restart the studio from terminal
 
#### Add a custom string
```
{
  name: 'customString',
  title: 'This is a cool custom string',
  type: 'string',
  inputComponent: CustomString
 },
 ```
 
 Create a custom string object type
 ```
 import React from 'react'

// Import UI components from Sanity UI
import { TextInput, Stack, Label } from '@sanity/ui'

export const CustomString = React.forwardRef((props, ref) => {
    return (
      <Stack space={2}>
        <Label>{props.type.title}</Label>
        <TextInput value={props.value} />
      </Stack>
    )
  }
)

// Create the default export to import into our schema
export default CustomString
```

#### Add a string with validation
```
 {
   name: 'stringWithLimit',
   title: 'This is a string with validation',
   type: 'string',
   validation: Rule => Rule.max(10)
 },
```

#### Add a custom validation to the string

```inputComponent: StringWithLimits,```

add the custom input object type

```
import React from 'react'
import { FormField } from '@sanity/base/components'
import { TextInput, Stack, Text } from '@sanity/ui'
import PatchEvent, { set, unset } from '@sanity/form-builder/PatchEvent'
import { useId } from "@reach/auto-id" // hook to generate unique IDs

const StringWithLimits = React.forwardRef((props, ref) => {
  const { 
      type,         // Schema information
      value,        // Current field value
      readOnly,     // Boolean if field is not editable
      placeholder,  // Placeholder text from the schema
      markers,      // Markers including validation rules
      presence,     // Presence information for collaborative avatars
      compareValue, // Value to check for "edited" functionality
      onFocus,      // Method to handle focus state
      onBlur,       // Method to handle blur state  
      onChange      // Method to handle patch events
    } = props
    
    // Creates a unique ID for our input
    const inputId = useId()
    
    const MaxConstraint = type.validation[0]._rules.filter(rule => rule.flag == 'max')[0].constraint


    const handleChange = React.useCallback(
      (event) => {
        const inputValue = event.currentTarget.value
        onChange(PatchEvent.from(inputValue ? set(inputValue) : unset()))
      },
      [onChange]
    )
    return (
      <Stack space={1}>

      <FormField
        description={type.description}  // Creates description from schema
        title={type.title}              // Creates label from schema title
        __unstable_markers={markers}    // Handles all markers including validation
        __unstable_presence={presence}  // Handles presence avatars
        compareValue={compareValue}     // Handles "edited" status
        inputId={inputId}               // Allows the label to connect to the input field
      >
        <TextInput
          id={inputId}                  // A unique ID for this input
          onChange={handleChange}       // A function to call when the input value changes
          
          value={value}                 // Current field value
          readOnly={readOnly}           // If "readOnly" is defined make this field read only
          placeholder={placeholder}     // If placeholder is defined, display placeholder text
          onFocus={onFocus}             // Handles focus events
          onBlur={onBlur}               // Handles blur events
          ref={ref}
        />
        </FormField>
        <Text style={{color: (value ? value.length : 0) > MaxConstraint ? 'red' : 'green'}} muted size={1}>{value ? value.length : '0'} / {MaxConstraint}</Text>
      </Stack>
    )
  }
)

export default StringWithLimits
```
#### Add an icon to the docuument type

``` icon: () => '🤩',```

#### Add a preview to the document type

```
preview: {
  select: {
    title: 'title',
    subtitle: 'author.name',
    media: 'poster'
  }
}
```

#### The complete document should look like this

```
import CustomString from "../objects/customString"
import StringWithLimits from "../objects/StringWithLimits"
export default {
    name: 'demoPage',
    type: 'document',
    title: 'Demo Page',
    icon: () => '🤩',
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
``` 

### Step 8. Customize the desk structure

#### Add a menu for posts by author in deskStructure.js at line 53

```
 S.listItem()
   .title("Posts by author")
   .icon(MdGroup)
   .child(
     S.documentTypeList("author")
       .title("Posts by author")
       .child(
         (_id) =>
           S.documentList("post")
             .schemaType("post")
             .title("Posts by author")
             .filter('_type == "post" && author._ref == $_id')
             .params({ _id })
          )
      ),
```

### Step 9. Add a dashboard to the studio
#### Enable dashboards
Add ```{
      "implements": "part:@sanity/dashboard/config",
      "path": "./dashboardConfig.js"
    },``` to the parts list and ``` "@sanity/dashboard",```to the plugins list in sanity.json 

Create the dashboardConfig.js

``` 
export default {
  widgets: [
   
    {name: 'structure-menu'},
    {name: 'project-users', layout: {height: 'auto', widht:'medium'}},
    {
      name: 'document-list',
      options: {title: 'Recently edited', order: '_updatedAt desc', limit: 10, types: ['post']},
      layout: {width: 'medium'}
    }
  ]
}
```
And finally restart the studio from terminal

#### Add a widget to the dashboard
Run ```sanity init plugin```in the studio folder and choose "A Dashboard with cats" and accept all default values
Add ``` {name: 'cats',  layout: {width: 'full'}},``` to dashboardConfig.js

### Step 10. Change the UI of Sanity Studio
From the studio folder run ```sanity install hotdog-stand```` and restart the studio from terminal

### Step 11. Get content from Sanity to front end
In a browser navigate to https://localhost:3000/dempPage/[slug]
Go to the Web/pages/demoPage/[slug].js. In getStaticProps the Sanity Client fetches data from Sanity. 
Open /Web/lib/queries.js. demoPageQuery uses GROQ to fetch data from Sanity



