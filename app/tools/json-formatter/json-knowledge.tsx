import { KnowledgeSection } from "@/components/knowledge-section";

export function JSONKnowledge() {
  return (
    <KnowledgeSection
      title="Learn About JSON"
      description="Understanding JSON data format"
    >
      <div className="space-y-2">
        <h4 className="font-semibold text-base">What is JSON?</h4>
        <p className="text-muted-foreground">
          JSON (JavaScript Object Notation) is a lightweight data-interchange
          format that's easy for humans to read and write, and easy for machines
          to parse and generate. It's based on a subset of JavaScript but is
          language-independent.
        </p>
      </div>
      <div className="space-y-2">
        <h4 className="font-semibold text-base">JSON Data Types</h4>
        <ul className="list-disc space-y-1 text-muted-foreground pl-5">
          <li>
            <strong>Object:</strong> Unordered collection of key-value pairs
            enclosed in curly braces{" "}
            <code className="bg-muted rounded px-1">{`{ }`}</code>
          </li>
          <li>
            <strong>Array:</strong> Ordered list of values enclosed in square
            brackets <code className="bg-muted rounded px-1">[ ]</code>
          </li>
          <li>
            <strong>String:</strong> Text enclosed in double quotes{" "}
            <code className="bg-muted rounded px-1">"text"</code>
          </li>
          <li>
            <strong>Number:</strong> Integer or floating-point{" "}
            <code className="bg-muted rounded px-1">42</code> or{" "}
            <code className="bg-muted rounded px-1">3.14</code>
          </li>
          <li>
            <strong>Boolean:</strong> True or false values{" "}
            <code className="bg-muted rounded px-1">true</code> /{" "}
            <code className="bg-muted rounded px-1">false</code>
          </li>
          <li>
            <strong>Null:</strong> Represents empty value{" "}
            <code className="bg-muted rounded px-1">null</code>
          </li>
        </ul>
      </div>
      <div className="space-y-2">
        <h4 className="font-semibold text-base">Why Format JSON?</h4>
        <ul className="list-disc space-y-1 text-muted-foreground pl-5">
          <li>
            <strong>Readability:</strong> Properly indented JSON is much easier
            to read and understand
          </li>
          <li>
            <strong>Debugging:</strong> Formatted JSON helps identify structure
            issues quickly
          </li>
          <li>
            <strong>Validation:</strong> Formatting tools can detect syntax
            errors
          </li>
          <li>
            <strong>Minification:</strong> Removing whitespace reduces file size
            for production
          </li>
        </ul>
      </div>
      <div className="border rounded-lg bg-muted/50 p-4">
        <h4 className="font-semibold text-base mb-2">Example JSON Structure</h4>
        <pre className="bg-background rounded text-xs p-3 overflow-x-auto">
          <code>{`{
  "user": {
    "name": "John Doe",
    "age": 30,
    "email": "john@example.com",
    "hobbies": ["reading", "coding", "hiking"],
    "active": true
  }
}`}</code>
        </pre>
      </div>
    </KnowledgeSection>
  );
}
