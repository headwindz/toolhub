import { KnowledgeSection } from '@/components/knowledge-section'

export function SvgPreviewKnowledge() {
  return (
    <KnowledgeSection
      title="Learn about SVG"
      description="Understanding Scalable Vector Graphics"
    >
      <div className="space-y-2">
        <h4 className="font-semibold text-base">
          What is SVG (Scalable Vector Graphics)?
        </h4>
        <p className="text-muted-foreground">
          SVG is an XML-based vector image format for two-dimensional graphics.
          Unlike raster images (PNG, JPG), SVG images are defined by
          mathematical equations rather than pixels, which means they can be
          scaled to any size without losing quality. SVG files are text-based,
          making them easy to create, edit, and integrate with web technologies.
        </p>
      </div>
      <div className="space-y-2">
        <h4 className="font-semibold text-base">Key Features</h4>
        <ul className="list-disc space-y-1 text-muted-foreground pl-5">
          <li>
            <strong>Scalability:</strong> Can be scaled to any size without
            quality loss
          </li>
          <li>
            <strong>Small File Size:</strong> Often smaller than raster images
          </li>
          <li>
            <strong>Editable:</strong> Can be edited with text editors or design
            software
          </li>
          <li>
            <strong>CSS & JavaScript:</strong> Supports styling and animations
          </li>
          <li>
            <strong>Accessibility:</strong> Text in SVG is searchable and
            screen-reader friendly
          </li>
          <li>
            <strong>SEO Friendly:</strong> Search engines can read SVG content
          </li>
        </ul>
      </div>
      <div className="space-y-2">
        <h4 className="font-semibold text-base">Common Use Cases</h4>
        <ul className="list-disc space-y-1 text-muted-foreground pl-5">
          <li>
            <strong>Logos and Icons:</strong> Perfect for responsive brand
            assets
          </li>
          <li>
            <strong>Illustrations:</strong> Vector artwork that scales
            beautifully
          </li>
          <li>
            <strong>Data Visualization:</strong> Charts, graphs, and
            infographics
          </li>
          <li>
            <strong>UI Elements:</strong> Buttons, shapes, and interface
            components
          </li>
          <li>
            <strong>Animations:</strong> Create smooth, scalable animations
          </li>
          <li>
            <strong>Maps:</strong> Interactive and zoomable geographic displays
          </li>
        </ul>
      </div>
      <div className="space-y-2">
        <h4 className="font-semibold text-base">Basic SVG Structure</h4>
        <pre className="bg-muted rounded-lg p-4 overflow-x-auto text-sm">
          <code>{`<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
  <circle cx="50" cy="50" r="40" fill="blue" />
  <rect x="10" y="10" width="30" height="30" fill="red" />
  <text x="50" y="90" text-anchor="middle">Hello SVG</text>
</svg>`}</code>
        </pre>
      </div>
      <div className="space-y-2">
        <h4 className="font-semibold text-base">Tips for Working with SVG</h4>
        <ul className="list-disc space-y-1 text-muted-foreground pl-5">
          <li>
            <strong>Optimize:</strong> Use tools to remove unnecessary metadata
            and code
          </li>
          <li>
            <strong>ViewBox:</strong> Use viewBox attribute for responsive
            scaling
          </li>
          <li>
            <strong>Paths:</strong> Simplify complex paths to reduce file size
          </li>
          <li>
            <strong>Groups:</strong> Use &lt;g&gt; tags to organize and
            manipulate elements
          </li>
          <li>
            <strong>Colors:</strong> Use CSS classes for easy theming
          </li>
          <li>
            <strong>Accessibility:</strong> Add title and desc elements for
            screen readers
          </li>
        </ul>
      </div>
      <div className="border rounded-lg bg-blue-500/10 border-blue-500/50 p-4">
        <h4 className="font-semibold text-base mb-2 text-blue-900 dark:text-blue-100">
          💡 Tool Features
        </h4>
        <ul className="list-disc space-y-1 text-sm pl-5 text-blue-900/80 dark:text-blue-100/80">
          <li>Real-time preview as you edit SVG code</li>
          <li>Zoom controls to inspect details</li>
          <li>Change background color to test transparency</li>
          <li>Export as PNG for use in other applications</li>
          <li>All processing happens in your browser - no uploads</li>
        </ul>
      </div>
    </KnowledgeSection>
  )
}
