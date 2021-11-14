const postFields = `
  _id,
  name,
  title,
  date,
  excerpt,
  coverImage,
  "slug": slug.current,
  "author": author->{name, picture}
`

export const indexQuery = `
*[_type == "post"] | order(date desc, _updatedAt desc) {
  ${postFields}
}`

export const postQuery = `
{
  "post": *[_type == "post" && slug.current == $slug] | order(_updatedAt desc) [0]  {
    content, ${postFields}},
  "morePosts": *[_type == "post" && slug.current != $slug] | order(_updatedAt desc) [0...2] {
    content, ${postFields}}
}`

export const postSlugsQuery = `
*[_type == "post" && defined(slug.current)][].slug.current
`

export const demoPageQuery = `{"demoPage": *[_type == "demoPage" && slug.current == $slug] | order(_updatedAt desc) [0] {
  _id,
  title,
  date,
  poster,
  content,
  "slug": slug.current,
  "author": author->{name, picture}
} }`

export const demoPageSlugsQuery = `
*[_type == "demoPage" && defined(slug.current)][].slug.current
`

export const postBySlugQuery = `
*[_type == "post" && slug.current == $slug][0] {
  ${postFields}
}
`
