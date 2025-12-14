import { ToolsGrid } from "@/components/tools-grid"
import { CategoryId } from "@/constants/categories"

export default function HomePage() {
  return <ToolsGrid activeCategory={CategoryId.All} />
}
