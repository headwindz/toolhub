"use client"

import { useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { ToolsGrid } from "@/components/tools-grid"
import { CategoryId } from "@/constants/categories"

export default function CategoryPage() {
  const params = useParams()
  const router = useRouter()
  const category = params.category as string

  useEffect(() => {
    if (!category || !Object.values(CategoryId).includes(category as CategoryId)) {
      router.push("/")
    }
  }, [category, router])

  if (!category || !Object.values(CategoryId).includes(category as CategoryId)) {
    return null
  }

  return <ToolsGrid activeCategory={category as CategoryId} />
}
