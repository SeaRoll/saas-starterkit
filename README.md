# SaaS Starter Kit

I was bored, so I created a starter kit for SaaS projects with some basic features to get you started.

## Features

- NextJS (Latest)
- Tailwind CSS
- Database (SQLite, Prisma)
- User authentication/authorization (Better Auth) & Admin privileges
- Subscription-based payments (Stripe)
- E-mail notifications (Nodemailer)

## Getting Started

```sh
# 1. install dependencies
npm install

# 2. create a .env file
cp .env.example .env

# 3. create a database
touch prisma/dev.db

# 4. run migrations & generate client
npm run migrate:dev

# 5. run development server
npm run dev
```

## Deploying (via docker)

```sh
# 1. create a .env.prod file
cp .env.example .env.prod

# 2. (optional) create database file
mkdir data && touch data/prod.db

# 3. deploy app
npm run deploy:app
```
