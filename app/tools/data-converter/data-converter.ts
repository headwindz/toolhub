import { DataFormat } from '@/app/tools/data-converter/utils'

export const SAMPLE_DATA: Record<DataFormat, string> = {
  json: JSON.stringify(
    {
      user: {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        preferences: {
          theme: 'dark',
          notifications: true,
          language: 'en',
        },
        tags: ['admin', 'developer', 'active'],
      },
      metadata: {
        lastLogin: '2024-01-01T10:00:00Z',
        version: '1.2.3',
      },
    },
    null,
    2
  ),
  yaml: `user:
  id: 1
  name: John Doe
  email: john@example.com
  preferences:
    theme: dark
    notifications: true
    language: en
  tags:
    - admin
    - developer
    - active
metadata:
  lastLogin: '2024-01-01T10:00:00Z'
  version: 1.2.3`,
  toml: `[user]
id = 1
name = "John Doe"
email = "john@example.com"
tags = ["admin", "developer", "active"]

[user.preferences]
theme = "dark"
notifications = true
language = "en"

[metadata]
lastLogin = "2024-01-01T10:00:00Z"
version = "1.2.3"`,
  xml: `<?xml version="1.0" encoding="UTF-8"?>
<root>
  <user>
    <id>1</id>
    <name>John Doe</name>
    <email>john@example.com</email>
    <preferences>
      <theme>dark</theme>
      <notifications>true</notifications>
      <language>en</language>
    </preferences>
    <tags>
      <item>admin</item>
      <item>developer</item>
      <item>active</item>
    </tags>
  </user>
  <metadata>
    <lastLogin>2024-01-01T10:00:00Z</lastLogin>
    <version>1.2.3</version>
  </metadata>
</root>`,
  zod: `z.object({
  user: z.object({
    id: z.number(),
    name: z.string(),
    email: z.string().email(),
    preferences: z.object({
      theme: z.enum(['light', 'dark']),
      notifications: z.boolean(),
      language: z.string()
    }),
    tags: z.array(z.string())
  }),
  metadata: z.object({
    lastLogin: z.string().datetime(),
    version: z.string()
  })
})`,
  csv: `id,name,email,theme,notifications,language,tags,lastLogin,version
1,"John Doe",john@example.com,dark,true,en,"admin;developer;active",2024-01-01T10:00:00Z,1.2.3
2,"Jane Smith",jane@example.com,light,false,es,"user;active",2024-01-02T14:30:00Z,1.2.3`,
}
