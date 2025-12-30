'use client'

import { KnowledgeSection } from '@/components/knowledge-section'

export function HashKnowledge() {
  return (
    <KnowledgeSection
      title="Learn about hashing"
      description="Basics, algorithms, and security notes"
    >
      <div className="space-y-2">
        <h3 className="font-semibold text-base">What is a hash?</h3>
        <p className="text-muted-foreground">
          A cryptographic hash is a one-way function that converts data of any
          size into a fixed-length digest. Hashing is{' '}
          <strong>irreversible</strong> — you cannot recover the original data
          from a hash. Good hashes are deterministic, fast to compute,
          infeasible to invert, and resistant to collisions.
        </p>
      </div>
      <div className="space-y-2">
        <h3 className="font-semibold text-base">Common algorithms</h3>
        <ul className="list-disc space-y-1 text-muted-foreground pl-5">
          <li>
            <strong>SHA-1:</strong> 160-bit output, considered broken for
            collision resistance.
          </li>
          <li>
            <strong>SHA-256 / SHA-512:</strong> Modern choices from the SHA-2
            family, widely recommended.
          </li>
          <li>
            <strong>MD5:</strong> 128-bit output, broken — avoid for security
            uses.
          </li>
        </ul>
      </div>
      <div className="space-y-2">
        <h3 className="font-semibold text-base">Use cases</h3>
        <ul className="list-disc space-y-1 text-muted-foreground pl-5">
          <li>File integrity checks and content addressing.</li>
          <li>Digital signatures (used within higher-level constructions).</li>
          <li>
            Message authentication with <strong>HMAC</strong> (hash + secret
            key).
          </li>
        </ul>
      </div>
      <div className="space-y-2">
        <h3 className="font-semibold text-base">Security tips</h3>
        <ul className="list-disc space-y-1 text-muted-foreground pl-5">
          <li>
            Do <strong>not</strong> store passwords with plain hashes — use
            Argon2, scrypt, or bcrypt.
          </li>
          <li>
            Prefer SHA-256/512 for general hashing; avoid MD5 and SHA-1 for new
            systems.
          </li>
          <li>
            Use HMAC for authenticity (hash alone does not authenticate data).
          </li>
        </ul>
      </div>

      <div className="space-y-2">
        <h3 className="font-semibold text-base">Web3 & crypto</h3>
        <ul className="list-disc space-y-1 text-muted-foreground pl-5">
          <li>
            <strong>Ethereum:</strong> Uses <em>Keccak‑256</em> (often called
            <em> keccak256</em>), which differs slightly from standardized
            SHA‑3. Addresses are the last 20 bytes of{' '}
            <code>keccak256(publicKey)</code>. Checksum casing per{' '}
            <strong>EIP‑55</strong>.
          </li>
          <li>
            <strong>Bitcoin:</strong> Block/Tx IDs use <em>double SHA‑256</em>.
            Legacy addresses use <em>HASH160</em> = RIPEMD‑160(SHA‑256(pubkey)),
            then Base58Check with a 4‑byte checksum.
          </li>
          <li>
            <strong>Merkle trees:</strong> Transactions are hashed pairwise up a
            tree to a <em>merkle root</em> stored in the block header. Proofs
            allow light clients to verify inclusion.
          </li>
          <li>
            <strong>Proof‑of‑Work:</strong> Miners vary a nonce so
            <code>hash(blockHeader)</code> is below a target (difficulty). Lower
            targets require more work.
          </li>
          <li>
            <strong>Signatures:</strong> Ethereum uses secp256k1 ECDSA and
            recovers signer via <code>ecrecover</code>. Prefer domain‑separated
            messages (<strong>EIP‑191</strong>) or typed data (
            <strong>EIP‑712</strong>).
          </li>
          <li>
            <strong>Smart contracts:</strong> Hash with
            <code> keccak256(abi.encode(...))</code> for type‑safety; avoid
            <code> abi.encodePacked(...)</code> with concatenated dynamic types
            due to potential collision ambiguities.
          </li>
          <li>
            <strong>In the browser:</strong> WebCrypto supports SHA‑2 (e.g.,
            SHA‑256/512) but <em>not</em> Keccak‑256. Use a library (e.g.,
            <em>ethers</em> or <em>js‑sha3</em>) for <code>keccak256</code>.
          </li>
        </ul>
      </div>
    </KnowledgeSection>
  )
}
