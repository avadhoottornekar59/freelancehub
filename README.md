# FreelanceHub

FreelanceHub is a full-stack freelancer marketplace built with Next.js 14 App Router, NextAuth.js, Socket.io, and Tailwind CSS.

## Setup

1. Install dependencies:

```bash
npm install
```

2. Copy the example environment file and fill in your keys:

```bash
cp .env.example .env.local
```

3. Seed the default skill tests and optional admin user:

```bash
npm run seed
```

4. Start the app:

```bash
npm run dev
```

## Environment Variables

- `MONGODB_URI`
- `NEXTAUTH_SECRET`
- `NEXTAUTH_URL`
- `OPENAI_API_KEY`
- `OPENAI_MODEL`
- `ADMIN_INVITE_CODE`
- `SEED_ADMIN_EMAIL`
- `SEED_ADMIN_PASSWORD`
