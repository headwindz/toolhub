import { KnowledgeSection } from '@/components/knowledge-section'

export function WordCountKnowledge() {
  return (
    <KnowledgeSection
      title="About Word Counter"
      description="Learn how word counting works and its applications"
    >
      <section>
        <h3 className="font-semibold mb-2">What is word counting?</h3>
        <p className="text-muted-foreground">
          Word counting is the process of calculating the number of words,
          characters, sentences, and other text metrics in a document. It's
          essential for writers, students, and professionals who need to meet
          specific length requirements or analyze text composition.
        </p>
      </section>

      <section>
        <h3 className="font-semibold mb-2">Key metrics explained</h3>
        <ul className="space-y-2 text-muted-foreground">
          <li>
            <strong className="text-foreground">Words:</strong> text segments
            separated by spaces or punctuation
          </li>
          <li>
            <strong className="text-foreground">Characters:</strong> total
            number of letters, numbers, punctuation, and spaces
          </li>
          <li>
            <strong className="text-foreground">Characters (no spaces):</strong>{' '}
            Character count excluding whitespace
          </li>
          <li>
            <strong className="text-foreground">Sentences:</strong> text
            segments ending with period, question mark, or exclamation point
          </li>
          <li>
            <strong className="text-foreground">Paragraphs:</strong> text blocks
            separated by blank lines
          </li>
          <li>
            <strong className="text-foreground">Reading time:</strong> Estimated
            time based on 200 words per minute (average reading speed)
          </li>
          <li>
            <strong className="text-foreground">Speaking time:</strong>{' '}
            Estimated time based on 130 words per minute (average speaking
            speed)
          </li>
        </ul>
      </section>

      <section>
        <h3 className="font-semibold mb-2">Common use cases</h3>
        <ul className="space-y-2 text-muted-foreground">
          <li>
            <strong className="text-foreground">Academic writing:</strong> Meet
            essay and thesis word count requirements
          </li>
          <li>
            <strong className="text-foreground">Content creation:</strong>{' '}
            Optimize blog posts and articles for SEO
          </li>
          <li>
            <strong className="text-foreground">Social media:</strong> Stay
            within platform character limits
          </li>
          <li>
            <strong className="text-foreground">Professional writing:</strong>{' '}
            Ensure reports and proposals meet specifications
          </li>
          <li>
            <strong className="text-foreground">Speech preparation:</strong>{' '}
            Estimate presentation duration
          </li>
        </ul>
      </section>

      <section>
        <h3 className="font-semibold mb-2">Tips for effective writing</h3>
        <ul className="space-y-2 text-muted-foreground">
          <li>• Aim for clear, concise sentences (15-20 words average)</li>
          <li>• Use varied sentence lengths to maintain reader interest</li>
          <li>• Break long paragraphs into smaller chunks for readability</li>
          <li>• Consider your audience and adjust complexity accordingly</li>
          <li>
            • Use reading time estimates to gauge content consumption duration
          </li>
        </ul>
      </section>
    </KnowledgeSection>
  )
}
