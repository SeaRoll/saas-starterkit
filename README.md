# SaaS Starter Kit

I was bored, so I created a starter kit for SaaS projects with some basic features to get you started.

## Features

- NextJS (Latest)
- Tailwind CSS
- Database (SQLite, Prisma)
- User authentication/authorization (Better Auth)
- Subscription-based payments (Stripe)
- E-mail notifications (Nodemailer)

## Getting Started

```sh
# 1. install dependencies
npm install

# 2. create a .env file
cp .env.example .env

# 3. create a database
npx prisma db push

# 3. run the development server
npm run dev

# 4. create migrations
npm run migrate
```

## Deploying (via docker)
```sh
# 1. create a .env.prod file
cp .env.example .env.prod

# 2. (optional) create a clean db image (creates a clean db image)
DATABASE_URL=file:<matching-prod-path>/prod.db npm run deploy:db

# 3. deploy app
npm run deploy:app
```
