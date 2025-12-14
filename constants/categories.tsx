import type { LucideIcon } from "lucide-react"
import { Home, FileText, ImageIcon, Calculator, Code, Palette, Lock, Globe } from "lucide-react"

export enum CategoryId {
  All = "all",
  Text = "text",
  Image = "image",
  Converter = "converter",
  Developer = "developer",
  Design = "design",
  Security = "security",
  Network = "network",
}

export type Category = {
  id: CategoryId
  name: string
  icon: LucideIcon
}

export const categories: Category[] = [
  { id: CategoryId.All, name: "All Tools", icon: Home },
  { id: CategoryId.Text, name: "Text Tools", icon: FileText },
  { id: CategoryId.Image, name: "Image Tools", icon: ImageIcon },
  { id: CategoryId.Converter, name: "Converters", icon: Calculator },
  { id: CategoryId.Developer, name: "Developer Tools", icon: Code },
  { id: CategoryId.Design, name: "Design Tools", icon: Palette },
  { id: CategoryId.Security, name: "Security", icon: Lock },
  { id: CategoryId.Network, name: "Network", icon: Globe },
]
