import { KnowledgeSection } from "@/components/knowledge-section";

export function ContrastKnowledge() {
  return (
    <KnowledgeSection
      title="Learn about contrast"
      description="WCAG thresholds, large text rules, and practical tips"
    >
      <div className="space-y-2">
        <h3 className="font-semibold text-base">WCAG basics</h3>
        <ul className="list-disc space-y-1 text-muted-foreground pl-5">
          <li>
            Contrast ratio ranges from 1:1 (same color) to 21:1 (black on
            white).
          </li>
          <li>AA normal text: ≥ 4.5:1. AAA normal text: ≥ 7:1.</li>
          <li>
            AA large text: ≥ 3:1. AAA large text: ≥ 4.5:1. Large = 18pt regular
            or 14pt bold.
          </li>
        </ul>
      </div>
      <div className="space-y-2">
        <h3 className="font-semibold text-base">Practical tips</h3>
        <ul className="list-disc space-y-1 text-muted-foreground pl-5">
          <li>
            Avoid pure black on white; slightly softer pairs reduce eye strain.
          </li>
          <li>
            Test states: focus rings, hovers, disabled, and text over images.
          </li>
          <li>
            Increase font size or weight if you cannot change brand colors.
          </li>
        </ul>
      </div>
      <div className="space-y-2">
        <h3 className="font-semibold text-base">Common pitfalls</h3>
        <ul className="list-disc space-y-1 text-muted-foreground pl-5">
          <li>
            Light text on gradients can fail in some areas; pick the
            darkest/lightest stop for testing.
          </li>
          <li>
            Low-contrast placeholder text harms usability—treat it as body text.
          </li>
          <li>
            Remember transparent overlays: opacity changes the effective
            background.
          </li>
        </ul>
      </div>
    </KnowledgeSection>
  );
}
