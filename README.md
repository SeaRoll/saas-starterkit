# SaaS Starterkit - Simple SaaS Starterkit with Next.js, DrizzleORM, and PostgreSQL

## Features

- **Next.js**: Full-stack React framework for building server-rendered applications.
- **DrizzleORM**: Type-safe ORM for PostgreSQL, providing a simple and efficient way to interact with the database. Migration is done by `instrumentation.ts` file.
- **PostgreSQL**: Reliable and powerful open-source relational database management system.
- **Docker**: Containerization for easy deployment and environment consistency.
- **Better Auth**: Authentication system for managing user access and permissions.
- **Email Notifications**: Built-in email client for sending notifications and alerts.
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development.
- **Background Tasks**: Support for running background tasks like CRON jobs or Kafka consumers.

## Getting Started

Run the `bun run clear` to clear the migrations folder and the database.
After configuring the `schema.ts` file, generate new migrations with:

```bash
bun run create:migration
```

## Local Development

```bash
cp .env.example .env # Copy the example environment variables
bun run local:up # Runs the local PostgreSQL database
bun run dev # Starts the Next.js development server
```

## Quick Links

- [Next.js Documentation](https://nextjs.org/docs)
- [DrizzleORM Documentation](https://orm.drizzle.team/)
- [Better Auth Documentation](https://better-auth.com/docs)
