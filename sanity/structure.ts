import type {StructureResolver} from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      // Projects folder containing both project types
      S.listItem()
        .title('Projects')
        .child(
          S.list()
            .title('Projects')
            .items([
              S.listItem()
                .title('Regular Projects')
                .child(
                  S.documentTypeList('project')
                    .title('Regular Projects')
                ),
              S.listItem()
                .title('Font Projects')
                .child(
                  S.documentTypeList('fontProject')
                    .title('Font Projects')
                ),
            ])
        ),
      // Other document types
      ...S.documentTypeListItems().filter(
        (listItem) => !['project', 'fontProject'].includes(listItem.getId() || '')
      ),
    ])
