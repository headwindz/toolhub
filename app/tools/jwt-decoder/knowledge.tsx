import { KnowledgeSection } from "@/components/knowledge-section";

export function JwtKnowledge() {
  return (
    <KnowledgeSection
      title="About JSON Web Tokens (JWT)"
      description="Learn how JWTs work and their security implications"
    >
      <section>
        <h3 className="font-semibold mb-2">What is a JWT?</h3>
        <p className="text-muted-foreground">
          A JSON Web Token (JWT) is a compact, URL-safe means of representing
          claims to be transferred between two parties. JWTs are commonly used
          for authentication and information exchange in web applications.
        </p>
      </section>

      <section>
        <h3 className="font-semibold mb-2">JWT Structure</h3>
        <p className="text-muted-foreground mb-2">
          A JWT consists of three parts separated by dots (.):
        </p>
        <ul className="space-y-2 text-muted-foreground">
          <li>
            <strong className="text-foreground">Header:</strong> Contains the
            token type (JWT) and signing algorithm (e.g., HS256, RS256)
          </li>
          <li>
            <strong className="text-foreground">Payload:</strong> Contains the
            claims - statements about the user and additional metadata
          </li>
          <li>
            <strong className="text-foreground">Signature:</strong> Ensures the
            token hasn't been tampered with, created using the header, payload,
            and a secret key
          </li>
        </ul>
      </section>

      <section>
        <h3 className="font-semibold mb-2">Standard Claims</h3>
        <ul className="space-y-2 text-muted-foreground">
          <li>
            <strong className="text-foreground">iss (Issuer):</strong> Who
            created and signed the token
          </li>
          <li>
            <strong className="text-foreground">sub (Subject):</strong> The
            subject of the token (usually user ID)
          </li>
          <li>
            <strong className="text-foreground">aud (Audience):</strong> Who the
            token is intended for
          </li>
          <li>
            <strong className="text-foreground">exp (Expiration):</strong> When
            the token expires (Unix timestamp)
          </li>
          <li>
            <strong className="text-foreground">iat (Issued At):</strong> When
            the token was created (Unix timestamp)
          </li>
          <li>
            <strong className="text-foreground">nbf (Not Before):</strong> Token
            is not valid before this time
          </li>
        </ul>
      </section>

      <section>
        <h3 className="font-semibold mb-2">Common Use Cases</h3>
        <ul className="space-y-2 text-muted-foreground">
          <li>
            <strong className="text-foreground">Authentication:</strong> After
            login, the server issues a JWT that the client includes in
            subsequent requests
          </li>
          <li>
            <strong className="text-foreground">Information Exchange:</strong>{" "}
            Securely transmit information between parties with verification of
            the sender
          </li>
          <li>
            <strong className="text-foreground">Single Sign-On (SSO):</strong>{" "}
            Share authentication across multiple applications
          </li>
          <li>
            <strong className="text-foreground">API Authorization:</strong>{" "}
            Grant access to protected resources
          </li>
        </ul>
      </section>

      <section>
        <h3 className="font-semibold mb-2">Security Considerations</h3>
        <ul className="space-y-2 text-muted-foreground">
          <li>
            • JWTs are encoded, not encrypted - don't store sensitive data in
            the payload
          </li>
          <li>
            • Always verify the signature on the server side before trusting the
            token
          </li>
          <li>• Use HTTPS to prevent token interception</li>
          <li>• Set appropriate expiration times to limit token lifetime</li>
          <li>
            • Store tokens securely (avoid localStorage for sensitive apps)
          </li>
          <li>
            • This decoder only decodes tokens - it cannot verify signatures
            without the secret
          </li>
        </ul>
      </section>

      <section>
        <h3 className="font-semibold mb-2">Signing Algorithms</h3>
        <ul className="space-y-2 text-muted-foreground">
          <li>
            <strong className="text-foreground">HS256:</strong> HMAC with
            SHA-256 (symmetric key)
          </li>
          <li>
            <strong className="text-foreground">RS256:</strong> RSA with SHA-256
            (asymmetric key pair)
          </li>
          <li>
            <strong className="text-foreground">ES256:</strong> ECDSA with
            SHA-256 (asymmetric key pair)
          </li>
        </ul>
      </section>
    </KnowledgeSection>
  );
}
