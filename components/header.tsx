'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { tools } from '@/constants/tools'
import { cn } from '@/lib/utils'
import { Menu, Moon, Search, Sun, Github } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

interface HeaderProps {
  onMobileMenuToggle?: () => void
  pathname?: string
}

export function Header({ onMobileMenuToggle, pathname }: HeaderProps) {
  const searchInputRef = useRef<HTMLInputElement>(null)
  const { theme, setTheme } = useTheme()
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const router = useRouter()
  const searchRef = useRef<HTMLDivElement>(null)
  const resultRefs = useRef<(HTMLButtonElement | null)[]>([])

  const filteredTools = searchQuery.trim()
    ? tools.filter(
        (tool) =>
          tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          tool.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : []

  useEffect(() => {
    setSelectedIndex(0)
    resultRefs.current = []
  }, [searchQuery])

  useEffect(() => {
    if (selectedIndex >= 0 && resultRefs.current[selectedIndex]) {
      resultRefs.current[selectedIndex]?.scrollIntoView({
        block: 'nearest',
        behavior: 'smooth',
      })
    }
  }, [selectedIndex])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        searchInputRef.current?.focus()
      }
      if (e.key === 'Escape') {
        setIsSearchOpen(false)
        setSearchQuery('')
        setSelectedIndex(0)
      }

      if (isSearchOpen && filteredTools.length > 0) {
        if (e.key === 'ArrowDown') {
          e.preventDefault()
          setSelectedIndex((prev) =>
            prev < filteredTools.length - 1 ? prev + 1 : prev
          )
        } else if (e.key === 'ArrowUp') {
          e.preventDefault()
          setSelectedIndex((prev) => (prev > 0 ? prev - 1 : 0))
        } else if (e.key === 'Enter') {
          e.preventDefault()
          if (filteredTools[selectedIndex]) {
            handleToolSelect(filteredTools[selectedIndex].href)
          }
        }
      }
    }

    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsSearchOpen(false)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isSearchOpen, filteredTools, selectedIndex])

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  const handleToolSelect = (href: string) => {
    router.push(`/tools/${href}`)
    setIsSearchOpen(false)
    setSearchQuery('')
    setSelectedIndex(0)
  }

  return (
    <header className="border-b bg-background/95 top-0 z-50 sticky backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 px-4 gap-1 items-center sm:px-6 sm:gap-2 lg:px-8">
        {pathname !== '/' && (
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={onMobileMenuToggle}
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        )}

        <div
          className="cursor-pointer flex gap-2 items-center"
          onClick={() => router.push('/')}
        >
          <div className="rounded-lg flex h-8 text-[#fcd535] w-8 items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M16 12v4" />
              <path d="M16 6a2 2 0 0 1 1.414.586l4 4A2 2 0 0 1 22 12v7a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 .586-1.414l4-4A2 2 0 0 1 8 6z" />
              <path d="M16 6V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
              <path d="M2 14h20" />
              <path d="M8 12v4" />
            </svg>
          </div>
          <h1 className="font-semibold text-xl hidden sm:block">Toolhub</h1>
        </div>

        <div className="flex flex-1 gap-2 items-center sm:gap-4 md:ml-8">
          <div ref={searchRef} className="max-w-md w-full relative">
            <Search className="h-4 text-muted-foreground top-1/2 left-3 w-4 -translate-y-1/2 absolute" />
            <Input
              ref={searchInputRef}
              placeholder="Search tools..."
              className="pr-10 pl-10 sm:pr-16"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value)
                setIsSearchOpen(true)
              }}
              onFocus={() => searchQuery && setIsSearchOpen(true)}
              role="combobox"
              aria-expanded={isSearchOpen && searchQuery ? 'true' : 'false'}
              aria-controls="search-results"
              aria-activedescendant={
                isSearchOpen && filteredTools[selectedIndex]
                  ? `search-result-${selectedIndex}`
                  : undefined
              }
            />
            <kbd className="bg-muted border rounded font-mono font-medium text-xs opacity-100 py-1 px-1.5 top-1/2 right-3 gap-1 -translate-y-1/2 pointer-events-none absolute hidden select-none sm:flex">
              <span className="text-xs">⌘</span>K
            </kbd>

            {isSearchOpen && searchQuery && (
              <div
                id="search-results"
                role="listbox"
                className="bg-popover border rounded-lg top-full shadow-lg mt-2 w-full absolute"
              >
                {filteredTools.length > 0 ? (
                  <div className="max-h-[400px] p-2 overflow-y-auto">
                    {filteredTools.map((tool, index) => {
                      const Icon = tool.icon
                      return (
                        <button
                          key={tool.name}
                          ref={(el) => {
                            resultRefs.current[index] = el
                          }}
                          id={`search-result-${index}`}
                          role="option"
                          aria-selected={selectedIndex === index}
                          onClick={() => handleToolSelect(tool.href)}
                          onMouseEnter={() => setSelectedIndex(index)}
                          className={cn(
                            'flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-left transition-colors',
                            selectedIndex === index
                              ? 'bg-accent'
                              : 'hover:bg-accent'
                          )}
                        >
                          <div
                            className={cn(
                              'flex h-10 w-10 items-center justify-center rounded-lg',
                              tool.color
                            )}
                          >
                            <Icon className="h-5 text-white w-5" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-sm">
                              {tool.name}
                            </div>
                            <div className="text-xs text-muted-foreground truncate">
                              {tool.description}
                            </div>
                          </div>
                        </button>
                      )
                    })}
                  </div>
                ) : (
                  <div className="text-center text-sm text-muted-foreground p-4">
                    No tools found
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={() =>
            window.open('https://github.com/headwindz/toolhub', '_blank')
          }
          className="hover:bg-accent"
        >
          <Github className="h-5 w-5" />
          <span className="sr-only">GitHub Repository</span>
        </Button>

        <Button variant="ghost" size="icon" onClick={toggleTheme}>
          <Sun className="h-5 transition-all w-5 scale-100 rotate-0 dark:scale-0 dark:-rotate-90" />
          <Moon className="h-5 transition-all w-5 scale-0 rotate-90 absolute dark:scale-100 dark:rotate-0" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </div>
    </header>
  )
}
