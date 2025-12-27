'use client'

import { ReactNode, useEffect, useRef, useState } from 'react'
import * as Select from '@radix-ui/react-select'
import { ChevronDown, Check } from 'lucide-react'

interface DropdownOption {
  value: string
  label: string | ReactNode
  searchText?: string
}

interface DropdownProps {
  label: string
  icon: ReactNode
  value: string
  onChange: (value: string) => void
  options: DropdownOption[]
  searchable?: boolean
  searchPlaceholder?: string
  renderSelected?: (value: string) => ReactNode
  filterOption?: (option: DropdownOption, searchQuery: string) => boolean
  isLoading?: boolean
  height?: string
}

export const Dropdown = ({
  label,
  icon,
  value,
  onChange,
  options,
  searchable = false,
  searchPlaceholder = 'Search...',
  renderSelected,
  filterOption,
  isLoading = false,
  height,
}: DropdownProps) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [open, setOpen] = useState(false)
  const [highlightedIndex, setHighlightedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (open && searchable && inputRef.current) {
      // Use setTimeout to ensure focus happens after render
      setTimeout(() => {
        inputRef.current?.focus()
      }, 0)
    }
  }, [open, searchable, searchQuery])

  useEffect(() => {
    // Reset highlighted index when filtered options change
    setHighlightedIndex(0)
  }, [searchQuery])

  const defaultFilterOption = (option: DropdownOption, query: string) => {
    if (!query) return true
    const lowerQuery = query.toLowerCase()
    return (option.searchText || String(option.value))
      .toLowerCase()
      .includes(lowerQuery)
  }

  const filteredOptions = searchable
    ? options.filter((option) =>
        filterOption
          ? filterOption(option, searchQuery)
          : defaultFilterOption(option, searchQuery)
      )
    : options

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.stopPropagation()

    switch (e.key) {
      case 'Escape':
        setOpen(false)
        break
      case 'ArrowDown':
        e.preventDefault()
        setHighlightedIndex((prev) =>
          prev < filteredOptions.length - 1 ? prev + 1 : prev
        )
        break
      case 'ArrowUp':
        e.preventDefault()
        setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : prev))
        break
      case 'Enter':
        e.preventDefault()
        if (filteredOptions[highlightedIndex]) {
          onChange(filteredOptions[highlightedIndex].value)
          setOpen(false)
          setSearchQuery('')
        }
        break
      case 'Tab':
        if (filteredOptions[highlightedIndex]) {
          e.preventDefault()
          onChange(filteredOptions[highlightedIndex].value)
          setOpen(false)
          setSearchQuery('')
        }
        break
    }
  }

  return (
    <div>
      {icon || label ? (
        <label className="flex font-medium text-sm mb-2 text-gray-700 gap-2 items-center dark:text-gray-300">
          {icon}
          {label}
        </label>
      ) : null}
      <Select.Root
        value={value}
        onValueChange={onChange}
        open={open}
        onOpenChange={(isOpen) => {
          setOpen(isOpen)
          if (!isOpen) setSearchQuery('')
        }}
      >
        <Select.Trigger
          className={`bg-white border rounded-lg cursor-pointer border-gray-300 text-left w-full pr-10 pl-4 transition-all relative data-[state=open]:border-blue-500 data-[state=open]:ring-2 data-[state=open]:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${height ? '' : 'py-3'}`}
          style={height ? { height } : undefined}
          disabled={isLoading}
        >
          <Select.Value>
            {isLoading ? (
              <span className="text-gray-400 dark:text-gray-500">
                Loading...
              </span>
            ) : renderSelected ? (
              renderSelected(value)
            ) : (
              <span className="block truncate">{value}</span>
            )}
          </Select.Value>
          <Select.Icon className="flex pr-3 inset-y-0 right-0 pointer-events-none absolute items-center">
            <ChevronDown
              className={`h-5 text-gray-400 w-5 ${isLoading ? 'animate-spin' : ''}`}
            />
          </Select.Icon>
        </Select.Trigger>
        <Select.Portal>
          <Select.Content
            className="bg-white rounded-lg shadow-lg ring-black mt-1 w-[var(--radix-select-trigger-width)] max-h-60 py-1 ring-1 ring-opacity-5 z-50 overflow-hidden dark:bg-gray-700"
            position="popper"
            sideOffset={4}
            align="start"
          >
            {searchable && (
              <div className="bg-white px-2 pt-1 pb-2 top-0 sticky dark:bg-gray-700">
                <input
                  ref={inputRef}
                  type="text"
                  className="border rounded-md border-gray-300 text-sm w-full py-2 px-3 dark:bg-gray-600 dark:border-gray-500 dark:text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  placeholder={searchPlaceholder}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onPointerDown={(e) => e.stopPropagation()}
                  onKeyDown={handleKeyDown}
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            )}
            <Select.Viewport className={searchable ? 'max-h-48' : ''}>
              {filteredOptions.map((option, index) => (
                <Select.Item
                  key={option.value}
                  value={option.value}
                  className={`cursor-pointer outline-none py-2 pr-4 pl-10 text-gray-900 relative select-none data-[highlighted]:bg-blue-100 data-[highlighted]:text-blue-900 dark:text-gray-100 dark:data-[highlighted]:bg-blue-900 dark:data-[highlighted]:text-blue-100 ${
                    searchable && index === highlightedIndex
                      ? 'bg-blue-50 dark:bg-blue-950'
                      : ''
                  }`}
                  onMouseEnter={() => searchable && setHighlightedIndex(index)}
                >
                  <Select.ItemText>
                    <span className="font-normal block truncate data-[state=checked]:font-semibold">
                      {option.label}
                    </span>
                  </Select.ItemText>
                  <Select.ItemIndicator className="flex pl-3 inset-y-0 left-0 text-blue-600 absolute items-center dark:text-blue-400">
                    <Check className="h-5 w-5" />
                  </Select.ItemIndicator>
                </Select.Item>
              ))}
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </div>
  )
}
