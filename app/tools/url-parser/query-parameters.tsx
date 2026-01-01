import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Plus, X } from 'lucide-react'
import { useState, useEffect } from 'react'

type QueryParametersProps = {
  search: string
  updateUrlPart: (key: string, value: string) => void
}

export function QueryParameters({
  search,
  updateUrlPart,
}: QueryParametersProps) {
  const [queryParams, setQueryParams] = useState<
    Array<{ key: string; value: string | string[] }>
  >([])

  // Initialize query params from search string
  useEffect(() => {
    if (search) {
      try {
        const searchParams = new URLSearchParams(search.slice(1)) // Remove '?'
        const paramMap = new Map<string, string[]>()

        // Group values by key
        for (const [key, value] of searchParams.entries()) {
          if (!paramMap.has(key)) {
            paramMap.set(key, [])
          }
          paramMap.get(key)!.push(value)
        }

        // Convert to array format
        const params = Array.from(paramMap.entries()).map(([key, values]) => ({
          key,
          value: values.length === 1 ? values[0] : values,
        }))

        setQueryParams(params)
      } catch {
        setQueryParams([])
      }
    } else {
      setQueryParams([])
    }
  }, [search])

  const addQueryParam = () => {
    setQueryParams([...queryParams, { key: '', value: '' }])
  }

  const removeQueryParam = (index: number) => {
    const newParams = queryParams.filter((_, i) => i !== index)
    setQueryParams(newParams)
    updateSearchString(newParams)
  }

  const updateQueryParam = (
    index: number,
    field: 'key' | 'value',
    value: string,
    arrayIndex?: number
  ) => {
    const newParams = [...queryParams]
    if (field === 'key') {
      newParams[index][field] = value
    } else {
      // Handle array values
      const currentValue = newParams[index].value
      if (Array.isArray(currentValue)) {
        if (arrayIndex !== undefined) {
          currentValue[arrayIndex] = value
        } else {
          // If no array index provided, replace whole array with single value
          newParams[index].value = value
        }
      } else {
        newParams[index].value = value
      }
    }
    setQueryParams(newParams)
    updateSearchString(newParams)
  }

  const updateSearchString = (
    params: Array<{ key: string; value: string | string[] }>
  ) => {
    const searchParams = new URLSearchParams()
    params.forEach(({ key, value }) => {
      if (key.trim()) {
        if (Array.isArray(value)) {
          value.forEach((v) => {
            if (v.trim()) {
              searchParams.append(key.trim(), v.trim())
            }
          })
        } else if (value.trim()) {
          searchParams.append(key.trim(), value.trim())
        }
      }
    })
    const searchString = searchParams.toString()
    updateUrlPart('search', searchString ? `?${searchString}` : '')
  }

  const addArrayValue = (index: number) => {
    const newParams = [...queryParams]
    const currentValue = newParams[index].value
    if (Array.isArray(currentValue)) {
      currentValue.push('')
    } else {
      newParams[index].value = [currentValue, '']
    }
    setQueryParams(newParams)
  }

  const removeArrayValue = (index: number, arrayIndex: number) => {
    const newParams = [...queryParams]
    const currentValue = newParams[index].value
    if (Array.isArray(currentValue)) {
      currentValue.splice(arrayIndex, 1)
      if (currentValue.length === 1) {
        newParams[index].value = currentValue[0]
      }
    }
    setQueryParams(newParams)
    updateSearchString(newParams)
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Label>Query Parameters</Label>
        <Button variant="outline" size="sm" onClick={addQueryParam}>
          <Plus className="h-4 w-4 mr-1" />
          Add Parameter
        </Button>
      </div>

      {queryParams.length === 0 && (
        <p className="text-sm text-gray-500 italic">No query parameters</p>
      )}

      <div className="space-y-2">
        {queryParams.map((param, index) => {
          const isArray = Array.isArray(param.value)
          const values: string[] = isArray
            ? (param.value as string[])
            : [param.value as string]

          return (
            <div key={index} className="space-y-2">
              <div className="flex items-center gap-2">
                <Input
                  value={param.key}
                  onChange={(e) =>
                    updateQueryParam(index, 'key', e.target.value)
                  }
                  placeholder="Parameter name"
                  className="flex-1 font-mono"
                />
                <span className="text-gray-400">=</span>
                <div className="flex-1 space-y-1">
                  {values.map((value: string, arrayIndex: number) => (
                    <div key={arrayIndex} className="flex items-center gap-1">
                      <Input
                        value={value}
                        onChange={(e) =>
                          updateQueryParam(
                            index,
                            'value',
                            e.target.value,
                            isArray ? arrayIndex : undefined
                          )
                        }
                        placeholder="Parameter value"
                        className="flex-1 font-mono"
                      />
                      {isArray && values.length > 1 && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeArrayValue(index, arrayIndex)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      )}
                    </div>
                  ))}
                  {param.key && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => addArrayValue(index)}
                      className="text-xs h-6"
                    >
                      <Plus className="h-3 w-3 mr-1" />
                      Add Value
                    </Button>
                  )}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => removeQueryParam(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              {isArray && (
                <p className="text-xs text-gray-500 ml-2">
                  Array parameter ({values.length} values)
                </p>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
