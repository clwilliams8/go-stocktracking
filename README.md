# Go Stocktracking

A proof-of-concept stock tracking application built with Go Gin (backend) and Shadcn UI (frontend).

## Features

- Stock ticker search functionality
- Real-time stock data via free API (Alpha Vantage/Finnhub)
- Modern UI with Shadcn components
- Dockerized development environment
- Local HTTPS support

## Getting Started

See [plan.md](./plan.md) for detailed implementation plan and setup instructions.

## Project Structure

```
go-stocktracking/
├── backend/          # Go Gin API server
├── frontend/         # Next.js + Shadcn UI
├── docker/           # Docker configuration
└── plan.md          # Implementation plan
```

## Development

```bash
# Start the application
docker-compose up --build

# Access at
https://go-stocktracking.ai
```

## Tech Stack

- **Backend**: Go + Gin Framework
- **Frontend**: Next.js + Shadcn UI + Tailwind CSS
- **Infrastructure**: Docker + Nginx
- **Stock API**: Alpha Vantage or Finnhub

## License

MIT
