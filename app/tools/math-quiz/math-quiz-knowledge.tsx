import { KnowledgeSection } from "@/components/knowledge-section";

export function MathQuizKnowledge() {
  return (
    <KnowledgeSection
      title="Learn about mental math"
      description="Tips for improving calculation speed and accuracy"
    >
      <div className="space-y-2">
        <h4 className="font-semibold text-base">Benefits of Mental Math</h4>
        <p className="text-muted-foreground">
          Mental math improves number sense, strengthens memory, and builds
          confidence with calculations. Regular practice helps you solve
          problems faster and develop mathematical intuition.
        </p>
      </div>
      <div className="space-y-2">
        <h4 className="font-semibold text-base">Practice Strategies</h4>
        <ul className="list-disc space-y-1 text-muted-foreground pl-5">
          <li>
            <strong>Start small:</strong> Begin with 1-digit operations and
            gradually increase difficulty.
          </li>
          <li>
            <strong>Break it down:</strong> For larger numbers, break them into
            smaller chunks you can manage.
          </li>
          <li>
            <strong>Use shortcuts:</strong> Learn tricks like multiplying by 11
            or squaring numbers ending in 5.
          </li>
          <li>
            <strong>Consistent practice:</strong> Regular short sessions are
            more effective than occasional long ones.
          </li>
        </ul>
      </div>
      <div className="space-y-2">
        <h4 className="font-semibold text-base">Operation-Specific Tips</h4>
        <ul className="list-disc space-y-1 text-muted-foreground pl-5">
          <li>
            <strong>Addition:</strong> Group numbers into tens or use round
            numbers as anchors.
          </li>
          <li>
            <strong>Subtraction:</strong> Count up from the smaller number
            instead of subtracting down.
          </li>
          <li>
            <strong>Multiplication:</strong> Use the distributive property to
            break numbers apart.
          </li>
          <li>
            <strong>Division:</strong> Recognize factors and use multiplication
            facts in reverse.
          </li>
        </ul>
      </div>
    </KnowledgeSection>
  );
}
