import * as yaml from 'js-yaml'
import * as toml from '@iarna/toml'
import { XMLParser, XMLBuilder } from 'fast-xml-parser'
import * as Papa from 'papaparse'

export type DataFormat = 'json' | 'yaml' | 'toml' | 'xml' | 'zod' | 'csv'

export interface FormatInfo {
  name: string
  extension: string
  color: string
  example: string
}

export const SUPPORTED_FORMATS: Record<DataFormat, FormatInfo> = {
  json: {
    name: 'JSON',
    extension: 'json',
    color: 'bg-blue-500',
    example: '{\n  "name": "John",\n  "age": 30\n}',
  },
  yaml: {
    name: 'YAML',
    extension: 'yaml',
    color: 'bg-green-500',
    example: 'name: John\nage: 30',
  },
  toml: {
    name: 'TOML',
    extension: 'toml',
    color: 'bg-orange-500',
    example: 'name = "John"\nage = 30',
  },
  xml: {
    name: 'XML',
    extension: 'xml',
    color: 'bg-purple-500',
    example: '<root>\n  <name>John</name>\n  <age>30</age>\n</root>',
  },
  zod: {
    name: 'Zod Schema',
    extension: 'ts',
    color: 'bg-indigo-500',
    example: 'z.object({\n  name: z.string(),\n  age: z.number()\n})',
  },
  csv: {
    name: 'CSV',
    extension: 'csv',
    color: 'bg-red-500',
    example: 'name,age\nJohn,30\nJane,25',
  },
}

// Parse functions
function parseJSON(input: string): any {
  return JSON.parse(input)
}

function parseYAML(input: string): any {
  return yaml.load(input)
}

function parseTOML(input: string): any {
  return toml.parse(input)
}

function parseXML(input: string): any {
  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: '@_',
    textNodeName: '#text',
    ignoreDeclaration: true,
    parseAttributeValue: true,
  })
  return parser.parse(input)
}

function parseZod(input: string): any {
  // For Zod, we'll try to extract the object structure from the schema
  // This is a simplified approach - in practice, you'd want more sophisticated parsing
  try {
    // Remove z.object wrapper and parse as JSON-like structure
    const cleanInput = input
      .replace(/z\.object\(\{/, '{')
      .replace(/\}\)$/, '}')
      .replace(/z\.string\(\)/g, '"string"')
      .replace(/z\.number\(\)/g, '0')
      .replace(/z\.boolean\(\)/g, 'false')
      .replace(/z\.array\([^)]+\)/g, '[]')
      .replace(/z\.optional\([^)]+\)/g, 'null')
      .replace(/z\.date\(\)/g, '"2024-01-01"')

    return JSON.parse(cleanInput)
  } catch {
    throw new Error('Invalid Zod schema format')
  }
}

function parseCSV(input: string): any {
  const result = Papa.parse(input, {
    header: true,
    skipEmptyLines: true,
    dynamicTyping: true,
  })

  if (result.errors.length > 0) {
    throw new Error(result.errors[0].message)
  }

  return result.data
}

// Serialize functions
function serializeJSON(data: any): string {
  return JSON.stringify(data, null, 2)
}

function serializeYAML(data: any): string {
  return yaml.dump(data, { indent: 2 })
}

function serializeTOML(data: any): string {
  return toml.stringify(data)
}

function serializeXML(data: any): string {
  const builder = new XMLBuilder({
    ignoreAttributes: false,
    attributeNamePrefix: '@_',
    textNodeName: '#text',
    format: true,
    indentBy: '  ',
  })
  return builder.build(data)
}

function serializeZod(data: any): string {
  function generateZodSchema(obj: any, indent = 0): string {
    if (obj === null || obj === undefined) {
      return 'z.null()'
    }

    if (Array.isArray(obj)) {
      if (obj.length === 0) {
        return 'z.array(z.unknown())'
      }
      const itemType = generateZodSchema(obj[0], indent)
      return `z.array(${itemType})`
    }

    if (typeof obj === 'object') {
      const spaces = '  '.repeat(indent)
      const innerSpaces = '  '.repeat(indent + 1)
      const entries = Object.entries(obj)
        .map(([key, value]) => {
          const schema = generateZodSchema(value, indent + 1)
          return `${innerSpaces}${key}: ${schema}`
        })
        .join(',\n')

      return `z.object({\n${entries}\n${spaces}})`
    }

    switch (typeof obj) {
      case 'string':
        return 'z.string()'
      case 'number':
        return 'z.number()'
      case 'boolean':
        return 'z.boolean()'
      default:
        return 'z.unknown()'
    }
  }

  return generateZodSchema(data)
}

function serializeCSV(data: any): string {
  if (!Array.isArray(data)) {
    throw new Error('CSV format requires array data')
  }

  if (data.length === 0) {
    return ''
  }

  // If the data contains objects, use Papa.unparse
  if (typeof data[0] === 'object') {
    return Papa.unparse(data)
  }

  // If it's simple array, convert to single column
  return Papa.unparse(data.map((item, index) => ({ value: item, index })))
}

const PARSERS: Record<DataFormat, (input: string) => any> = {
  json: parseJSON,
  yaml: parseYAML,
  toml: parseTOML,
  xml: parseXML,
  zod: parseZod,
  csv: parseCSV,
}

const SERIALIZERS: Record<DataFormat, (data: any) => string> = {
  json: serializeJSON,
  yaml: serializeYAML,
  toml: serializeTOML,
  xml: serializeXML,
  zod: serializeZod,
  csv: serializeCSV,
}

export async function convertData(
  input: string,
  sourceFormat: DataFormat,
  targetFormat: DataFormat
): Promise<string> {
  try {
    // Parse the input data
    const parser = PARSERS[sourceFormat]
    if (!parser) {
      throw new Error(`Unsupported source format: ${sourceFormat}`)
    }

    const parsedData = parser(input.trim())

    // Serialize to target format
    const serializer = SERIALIZERS[targetFormat]
    if (!serializer) {
      throw new Error(`Unsupported target format: ${targetFormat}`)
    }

    const result = serializer(parsedData)
    return result
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(
        `Failed to convert from ${sourceFormat} to ${targetFormat}: ${error.message}`
      )
    }
    throw new Error(
      `Unknown error during conversion from ${sourceFormat} to ${targetFormat}`
    )
  }
}
