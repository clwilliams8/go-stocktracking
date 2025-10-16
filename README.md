# Go StockTracking

> A modern stock tracking application showcasing Go Gin Framework, Next.js 14, and Shadcn UI

A **proof-of-concept** full-stack application demonstrating proficiency with modern web development technologies. Features real-time stock data, comprehensive analytics, and a beautiful UI built with industry-standard tools.

## ✨ Features

### Core Functionality
- **Comprehensive Stock Analysis**: Search any stock ticker and view 50+ metrics including:
  - Real-time price data and daily statistics
  - Valuation metrics (P/E ratio, market cap, EPS)
  - Financial metrics (profit margins, ROA, ROE)
  - Growth indicators (revenue growth, earnings growth)
  - Risk analysis (beta, volatility, 52-week ranges)
  - Technical indicators (moving averages, analyst targets)

### Showcase Pages
- **Dashboard**: Real stock data with 5 organized tabs (Overview, Valuation, Financials, Performance, Risk)
- **Trending**: Market movers, top gainers/losers, sector performance
- **Analytics**: Portfolio analytics with risk metrics and performance tracking
- **How It Works**: Comprehensive documentation explaining the entire architecture

### Technical Highlights
- Go Gin backend with RESTful API
- Dual API integration (Alpha Vantage GLOBAL_QUOTE + OVERVIEW endpoints)
- Next.js 14 with App Router and server/client components
- 12+ Shadcn UI components demonstrating component mastery
- Docker containerization with Nginx reverse proxy
- HTTPS with self-signed SSL certificates

## 🚀 Quick Start

### Prerequisites

- **Docker Desktop** (v20.10+ with Docker Compose)
- **Alpha Vantage API Key** (free tier: 25 requests/day)
  - Get yours at: https://www.alphavantage.co/support/#api-key

### Installation

**1. Clone the repository**
```bash
git clone https://github.com/clwilliams8/go-stocktracking.git
cd go-stocktracking
```

**2. Set up environment variables**

Create a `.env` file in the project root:
```bash
# Copy the example and edit with your API key
cat > .env << EOF
STOCK_API_KEY=your_alpha_vantage_api_key_here
STOCK_API_PROVIDER=alphavantage
NEXT_PUBLIC_API_URL=https://go-stocktracking.ai/api
PORT=8080
GIN_MODE=release
EOF
```

**3. Add domain to hosts file**

Add this line to your `/etc/hosts` file:
```
127.0.0.3    go-stocktracking.ai
```

On macOS/Linux:
```bash
sudo bash -c 'echo "127.0.0.3    go-stocktracking.ai" >> /etc/hosts'
```

On Windows (run as Administrator):
```powershell
Add-Content -Path C:\Windows\System32\drivers\etc\hosts -Value "127.0.0.3    go-stocktracking.ai"
```

**4. Generate SSL certificates**
```bash
cd docker
chmod +x generate-certs.sh
./generate-certs.sh
cd ..
```

**5. Start the application**
```bash
docker-compose up --build
```

Wait for all services to start (about 30-60 seconds), then visit:

🌐 **https://go-stocktracking.ai**

Your browser will show a security warning (self-signed certificate). Click "Advanced" → "Proceed to go-stocktracking.ai"

## 📁 Project Structure

```
go-stocktracking/
├── backend/                    # Go Gin API Server
│   ├── main.go                # Application entry point
│   ├── handlers/              # HTTP request handlers
│   │   ├── health.go          # Health check endpoint
│   │   └── stock.go           # Stock data endpoint
│   ├── services/              # Business logic layer
│   │   └── stock.go           # Alpha Vantage API integration
│   ├── models/                # Data structures
│   │   └── stock.go           # StockData model (50+ fields)
│   ├── go.mod                 # Go dependencies
│   └── Dockerfile             # Backend container
│
├── frontend/                  # Next.js 14 Application
│   ├── app/                   # Next.js App Router
│   │   ├── dashboard/         # Stock search & analysis (50+ metrics)
│   │   ├── trending/          # Trending stocks showcase
│   │   ├── analytics/         # Portfolio analytics showcase
│   │   ├── how-it-works/      # Documentation page
│   │   └── layout.tsx         # Root layout
│   ├── components/            # React components
│   │   ├── sidebar.tsx        # Navigation sidebar
│   │   └── ui/                # Shadcn UI components
│   ├── lib/                   # Utility functions
│   ├── package.json           # NPM dependencies
│   └── Dockerfile             # Frontend container
│
├── docker/                    # Docker configuration
│   ├── nginx/                 # Nginx reverse proxy
│   │   ├── nginx.conf         # Routing configuration
│   │   └── certs/             # SSL certificates
│   ├── docker-compose.yml     # Service orchestration
│   └── generate-certs.sh      # SSL cert generator
│
└── README.md                  # This file
```

## 🛠 Tech Stack

### Backend
- **Go 1.21+** - Modern, fast, compiled language
- **Gin Framework** - High-performance HTTP web framework
- **CORS Middleware** - Cross-origin resource sharing
- **Alpha Vantage API** - Stock market data provider

### Frontend
- **Next.js 14** - React framework with App Router
- **React 18** - Component-based UI library
- **TypeScript** - Type-safe development
- **Shadcn UI** - Beautiful component library built on Radix UI
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide Icons** - Modern icon library

### Infrastructure
- **Docker** - Containerization platform
- **Docker Compose** - Multi-container orchestration
- **Nginx** - Reverse proxy and SSL termination
- **Alpine Linux** - Minimal container base images

