'use client'

import { ToolLayout } from '@/components/tool-layout'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Activity, Search } from 'lucide-react'
import { useState, useMemo } from 'react'
import { HTTPKnowledge } from './knowledge'

type StatusCode = {
  code: number
  name: string
  description: string
  category:
    | 'informational'
    | 'success'
    | 'redirection'
    | 'client-error'
    | 'server-error'
  useCases: string[]
}

const statusCodes: StatusCode[] = [
  // 1xx Informational
  {
    code: 100,
    name: 'Continue',
    description:
      'The server has received the request headers and the client should proceed to send the request body.',
    category: 'informational',
    useCases: [
      'Used when uploading large files',
      'When client expects a 100-continue response',
    ],
  },
  {
    code: 101,
    name: 'Switching Protocols',
    description:
      'The server is switching protocols as requested by the client.',
    category: 'informational',
    useCases: ['Upgrading from HTTP to WebSocket', 'Protocol negotiation'],
  },
  {
    code: 102,
    name: 'Processing',
    description:
      'The server has received and is processing the request, but no response is available yet.',
    category: 'informational',
    useCases: ['Long-running WebDAV requests', 'Preventing client timeout'],
  },
  {
    code: 103,
    name: 'Early Hints',
    description:
      'Used to return some response headers before final HTTP message.',
    category: 'informational',
    useCases: ['Preloading resources', 'Performance optimization'],
  },

  // 2xx Success
  {
    code: 200,
    name: 'OK',
    description:
      'The request succeeded. The meaning of success depends on the HTTP method.',
    category: 'success',
    useCases: [
      'Successful GET request',
      'Successful POST/PUT/PATCH request',
      'Most common success response',
    ],
  },
  {
    code: 201,
    name: 'Created',
    description:
      'The request succeeded and a new resource was created as a result.',
    category: 'success',
    useCases: [
      'POST request that creates a new resource',
      'New user registration',
      'Creating a new record',
    ],
  },
  {
    code: 202,
    name: 'Accepted',
    description: 'The request has been received but not yet acted upon.',
    category: 'success',
    useCases: [
      'Asynchronous processing',
      'Batch operations',
      'Queue-based systems',
    ],
  },
  {
    code: 203,
    name: 'Non-Authoritative Information',
    description:
      'The request was successful but the enclosed payload has been modified by a transforming proxy.',
    category: 'success',
    useCases: ['Proxy modifications', 'Cached responses with modifications'],
  },
  {
    code: 204,
    name: 'No Content',
    description:
      'The server successfully processed the request but is not returning any content.',
    category: 'success',
    useCases: [
      'Successful DELETE request',
      'Form submission without redirect',
      'Auto-save operations',
    ],
  },
  {
    code: 205,
    name: 'Reset Content',
    description:
      'The server successfully processed the request and is asking the client to reset the document view.',
    category: 'success',
    useCases: ['Form reset after submission', 'Clear input fields'],
  },
  {
    code: 206,
    name: 'Partial Content',
    description:
      'The server is delivering only part of the resource due to a range header sent by the client.',
    category: 'success',
    useCases: [
      'Video/audio streaming',
      'Resume interrupted downloads',
      'Loading large files in chunks',
    ],
  },

  // 3xx Redirection
  {
    code: 300,
    name: 'Multiple Choices',
    description: 'The request has more than one possible response.',
    category: 'redirection',
    useCases: ['Multiple format options', 'Content negotiation'],
  },
  {
    code: 301,
    name: 'Moved Permanently',
    description:
      'The URL of the requested resource has been changed permanently.',
    category: 'redirection',
    useCases: [
      'SEO-friendly redirects',
      'Domain changes',
      'URL structure changes',
    ],
  },
  {
    code: 302,
    name: 'Found',
    description: 'The URI of requested resource has been changed temporarily.',
    category: 'redirection',
    useCases: ['Temporary redirects', 'A/B testing', 'Maintenance mode'],
  },
  {
    code: 303,
    name: 'See Other',
    description:
      'The server sent this response to direct the client to get the requested resource at another URI with a GET request.',
    category: 'redirection',
    useCases: [
      'POST/PUT/DELETE redirect pattern',
      'Preventing form resubmission',
    ],
  },
  {
    code: 304,
    name: 'Not Modified',
    description:
      'The resource has not been modified since the version specified by the request headers.',
    category: 'redirection',
    useCases: [
      'Browser caching',
      'Conditional GET requests',
      'Bandwidth optimization',
    ],
  },
  {
    code: 307,
    name: 'Temporary Redirect',
    description:
      'The server sends this response to direct the client to get the requested resource at another URI with same method.',
    category: 'redirection',
    useCases: ['Temporary redirects preserving method', 'Server maintenance'],
  },
  {
    code: 308,
    name: 'Permanent Redirect',
    description:
      'The resource is now permanently located at another URI, and the request method should not be changed.',
    category: 'redirection',
    useCases: ['Permanent redirects preserving POST method', 'API versioning'],
  },

  // 4xx Client Errors
  {
    code: 400,
    name: 'Bad Request',
    description:
      'The server cannot process the request due to client error (e.g., malformed syntax).',
    category: 'client-error',
    useCases: [
      'Invalid JSON payload',
      'Missing required parameters',
      'Malformed request syntax',
    ],
  },
  {
    code: 401,
    name: 'Unauthorized',
    description:
      'The client must authenticate itself to get the requested response.',
    category: 'client-error',
    useCases: [
      'Missing authentication token',
      'Invalid credentials',
      'Expired session',
    ],
  },
  {
    code: 402,
    name: 'Payment Required',
    description:
      'Reserved for future use. Originally intended for digital payment systems.',
    category: 'client-error',
    useCases: [
      'Paywall content',
      'Subscription required',
      'Payment processing',
    ],
  },
  {
    code: 403,
    name: 'Forbidden',
    description: 'The client does not have access rights to the content.',
    category: 'client-error',
    useCases: [
      'Insufficient permissions',
      'IP blocking',
      'Authentication succeeded but authorization failed',
    ],
  },
  {
    code: 404,
    name: 'Not Found',
    description: 'The server cannot find the requested resource.',
    category: 'client-error',
    useCases: ['Page not found', 'Resource deleted', 'Invalid URL'],
  },
  {
    code: 405,
    name: 'Method Not Allowed',
    description:
      'The request method is not supported for the requested resource.',
    category: 'client-error',
    useCases: [
      'Using POST on GET-only endpoint',
      'DELETE not allowed',
      'Method restrictions',
    ],
  },
  {
    code: 406,
    name: 'Not Acceptable',
    description:
      'The server cannot produce a response matching the list of acceptable values in the request headers.',
    category: 'client-error',
    useCases: ['Content negotiation failure', 'Unsupported Accept header'],
  },
  {
    code: 407,
    name: 'Proxy Authentication Required',
    description: 'Authentication must be done by a proxy.',
    category: 'client-error',
    useCases: ['Corporate proxy authentication', 'Network access control'],
  },
  {
    code: 408,
    name: 'Request Timeout',
    description: 'The server timed out waiting for the request.',
    category: 'client-error',
    useCases: [
      'Slow network connection',
      'Client taking too long to send request',
    ],
  },
  {
    code: 409,
    name: 'Conflict',
    description: 'The request conflicts with the current state of the server.',
    category: 'client-error',
    useCases: [
      'Concurrent updates',
      'Version conflicts',
      'Duplicate resource creation',
    ],
  },
  {
    code: 410,
    name: 'Gone',
    description:
      'The requested resource is no longer available and will not be available again.',
    category: 'client-error',
    useCases: [
      'Permanently deleted resource',
      'Expired content',
      'API deprecation',
    ],
  },
  {
    code: 411,
    name: 'Length Required',
    description: 'The server requires the Content-Length header.',
    category: 'client-error',
    useCases: ['Missing Content-Length in POST/PUT', 'Upload requirements'],
  },
  {
    code: 412,
    name: 'Precondition Failed',
    description:
      'The server does not meet one of the preconditions in the request headers.',
    category: 'client-error',
    useCases: [
      'Conditional requests',
      'If-Match header failures',
      'Optimistic locking',
    ],
  },
  {
    code: 413,
    name: 'Payload Too Large',
    description: 'Request entity is larger than limits defined by server.',
    category: 'client-error',
    useCases: [
      'File upload size limit',
      'Request body too large',
      'JSON payload size limit',
    ],
  },
  {
    code: 414,
    name: 'URI Too Long',
    description:
      'The URI requested by the client is longer than the server is willing to interpret.',
    category: 'client-error',
    useCases: [
      'Excessive query parameters',
      'Long URLs',
      'GET request with too much data',
    ],
  },
  {
    code: 415,
    name: 'Unsupported Media Type',
    description:
      'The media format of the requested data is not supported by the server.',
    category: 'client-error',
    useCases: [
      'Wrong Content-Type header',
      'Unsupported file format',
      'API expects JSON but receives XML',
    ],
  },
  {
    code: 416,
    name: 'Range Not Satisfiable',
    description: 'The range specified by the Range header cannot be fulfilled.',
    category: 'client-error',
    useCases: ['Invalid byte range request', 'Streaming range errors'],
  },
  {
    code: 417,
    name: 'Expectation Failed',
    description:
      'The expectation indicated by the Expect header cannot be met.',
    category: 'client-error',
    useCases: ['100-continue expectation not met'],
  },
  {
    code: 418,
    name: "I'm a teapot",
    description:
      "The server refuses to brew coffee because it is a teapot (April Fools' joke in RFC 2324).",
    category: 'client-error',
    useCases: ['Easter egg', 'Joke status code'],
  },
  {
    code: 421,
    name: 'Misdirected Request',
    description:
      'The request was directed at a server that is not able to produce a response.',
    category: 'client-error',
    useCases: ['HTTP/2 server mismatch'],
  },
  {
    code: 422,
    name: 'Unprocessable Entity',
    description: 'The request was well-formed but contains semantic errors.',
    category: 'client-error',
    useCases: [
      'Validation errors',
      'Business logic errors',
      'Invalid field values',
    ],
  },
  {
    code: 423,
    name: 'Locked',
    description: 'The resource being accessed is locked.',
    category: 'client-error',
    useCases: [
      'WebDAV locked resources',
      'Resource being edited by another user',
    ],
  },
  {
    code: 424,
    name: 'Failed Dependency',
    description: 'The request failed due to failure of a previous request.',
    category: 'client-error',
    useCases: ['WebDAV dependent request failures'],
  },
  {
    code: 425,
    name: 'Too Early',
    description:
      'The server is unwilling to risk processing a request that might be replayed.',
    category: 'client-error',
    useCases: ['Preventing replay attacks'],
  },
  {
    code: 426,
    name: 'Upgrade Required',
    description:
      'The server refuses to perform the request using the current protocol.',
    category: 'client-error',
    useCases: ['Force HTTPS upgrade', 'Protocol version upgrade'],
  },
  {
    code: 428,
    name: 'Precondition Required',
    description: 'The server requires the request to be conditional.',
    category: 'client-error',
    useCases: ['Lost update problem prevention', 'Requiring If-Match header'],
  },
  {
    code: 429,
    name: 'Too Many Requests',
    description:
      'The user has sent too many requests in a given amount of time.',
    category: 'client-error',
    useCases: ['Rate limiting', 'API throttling', 'DDoS protection'],
  },
  {
    code: 431,
    name: 'Request Header Fields Too Large',
    description:
      'The server refuses to process the request because header fields are too large.',
    category: 'client-error',
    useCases: ['Cookie size too large', 'Header size limit'],
  },
  {
    code: 451,
    name: 'Unavailable For Legal Reasons',
    description: 'The resource is unavailable due to legal reasons.',
    category: 'client-error',
    useCases: [
      'Content censorship',
      'DMCA takedown',
      'Geographic restrictions',
    ],
  },

  // 5xx Server Errors
  {
    code: 500,
    name: 'Internal Server Error',
    description:
      'The server encountered an unexpected condition that prevented it from fulfilling the request.',
    category: 'server-error',
    useCases: [
      'Unhandled exceptions',
      'Server-side bugs',
      'Configuration errors',
    ],
  },
  {
    code: 501,
    name: 'Not Implemented',
    description:
      'The server does not support the functionality required to fulfill the request.',
    category: 'server-error',
    useCases: ['Unsupported HTTP method', 'Feature not implemented'],
  },
  {
    code: 502,
    name: 'Bad Gateway',
    description:
      'The server, while acting as a gateway, received an invalid response from the upstream server.',
    category: 'server-error',
    useCases: [
      'Proxy server errors',
      'Upstream server down',
      'Load balancer issues',
    ],
  },
  {
    code: 503,
    name: 'Service Unavailable',
    description:
      'The server is not ready to handle the request, often due to maintenance or overload.',
    category: 'server-error',
    useCases: [
      'Server maintenance',
      'Server overload',
      'Database connection issues',
    ],
  },
  {
    code: 504,
    name: 'Gateway Timeout',
    description:
      'The server, acting as a gateway, did not receive a timely response from the upstream server.',
    category: 'server-error',
    useCases: [
      'Upstream server timeout',
      'Slow backend services',
      'Network issues',
    ],
  },
  {
    code: 505,
    name: 'HTTP Version Not Supported',
    description:
      'The server does not support the HTTP protocol version used in the request.',
    category: 'server-error',
    useCases: ['Outdated HTTP version', 'Protocol compatibility issues'],
  },
  {
    code: 506,
    name: 'Variant Also Negotiates',
    description: 'The server has an internal configuration error.',
    category: 'server-error',
    useCases: ['Content negotiation misconfiguration'],
  },
  {
    code: 507,
    name: 'Insufficient Storage',
    description:
      'The server is unable to store the representation needed to complete the request.',
    category: 'server-error',
    useCases: ['Disk space full', 'Storage quota exceeded'],
  },
  {
    code: 508,
    name: 'Loop Detected',
    description:
      'The server detected an infinite loop while processing the request.',
    category: 'server-error',
    useCases: ['WebDAV infinite redirect loops', 'Circular references'],
  },
  {
    code: 510,
    name: 'Not Extended',
    description:
      'Further extensions to the request are required for the server to fulfill it.',
    category: 'server-error',
    useCases: ['Extension policy requirements'],
  },
  {
    code: 511,
    name: 'Network Authentication Required',
    description: 'The client needs to authenticate to gain network access.',
    category: 'server-error',
    useCases: [
      'Captive portal',
      'WiFi login required',
      'Network access control',
    ],
  },
]

