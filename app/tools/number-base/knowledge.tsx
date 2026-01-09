import { KnowledgeSection } from "@/components/knowledge-section";

export function NumberBaseKnowledge() {
  return (
    <KnowledgeSection
      title="About Number Base Converter"
      description="Convert numbers between different numeral systems instantly"
    >
      <div className="space-y-4 text-sm">
        <div>
          <h3 className="font-semibold text-base mb-2">
            What are Number Bases?
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            Number bases (or radixes) are different ways to represent numbers.
            The most common bases in computing are binary (base 2), octal (base
            8), decimal (base 10), and hexadecimal (base 16). Each base uses a
            different set of digits to represent values.
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-base mb-2">Number Systems</h3>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>
              <strong className="text-foreground">Binary (Base 2):</strong> Uses
              only 0 and 1. Fundamental to computer systems and digital
              electronics.
            </li>
            <li>
              <strong className="text-foreground">Octal (Base 8):</strong> Uses
              digits 0-7. Commonly used in Unix file permissions.
            </li>
            <li>
              <strong className="text-foreground">Decimal (Base 10):</strong>{" "}
              Uses digits 0-9. The standard number system humans use daily.
            </li>
            <li>
              <strong className="text-foreground">
                Hexadecimal (Base 16):
              </strong>{" "}
              Uses 0-9 and A-F. Widely used in programming, colors, and memory
              addresses.
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-base mb-2">How to Use</h3>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li>Enter a number in any of the four input fields</li>
            <li>The tool automatically converts to all other bases</li>
            <li>Click the copy button to copy any result</li>
            <li>Use "Example" to load a sample conversion</li>
            <li>Use "Clear" to reset all fields</li>
          </ol>
        </div>

        <div>
          <h3 className="font-semibold text-base mb-2">Common Use Cases</h3>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>Converting color codes (hex to decimal)</li>
            <li>Understanding binary representation of numbers</li>
            <li>Working with Unix file permissions (octal)</li>
            <li>Memory address calculations</li>
            <li>Network subnet masks and IP addresses</li>
            <li>Programming and debugging</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-base mb-2">Examples</h3>
          <div className="space-y-2 text-muted-foreground">
            <div className="p-3 rounded bg-muted/50 border">
              <p className="font-mono text-xs">
                Decimal 255 = Binary 11111111 = Octal 377 = Hex FF
              </p>
            </div>
            <div className="p-3 rounded bg-muted/50 border">
              <p className="font-mono text-xs">
                Decimal 64 = Binary 1000000 = Octal 100 = Hex 40
              </p>
            </div>
          </div>
        </div>
      </div>
    </KnowledgeSection>
  );
}
