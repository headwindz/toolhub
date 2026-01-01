import { KnowledgeSection } from '@/components/knowledge-section'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import {
  ArrowRightLeft,
  FileText,
  Zap,
  Shield,
  Download,
  Code2,
} from 'lucide-react'

const formats = [
  {
    name: 'JSON',
    description: 'JavaScript Object Notation - universal data format',
    color: 'bg-blue-500',
    features: ['Human-readable', 'Widely supported', 'Nested structures'],
  },
  {
    name: 'YAML',
    description: 'Human-friendly data serialization standard',
    color: 'bg-green-500',
    features: ['Very readable', 'Configuration files', 'Comments supported'],
  },
  {
    name: 'TOML',
    description: "Tom's Obvious, Minimal Language for config files",
    color: 'bg-orange-500',
    features: ['Clear syntax', 'Strong typing', 'Section-based'],
  },
  {
    name: 'XML',
    description: 'eXtensible Markup Language for structured data',
    color: 'bg-purple-500',
    features: ['Self-documenting', 'Attributes', 'Namespaces'],
  },
  {
    name: 'Zod',
    description: 'TypeScript schema validation library',
    color: 'bg-indigo-500',
    features: ['Type safety', 'Runtime validation', 'Inference'],
  },
  {
    name: 'CSV',
    description: 'Comma-Separated Values for tabular data',
    color: 'bg-red-500',
    features: ['Spreadsheet compatible', 'Simple format', 'Wide support'],
  },
]

const features = [
  {
    icon: Zap,
    title: 'Instant Conversion',
    description:
      'Convert between formats in milliseconds with real-time processing',
  },
  {
    icon: Shield,
    title: 'Local Processing',
    description:
      'All conversions happen locally in your browser - no data sent to servers',
  },
  {
    icon: FileText,
    title: '6 Popular Formats',
    description: 'Support for JSON, YAML, TOML, XML, Zod schemas, and CSV',
  },
  {
    icon: Download,
    title: 'Download Results',
    description: 'Download converted data with proper file extensions',
  },
  {
    icon: Code2,
    title: 'Developer Friendly',
    description:
      'Syntax highlighting and error detection for better experience',
  },
  {
    icon: ArrowRightLeft,
    title: 'Bidirectional',
    description: 'Convert in any direction between supported formats',
  },
]

const useCases = [
  'Convert API responses between formats',
  'Transform configuration files',
  'Generate Zod schemas from data',
  'Export CSV data to structured formats',
  'Convert XML to modern JSON/YAML',
  'Transform TOML configs to JSON',
]

export function DataConverterKnowledge() {
  return (
    <KnowledgeSection
      title="Data Format Converter"
      description="Instantly convert between JSON, YAML, TOML, XML, Zod, and CSV formats"
    >
      {/* Supported Formats */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Supported Formats
        </h3>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {formats.map((format) => (
            <Card key={format.name} className="p-4">
              <div className="flex items-center gap-3 mb-2">
                <div className={`w-3 h-3 rounded-full ${format.color}`} />
                <h4 className="font-semibold">{format.name}</h4>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                {format.description}
              </p>
              <div className="flex flex-wrap gap-1">
                {format.features.map((feature) => (
                  <Badge key={feature} variant="secondary" className="text-xs">
                    {feature}
                  </Badge>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Features */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Zap className="h-5 w-5" />
          Key Features
        </h3>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <div key={feature.title} className="flex gap-3">
                <div className="flex-shrink-0">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-sm">{feature.title}</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    {feature.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Common Use Cases */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <ArrowRightLeft className="h-5 w-5" />
          Common Use Cases
        </h3>
        <div className="grid gap-2 md:grid-cols-2">
          {useCases.map((useCase, index) => (
            <div key={index} className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
              <span className="text-sm">{useCase}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Tips */}
      <div className="bg-muted/50 rounded-lg p-4">
        <h4 className="font-semibold text-sm mb-2">💡 Pro Tips</h4>
        <ul className="text-sm text-muted-foreground space-y-1">
          <li>• Use the swap button to quickly reverse conversion direction</li>
          <li>• Load sample data to see format examples</li>
          <li>• Download converted files with proper extensions</li>
          <li>• All processing happens locally - your data stays private</li>
        </ul>
      </div>
    </KnowledgeSection>
  )
}
