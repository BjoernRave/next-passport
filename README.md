The code is extracted from the `blitz-js` repository. All kudos goes to them: https://blitzjs.com

This project is not battle-tested in any way, just use it if you know what you are doing!

This project requires you to work with a Next.js application and use Prisma for Database Access.

Because Blitz uses Anti CSRF Measures, we need to attach a header with the key: `anti-csrf` and the value of the `sAntiCrfToken` cookie or add `DISABLE_CSRF_PROTECTION=true` to your env vars, although that's not recommended.

```
yarn add next-passport
```

1. Add these lines to your `schema.prisma`

```
model User {
  id             Int       @id @default(autoincrement())
  createdAt      DateTime  @default(now())
  updatedAt      DateTime  @updatedAt
  name           String?
  email          String    @unique
  hashedPassword String?
  role           String    @default("user")
  sessions       Session[]
}

model Session {
  id                 Int       @id @default(autoincrement())
  createdAt          DateTime  @default(now())
  updatedAt          DateTime  @updatedAt
  expiresAt          DateTime?
  handle             String    @unique
  user               User?     @relation(fields: [userId], references: [id])
  userId             Int?
  hashedSessionToken String?
  antiCSRFToken      String?
  publicData         String?
  privateData        String?
}
```

2. Create `[...auth].ts` file in your `api` folder (maybe under `api/auth/`) with the following content:

```typescript
import { passportAuth } from 'next-passport'

export default passportAuth({
  successRedirectUrl: '/',
  errorRedirectUrl: '/',
  strategies: [
    ...
  ],
})
```

3. Use `getSessionContext` in your Serverless Functions

`getSessionContext` takes care of creating and getting sessions

Signup Example:

```typescript
import { NextApiRequest, NextApiResponse } from 'next'
import { getSessionContext, hashPassword } from 'next-passport'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSessionContext(prisma, req, res)

  if (!req.body.email || !req.body.password) {
    return res.status(500).json({ error: 'Not all values provided' })
  }

  const { email, password } = req.body

  const hashedPassword = await hashPassword(password)
  const user = await prisma.user.create({
    data: {
      email: email.toLowerCase(),
      hashedPassword,
      role: 'user',
    },
    select: { id: true, email: true, role: true },
  })

  await session.create({ userId: user.id, roles: [user.role] })

  res.json({ user })
}
```

Login Example:

```typescript
import { NextApiRequest, NextApiResponse } from 'next'
import { getSessionContext, authenticateUser } from 'next-passport'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSessionContext(prisma, req, res)

  if (!req.body.email || !req.body.password) {
    return res.status(500).json({ error: 'Not all values provided' })
  }

  const { email, password } = req.body

  const user = await authenticateUser(email, password)

  await session.create({ userId: user.id, roles: [user.role] })

  res.json({ user })
}
```
