# Go Stocktracking

A proof-of-concept stock tracking application built with Go Gin (backend) and Shadcn UI (frontend).

## Features

- Stock ticker search functionality
- Real-time stock data via free API (Alpha Vantage/Finnhub)
- Modern UI with Shadcn components and sidebar navigation
- Dockerized development environment with HTTPS
- Nginx reverse proxy for local development

## Prerequisites

- Docker and Docker Compose
- A stock API key (Alpha Vantage or Finnhub)

## Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/clwilliams8/go-stocktracking.git
cd go-stocktracking
```

### 2. Get a Stock API Key

Choose one of the following providers:

- **Alpha Vantage** (Recommended): https://www.alphavantage.co/support/#api-key
  - Free tier: 25 requests/day
- **Finnhub**: https://finnhub.io/register
  - Free tier: 60 calls/minute

### 3. Configure Environment Variables

Backend configuration:
```bash
cd backend
cp .env.example .env
# Edit .env and add your API key
```

Frontend configuration:
```bash
cd frontend
cp .env.example .env.local
# The default API URL should work for local development
```

### 4. Generate SSL Certificates

```bash
cd docker
chmod +x generate-certs.sh
./generate-certs.sh
```

### 5. Add Domain to Hosts File

Add this line to `/etc/hosts`:
```
192.168.202.10 go-stocktracking.ai
```

On macOS/Linux:
```bash
sudo nano /etc/hosts
```

**IMPORTANT**: Make sure 192.168.202.10 doesn't conflict with your other Docker projects!

### 6. Start the Application

From the project root:
```bash
docker-compose up --build
```

Wait for all services to start, then visit:
**https://go-stocktracking.ai**

Your browser will show a security warning (self-signed certificate). Click "Advanced" and proceed to the site.

## Project Structure

```
go-stocktracking/
├── backend/              # Go Gin API server
│   ├── handlers/         # HTTP request handlers
│   ├── models/           # Data models
│   ├── services/         # Business logic
│   ├── main.go          # Application entry point
│   └── Dockerfile       # Backend container config
├── frontend/            # Next.js + Shadcn UI
│   ├── app/             # App router pages
│   ├── components/      # React components
│   ├── lib/             # Utilities
│   └── Dockerfile       # Frontend container config
├── docker/              # Docker configuration
│   ├── nginx/           # Nginx config and certs
│   └── generate-certs.sh
├── docker-compose.yml   # Service orchestration
└── plan.md             # Implementation plan
```

## API Endpoints

### Backend API
- `GET /health` - Health check
- `GET /api/stock/:symbol` - Get stock data by ticker symbol

### Frontend Routes
- `/` - Redirects to dashboard
- `/dashboard` - Main dashboard with stock search

## Development

### View Logs
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f nginx
```

### Rebuild Services
```bash
docker-compose up --build
```

### Stop Services
```bash
docker-compose down
```

### Clean Up (Remove volumes)
```bash
docker-compose down -v
```

## Environment Variables

### Backend (.env)
```
STOCK_API_KEY=your_api_key_here
STOCK_API_PROVIDER=alphavantage  # or finnhub
PORT=8080
GIN_MODE=release
```

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=https://go-stocktracking.ai/api
```

## Troubleshooting

### Port Conflicts
If you get port conflicts, check what's using ports 80 and 443:
```bash
lsof -i :80
lsof -i :443
```

### IP Address Conflicts
If 192.168.202.10 conflicts with other projects, update:
1. `docker-compose.yml` - Change the IP in the nginx service
2. `/etc/hosts` - Update the IP address
3. Rebuild with `docker-compose up --build`

### SSL Certificate Issues
If you need to regenerate certificates:
```bash
cd docker
rm -rf nginx/certs/*
./generate-certs.sh
docker-compose restart nginx
```

### Can't Connect to API
Check if all services are running:
```bash
docker-compose ps
```

Test the backend directly:
```bash
curl http://localhost:8080/health
```

## Tech Stack

- **Backend**: Go 1.21+ + Gin Framework
- **Frontend**: Next.js 14 + React + Shadcn UI + Tailwind CSS
- **Infrastructure**: Docker + Docker Compose + Nginx
- **Stock API**: Alpha Vantage or Finnhub

## License

MIT