## 📡 API Endpoints

### Backend REST API
- `GET /health` - Health check endpoint
- `GET /api/stock/:symbol` - Fetch comprehensive stock data
  - Parameters: `symbol` (stock ticker, e.g., AAPL, GOOGL)
  - Returns: JSON with 50+ stock metrics

### Frontend Routes
- `/` - Redirects to dashboard
- `/dashboard` - Stock search with comprehensive analytics
- `/trending` - Trending stocks and market movers
- `/analytics` - Portfolio analytics showcase
- `/how-it-works` - Application documentation

## 🔧 Development

### View Logs
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f nginx
```

### Rebuild Specific Service
```bash
# Rebuild and restart frontend only
docker-compose up --build frontend

# Rebuild and restart backend only
docker-compose up --build backend
```

### Stop All Services
```bash
docker-compose down
```

### Clean Up Everything
```bash
# Remove containers, networks, and volumes
docker-compose down -v
```

### Access Container Shell
```bash
# Backend
docker exec -it go-stocktracking-backend sh

# Frontend
docker exec -it go-stocktracking-frontend sh
```

## 🌐 Environment Variables

### Backend Configuration
Create `.env` in project root:
```env
# Required
STOCK_API_KEY=your_alpha_vantage_api_key

# Optional (defaults shown)
STOCK_API_PROVIDER=alphavantage
PORT=8080
GIN_MODE=release
```

### Frontend Configuration
Automatically loaded from root `.env`:
```env
NEXT_PUBLIC_API_URL=https://go-stocktracking.ai/api
```

## 🐛 Troubleshooting

### Can't access https://go-stocktracking.ai

**Check hosts file:**
```bash
cat /etc/hosts | grep go-stocktracking
# Should show: 127.0.0.3    go-stocktracking.ai
```

**Verify containers are running:**
```bash
docker ps
# Should show 3 containers: backend, frontend, nginx
```

### SSL Certificate Warning

This is normal for self-signed certificates. In your browser:
- Chrome/Edge: Click "Advanced" → "Proceed to go-stocktracking.ai"
- Firefox: Click "Advanced" → "Accept the Risk and Continue"
- Safari: Click "Show Details" → "visit this website"

### Port Already in Use

If ports 80 or 443 are in use:
```bash
# Check what's using the ports
lsof -i :80
lsof -i :443

# Stop the conflicting service, or change the nginx port mapping in docker-compose.yml
```

### API Rate Limit Exceeded

Alpha Vantage free tier: 25 requests/day. If exceeded:
- Wait 24 hours for reset
- Sign up for a different Alpha Vantage account
- Switch to Finnhub (see Alternative API section)

### Regenerate SSL Certificates
```bash
cd docker
rm -rf nginx/certs/*
./generate-certs.sh
docker-compose restart nginx
```

## 🔄 Alternative API (Finnhub)

To use Finnhub instead of Alpha Vantage:

1. Get API key from https://finnhub.io/register
2. Update `.env`:
   ```env
   STOCK_API_KEY=your_finnhub_api_key
   STOCK_API_PROVIDER=finnhub
   ```
3. Rebuild: `docker-compose up --build`

**Note:** Finnhub provides less detailed data than Alpha Vantage.

## 📖 Architecture

### How It Works

**Backend Flow:**
1. Client requests stock data via `/api/stock/:symbol`
2. Gin handler validates request and calls service layer
3. Service makes TWO concurrent API calls to Alpha Vantage:
   - `GLOBAL_QUOTE` - Real-time price data
   - `OVERVIEW` - Company fundamentals
4. Data is merged into comprehensive StockData model (50+ fields)
5. JSON response sent to client

**Frontend Flow:**
1. User enters stock ticker in search box
2. React state triggers API call to backend
3. Response parsed into TypeScript interface
4. Data displayed across 5 organized tabs using Shadcn components
5. Helper functions format numbers and percentages for display

**Infrastructure:**
- Nginx reverse proxy routes `/api/*` to backend, everything else to frontend
- HTTPS termination at Nginx layer
- Docker network enables inter-container communication
- Self-signed SSL for local development

For detailed architecture documentation, visit the **"How does this app work?"** page in the running application.

## 📝 Example Stock Data Response

```json
{
  "symbol": "AAPL",
  "name": "Apple Inc",
  "price": "178.72",
  "marketCap": "2800000000000",
  "peRatio": "29.5",
  "eps": "6.05",
  "profitMargin": "0.243",
  "beta": "1.094",
  // ... 40+ more fields
}
```

## 🎯 Use Cases

This application demonstrates:
- ✅ **Backend Development**: RESTful API design with Go and Gin
- ✅ **Frontend Development**: Modern React with Next.js and TypeScript
- ✅ **UI/UX Design**: Component-based design with Shadcn UI
- ✅ **API Integration**: Multi-endpoint data fetching and merging
- ✅ **Containerization**: Docker multi-stage builds and orchestration
- ✅ **DevOps**: Nginx configuration, SSL setup, service networking

## 🤝 Contributing

This is a proof-of-concept project for showcasing development skills. However, feel free to:
- Open issues for bugs or suggestions
- Submit pull requests for improvements
- Use as a template for your own projects

## 📄 License

MIT License - feel free to use this project for learning or as a template for your own work.

## 🙏 Acknowledgments

- **Alpha Vantage** for free stock market API
- **Shadcn** for the beautiful UI component library
- **Go & Gin communities** for excellent documentation
- **Next.js team** for the amazing framework

---

Built with ❤️ to showcase modern full-stack development practices.
