"use client";

import { Header } from "@/components/header";
import { MagicCursor } from "@/components/magic-cursor";
import { Sidebar } from "@/components/sidebar";
import { ThemeProvider } from "@/components/theme-provider";
import { CategoryId } from "@/constants/categories";
import { tools } from "@/constants/tools";
import { Analytics } from "@vercel/analytics/next";
import { Geist, Geist_Mono } from "next/font/google";
import { usePathname, useRouter } from "next/navigation";
import type React from "react";
import { useEffect, useState } from "react";
import "./globals.css";

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // Calculate initial active category based on pathname
  const getInitialCategory = (): CategoryId => {
    if (pathname === "/") {
      return CategoryId.All;
    } else if (pathname.startsWith("/category/")) {
      const category = pathname.split("/category/")[1] as CategoryId;
      if (Object.values(CategoryId).includes(category)) {
        return category;
      }
    } else if (pathname.startsWith("/tools/")) {
      const slug = pathname.replace("/tools", ""); // tools hrefs begin with "/"
      const match = tools.find((t) => t.href === slug);
      if (match) {
        return match.category;
      }
    }
    return CategoryId.All;
  };

  const [activeCategory, setActiveCategory] =
    useState<CategoryId>(getInitialCategory());

  // Update active category based on pathname changes
  useEffect(() => {
    const newCategory = getInitialCategory();
    setActiveCategory(newCategory);
  }, [pathname]);

  const handleCategoryChange = (category: CategoryId) => {
    setActiveCategory(category);
    if (category === CategoryId.All) {
      router.push("/");
    } else {
      router.push(`/category/${category}`);
    }
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>Toolboxz - Free Online Utility Tools</title>
        <meta
          name="description"
          content="Collection of free online utility tools for developers and creators"
        />
        <meta name="generator" content="v0.app" />
        <link
          rel="icon"
          href="/icon-light-32x32.png"
          media="(prefers-color-scheme: light)"
        />
        <link
          rel="icon"
          href="/icon-dark-32x32.png"
          media="(prefers-color-scheme: dark)"
        />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
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
            />
            <div className="flex flex-1 min-h-0">
              <Sidebar
                isCollapsed={isSidebarCollapsed}
                onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                isMobileOpen={isMobileMenuOpen}
                onMobileClose={() => setIsMobileMenuOpen(false)}
                activeCategory={activeCategory}
                onCategoryChange={handleCategoryChange}
              />
              <main className="flex-1 p-4 overflow-y-auto sm:p-6 lg:p-8">
                {children}
              </main>
            </div>
            <MagicCursor />
          </div>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
