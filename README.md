# SlotBuyingPanelCRM

SlotBuyingPanelCRM is a full-stack portal designed to manage **slot purchases**, **users**, **permissions**, and **admin workflows**.  
It includes a complete backend API, a dynamic React frontend, authentication flows, and PostgreSQL integration using **Drizzle ORM**.

The goal of this portal is to provide:
- A clean interface for users to buy slots  
- A powerful admin dashboard for management  
- A fully extensible codebase for developers  

---

## 🚀 Features

### ⭐ User Portal
- User registration & login  
- Slot purchasing system  
- Dashboard & status tracking  
- Smooth UI (Tailwind + Radix UI + shadcn/ui)  
- Mobile-friendly sidebar navigation  

### ⭐ Admin Panel
- Manage all users  
- View & approve slot purchases  
- Edit application settings  
- Admin-only protected routes  
- Real-time updates via modern frontend design  

### ⭐ Backend API (Node.js + Express)
- REST API structure  
- Authentication (JWT)  
- Slot purchase endpoints  
- Database operations using Drizzle ORM  
- Environment-based configuration  

### ⭐ Developer Experience
- Full TypeScript codebase  
- Component-driven UI  
- Vite dev environment  
- Drizzle migration system  
- Easy hosting on Render / Railway / Vercel  

---

## 🏗 Tech Stack

| Layer | Technology |
|------|------------|
| Frontend | React, TypeScript, Vite, Tailwind CSS, Radix UI, shadcn/ui |
| Backend | Node.js, Express, TypeScript |
| Database | PostgreSQL |
| ORM | Drizzle ORM + drizzle-kit |
| Deployment | Render, Railway, Vercel (client only) |

---

## 📁 Folder Structure

```
SlotBuyingPanelCRM/
│
├── client/                # React frontend (Vite)
│   ├── src/               # Components, pages, layouts
│   ├── public/            # Static assets
│   └── package.json
│
├── server/                # Node.js Backend API
│   ├── index.ts           # Server entry
│   ├── routes/            # API endpoints
│   ├── controllers/       # Business logic
│   ├── db/                # DB connection + schema
│   └── middleware/        # Auth & utilities
│
├── shared/                # Shared utilities & types
├── drizzle.config.ts      # Drizzle migration config
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## ⚙️ Environment Variables

Create a `.env` file in the project root:

```
DATABASE_URL="postgres://username:password@host:5432/dbname"
NODE_ENV=development
PORT=5000
```

Frontend-only variable (if needed):

```
VITE_API_URL="http://localhost:5000"
```

⚠️ **Never commit `.env` files or secrets to GitHub.**

---

## 🧩 Database Setup (Drizzle ORM)

Push schema to your PostgreSQL database:

```bash
npm run db:push
```

Or directly:

```bash
npx drizzle-kit push
```

---

## 🛠 Running the Project Locally

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure environment
Create `.env` with your DATABASE_URL.

### 3. Push migrations
```bash
npm run db:push
```

### 4. Start Backend Server
```bash
npm run dev
```

### 5. Start Frontend
```bash
cd client
npm run dev
```

Your app will be available at:
```
http://localhost:5173
```

---

## 🚀 Deployment Guide

### ▶ Deploy Fullstack App on Render (recommended)

**Build Command:**
```
npm ci && npm run build
```

**Start Command:**
```
npm start
```

**Environment Variables:**
```
DATABASE_URL=your_postgres_url
```

Render automatically sets `PORT`.

---

### ▶ Deploy Frontend Only on Vercel

Project Settings:
- **Root Directory:** `client`
- **Build Command:** `npm run build`
- **Output Directory:** `dist`

---

## 🧪 Testing

If tests exist:

```bash
npm test
```

---


## 🤝 Contributing

Pull requests are welcome!  
For major changes, open an issue first to discuss your ideas.

---
