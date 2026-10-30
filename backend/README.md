# Rakshak 2.0 Backend

Node.js + Express + SQLite (sql.js) backend for authentication, multi-tenant reviews, and audit trails.

## Setup

```bash
cd backend
npm install
cp .env.example .env
node server.js
```

## Environment Variables

- `PORT` - Server port (default: 3001)
- `JWT_SECRET` - JWT signing secret (change in production)

## API Endpoints

### Auth
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login

### Reviews
- `POST /api/reviews` - Save review
- `GET /api/reviews` - List reviews
- `GET /api/reviews/:id` - Get review
- `PATCH /api/reviews/:id/approve` - Approve review

### Audit
- `GET /api/audit` - Get audit log

### Rule Packs
- `GET /api/rule-packs` - List rule packs
- `POST /api/rule-packs` - Create rule pack

### Health
- `GET /api/health` - Health check
