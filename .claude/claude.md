# Go Stocktracking - Claude Code Context

## Project Overview
This is a stock tracking proof-of-concept application with a Go Gin backend and Next.js + Shadcn UI frontend, containerized with Docker.

## Architecture

### Directory Structure
- `backend/` - Go Gin API server for stock data
- `frontend/` - Next.js 14+ with Shadcn UI components
- `docker/` - Docker Compose and Nginx configuration for local HTTPS

### Key Technologies
- **Backend**: Go 1.21+, Gin framework
- **Frontend**: Next.js (App Router), React, Shadcn UI, Tailwind CSS
- **Infrastructure**: Docker, Nginx reverse proxy
- **Stock API**: Alpha Vantage (primary) or Finnhub (backup)

## Development Setup

### Local Domain
- Domain: `go-stocktracking.ai` (configured in `/etc/hosts`)
- Protocol: HTTPS with self-signed certificates
- Frontend: Port 3000 (internal), routed via Nginx
- Backend: Port 8080 (internal), routed via Nginx at `/api`

### Running the Application
```bash
docker-compose up --build
```
Access at: `https://go-stocktracking.ai`

## Key Features
1. **Dashboard** (`/dashboard`) - Main page with sidebar navigation
2. **Stock Search** - Search box to query stock tickers
3. **API Integration** - Backend fetches real-time stock data
4. **Responsive UI** - Shadcn components with Tailwind styling

## Important Files
- `plan.md` - Detailed implementation plan
- `docker/docker-compose.yml` - Service orchestration
- `docker/nginx.conf` - Reverse proxy configuration
- `backend/main.go` - Go Gin server entry point
- `frontend/app/dashboard/page.tsx` - Dashboard implementation

## Environment Variables
- Backend: `STOCK_API_KEY`, `STOCK_API_PROVIDER`
- Frontend: `NEXT_PUBLIC_API_URL`

## API Endpoints
- `GET /health` - Health check
- `GET /api/stock/:symbol` - Get stock data by ticker

## Notes
- Using free tier of stock APIs (rate limits apply)
- Self-signed SSL for local development
- Never commit `.env` files or API keys
- Follow the implementation plan in `plan.md`
