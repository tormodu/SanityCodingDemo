const previewSecret = 'MY_SECRET' // Copy the string you used for SANITY_PREVIEW_SECRET
const projectUrl = 'http://localhost:3000'

export default function resolveProductionUrlSEO(document) {
  return `${projectUrl}/api/previewSEO?secret=${previewSecret}&slug=${document.slug.current}`
}