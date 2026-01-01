import { Link2 } from 'lucide-react'
import { UrlField } from './url-field'
import { QueryParameters } from './query-parameters'
import { UrlParts as UrlPartsType } from './types'

type UrlPartsProps = {
  urlParts: UrlPartsType
  updateUrlPart: (key: string, value: string) => void
}

export function UrlParts({ urlParts, updateUrlPart }: UrlPartsProps) {
  const { protocol, host, port, pathname, hash, search } = urlParts

  return (
    <div className="space-y-4">
      <h4 className="font-medium flex items-center gap-2">
        <Link2 className="h-4 w-4" />
        URL Parts
      </h4>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <UrlField
          id="protocol"
          label="Protocol"
          value={protocol}
          onChange={(value) => updateUrlPart('protocol', value)}
          placeholder="https"
        />

        <UrlField
          id="host"
          label="Host"
          value={host}
          onChange={(value) => updateUrlPart('host', value)}
          placeholder="example.com"
        />

        <UrlField
          id="port"
          label="Port"
          value={port}
          onChange={(value) => updateUrlPart('port', value)}
          placeholder="80, 443, 8080"
        />

        <UrlField
          id="pathname"
          label="Path"
          value={pathname}
          onChange={(value) => updateUrlPart('pathname', value)}
          placeholder="/path/to/page"
        />

        <UrlField
          id="hash"
          label="Fragment"
          value={hash}
          onChange={(value) => updateUrlPart('hash', value)}
          placeholder="section"
        />
      </div>

      <QueryParameters search={search} updateUrlPart={updateUrlPart} />
    </div>
  )
}
