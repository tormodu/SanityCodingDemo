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