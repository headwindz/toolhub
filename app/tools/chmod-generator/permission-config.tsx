import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Shield, Terminal, Eye } from 'lucide-react'

export const enum Role {
  Owner = 'owner',
  Group = 'group',
  Others = 'others',
}

export const enum Permission {
  Read = 'read',
  Write = 'write',
  Execute = 'execute',
}

export const ROLES = [Role.Owner, Role.Group, Role.Others] as const
export const PERMISSIONS = [
  Permission.Read,
  Permission.Write,
  Permission.Execute,
] as const

export type RolePermissions = {
  [key in Permission]: boolean
}

export type PermissionState = {
  [key in Role]: RolePermissions
}

type PermissionProps = {
  permissions: PermissionState
  updatePermission: (role: Role, permission: Permission) => void
  setCommonPermission: (octal: string) => void
}

export function PermissionConfig({
  permissions,
  updatePermission,
  setCommonPermission,
}: PermissionProps) {
  const renderRole = (role: Role) => (
    <div key={role} className="space-y-3 p-4 bg-muted/50 rounded-lg">
      <h4 className="font-medium capitalize flex items-center gap-2">
        {role === Role.Owner && <Eye className="h-4 w-4" />}
        {role === Role.Group && <Shield className="h-4 w-4" />}
        {role === Role.Others && <Terminal className="h-4 w-4" />}
      </h4>

      <div className="space-y-2">
        {PERMISSIONS.map((permission) => (
          <div key={permission} className="flex items-center space-x-2">
            <Checkbox
              id={`${role}-${permission}`}
              checked={permissions[role][permission]}
              onCheckedChange={() => updatePermission(role, permission)}
            />
            <Label htmlFor={`${role}-${permission}`} className="capitalize">
              {permission}
            </Label>
            <Badge variant="outline" className="ml-auto">
              {permission === 'read' ? 'r' : permission === 'write' ? 'w' : 'x'}
            </Badge>
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-blue-600" />
            <h3 className="text-lg font-semibold">File Permissions</h3>
          </div>

          {/* Permission Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ROLES.map(renderRole)}
          </div>
        </div>

        {/* Common Permissions */}
        <div className="space-y-3">
          <h4 className="font-medium">Common Permission Presets</h4>
          <div className="flex flex-wrap gap-2">
            {[
              { octal: '755', desc: 'Executable (755)' },
              { octal: '644', desc: 'Read-only (644)' },
              { octal: '600', desc: 'Private (600)' },
              { octal: '777', desc: 'Full access (777)' },
              { octal: '700', desc: 'Owner only (700)' },
            ].map((preset) => (
              <Button
                key={preset.octal}
                variant="outline"
                size="sm"
                onClick={() => setCommonPermission(preset.octal)}
              >
                {preset.desc}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </Card>
  )
}
