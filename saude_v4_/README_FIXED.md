# README_FIXED - gerado 2025-11-28T22:20:06.926234Z

Instruções para rodar local e com Docker.

## Backend
cd backend
cp .env.example .env && edite as variáveis (MONGO_URI, JWT_SECRET)
npm install
npm run dev

## Frontend
cd frontend
cp .env.example .env
npm install
npm run dev

## Docker
docker build -t saude-backend ./backend
# docker-compose opcional
