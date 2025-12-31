import { Badge } from '@/components/ui/badge'
import { CopyButton } from '@/components/copy-button'

export interface IMatch {
  text: string
  index: number
  groups: string[]
}

export function Match({
  match: { text, index, groups },
  idx,
}: {
  match: { text: string; index: number; groups: string[] }
  idx: number
}) {
  return (
    <div
      key={`${index}-${idx}`}
      className="border rounded-lg space-y-2 bg-muted/50 p-4"
    >
      <div className="space-y-2 flex-1">
        <div className="flex gap-2 items-center">
          <Badge variant="secondary">Match {idx + 1}</Badge>
          <span className="text-xs text-muted-foreground">
            Position: {index}
          </span>
        </div>
        <div className="flex gap-2 items-center">
          <p className="bg-background border rounded font-mono flex-1 text-sm p-2 break-all">
            {text}
          </p>
          <CopyButton text={text} showText={false} className="h-8 w-8" />
        </div>
      </div>

      {groups.length > 0 && (
        <div className="border-t space-y-2 pt-2">
          <p className="font-semibold text-xs text-muted-foreground">
            Captured Groups ({groups.length})
          </p>
          <div className="space-y-1">
            {groups.map((group, groupIdx) => (
              <div key={groupIdx} className="flex text-sm gap-2 items-center">
                <Badge variant="outline" className="font-mono">
                  ${groupIdx + 1}
                </Badge>
                <code className="bg-background border rounded font-mono flex-1 py-0.5 px-2">
                  {group || '(empty)'}
                </code>
                {group && (
                  <CopyButton text={group} showText={false} size="sm" />
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
