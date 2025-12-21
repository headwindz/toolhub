export function Base64Knowledge() {
  return (
    <div className="space-y-4 text-sm leading-relaxed p-6">
      <div>
        <h4 className="font-semibold text-base mb-2">What is Base64?</h4>
        <p className="text-muted-foreground">
          Base64 is a binary-to-text encoding scheme that represents binary data
          in an ASCII string format. It uses 64 different ASCII characters (A-Z,
          a-z, 0-9, +, /) to encode data, making it safe to transmit over
          text-based protocols like HTTP, email, or JSON.
        </p>
      </div>
      <div>
        <h4 className="font-semibold text-base mb-2">How It Works</h4>
        <p className="text-muted-foreground">
          Base64 encoding converts every 3 bytes (24 bits) of binary data into 4
          ASCII characters (6 bits each). If the input length isn't divisible by
          3, padding characters (=) are added at the end. This results in the
          encoded output being approximately 33% larger than the original data.
        </p>
      </div>
      <div>
        <h4 className="font-semibold text-base mb-2">Common Use Cases</h4>
        <ul className="list-disc space-y-1 text-muted-foreground pl-5">
          <li>
            <strong>Email Attachments:</strong> MIME encoding uses Base64 to
            send binary files via email.
          </li>
          <li>
            <strong>Data URIs:</strong> Embed images and files directly in HTML,
            CSS, or JSON (e.g., data:image/png;base64,...).
          </li>
          <li>
            <strong>API Tokens:</strong> Encode credentials and tokens for HTTP
            Basic Authentication.
          </li>
          <li>
            <strong>Data Transfer:</strong> Transmit binary data over text-only
            protocols like XML or JSON.
          </li>
        </ul>
      </div>
      <div>
        <h4 className="font-semibold text-base mb-2">Important Notes</h4>
        <p className="text-muted-foreground">
          Base64 is <strong>not encryption</strong>—it's encoding. Anyone can
          easily decode Base64 strings, so never use it to hide sensitive
          information. It's designed for data integrity and compatibility, not
          security. For secure data transmission, use proper encryption methods
          like AES or TLS.
        </p>
      </div>
    </div>
  );
}
