import { cn } from "@/lib/utils"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  FileText,
  Hash,
  FileJson,
  ImageIcon,
  Palette,
  QrCode,
  Calculator,
  Clock,
  Code,
  Database,
  Key,
  Lock,
  FileCode,
  Sparkles,
  Zap,
  Globe,
} from "lucide-react"

const tools = [
  {
    name: "JSON Formatter",
    description: "Format and validate JSON data",
    icon: FileJson,
    color: "bg-blue-500",
    badge: "Popular",
    href: "/tools/json-formatter",
  },
  {
    name: "Image Compressor",
    description: "Compress images without losing quality",
    icon: ImageIcon,
    color: "bg-purple-500",
    badge: "New",
    href: "/tools/image-compressor",
  },
  {
    name: "QR Code Generator",
    description: "Generate QR codes for any text or URL",
    icon: QrCode,
    color: "bg-green-500",
    href: "/tools/qr-generator",
  },
  {
    name: "Hash Generator",
    description: "Generate MD5, SHA1, SHA256 hashes",
    icon: Hash,
    color: "bg-orange-500",
    href: "/tools/hash-generator",
  },
  {
    name: "MD5 Generator",
    description: "Generate MD5 hash from text",
    icon: Hash,
    color: "bg-orange-600",
    badge: "Security",
    href: "/tools/md5",
  },
  {
    name: "Color Picker",
    description: "Pick colors and generate palettes",
    icon: Palette,
    color: "bg-pink-500",
    badge: "Popular",
    href: "/tools/color-picker",
  },
  {
    name: "Base64 Encoder",
    description: "Encode and decode Base64 strings",
    icon: Code,
    color: "bg-indigo-500",
    href: "/tools/base64",
  },
  {
    name: "UUID Generator",
    description: "Generate unique identifiers",
    icon: Key,
    color: "bg-cyan-500",
    href: "/tools/uuid-generator",
  },
  {
    name: "IP Lookup",
    description: "Get geolocation info for IP addresses",
    icon: Globe,
    color: "bg-blue-600",
    badge: "Network",
    href: "/tools/ip-lookup",
  },
  {
    name: "World Clock",
    description: "View time across different timezones",
    icon: Clock,
    color: "bg-amber-500",
    badge: "New",
    href: "/tools/timezone",
  },
  {
    name: "Text Diff",
    description: "Compare two text files",
    icon: FileText,
    color: "bg-red-500",
    href: "/tools/text-diff",
  },
  {
    name: "Password Generator",
    description: "Generate strong secure passwords",
    icon: Lock,
    color: "bg-yellow-500",
    badge: "Popular",
    href: "/tools/password-generator",
  },
  {
    name: "Markdown Editor",
    description: "Write and preview Markdown",
    icon: FileCode,
    color: "bg-teal-500",
    href: "/tools/markdown-editor",
  },
  {
    name: "Unit Converter",
    description: "Convert between different units",
    icon: Calculator,
    color: "bg-lime-500",
    href: "/tools/unit-converter",
  },
  {
    name: "SQL Formatter",
    description: "Format and beautify SQL queries",
    icon: Database,
    color: "bg-violet-500",
    href: "/tools/sql-formatter",
  },
  {
    name: "Timestamp Converter",
    description: "Convert Unix timestamps",
    icon: Clock,
    color: "bg-amber-500",
    href: "/tools/timestamp",
  },
  {
    name: "Text Case Converter",
    description: "Convert text to different cases",
    icon: Sparkles,
    color: "bg-rose-500",
    href: "/tools/case-converter",
  },
  {
    name: "URL Parser",
    description: "Parse and analyze URLs",
    icon: Zap,
    color: "bg-sky-500",
    href: "/tools/url-parser",
  },
  {
    name: "Lorem Ipsum",
    description: "Generate placeholder text",
    icon: FileText,
    color: "bg-fuchsia-500",
    href: "/tools/lorem-ipsum",
  },
]

export function ToolsGrid() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">Popular Tools</h2>
        <p className="text-sm text-muted-foreground">Most used utilities</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {tools.map((tool) => {
          const Icon = tool.icon
          return (
            <Link key={tool.name} href={tool.href}>
              <Card className="group relative overflow-hidden transition-all hover:shadow-lg">
                <div className="p-6">
                  <div className="mb-4 flex items-start justify-between">
                    <div className={cn("flex h-12 w-12 items-center justify-center rounded-xl", tool.color)}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    {tool.badge && (
                      <Badge variant={tool.badge === "New" ? "default" : "secondary"} className="text-xs">
                        {tool.badge}
                      </Badge>
                    )}
                  </div>
                  <h3 className="mb-2 font-semibold text-card-foreground group-hover:text-primary transition-colors">
                    {tool.name}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{tool.description}</p>
                </div>
                <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 transition-opacity group-hover:opacity-100" />
              </Card>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
