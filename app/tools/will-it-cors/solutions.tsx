import { Card } from '@/components/ui/card'
import { CheckCircle2 } from 'lucide-react'

interface SolutionsProps {
  solutions: string[]
  responseHeaders: string[]
}

export function Solutions({ solutions, responseHeaders }: SolutionsProps) {
  if (solutions.length === 0) return null

  return (
    <Card className="border-2 shadow-xl overflow-hidden">
      <div className="bg-gradient-to-r from-green-500/10 via-green-500/5 to-transparent p-5">
        <h3 className="font-semibold text-lg flex items-center gap-2">
          <CheckCircle2 className="h-5 w-5 text-green-500" />
          Server Configuration Required
        </h3>
      </div>
      <div className="p-6 pt-4 space-y-4">
        <div>
          <h4 className="font-semibold mb-2">
            The server must include these headers:
          </h4>
          <ul className="space-y-2 mb-4">
            {solutions.map((solution, index) => (
              <li key={index} className="flex items-start gap-2 text-sm">
                <span className="text-green-500 mt-1 shrink-0">✓</span>
                <span>{solution}</span>
              </li>
            ))}
          </ul>
        </div>

        {responseHeaders.length > 0 && (
          <div>
            <h4 className="font-semibold mb-2">
              Response Headers (Actual Request):
            </h4>
            <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
              {responseHeaders.join('\n')}
            </pre>
          </div>
        )}
      </div>
    </Card>
  )
}
