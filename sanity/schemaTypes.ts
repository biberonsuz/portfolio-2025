import { SchemaTypeDefinition } from 'sanity'
import project from './schemas/project'
import blogPost from './schemas/blogPost'
import settings from './schemas/settings'
import contentBlock from './schemas/contentBlock'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [project, blogPost, settings, contentBlock],
}

