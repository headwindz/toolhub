import { KnowledgeSection } from '@/components/knowledge-section'

export function ChmodKnowledge() {
  return (
    <KnowledgeSection
      title="Understanding chmod and File Permissions"
      description="Learn about Unix/Linux file permission system"
    >
      <div className="space-y-2">
        <h4 className="font-semibold text-base">What is chmod?</h4>
        <p className="text-muted-foreground">
          chmod (change mode) is a Unix/Linux command that changes the file
          system permissions of files and directories. It controls who can read,
          write, or execute files, providing essential security for your system.
        </p>
      </div>

      <div className="space-y-2">
        <h4 className="font-semibold text-base">Permission Types</h4>
        <ul className="space-y-1 text-muted-foreground">
          <li>
            <strong>Read (r):</strong> Permission to read/view the file contents
          </li>
          <li>
            <strong>Write (w):</strong> Permission to modify or delete the file
          </li>
          <li>
            <strong>Execute (x):</strong> Permission to run the file as a
            program or script
          </li>
        </ul>
      </div>

      <div className="space-y-2">
        <h4 className="font-semibold text-base">User Categories</h4>
        <ul className="space-y-1 text-muted-foreground">
          <li>
            <strong>Owner (u):</strong> The user who owns the file
          </li>
          <li>
            <strong>Group (g):</strong> Users who belong to the file's group
          </li>
          <li>
            <strong>Others (o):</strong> All other users on the system
          </li>
        </ul>
      </div>

      <div className="space-y-2">
        <h4 className="font-semibold text-base">Octal Notation</h4>
        <p className="text-muted-foreground">
          Permissions are often represented using three-digit octal numbers
          (0-7):
        </p>
        <ul className="space-y-1 text-muted-foreground ml-4">
          <li>4 = Read permission</li>
          <li>2 = Write permission</li>
          <li>1 = Execute permission</li>
        </ul>
        <p className="text-muted-foreground">
          Add these numbers together to get the permission value for each
          category.
        </p>
      </div>

      <div className="space-y-2">
        <h4 className="font-semibold text-base">Common Permission Examples</h4>
        <div className="space-y-1 text-sm">
          <div className="flex justify-between bg-muted/50 p-2 rounded">
            <span className="font-mono">755</span>
            <span className="text-muted-foreground">
              rwxr-xr-x (executable files)
            </span>
          </div>
          <div className="flex justify-between bg-muted/50 p-2 rounded">
            <span className="font-mono">644</span>
            <span className="text-muted-foreground">
              rw-r--r-- (regular files)
            </span>
          </div>
          <div className="flex justify-between bg-muted/50 p-2 rounded">
            <span className="font-mono">600</span>
            <span className="text-muted-foreground">
              rw------- (private files)
            </span>
          </div>
          <div className="flex justify-between bg-muted/50 p-2 rounded">
            <span className="font-mono">700</span>
            <span className="text-muted-foreground">
              rwx------ (private directories)
            </span>
          </div>
          <div className="flex justify-between bg-muted/50 p-2 rounded">
            <span className="font-mono">777</span>
            <span className="text-muted-foreground">
              rwxrwxrwx (full access - use with caution!)
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <h4 className="font-semibold text-base">Symbolic Notation</h4>
        <p className="text-muted-foreground">
          You can also use symbolic notation with chmod:
        </p>
        <ul className="space-y-1 text-muted-foreground text-sm">
          <li>
            <code className="bg-muted px-1 rounded">chmod u+x file</code> - Add
            execute permission for owner
          </li>
          <li>
            <code className="bg-muted px-1 rounded">chmod g-w file</code> -
            Remove write permission for group
          </li>
          <li>
            <code className="bg-muted px-1 rounded">chmod o=r file</code> - Set
            others to read-only
          </li>
          <li>
            <code className="bg-muted px-1 rounded">chmod a+r file</code> - Add
            read permission for all
          </li>
        </ul>
      </div>

      <div className="space-y-2">
        <h4 className="font-semibold text-base">Security Best Practices</h4>
        <ul className="space-y-1 text-muted-foreground">
          <li>Never use 777 permissions unless absolutely necessary</li>
          <li>Give the minimum permissions required for functionality</li>
          <li>Regularly audit file permissions on important files</li>
          <li>Use 644 for regular files and 755 for executables as defaults</li>
          <li>Protect sensitive files with 600 permissions</li>
        </ul>
      </div>

      <div className="space-y-2">
        <h4 className="font-semibold text-base">Useful Commands</h4>
        <ul className="space-y-1 text-muted-foreground text-sm">
          <li>
            <code className="bg-muted px-1 rounded">ls -l</code> - View file
            permissions
          </li>
          <li>
            <code className="bg-muted px-1 rounded">
              chmod -R 755 directory/
            </code>{' '}
            - Apply permissions recursively
          </li>
          <li>
            <code className="bg-muted px-1 rounded">umask</code> - View/set
            default permissions for new files
          </li>
        </ul>
      </div>
    </KnowledgeSection>
  )
}
