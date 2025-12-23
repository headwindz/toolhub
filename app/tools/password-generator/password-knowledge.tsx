import { KnowledgeSection } from "@/components/knowledge-section";

export function PasswordKnowledge() {
  return (
    <KnowledgeSection
      title="Learn about password security"
      description="Best practices for strong passwords"
    >
      <div className="space-y-2">
        <h4 className="font-semibold text-base">Why Strong Passwords Matter</h4>
        <p className="text-muted-foreground">
          Weak passwords are the leading cause of security breaches. A strong
          password acts as your first line of defense against unauthorized
          access to your accounts, protecting your personal information,
          financial data, and digital identity.
        </p>
      </div>
      <div className="space-y-2">
        <h4 className="font-semibold text-base">
          Characteristics of Strong Passwords
        </h4>
        <ul className="list-disc space-y-1 text-muted-foreground pl-5">
          <li>
            <strong>Length:</strong> At least 16 characters (longer is better)
          </li>
          <li>
            <strong>Complexity:</strong> Mix of uppercase, lowercase, numbers,
            and symbols
          </li>
          <li>
            <strong>Unpredictability:</strong> Avoid dictionary words, personal
            information, or patterns
          </li>
          <li>
            <strong>Uniqueness:</strong> Never reuse passwords across different
            accounts
          </li>
        </ul>
      </div>
      <div className="space-y-2">
        <h4 className="font-semibold text-base">How Hackers Break Passwords</h4>
        <ul className="list-disc space-y-1 text-muted-foreground pl-5">
          <li>
            <strong>Brute Force:</strong> Trying every possible combination
          </li>
          <li>
            <strong>Dictionary Attacks:</strong> Using common words and phrases
          </li>
          <li>
            <strong>Rainbow Tables:</strong> Pre-computed hashes of common
            passwords
          </li>
          <li>
            <strong>Social Engineering:</strong> Guessing based on personal
            information
          </li>
        </ul>
      </div>
      <div className="border rounded-lg bg-green-500/10 border-green-500/50 p-4">
        <h4 className="font-semibold text-base mb-2 text-green-900 dark:text-green-100">
          💡 Pro Tips
        </h4>
        <ul className="list-disc space-y-1 text-sm pl-5 text-green-900/80 dark:text-green-100/80">
          <li>Use a password manager to store unique passwords securely</li>
          <li>Enable two-factor authentication (2FA) whenever possible</li>
          <li>Change passwords immediately if you suspect a breach</li>
          <li>Never share passwords via email or text message</li>
        </ul>
      </div>
    </KnowledgeSection>
  );
}
