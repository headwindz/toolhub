'use client'

import { KnowledgeSection } from '@/components/knowledge-section'

export function RegexTesterKnowledge() {
  return (
    <KnowledgeSection
      title="Regular Expression Quick Reference"
      description="Essential regex patterns and syntax for testing and debugging"
    >
      <section className="space-y-2">
        <h3 className="font-semibold">Common Patterns</h3>
        <ul className="list-disc space-y-1 text-muted-foreground pl-5">
          <li>
            <strong>Email:</strong>{' '}
            <code className="text-xs">
              \b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{`{2,}`}\b
            </code>
          </li>
          <li>
            <strong>URL:</strong>{' '}
            <code className="text-xs">
              https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{`{1,256}`}
              \.[a-zA-Z0-9()]{`{1,6}`}\b
            </code>
          </li>
          <li>
            <strong>Phone (US):</strong>{' '}
            <code className="text-xs">
              \(?\d{`{3}`}\)?[-.\s]?\d{`{3}`}[-.\s]?\d{`{4}`}
            </code>
          </li>
          <li>
            <strong>Date (YYYY-MM-DD):</strong>{' '}
            <code className="text-xs">
              \d{`{4}`}-\d{`{2}`}-\d{`{2}`}
            </code>
          </li>
          <li>
            <strong>IP Address:</strong>{' '}
            <code className="text-xs">
              \b\d{`{1,3}`}\.\d{`{1,3}`}\.\d{`{1,3}`}\.\d{`{1,3}`}\b
            </code>
          </li>
          <li>
            <strong>Hex Color:</strong>{' '}
            <code className="text-xs">
              #?([a-fA-F0-9]{`{6}`}|[a-fA-F0-9]{`{3}`})
            </code>
          </li>
        </ul>
      </section>

      <section className="space-y-2">
        <h3 className="font-semibold">Character Classes</h3>
        <ul className="list-disc space-y-1 text-muted-foreground pl-5">
          <li>
            <code>.</code> - Any character except newline
          </li>
          <li>
            <code>\d</code> - Digit (0-9)
          </li>
          <li>
            <code>\w</code> - Word character (a-z, A-Z, 0-9, _)
          </li>
          <li>
            <code>\s</code> - Whitespace (space, tab, newline)
          </li>
          <li>
            <code>\D</code>, <code>\W</code>, <code>\S</code> - Negated versions
          </li>
          <li>
            <code>[abc]</code> - Any of a, b, or c
          </li>
          <li>
            <code>[^abc]</code> - Not a, b, or c
          </li>
          <li>
            <code>[a-z]</code> - Character range
          </li>
        </ul>
      </section>

      <section className="space-y-2">
        <h3 className="font-semibold">Quantifiers</h3>
        <ul className="list-disc space-y-1 text-muted-foreground pl-5">
          <li>
            <code>*</code> - 0 or more times
          </li>
          <li>
            <code>+</code> - 1 or more times
          </li>
          <li>
            <code>?</code> - 0 or 1 time (optional)
          </li>
          <li>
            <code>{`{n}`}</code> - Exactly n times
          </li>
          <li>
            <code>{`{n,}`}</code> - n or more times
          </li>
          <li>
            <code>{`{n,m}`}</code> - Between n and m times
          </li>
          <li>
            Add <code>?</code> after quantifier for non-greedy matching
          </li>
        </ul>
      </section>

      <section className="space-y-2">
        <h3 className="font-semibold">Anchors & Boundaries</h3>
        <ul className="list-disc space-y-1 text-muted-foreground pl-5">
          <li>
            <code>^</code> - Start of string/line
          </li>
          <li>
            <code>$</code> - End of string/line
          </li>
          <li>
            <code>\b</code> - Word boundary
          </li>
          <li>
            <code>\B</code> - Not a word boundary
          </li>
        </ul>
      </section>

      <section className="space-y-2">
        <h3 className="font-semibold">Groups & Lookaround</h3>
        <ul className="list-disc space-y-1 text-muted-foreground pl-5">
          <li>
            <code>(abc)</code> - Capturing group
          </li>
          <li>
            <code>(?:abc)</code> - Non-capturing group
          </li>
          <li>
            <code>(?=abc)</code> - Positive lookahead
          </li>
          <li>
            <code>(?!abc)</code> - Negative lookahead
          </li>
          <li>
            <code>(?{`<=`}abc)</code> - Positive lookbehind
          </li>
          <li>
            <code>(?{`<!`}abc)</code> - Negative lookbehind
          </li>
          <li>
            <code>|</code> - Alternation (OR)
          </li>
        </ul>
      </section>

      <section className="space-y-2">
        <h3 className="font-semibold">Tips</h3>
        <ul className="list-disc space-y-1 text-muted-foreground pl-5">
          <li>
            Escape special characters with backslash: <code>\.</code>,{' '}
            <code>\*</code>, <code>\?</code>
          </li>
          <li>
            Use the global flag (g) to find all matches, not just the first
          </li>
          <li>
            Test with edge cases: empty strings, special characters, unicode
          </li>
          <li>
            Use raw strings or double backslashes in programming languages
          </li>
          <li>
            Consider performance: avoid nested quantifiers and excessive
            backtracking
          </li>
          <li>Use online regex debuggers to visualize complex patterns</li>
        </ul>
      </section>
    </KnowledgeSection>
  )
}