const getCategoryColor = (category: StatusCode['category']) => {
  switch (category) {
    case 'informational':
      return 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20'
    case 'success':
      return 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20'
    case 'redirection':
      return 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20'
    case 'client-error':
      return 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20'
    case 'server-error':
      return 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20'
  }
}

const getCategoryLabel = (category: StatusCode['category']) => {
  switch (category) {
    case 'informational':
      return '1xx Informational'
    case 'success':
      return '2xx Success'
    case 'redirection':
      return '3xx Redirection'
    case 'client-error':
      return '4xx Client Error'
    case 'server-error':
      return '5xx Server Error'
  }
}

export default function HTTPStatusCodePage() {
  const [search, setSearch] = useState('')

  const filteredCodes = useMemo(() => {
    const searchLower = search.toLowerCase().trim()
    if (!searchLower) return statusCodes

    return statusCodes.filter((code) => {
      return (
        code.code.toString().includes(searchLower) ||
        code.name.toLowerCase().includes(searchLower) ||
        code.description.toLowerCase().includes(searchLower) ||
        code.useCases.some((useCase) =>
          useCase.toLowerCase().includes(searchLower)
        )
      )
    })
  }, [search])

  const groupedCodes = useMemo(() => {
    const groups: Record<StatusCode['category'], StatusCode[]> = {
      informational: [],
      success: [],
      redirection: [],
      'client-error': [],
      'server-error': [],
    }

    filteredCodes.forEach((code) => {
      groups[code.category].push(code)
    })

    return groups
  }, [filteredCodes])

  return (
    <ToolLayout
      title="HTTP Status Code Reference"
      description="Comprehensive reference for HTTP status codes with descriptions and use cases"
      icon={Activity}
      badges={[{ label: 'Reference' }]}
    >
      <HTTPKnowledge />

      <Card className="border-2 shadow-xl p-6 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search by code, name, or description..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 border-2 shadow-sm text-base h-12"
          />
        </div>
        {search && (
          <p className="text-sm text-muted-foreground mt-3">
            Found {filteredCodes.length} status code
            {filteredCodes.length !== 1 ? 's' : ''}
          </p>
        )}
      </Card>

      <div className="space-y-8">
        {(Object.keys(groupedCodes) as StatusCode['category'][]).map(
          (category) => {
            const codes = groupedCodes[category]
            if (codes.length === 0) return null

            return (
              <div key={category}>
                <div className="mb-4">
                  <h2 className="text-2xl font-bold flex items-center gap-3">
                    <Badge
                      className={`${getCategoryColor(category)} border text-sm px-3 py-1`}
                    >
                      {getCategoryLabel(category)}
                    </Badge>
                  </h2>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  {codes.map((statusCode) => (
                    <Card
                      key={statusCode.code}
                      className="border-2 shadow-lg hover:shadow-xl transition-all p-5"
                    >
                      <div className="flex items-start gap-4">
                        <div
                          className={`${getCategoryColor(statusCode.category)} border-2 rounded-lg px-4 py-2 font-mono font-bold text-lg shrink-0`}
                        >
                          {statusCode.code}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-lg mb-1">
                            {statusCode.name}
                          </h3>
                          <p className="text-sm text-muted-foreground mb-3">
                            {statusCode.description}
                          </p>
                          {statusCode.useCases.length > 0 && (
                            <div>
                              <p className="text-xs font-semibold text-muted-foreground mb-2">
                                Common Use Cases:
                              </p>
                              <ul className="text-sm space-y-1">
                                {statusCode.useCases.map((useCase, index) => (
                                  <li
                                    key={index}
                                    className="flex items-start gap-2"
                                  >
                                    <span className="text-primary mt-1 shrink-0">
                                      •
                                    </span>
                                    <span className="text-muted-foreground">
                                      {useCase}
                                    </span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )
          }
        )}
      </div>

      {filteredCodes.length === 0 && (
        <Card className="border-2 border-dashed p-12 text-center">
          <p className="text-muted-foreground text-lg">
            No status codes found matching &quot;{search}&quot;
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Try searching by code number, name, or description
          </p>
        </Card>
      )}
    </ToolLayout>
  )
}
