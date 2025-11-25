import { groq } from 'next-sanity'

export const projectsQuery = groq`
  *[_type == "project"] | order(order asc, publishedAt desc) {
    _id,
    title,
    slug,
    description,
    coverImage,
    technologies,
    liveUrl,
    githubUrl,
    featured,
    order,
    coverImageLocation
  }
`

export const featuredProjectsQuery = groq`
  *[_type == "project" && featured == true] | order(order asc) {
    _id,
    title,
    slug,
    description,
    coverImage,
    technologies,
    liveUrl,
    githubUrl,
    featured,
    order,
    coverImageLocation
  }
`

export const projectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    description,
    coverImage,
    images,
    technologies,
    liveUrl,
    githubUrl,
    featured,
    order,
    coverImageLocation,
    contentBlocks[] {
      blockType,
      image {
        ...,
        asset-> {
          _id,
          url,
          metadata {
            dimensions {
              aspectRatio,
              width,
              height
            }
          }
        }
      },
      videoUrl,
      videoFile {
        asset-> {
          _id,
          url
        }
      },
      textContent
    }
  }
`

export const blogPostsQuery = groq`
  *[_type == "blogPost"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    coverImage,
    publishedAt
  }
`

export const blogPostBySlugQuery = groq`
  *[_type == "blogPost" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    coverImage,
    publishedAt,
    body
  }
`

export const settingsQuery = groq`
  *[_type == "settings"][0] {
    name,
    role,
    bio,
    avatar,
    email,
    github,
    linkedin,
    twitter,
    arena,
    projectsHeroTitle,
    projectsHeroDescription
  }
`

export const featuredFontProjectsQuery = groq`
  *[_type == "fontProject" && featured == true] | order(order asc, _createdAt desc) {
    _id,
    title,
    slug,
    description,
    sampleText,
    fontVariationSettings,
    githubUrl,
    fontFiles[]{
      _key,
      asset->{
        _id,
        url
      }
    }
  }
`

