'use client'

import { ToolLayout } from '@/components/tool-layout'
import { Link } from 'lucide-react'
import { useState, useEffect } from 'react'
import { UrlKnowledge } from './knowledge'
import { UrlParserGenerator } from './url-parser-generator'
import { UrlParts } from './types'

export default function UrlParserPage() {
  const [currentUrl, setCurrentUrl] = useState(
    'https://example.com/path/to/page?param1=value1&param2=value2#section'
  )
  const [urlParts, setUrlParts] = useState<UrlParts>({
    protocol: 'https',
    host: 'example.com',
    pathname: '/path/to/page',
    search: '?param1=value1&param2=value2',
    hash: 'section',
    port: '',
  })

  // Parse URL when currentUrl changes
  useEffect(() => {
    try {
      const url = new URL(currentUrl)
      setUrlParts({
        protocol: url.protocol.replace(':', ''), // Remove colon
        host: url.hostname + (url.port ? `:${url.port}` : ''),
        pathname: url.pathname,
        search: url.search,
        hash: url.hash.replace('#', ''), // Remove hash
        port: url.port,
      })
    } catch (error) {
      // Invalid URL - keep current parts
    }
  }, [currentUrl])

  const updateUrlPart = (key: string, value: string) => {
    const newParts = { ...urlParts, [key]: value }
    setUrlParts(newParts)

    // Update the current URL to reflect the changes
    const newUrl = buildUrlFromParts(newParts)
    setCurrentUrl(newUrl)
  }

  const buildUrlFromParts = (parts: typeof urlParts) => {
    try {
      // Ensure protocol has colon
      const protocol = parts.protocol.includes(':')
        ? parts.protocol
        : `${parts.protocol}:`

      // Start with a base URL using protocol and host
      const baseUrl = `${protocol}//${parts.host}`
      const url = new URL(baseUrl)

      // Set the path
      url.pathname = parts.pathname || '/'

      // Set port if provided
      if (parts.port) {
        url.port = parts.port
      }

      // Set search params if provided
      if (parts.search) {
        url.search = parts.search.startsWith('?')
          ? parts.search.slice(1)
          : parts.search
      }

      // Set hash if provided
      if (parts.hash) {
        // Remove # if present, URL constructor will add it
        const cleanHash = parts.hash.startsWith('#')
          ? parts.hash.slice(1)
          : parts.hash
        url.hash = cleanHash
      }

      return url.toString()
    } catch (error) {
      return currentUrl
    }
  }

  return (
    <ToolLayout
      title="URL Parser"
      description="Parse URLs into components and build URLs from parts"
      icon={Link}
    >
      <div className="space-y-6">
        <UrlKnowledge />

        <UrlParserGenerator
          url={currentUrl}
          setUrl={setCurrentUrl}
          urlParts={urlParts}
          updateUrlPart={updateUrlPart}
        />
      </div>
    </ToolLayout>
  )
}
