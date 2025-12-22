import { CategoryId } from "@/constants/categories";
import type { LucideIcon } from "lucide-react";
import {
  Calculator,
  Chrome,
  Code,
  Contrast,
  FileJson,
  Globe,
  Hash,
  ImageIcon,
  Key,
  Keyboard,
  Lock,
  Palette,
  QrCode,
  ScanText,
} from "lucide-react";

export type Tool = {
  name: string;
  description: string;
  icon: LucideIcon;
  color: string;
  href: string;
  badge?: string;
  category: CategoryId;
};

export const tools: Tool[] = [
  {
    name: "JSON Formatter",
    description: "Format and validate JSON data",
    icon: FileJson,
    color: "bg-blue-500",
    badge: "Popular",
    href: "/json-formatter",
    category: CategoryId.Developer,
  },
  {
    name: "Image Compressor",
    description: "Compress images without losing quality",
    icon: ImageIcon,
    color: "bg-purple-500",
    badge: "New",
    href: "/image-compressor",
    category: CategoryId.Image,
  },
  {
    name: "Text Extractor (OCR)",
    description: "Extract text from images using OCR",
    icon: ScanText,
    color: "bg-violet-500",
    badge: "AI",
    href: "/text-extractor",
    category: CategoryId.Image,
  },
  {
    name: "QR Code Generator",
    description: "Generate QR codes for any text or URL",
    icon: QrCode,
    color: "bg-green-500",
    href: "/qr-generator",
    category: CategoryId.Utility,
  },
  {
    name: "Hash Generator",
    description: "Generate MD5, SHA1, SHA256 hashes",
    icon: Hash,
    color: "bg-orange-500",
    href: "/hash-generator",
    category: CategoryId.Security,
  },
  {
    name: "Color Picker",
    description: "Pick colors and generate palettes",
    icon: Palette,
    color: "bg-pink-500",
    badge: "Popular",
    href: "/color-picker",
    category: CategoryId.Design,
  },
  {
    name: "Color Contrast",
    description: "Check WCAG AA/AAA contrast ratios",
    icon: Contrast,
    color: "bg-emerald-500",
    href: "/color-contrast",
    category: CategoryId.Design,
  },
  {
    name: "Base64 Encoder",
    description: "Encode and decode Base64 strings",
    icon: Code,
    color: "bg-indigo-500",
    href: "/base64",
    category: CategoryId.Developer,
  },
  {
    name: "UUID Generator",
    description: "Generate unique identifiers",
    icon: Key,
    color: "bg-cyan-500",
    href: "/uuid-generator",
    category: CategoryId.Security,
  },
  {
    name: "IP Lookup",
    description: "Get geolocation info for IP addresses",
    icon: Globe,
    color: "bg-blue-600",
    badge: "Network",
    href: "/ip-lookup",
    category: CategoryId.Utility,
  },
  {
    name: "User Agent Detector",
    description: "Detect and analyze browser user agent",
    icon: Chrome,
    color: "bg-cyan-600",
    badge: "New",
    href: "/user-agent",
    category: CategoryId.Developer,
  },
  // {
  //   name: "World Clock",
  //   description: "View time across different timezones",
  //   icon: Clock,
  //   color: "bg-amber-500",
  //   badge: "New",
  //   href: "/timezone",
  //   category: CategoryId.Education,
  // },
  {
    name: "Password Generator",
    description: "Generate strong secure passwords",
    icon: Lock,
    color: "bg-yellow-500",
    badge: "Popular",
    href: "/password-generator",
    category: CategoryId.Security,
  },
  // {
  //   name: "Timestamp Converter",
  //   description: "Convert Unix timestamps",
  //   icon: Clock,
  //   color: "bg-amber-500",
  //   href: "/timestamp",
  //   category: CategoryId.Education,
  // },
  {
    name: "Math Quiz Generator",
    description: "Generate custom math practice quizzes",
    icon: Calculator,
    color: "bg-blue-600",
    badge: "New",
    href: "/math-quiz",
    category: CategoryId.Education,
  },
  {
    name: "Typing Exercise",
    description: "Practice and improve typing speed",
    icon: Keyboard,
    color: "bg-teal-500",
    badge: "Practice",
    href: "/typing-exercise",
    category: CategoryId.Education,
  },
];
