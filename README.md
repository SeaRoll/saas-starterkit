# SaaS Starter Kit

I was bored, so I created a starter kit for SaaS projects with some basic features to get you started.

## Features

- NextJS (Latest)
- Tailwind CSS
- Database (SQLite, Prisma)
- User authentication/authorization (Better Auth)
- Payments (Stripe)

## Getting Started

```sh
# 1. install dependencies
npm install

# 2. create a .env file
cp .env.example .env

# 3. run the development server
npm run dev
```

## Deploying (via docker)
```sh
docker compose up -d --build
docker system prune -f # remove all unused containers, networks, images, and volumes
```
