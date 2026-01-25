import { Card } from '@/components/ui/card'

interface CodeSamplesProps {
  sourceURL: string
  credentials: string
  method: string
  needsPreflight: boolean
}

export function CodeSamples({
  sourceURL,
  credentials,
  method,
  needsPreflight,
}: CodeSamplesProps) {
  return (
    <Card className="border-2 shadow-xl overflow-hidden">
      <div className="bg-gradient-to-r from-purple-500/10 via-purple-500/5 to-transparent p-5">
        <h3 className="font-semibold text-lg">Implementation Examples</h3>
      </div>
      <div className="p-6 pt-4 space-y-4">
        <div>
          <h4 className="font-semibold mb-2">Node.js / Express</h4>
          <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
            {`app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '${sourceURL || 'https://myapp.com'}');
  ${credentials === 'include' ? "res.header('Access-Control-Allow-Credentials', 'true');\n  " : ''}res.header('Access-Control-Allow-Methods', '${method}');
  ${needsPreflight ? `res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');\n  ` : ''}if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});`}
          </pre>
        </div>

        <div>
          <h4 className="font-semibold mb-2">Nginx</h4>
          <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
            {`add_header 'Access-Control-Allow-Origin' '${sourceURL || 'https://myapp.com'}';
${credentials === 'include' ? "add_header 'Access-Control-Allow-Credentials' 'true';\n" : ''}add_header 'Access-Control-Allow-Methods' '${method}';
${needsPreflight ? "add_header 'Access-Control-Allow-Headers' 'Content-Type, Authorization';\n" : ''}
if ($request_method = 'OPTIONS') {
    return 204;
}`}
          </pre>
        </div>
      </div>
    </Card>
  )
}
