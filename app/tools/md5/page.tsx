"use client"

import { useState } from "react"
import { Hash, Copy, Check, FileText, ChevronDown, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ToolLayout } from "@/components/tool-layout"

export default function MD5Page() {
  const [input, setInput] = useState("")
  const [hash, setHash] = useState("")
  const [copied, setCopied] = useState(false)
  const [isLearnOpen, setIsLearnOpen] = useState(false)

  // Simple MD5 implementation
  const md5 = (str: string): string => {
    const rotateLeft = (lValue: number, iShiftBits: number) => {
      return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits))
    }

    const addUnsigned = (lX: number, lY: number) => {
      const lX8 = lX & 0x80000000
      const lY8 = lY & 0x80000000
      const lX4 = lX & 0x40000000
      const lY4 = lY & 0x40000000
      const lResult = (lX & 0x3fffffff) + (lY & 0x3fffffff)
      if (lX4 & lY4) {
        return lResult ^ 0x80000000 ^ lX8 ^ lY8
      }
      if (lX4 | lY4) {
        if (lResult & 0x40000000) {
          return lResult ^ 0xc0000000 ^ lX8 ^ lY8
        } else {
          return lResult ^ 0x40000000 ^ lX8 ^ lY8
        }
      } else {
        return lResult ^ lX8 ^ lY8
      }
    }

    const F = (x: number, y: number, z: number) => (x & y) | (~x & z)
    const G = (x: number, y: number, z: number) => (x & z) | (y & ~z)
    const H = (x: number, y: number, z: number) => x ^ y ^ z
    const I = (x: number, y: number, z: number) => y ^ (x | ~z)

    const FF = (a: number, b: number, c: number, d: number, x: number, s: number, ac: number) => {
      a = addUnsigned(a, addUnsigned(addUnsigned(F(b, c, d), x), ac))
      return addUnsigned(rotateLeft(a, s), b)
    }

    const GG = (a: number, b: number, c: number, d: number, x: number, s: number, ac: number) => {
      a = addUnsigned(a, addUnsigned(addUnsigned(G(b, c, d), x), ac))
      return addUnsigned(rotateLeft(a, s), b)
    }

    const HH = (a: number, b: number, c: number, d: number, x: number, s: number, ac: number) => {
      a = addUnsigned(a, addUnsigned(addUnsigned(H(b, c, d), x), ac))
      return addUnsigned(rotateLeft(a, s), b)
    }

    const II = (a: number, b: number, c: number, d: number, x: number, s: number, ac: number) => {
      a = addUnsigned(a, addUnsigned(addUnsigned(I(b, c, d), x), ac))
      return addUnsigned(rotateLeft(a, s), b)
    }

    const convertToWordArray = (str: string) => {
      let lWordCount
      const lMessageLength = str.length
      const lNumberOfWords_temp1 = lMessageLength + 8
      const lNumberOfWords_temp2 = (lNumberOfWords_temp1 - (lNumberOfWords_temp1 % 64)) / 64
      const lNumberOfWords = (lNumberOfWords_temp2 + 1) * 16
      const lWordArray = Array(lNumberOfWords - 1)
      let lBytePosition = 0
      let lByteCount = 0
      while (lByteCount < lMessageLength) {
        lWordCount = (lByteCount - (lByteCount % 4)) / 4
        lBytePosition = (lByteCount % 4) * 8
        lWordArray[lWordCount] = lWordArray[lWordCount] | (str.charCodeAt(lByteCount) << lBytePosition)
        lByteCount++
      }
      lWordCount = (lByteCount - (lByteCount % 4)) / 4
      lBytePosition = (lByteCount % 4) * 8
      lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80 << lBytePosition)
      lWordArray[lNumberOfWords - 2] = lMessageLength << 3
      lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29
      return lWordArray
    }

    const wordToHex = (lValue: number) => {
      let wordToHexValue = "",
        wordToHexValue_temp = "",
        lByte,
        lCount
      for (lCount = 0; lCount <= 3; lCount++) {
        lByte = (lValue >>> (lCount * 8)) & 255
        wordToHexValue_temp = "0" + lByte.toString(16)
        wordToHexValue = wordToHexValue + wordToHexValue_temp.substr(wordToHexValue_temp.length - 2, 2)
      }
      return wordToHexValue
    }

    const utf8Encode = (str: string) => {
      str = str.replace(/\r\n/g, "\n")
      let utftext = ""
      for (let n = 0; n < str.length; n++) {
        const c = str.charCodeAt(n)
        if (c < 128) {
          utftext += String.fromCharCode(c)
        } else if (c > 127 && c < 2048) {
          utftext += String.fromCharCode((c >> 6) | 192)
          utftext += String.fromCharCode((c & 63) | 128)
        } else {
          utftext += String.fromCharCode((c >> 12) | 224)
          utftext += String.fromCharCode(((c >> 6) & 63) | 128)
          utftext += String.fromCharCode((c & 63) | 128)
        }
      }
      return utftext
    }

    let x: number[] = []
    let k, AA, BB, CC, DD, a, b, c, d
    const S11 = 7,
      S12 = 12,
      S13 = 17,
      S14 = 22
    const S21 = 5,
      S22 = 9,
      S23 = 14,
      S24 = 20
    const S31 = 4,
      S32 = 11,
      S33 = 16,
      S34 = 23
    const S41 = 6,
      S42 = 10,
      S43 = 15,
      S44 = 21

    str = utf8Encode(str)
    x = convertToWordArray(str)
    a = 0x67452301
    b = 0xefcdab89
    c = 0x98badcfe
    d = 0x10325476

    for (k = 0; k < x.length; k += 16) {
      AA = a
      BB = b
      CC = c
      DD = d
      a = FF(a, b, c, d, x[k + 0], S11, 0xd76aa478)
      d = FF(d, a, b, c, x[k + 1], S12, 0xe8c7b756)
      c = FF(c, d, a, b, x[k + 2], S13, 0x242070db)
      b = FF(b, c, d, a, x[k + 3], S14, 0xc1bdceee)
      a = FF(a, b, c, d, x[k + 4], S11, 0xf57c0faf)
      d = FF(d, a, b, c, x[k + 5], S12, 0x4787c62a)
      c = FF(c, d, a, b, x[k + 6], S13, 0xa8304613)
      b = FF(b, c, d, a, x[k + 7], S14, 0xfd469501)
      a = FF(a, b, c, d, x[k + 8], S11, 0x698098d8)
      d = FF(d, a, b, c, x[k + 9], S12, 0x8b44f7af)
      c = FF(c, d, a, b, x[k + 10], S13, 0xffff5bb1)
      b = FF(b, c, d, a, x[k + 11], S14, 0x895cd7be)
      a = FF(a, b, c, d, x[k + 12], S11, 0x6b901122)
      d = FF(d, a, b, c, x[k + 13], S12, 0xfd987193)
      c = FF(c, d, a, b, x[k + 14], S13, 0xa679438e)
      b = FF(b, c, d, a, x[k + 15], S14, 0x49b40821)
      a = GG(a, b, c, d, x[k + 1], S21, 0xf61e2562)
      d = GG(d, a, b, c, x[k + 6], S22, 0xc040b340)
      c = GG(c, d, a, b, x[k + 11], S23, 0x265e5a51)
      b = GG(b, c, d, a, x[k + 0], S24, 0xe9b6c7aa)
      a = GG(a, b, c, d, x[k + 5], S21, 0xd62f105d)
      d = GG(d, a, b, c, x[k + 10], S22, 0x2441453)
      c = GG(c, d, a, b, x[k + 15], S23, 0xd8a1e681)
      b = GG(b, c, d, a, x[k + 4], S24, 0xe7d3fbc8)
      a = GG(a, b, c, d, x[k + 9], S21, 0x21e1cde6)
      d = GG(d, a, b, c, x[k + 14], S22, 0xc33707d6)
      c = GG(c, d, a, b, x[k + 3], S23, 0xf4d50d87)
      b = GG(b, c, d, a, x[k + 8], S24, 0x455a14ed)
      a = GG(a, b, c, d, x[k + 13], S21, 0xa9e3e905)
      d = GG(d, a, b, c, x[k + 2], S22, 0xfcefa3f8)
      c = GG(c, d, a, b, x[k + 7], S23, 0x676f02d9)
      b = GG(b, c, d, a, x[k + 12], S24, 0x8d2a4c8a)
      a = HH(a, b, c, d, x[k + 5], S31, 0xfffa3942)
      d = HH(d, a, b, c, x[k + 8], S32, 0x8771f681)
      c = HH(c, d, a, b, x[k + 11], S33, 0x6d9d6122)
      b = HH(b, c, d, a, x[k + 14], S34, 0xfde5380c)
      a = HH(a, b, c, d, x[k + 1], S31, 0xa4beea44)
      d = HH(d, a, b, c, x[k + 4], S32, 0x4bdecfa9)
      c = HH(c, d, a, b, x[k + 7], S33, 0xf6bb4b60)
      b = HH(b, c, d, a, x[k + 10], S34, 0xbebfbc70)
      a = HH(a, b, c, d, x[k + 13], S31, 0x289b7ec6)
      d = HH(d, a, b, c, x[k + 0], S32, 0xeaa127fa)
      c = HH(c, d, a, b, x[k + 3], S33, 0xd4ef3085)
      b = HH(b, c, d, a, x[k + 6], S34, 0x4881d05)
      a = HH(a, b, c, d, x[k + 9], S31, 0xd9d4d039)
      d = HH(d, a, b, c, x[k + 12], S32, 0xe6db99e5)
      c = HH(c, d, a, b, x[k + 15], S33, 0x1fa27cf8)
      b = HH(b, c, d, a, x[k + 2], S34, 0xc4ac5665)
      a = II(a, b, c, d, x[k + 0], S41, 0xf4292244)
      d = II(d, a, b, c, x[k + 7], S42, 0x432aff97)
      c = II(c, d, a, b, x[k + 14], S43, 0xab9423a7)
      b = II(b, c, d, a, x[k + 5], S44, 0xfc93a039)
      a = II(a, b, c, d, x[k + 12], S41, 0x655b59c3)
      d = II(d, a, b, c, x[k + 3], S42, 0x8f0ccc92)
      c = II(c, d, a, b, x[k + 10], S43, 0xffeff47d)
      b = II(b, c, d, a, x[k + 1], S44, 0x85845dd1)
      a = II(a, b, c, d, x[k + 8], S41, 0x6fa87e4f)
      d = II(d, a, b, c, x[k + 15], S42, 0xfe2ce6e0)
      c = II(c, d, a, b, x[k + 6], S43, 0xa3014314)
      b = II(b, c, d, a, x[k + 13], S44, 0x4e0811a1)
      a = II(a, b, c, d, x[k + 4], S41, 0xf7537e82)
      d = II(d, a, b, c, x[k + 11], S42, 0xbd3af235)
      c = II(c, d, a, b, x[k + 2], S43, 0x2ad7d2bb)
      b = II(b, c, d, a, x[k + 9], S44, 0xeb86d391)
      a = addUnsigned(a, AA)
      b = addUnsigned(b, BB)
      c = addUnsigned(c, CC)
      d = addUnsigned(d, DD)
    }

    return (wordToHex(a) + wordToHex(b) + wordToHex(c) + wordToHex(d)).toLowerCase()
  }

  const handleGenerate = () => {
    if (!input) return
    const result = md5(input)
    setHash(result)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(hash)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <ToolLayout
      title="MD5 Hash Generator"
      description="Generate MD5 hash from text input"
      icon={Hash}
      category="Security"
      badges={[
        { label: "Cryptographic Hash" },
        { label: "Not for passwords" },
      ]}
    >
      <div className="space-y-6">
        <Card className="border-2 mb-6 overflow-hidden">
          <Collapsible open={isLearnOpen} onOpenChange={setIsLearnOpen}>
            <CollapsibleTrigger className="w-full">
              <div className="bg-gradient-to-r flex from-blue-500/10 to-purple-500/10 p-4 transition-colors items-center justify-between hover:from-blue-500/15 hover:to-purple-500/15">
                <div className="flex gap-3 items-center">
                  <BookOpen className="h-5 text-blue-600 w-5 dark:text-blue-400" />
                  <div className="text-left">
                    <h3 className="font-semibold">Learn About MD5</h3>
                    <p className="text-xs text-muted-foreground">Understanding MD5 hash functions</p>
                  </div>
                </div>
                <ChevronDown className={`h-5 w-5 transition-transform ${isLearnOpen ? "rotate-180" : ""}`} />
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="space-y-4 text-sm leading-relaxed p-6">
                <div>
                  <h4 className="font-semibold text-base mb-2">What is MD5?</h4>
                  <p className="text-muted-foreground">
                    MD5 (Message Digest Algorithm 5) is a widely used cryptographic hash function that produces a
                    128-bit (16-byte) hash value, typically expressed as a 32-character hexadecimal number. It was
                    designed by Ronald Rivest in 1991 as an improvement to MD4.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-base mb-2">Key Characteristics</h4>
                  <ul className="list-disc space-y-1 text-muted-foreground pl-5">
                    <li>
                      <strong>Fixed Output:</strong> Always produces a 32-character hexadecimal string regardless of
                      input size
                    </li>
                    <li>
                      <strong>Deterministic:</strong> The same input always generates the same hash
                    </li>
                    <li>
                      <strong>One-Way Function:</strong> Cannot be reversed to retrieve the original input
                    </li>
                    <li>
                      <strong>Avalanche Effect:</strong> Small changes in input create drastically different hashes
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-base mb-2">Common Use Cases</h4>
                  <ul className="list-disc space-y-1 text-muted-foreground pl-5">
                    <li>File integrity verification (checksums)</li>
                    <li>Data deduplication</li>
                    <li>Non-cryptographic applications</li>
                    <li>Legacy systems maintenance</li>
                  </ul>
                </div>
                <div className="border rounded-lg bg-yellow-500/10 border-yellow-500/50 p-4">
                  <h4 className="font-semibold text-base mb-2 text-yellow-900 dark:text-yellow-100">
                    ⚠️ Security Warning
                  </h4>
                  <p className="text-sm text-yellow-900/80 dark:text-yellow-100/80">
                    MD5 is <strong>NOT secure</strong> for cryptographic purposes. It's vulnerable to collision attacks
                    where different inputs can produce the same hash. For password hashing or security applications, use
                    modern algorithms like <strong>SHA-256</strong>, <strong>bcrypt</strong>, or <strong>Argon2</strong>
                    .
                  </p>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </Card>

        <div className="space-y-6">
          <Card className="border-2 overflow-hidden">
            <div className="bg-gradient-to-r from-orange-500/10 to-red-600/10 p-6">
              <Label htmlFor="input" className="font-semibold text-base mb-2 block">
                Input Text
              </Label>
              <Textarea
                id="input"
                placeholder="Enter text to generate MD5 hash..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="bg-background font-mono border-2 text-sm min-h-[120px]"
              />
              <Button onClick={handleGenerate} className="mt-4 w-full" size="lg" disabled={!input}>
                <Hash className="h-5 mr-2 w-5" />
                Generate MD5 Hash
              </Button>
            </div>
          </Card>

          {hash && (
            <Card className="border-2 shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-orange-500/5 to-red-600/5 p-6">
                <div className="flex mb-4 items-center justify-between">
                  <div className="flex gap-2 items-center">
                    <FileText className="h-5 text-orange-600 w-5" />
                    <Label className="font-semibold text-base">MD5 Hash Result</Label>
                  </div>
                  <Button variant="outline" size="sm" onClick={copyToClipboard}>
                    {copied ? (
                      <>
                        <Check className="h-4 mr-2 text-green-600 w-4" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 mr-2 w-4" />
                        Copy
                      </>
                    )}
                  </Button>
                </div>
                <div className="bg-gradient-to-br rounded-lg from-orange-50 to-red-50 border-2 border-orange-200 p-4 dark:from-orange-950/20 dark:to-red-950/20 dark:border-orange-900/50">
                  <p className="font-mono font-medium text-sm text-orange-900 break-all dark:text-orange-100">{hash}</p>
                </div>
                <p className="mt-4 text-xs text-muted-foreground">
                  MD5 produces a 128-bit (32 character) hash value. Note: MD5 is not recommended for security purposes.
                </p>
              </div>
            </Card>
          )}
      </div>
    </ToolLayout>
  )
}
