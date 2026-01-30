'use client'

import { Header } from '@/components/header'
import { MagicCursor } from '@/components/magic-cursor'
import { Sidebar } from '@/components/sidebar'
import { ThemeProvider } from '@/components/theme-provider'
import { CategoryId } from '@/constants/categories'
import { tools } from '@/constants/tools'
import { Analytics } from '@vercel/analytics/next'
import { Geist, Geist_Mono } from 'next/font/google'
import { usePathname, useRouter } from 'next/navigation'
import type React from 'react'
import { useEffect, useState } from 'react'
import './globals.css'

// Used for fonts
const _geist = Geist({ subsets: ['latin'] })
const _geistMono = Geist_Mono({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  // Calculate initial active category based on pathname
  const getInitialCategory = (): CategoryId => {
    if (pathname === '/') {
      return CategoryId.All
    } else if (pathname.startsWith('/category/')) {
      const category = pathname.split('/category/')[1] as CategoryId
      if (Object.values(CategoryId).includes(category)) {
        return category
      }
    } else if (pathname.startsWith('/tools/')) {
      const slug = pathname.replace('/tools', '') // tools hrefs begin with "/"
      const match = tools.find((t) => t.href === slug)
      if (match) {
        return match.category
      }
    }
    return CategoryId.All
  }

  const [activeCategory, setActiveCategory] =
    useState<CategoryId>(getInitialCategory())

  // Update active category based on pathname changes
  useEffect(() => {
    const newCategory = getInitialCategory()
    setActiveCategory(newCategory)
  }, [pathname])

  const handleCategoryChange = (category: CategoryId) => {
    setActiveCategory(category)
    if (category === CategoryId.All) {
      router.push('/')
    } else {
      router.push(`/category/${category}`)
    }
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>Toolhub - Free Online Utility Tools</title>
        <meta
          name="description"
          content="Collection of free online utility tools for developers and creators"
        />
        <meta name="generator" content="v0.app" />
        <link
          rel="icon"
          href="/icon.svg"
          media="(prefers-color-scheme: light)"
        />
        <link
          rel="icon"
          href="/icon.svg"
          media="(prefers-color-scheme: dark)"
        />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.svg" />
        {/* PWA manifest and meta tags */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0f172a" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="ToolHub" />
        <link
          rel="apple-touch-icon"
          sizes="192x192"
          href="/icons/icon-192x192.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="512x512"
          href="/icons/icon-512x512.png"
        />
      </head>
      <body className={`font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          storageKey="toolbox-theme"
        >
          <div className="flex flex-col min-h-screen">
            <Header
              onMobileMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              pathname={pathname}
            />
            <div className="flex flex-1 min-h-0">
              {pathname !== '/' && (
                <Sidebar
                  isCollapsed={isSidebarCollapsed}
                  onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                  isMobileOpen={isMobileMenuOpen}
                  onMobileClose={() => setIsMobileMenuOpen(false)}
                  activeCategory={activeCategory}
                  onCategoryChange={handleCategoryChange}
                />
              )}
              <main
                className={`flex-1 overflow-y-auto ${pathname === '/' ? '' : 'p-4 sm:p-6 lg:p-8'}`}
              >
                {children}
              </main>
            </div>
            <MagicCursor />
          </div>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
