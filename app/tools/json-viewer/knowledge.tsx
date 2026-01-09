import { KnowledgeSection } from "@/components/knowledge-section";

export function JSONViewerKnowledge() {
  return (
    <KnowledgeSection
      title="About JSON Viewer"
      description="Explore and visualize JSON data in an interactive tree view with expand/collapse functionality"
    >
      <div className="space-y-4 text-sm">
        <div>
          <h3 className="font-semibold text-base mb-2">What is JSON Viewer?</h3>
          <p className="text-muted-foreground leading-relaxed">
            JSON Viewer is an interactive tool that displays JSON data in a tree
            structure, making it easy to explore and understand complex nested
            data. Click on nodes to expand or collapse them.
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-base mb-2">Key Features</h3>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>
              <strong className="text-foreground">
                Interactive Tree View:
              </strong>{" "}
              Visualize JSON structure with collapsible nodes
            </li>
            <li>
              <strong className="text-foreground">Syntax Highlighting:</strong>{" "}
              Different colors for different data types (strings, numbers,
              booleans)
            </li>
            <li>
              <strong className="text-foreground">Auto-expand:</strong> First 2
              levels automatically expanded for quick overview
            </li>
            <li>
              <strong className="text-foreground">Type Indicators:</strong> See
              array lengths and object key counts at a glance
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-base mb-2">How to Use</h3>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li>Paste your JSON data in the input area</li>
            <li>Click "View Tree" or let it auto-parse</li>
            <li>Click on any node to expand or collapse it</li>
            <li>Use the "Sample" button to load example data</li>
          </ol>
        </div>

        <div>
          <h3 className="font-semibold text-base mb-2">Common Use Cases</h3>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>Exploring API responses</li>
            <li>Debugging configuration files</li>
            <li>Understanding complex data structures</li>
            <li>Validating JSON structure</li>
            <li>Sharing formatted data with team members</li>
          </ul>
        </div>
      </div>
    </KnowledgeSection>
  );
}
