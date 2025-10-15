# Go Stocktracking - Project Plan

## Overview
A proof-of-concept application for tracking stock information using Go Gin (backend) and Shadcn UI (frontend), containerized with Docker.

## Project Structure
```
go-stocktracking/
├── backend/          # Go Gin API server
├── frontend/         # Next.js + Shadcn UI
├── docker/           # Docker configuration files
└── plan.md          # This file
```

## Technology Stack

### Backend
- **Framework**: Go Gin
- **Language**: Go 1.21+
- **Stock API**: Alpha Vantage (free tier) or Finnhub (backup option)
- **Port**: 8080 (internal)

### Frontend
- **Framework**: Next.js 14+ (App Router)
- **UI Library**: Shadcn UI
- **Styling**: Tailwind CSS
- **Port**: 3000 (internal)

### Infrastructure
- **Containerization**: Docker + Docker Compose
- **Reverse Proxy**: Nginx (for local HTTPS)
- **Domain**: go-stocktracking.ai (local development)

## Implementation Phases

### Phase 1: Initial Setup ✓
- [x] Create project structure
- [x] Initialize git repository
- [x] Create GitHub repository
- [ ] Push initial commit

### Phase 2: Backend Development
- [ ] Initialize Go module
- [ ] Set up Gin server with basic routing
- [ ] Create stock API integration
  - Endpoint: `GET /api/stock/:symbol`
  - Return stock data (price, name, change, etc.)
- [ ] Add CORS middleware for frontend communication
- [ ] Create health check endpoint

### Phase 3: Frontend Development
- [ ] Initialize Next.js project with TypeScript
- [ ] Install and configure Shadcn UI
- [ ] Create sidebar navigation component
- [ ] Implement `/dashboard` page with:
  - Sidebar navigation
  - Stock ticker search box
  - Display area for stock results
- [ ] Add API client for backend communication

### Phase 4: Docker Configuration
- [ ] Create `backend/Dockerfile`
- [ ] Create `frontend/Dockerfile`
- [ ] Create `docker/docker-compose.yml`
- [ ] Create `docker/nginx.conf` for reverse proxy
- [ ] Generate self-signed SSL certificate for local HTTPS
- [ ] Configure nginx to route:
  - `https://go-stocktracking.ai` → Frontend
  - `https://go-stocktracking.ai/api` → Backend

### Phase 5: Local Development Setup
- [ ] Add `go-stocktracking.ai` to `/etc/hosts`
- [ ] Configure nginx for HTTPS
- [ ] Test Docker Compose setup
- [ ] Verify full application flow

## Stock API Options

### Option 1: Alpha Vantage (Recommended)
- **Free Tier**: 25 requests/day
- **Pros**: Comprehensive data, reliable, well-documented
- **Cons**: Rate limits on free tier
- **Signup**: https://www.alphavantage.co/support/#api-key

### Option 2: Finnhub
- **Free Tier**: 60 calls/minute
- **Pros**: Good rate limits, real-time data
- **Cons**: Requires API key
- **Signup**: https://finnhub.io/register

### Option 3: Twelve Data
- **Free Tier**: 800 requests/day
- **Pros**: Higher rate limits
- **Cons**: Less popular, potential reliability concerns

## API Endpoints

### Backend API
```
GET  /health                    # Health check
GET  /api/stock/:symbol         # Get stock data by ticker symbol
```

### Frontend Routes
```
/dashboard                      # Main dashboard with search
```

## Development Workflow

1. **Start Development Environment**
   ```bash
   docker-compose up --build
   ```

2. **Access Application**
   - Frontend: https://go-stocktracking.ai
   - Backend API: https://go-stocktracking.ai/api

3. **Stop Environment**
   ```bash
   docker-compose down
   ```

## Environment Variables

### Backend (.env)
```
STOCK_API_KEY=your_api_key_here
STOCK_API_PROVIDER=alphavantage
PORT=8080
```

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=https://go-stocktracking.ai/api
```

## Next Steps
1. Create initial repository structure
2. Set up backend with Go Gin
3. Set up frontend with Next.js + Shadcn
4. Configure Docker environment
5. Test end-to-end flow

## Notes
- Using self-signed certificates for local HTTPS (browser will show warning)
- For production, use proper SSL certificates (Let's Encrypt)
- Stock API keys should be kept in `.env` files (not committed to git)
- Consider adding `.gitignore` for sensitive files
