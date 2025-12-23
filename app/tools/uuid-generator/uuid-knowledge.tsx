import { KnowledgeSection } from "@/components/knowledge-section";

export function UUIDKnowledge() {
  return (
    <KnowledgeSection
      title="Learn about UUIDs"
      description="What they are and when to use them"
    >
      <div className="space-y-2">
        <h3 className="font-semibold text-base">Format</h3>
        <p className="text-muted-foreground">
          UUIDs are 128-bit identifiers, commonly shown as 36 characters with
          hyphens (8-4-4-4-12), e.g.{" "}
          <span className="font-mono">
            123e4567-e89b-12d3-a456-426614174000
          </span>
          .
        </p>
      </div>
      <div className="space-y-2">
        <h3 className="font-semibold text-base">Versions</h3>
        <ul className="list-disc space-y-1 text-muted-foreground pl-5">
          <li>
            <strong>v1:</strong> time-based + MAC address (can leak host info).
          </li>
          <li>
            <strong>v2:</strong> DCE Security (rare, embeds POSIX UID/GID;
            mostly legacy).
          </li>
          <li>
            <strong>v3:</strong> data-based using MD5 hash (deterministic).
          </li>
          <li>
            <strong>v4:</strong> random-based (most common, good default).
          </li>
          <li>
            <strong>v5:</strong> data-based using SHA-1 hash (deterministic,
            preferred over v3).
          </li>
          <li>
            <strong>v6:</strong> reordered time-based for better sorting
            (draft/spec evolution).
          </li>
          <li>
            <strong>v7:</strong> Unix-time plus randomness; great for ordered
            storage.
          </li>
          <li>
            <strong>v8:</strong> custom format for app-specific structured
            randomness.
          </li>
        </ul>
      </div>
      <div className="space-y-2">
        <h3 className="font-semibold text-base">Best practices</h3>
        <ul className="list-disc space-y-1 text-muted-foreground pl-5">
          <li>
            Use v4 for general randomness; v7 for write-heavy ordered storage.
          </li>
          <li>Avoid v1 if you need to hide host/time details.</li>
          <li>
            Do not treat UUIDs as secrets; they are unique, not random tokens.
          </li>
        </ul>
      </div>
    </KnowledgeSection>
  );
}
