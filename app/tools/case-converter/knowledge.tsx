'use client'

import { KnowledgeSection } from '@/components/knowledge-section'

export function CaseConverterKnowledge() {
  return (
    <KnowledgeSection
      title="Variable casing cheat sheet"
      description="Pick the right naming style for code, APIs, and content"
    >
      <section className="space-y-2">
        <h3 className="font-semibold">Common styles</h3>
        <ul className="list-disc space-y-1 text-muted-foreground pl-5">
          <li>
            <strong>camelCase:</strong> JavaScript variables, function names,
            and JSON keys
          </li>
          <li>
            <strong>PascalCase:</strong> Classes, React components, TypeScript
            types
          </li>
          <li>
            <strong>snake_case:</strong> Python variables, PostgreSQL columns
          </li>
          <li>
            <strong>kebab-case:</strong> URLs, HTML attributes, CSS custom
            properties
          </li>
          <li>
            <strong>SCREAMING_SNAKE_CASE:</strong> Environment variables and
            constants
          </li>
        </ul>
      </section>

      <section className="space-y-2">
        <h3 className="font-semibold">Tips</h3>
        <ul className="list-disc space-y-1 text-muted-foreground pl-5">
          <li>Stay consistent with the language or framework conventions.</li>
          <li>
            Prefer ASCII-only names for portability across tools and shells.
          </li>
          <li>Use descriptive words; avoid unclear abbreviations.</li>
          <li>
            For APIs, match the casing clients expect (REST vs. GraphQL vs.
            gRPC).
          </li>
          <li>
            Normalize whitespace before converting to avoid double separators.
          </li>
        </ul>
      </section>
    </KnowledgeSection>
  )
}
