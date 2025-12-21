import type { LucideIcon } from "lucide-react";
import {
  Calculator,
  Code,
  Globe,
  Home,
  ImageIcon,
  Lock,
  Palette,
} from "lucide-react";

export enum CategoryId {
  All = "all",
  Image = "image",
  Education = "education",
  Developer = "developer",
  Design = "design",
  Security = "security",
  Utility = "utility",
}

export type Category = {
  id: CategoryId;
  name: string;
  icon: LucideIcon;
};

export const categories: Category[] = [
  { id: CategoryId.All, name: "All Tools", icon: Home },
  { id: CategoryId.Image, name: "Image", icon: ImageIcon },
  { id: CategoryId.Education, name: "Education", icon: Calculator },
  { id: CategoryId.Developer, name: "Developer", icon: Code },
  { id: CategoryId.Design, name: "Design", icon: Palette },
  { id: CategoryId.Security, name: "Security", icon: Lock },
  { id: CategoryId.Utility, name: "Utility", icon: Globe },
];
