import { KnowledgeSection } from "@/components/knowledge-section";

export function ColorKnowledge() {
  return (
    <KnowledgeSection
      title="Learn about color"
      description="Models, contrast, and accessibility basics"
    >
      <div className="space-y-2">
        <h3 className="font-semibold text-base">Color models</h3>
        <ul className="list-disc space-y-1 text-muted-foreground pl-5">
          <li>
            <strong>HEX:</strong> Hexadecimal RGB shorthand for web colors (e.g.{" "}
            <span className="font-mono">#8B5CF6</span>).
          </li>
          <li>
            <strong>RGB:</strong> Additive color model using red, green, blue
            (0–255).
          </li>
          <li>
            <strong>HSL:</strong> Hue (0–360), Saturation %, Lightness % — great
            for tweaking UI palettes.
          </li>
        </ul>
      </div>
      <div className="space-y-2">
        <h3 className="font-semibold text-base">Contrast & accessibility</h3>
        <p className="text-muted-foreground">
          Aim for WCAG AA/AAA contrast ratios (4.5:1 or 7:1 for normal text).
          High contrast improves readability across devices and lighting
          conditions.
        </p>
      </div>
      <div className="space-y-2">
        <h3 className="font-semibold text-base">Palette tips</h3>
        <ul className="list-disc space-y-1 text-muted-foreground pl-5">
          <li>Build a neutral gray scale first, then add semantic colors.</li>
          <li>
            Use HSL to create consistent light/dark variants by adjusting
            lightness.
          </li>
          <li>Test colors in both light and dark themes.</li>
        </ul>
      </div>
    </KnowledgeSection>
  );
}
