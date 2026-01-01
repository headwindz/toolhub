'use client'

import { ToolLayout } from '@/components/tool-layout'
import { Terminal } from 'lucide-react'
import { useState } from 'react'
import { ChmodKnowledge } from './knowledge'
import {
  PermissionConfig,
  Role,
  Permission,
  PermissionState,
} from './permission-config'
import { Generator } from './generator'

export default function ChmodGeneratorPage() {
  const [permissions, setPermissions] = useState<PermissionState>({
    [Role.Owner]: {
      [Permission.Read]: true,
      [Permission.Write]: true,
      [Permission.Execute]: true,
    },
    [Role.Group]: {
      [Permission.Read]: true,
      [Permission.Write]: false,
      [Permission.Execute]: false,
    },
    [Role.Others]: {
      [Permission.Read]: true,
      [Permission.Write]: false,
      [Permission.Execute]: false,
    },
  })
  const [customCommand, setCustomCommand] = useState('')

  const calculateOctal = () => {
    const { owner, group, others } = permissions
    const ownerValue =
      (owner[Permission.Read] ? 4 : 0) +
      (owner[Permission.Write] ? 2 : 0) +
      (owner[Permission.Execute] ? 1 : 0)
    const groupValue =
      (group[Permission.Read] ? 4 : 0) +
      (group[Permission.Write] ? 2 : 0) +
      (group[Permission.Execute] ? 1 : 0)
    const othersValue =
      (others[Permission.Read] ? 4 : 0) +
      (others[Permission.Write] ? 2 : 0) +
      (others[Permission.Execute] ? 1 : 0)
    return `${ownerValue}${groupValue}${othersValue}`
  }

  const calculateSymbolic = () => {
    const { owner, group, others } = permissions
    const ownerStr = `${owner[Permission.Read] ? 'r' : '-'}${owner[Permission.Write] ? 'w' : '-'}${owner[Permission.Execute] ? 'x' : '-'}`
    const groupStr = `${group[Permission.Read] ? 'r' : '-'}${group[Permission.Write] ? 'w' : '-'}${group[Permission.Execute] ? 'x' : '-'}`
    const othersStr = `${others[Permission.Read] ? 'r' : '-'}${others[Permission.Write] ? 'w' : '-'}${others[Permission.Execute] ? 'x' : '-'}`
    return `${ownerStr}${groupStr}${othersStr}`
  }

  const getPermissionDescription = () => {
    const octal = calculateOctal()
    const descriptions = {
      '777': 'Full access for everyone (not recommended for security)',
      '755': 'Standard executable file permissions',
      '644':
        'Standard file permissions (read-write for owner, read-only for others)',
      '600': 'Private file (read-write for owner only)',
      '700': 'Private directory (full access for owner only)',
      '750': 'Group-readable directory',
      '664': 'Group-writable file',
    }
    return (
      descriptions[octal as keyof typeof descriptions] || 'Custom permissions'
    )
  }

  const generateCommand = () => {
    const octal = calculateOctal()
    const filename = customCommand || 'filename'
    return `chmod ${octal} ${filename}`
  }

  const updatePermission = (role: Role, permission: Permission) => {
    setPermissions((prev) => ({
      ...prev,
      [role]: {
        ...prev[role],
        [permission]: !prev[role][permission],
      },
    }))
  }

  const setCommonPermission = (octal: string) => {
    const digits = octal.split('').map(Number)
    const [ownerVal, groupVal, othersVal] = digits

    const parseValue = (val: number) => ({
      [Permission.Read]: !!(val & 4),
      [Permission.Write]: !!(val & 2),
      [Permission.Execute]: !!(val & 1),
    })

    setPermissions({
      [Role.Owner]: parseValue(ownerVal),
      [Role.Group]: parseValue(groupVal),
      [Role.Others]: parseValue(othersVal),
    })
  }

  const setOctalPermission = (octal: string) => {
    // Validate and parse octal input
    if (!/^[0-7]{3}$/.test(octal)) return
    
    const digits = octal.split('').map(Number)
    const [ownerVal, groupVal, othersVal] = digits

    const parseValue = (val: number) => ({
      [Permission.Read]: !!(val & 4),
      [Permission.Write]: !!(val & 2),
      [Permission.Execute]: !!(val & 1),
    })

    setPermissions({
      [Role.Owner]: parseValue(ownerVal),
      [Role.Group]: parseValue(groupVal),
      [Role.Others]: parseValue(othersVal),
    })
  }

  const setSymbolicPermission = (symbolic: string) => {
    // Validate and parse symbolic input
    if (!/^[r\-][w\-][x\-][r\-][w\-][x\-][r\-][w\-][x\-]$/.test(symbolic)) return

    const parseSymbolicSection = (section: string) => ({
      [Permission.Read]: section[0] === 'r',
      [Permission.Write]: section[1] === 'w',
      [Permission.Execute]: section[2] === 'x',
    })

    setPermissions({
      [Role.Owner]: parseSymbolicSection(symbolic.slice(0, 3)),
      [Role.Group]: parseSymbolicSection(symbolic.slice(3, 6)),
      [Role.Others]: parseSymbolicSection(symbolic.slice(6, 9)),
    })
  }

  return (
    <ToolLayout
      title="chmod Generator"
      description="Generate chmod commands and understand file permissions"
      icon={Terminal}
    >
      <div className="space-y-6">
        <ChmodKnowledge />
        <PermissionConfig
          permissions={permissions}
          updatePermission={updatePermission}
          setCommonPermission={setCommonPermission}
        />

        <Generator
          customCommand={customCommand}
          setCustomCommand={setCustomCommand}
          generateCommand={generateCommand}
          calculateOctal={calculateOctal}
          calculateSymbolic={calculateSymbolic}
          getPermissionDescription={getPermissionDescription}
          setOctalPermission={setOctalPermission}
          setSymbolicPermission={setSymbolicPermission}
        />
      </div>
    </ToolLayout>
  )
}
