# Class Cat Monorepo

This is a Turborepo monorepo containing the Class Cat application.

## Structure

```
.
├── apps/
│   ├── main/          # Main application (user-facing)
│   └── business/      # Business site
├── packages/
│   └── ui/            # Shared UI components
└── turbo.json         # Turborepo configuration
```

## Getting Started

### Prerequisites

- [Bun](https://bun.sh) installed

### Installation

```bash
bun install
```

### Environment Variables

Each app has its own environment variables. Copy the example files and fill in your values:

```bash
# Main app
cp apps/main/.env.example apps/main/.env

# Business app
cp apps/business/.env.example apps/business/.env
```

**Required Environment Variables:**
- `NODE_ENV` - Environment (development, test, production)
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` - Clerk publishable key
- `CLERK_SECRET_KEY` - Clerk secret key
- `NEXT_API_URL` - API base URL (optional)

**Note:** Clerk variables are automatically handled by `@clerk/nextjs`. Make sure to set them in your `.env` files.

### Development

Run all apps in development mode:
```bash
bun run dev
```

Run a specific app:
```bash
bun run dev:main      # Main app only
bun run dev:business  # Business app only
```

### Build

Build all apps:
```bash
bun run build
```

### Linting

```bash
bun run lint
```

### Type Checking

```bash
bun run type-check
```

## Apps

### Main App (`apps/main`)

The main user-facing application with:
- User authentication
- Activity search and browsing
- User profiles
- Favorites

### Business App (`apps/business`)

The business-facing site with:
- Company information
- Business account sign-up
- Feature showcase

## Packages

### UI (`packages/ui`)

Shared UI components built with:
- Radix UI
- Tailwind CSS
- React Hook Form
- Zod

## Technology Stack

- **Framework**: Next.js 15
- **Package Manager**: Bun
- **Monorepo**: Turborepo
- **UI**: Radix UI + Tailwind CSS
- **Authentication**: Clerk
- **State Management**: TanStack Query
