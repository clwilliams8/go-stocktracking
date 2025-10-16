"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import {
  BookOpen,
  FolderTree,
  Server,
  Globe,
  Code,
  Layers,
  Database,
  Workflow,
  Package,
  FileCode
} from "lucide-react"

export default function HowItWorksPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
          <BookOpen className="h-8 w-8 text-primary" />
          How Does This App Work?
        </h1>
        <p className="text-muted-foreground mt-2">
          A comprehensive guide to the Go StockTracking proof of concept application
        </p>
      </div>

      <Separator />

      {/* Overview Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Workflow className="h-5 w-5 text-blue-500" />
            Project Overview
          </CardTitle>
          <CardDescription>
            Purpose and architecture of this proof of concept
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm leading-relaxed">
            This is a <strong>proof of concept application</strong> designed to showcase proficiency
            in modern full-stack development practices, specifically demonstrating expertise with:
          </p>
          <div className="grid gap-2 md:grid-cols-2">
            <div className="flex items-center gap-2">
              <Badge variant="outline">Go + Gin Framework</Badge>
              <span className="text-sm text-muted-foreground">Backend REST API</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline">Next.js 14</Badge>
              <span className="text-sm text-muted-foreground">Frontend Framework</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline">Shadcn UI</Badge>
              <span className="text-sm text-muted-foreground">Component Library</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline">Docker</Badge>
              <span className="text-sm text-muted-foreground">Containerization</span>
            </div>
          </div>
          <p className="text-sm leading-relaxed">
            The application fetches real-time stock data from the Alpha Vantage API and displays
            comprehensive analytics including price data, financial metrics, and technical indicators.
          </p>
        </CardContent>
      </Card>

      {/* Directory Structure */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FolderTree className="h-5 w-5 text-green-500" />
            Directory Structure
          </CardTitle>
          <CardDescription>
            Organization of the project files and folders
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg bg-muted p-4 font-mono text-sm">
            <pre className="text-xs leading-relaxed">
{`go-stocktracking/
├── backend/                 # Go Gin API Server
│   ├── main.go             # Application entry point
│   ├── handlers/           # HTTP request handlers
│   │   ├── health.go       # Health check endpoint
│   │   └── stock.go        # Stock data endpoint
│   ├── services/           # Business logic layer
│   │   └── stock.go        # Stock API integration
│   ├── models/             # Data structures
│   │   └── stock.go        # Stock data model (50+ fields)
│   ├── go.mod              # Go dependencies
│   └── Dockerfile          # Backend container config
│
├── frontend/               # Next.js Application
│   ├── app/                # Next.js 14 App Router
│   │   ├── layout.tsx      # Root layout
│   │   ├── page.tsx        # Home (redirects to /dashboard)
│   │   ├── dashboard/      # Stock search & analysis
│   │   │   ├── layout.tsx  # Dashboard layout with sidebar
│   │   │   └── page.tsx    # Main dashboard UI
│   │   ├── trending/       # Trending stocks page
│   │   │   ├── layout.tsx  # Trending layout with sidebar
│   │   │   └── page.tsx    # Trending stocks showcase
│   │   ├── analytics/      # Portfolio analytics
│   │   │   ├── layout.tsx  # Analytics layout with sidebar
│   │   │   └── page.tsx    # Analytics showcase
│   │   └── how-it-works/   # Documentation page (you are here!)
│   │       ├── layout.tsx  # How It Works layout
│   │       └── page.tsx    # This documentation
│   ├── components/         # Reusable components
│   │   ├── sidebar.tsx     # Navigation sidebar
│   │   └── ui/             # Shadcn UI components
│   ├── lib/                # Utility functions
│   ├── package.json        # NPM dependencies
│   └── Dockerfile          # Frontend container config
│
└── docker/                 # Docker configuration
    ├── docker-compose.yml  # Service orchestration
    └── nginx/              # Reverse proxy configuration
        └── nginx.conf      # Nginx routing rules`}
            </pre>
          </div>
        </CardContent>
      </Card>

      {/* Backend Architecture */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Server className="h-5 w-5 text-purple-500" />
            Backend Architecture (Go + Gin Framework)
          </CardTitle>
          <CardDescription>
            How the Go backend is structured and operates
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <h4 className="font-semibold flex items-center gap-2">
              <Code className="h-4 w-4" />
              Technology Stack
            </h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <Badge className="mt-0.5">Go 1.21+</Badge>
                <span>Modern, fast, and compiled programming language</span>
              </li>
              <li className="flex items-start gap-2">
                <Badge className="mt-0.5">Gin Framework</Badge>
                <span>High-performance HTTP web framework with routing and middleware</span>
              </li>
              <li className="flex items-start gap-2">
                <Badge className="mt-0.5">CORS</Badge>
                <span>Cross-Origin Resource Sharing for secure frontend communication</span>
              </li>
            </ul>
          </div>

          <Separator />

          <div className="space-y-3">
            <h4 className="font-semibold flex items-center gap-2">
              <Workflow className="h-4 w-4" />
              How It Works
            </h4>
            <div className="space-y-3 text-sm">
              <div className="rounded-lg border p-3 bg-muted/50">
                <p className="font-medium mb-2">1. Application Initialization (main.go)</p>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                  <li>Loads environment variables from .env file</li>
                  <li>Initializes Gin router in release mode</li>
                  <li>Configures CORS to allow requests from the frontend</li>
                  <li>Registers routes and starts server on port 8080</li>
                </ul>
              </div>

              <div className="rounded-lg border p-3 bg-muted/50">
                <p className="font-medium mb-2">2. Request Handling (handlers/)</p>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                  <li><code className="text-xs bg-muted px-1 py-0.5 rounded">GET /health</code> - Returns server status</li>
                  <li><code className="text-xs bg-muted px-1 py-0.5 rounded">GET /api/stock/:symbol</code> - Fetches stock data for a given ticker symbol</li>
                </ul>
              </div>

              <div className="rounded-lg border p-3 bg-muted/50">
                <p className="font-medium mb-2">3. Business Logic (services/stock.go)</p>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                  <li>Makes TWO API calls to Alpha Vantage:
                    <ul className="list-circle list-inside ml-6 mt-1">
                      <li><strong>GLOBAL_QUOTE</strong> - Real-time price, volume, change</li>
                      <li><strong>OVERVIEW</strong> - Company fundamentals, metrics, financials</li>
                    </ul>
                  </li>
                  <li>Merges both API responses into a single comprehensive data structure</li>
                  <li>Returns JSON with 50+ stock metrics</li>
                </ul>
              </div>

              <div className="rounded-lg border p-3 bg-muted/50">
                <p className="font-medium mb-2">4. Data Model (models/stock.go)</p>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                  <li>Defines StockData struct with 50+ fields</li>
                  <li>Includes: Basic info, price data, valuation metrics, profitability, growth, risk analysis</li>
                  <li>Uses JSON tags for proper serialization</li>
                </ul>
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-2">
            <h4 className="font-semibold">Key Backend Features</h4>
            <ul className="space-y-1 text-sm list-disc list-inside text-muted-foreground ml-4">
              <li>RESTful API design with clear endpoint structure</li>
              <li>Comprehensive error handling and validation</li>
              <li>HTTP timeout management (10 seconds per request)</li>
              <li>Support for multiple stock API providers (Alpha Vantage, Finnhub)</li>
              <li>Structured logging for debugging</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Frontend Architecture */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-orange-500" />
            Frontend Architecture (Next.js + Shadcn UI)
          </CardTitle>
          <CardDescription>
            How the Next.js frontend is structured and operates
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <h4 className="font-semibold flex items-center gap-2">
              <Layers className="h-4 w-4" />
              Technology Stack
            </h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <Badge className="mt-0.5">Next.js 14</Badge>
                <span>React framework with App Router, server/client components</span>
              </li>
              <li className="flex items-start gap-2">
                <Badge className="mt-0.5">Shadcn UI</Badge>
                <span>Beautiful, accessible component library built on Radix UI primitives</span>
              </li>
              <li className="flex items-start gap-2">
                <Badge className="mt-0.5">Tailwind CSS</Badge>
                <span>Utility-first CSS framework for rapid UI development</span>
              </li>
              <li className="flex items-start gap-2">
                <Badge className="mt-0.5">TypeScript</Badge>
                <span>Type-safe development with interfaces and type checking</span>
              </li>
            </ul>
          </div>

          <Separator />

          <div className="space-y-3">
            <h4 className="font-semibold flex items-center gap-2">
              <Workflow className="h-4 w-4" />
              How It Works
            </h4>
            <div className="space-y-3 text-sm">
              <div className="rounded-lg border p-3 bg-muted/50">
                <p className="font-medium mb-2">1. App Router Structure (app/)</p>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                  <li>Uses Next.js 14 App Router for file-based routing</li>
                  <li>Each page has its own layout.tsx with shared sidebar navigation</li>
                  <li>Client components marked with &quot;use client&quot; directive</li>
                  <li>Root redirects to /dashboard as the main entry point</li>
                </ul>
              </div>

              <div className="rounded-lg border p-3 bg-muted/50">
                <p className="font-medium mb-2">2. Dashboard Page (dashboard/page.tsx)</p>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                  <li>Search form with stock ticker input</li>
                  <li>Fetches data from backend API: <code className="text-xs bg-muted px-1 py-0.5 rounded">GET /api/stock/:symbol</code></li>
                  <li>Displays 50+ metrics organized in 5 tabs:
                    <ul className="list-circle list-inside ml-6 mt-1">
                      <li><strong>Overview</strong> - 52-week range, moving averages, analyst targets</li>
                      <li><strong>Valuation</strong> - Market cap, P/E ratio, dividends, EPS</li>
                      <li><strong>Financials</strong> - Profit margins, ROA, ROE, revenue metrics</li>
                      <li><strong>Performance</strong> - Daily trading data, technical indicators</li>
                      <li><strong>Risk</strong> - Beta analysis, volatility, 52-week comparisons</li>
                    </ul>
                  </li>
                  <li>Uses React hooks (useState) for state management</li>
                  <li>Implements helper functions for number/percentage formatting</li>
                </ul>
              </div>

              <div className="rounded-lg border p-3 bg-muted/50">
                <p className="font-medium mb-2">3. Trending Page (trending/page.tsx)</p>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                  <li>Showcase page with fake market data</li>
                  <li>Demonstrates 10+ unique Shadcn components</li>
                  <li>Features: Market sentiment, trending stocks, top gainers/losers, sector performance</li>
                  <li>Uses tabs, badges, progress bars, avatars for rich UI</li>
                </ul>
              </div>

              <div className="rounded-lg border p-3 bg-muted/50">
                <p className="font-medium mb-2">4. Analytics Page (analytics/page.tsx)</p>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                  <li>Showcase page with fake portfolio analytics</li>
                  <li>Demonstrates 15+ Shadcn component variations</li>
                  <li>Features: Performance metrics, asset allocation, risk analysis, trading activity</li>
                  <li>Comprehensive use of cards, tabs, progress indicators</li>
                </ul>
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-2">
            <h4 className="font-semibold">Shadcn UI Components Used</h4>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline">Card</Badge>
              <Badge variant="outline">Badge</Badge>
              <Badge variant="outline">Button</Badge>
              <Badge variant="outline">Input</Badge>
              <Badge variant="outline">Tabs</Badge>
              <Badge variant="outline">Progress</Badge>
              <Badge variant="outline">Separator</Badge>
              <Badge variant="outline">Avatar</Badge>
              <Badge variant="outline">Alert</Badge>
              <Badge variant="outline">Dialog</Badge>
              <Badge variant="outline">Tooltip</Badge>
              <Badge variant="outline">Scroll Area</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Docker & Infrastructure */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5 text-cyan-500" />
            Docker & Infrastructure
          </CardTitle>
          <CardDescription>
            How the application is containerized and deployed
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <h4 className="font-semibold">Container Architecture</h4>
            <div className="space-y-3 text-sm">
              <div className="rounded-lg border p-3 bg-muted/50">
                <p className="font-medium mb-2">Backend Container</p>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                  <li>Multi-stage build: builder stage compiles Go binary, final stage runs it</li>
                  <li>Uses Alpine Linux for minimal image size</li>
                  <li>Exposes port 8080 internally</li>
                  <li>Includes health check endpoint</li>
                </ul>
              </div>

              <div className="rounded-lg border p-3 bg-muted/50">
                <p className="font-medium mb-2">Frontend Container</p>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                  <li>Multi-stage build: deps, builder, runner stages</li>
                  <li>Next.js standalone output for optimized production build</li>
                  <li>Exposes port 3000 internally</li>
                  <li>Runs as non-root user for security</li>
                </ul>
              </div>

              <div className="rounded-lg border p-3 bg-muted/50">
                <p className="font-medium mb-2">Nginx Container</p>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                  <li>Reverse proxy for frontend and backend</li>
                  <li>HTTPS with self-signed certificates</li>
                  <li>Routes /api/* to backend, everything else to frontend</li>
                  <li>Listens on 127.0.0.3:443 (custom domain: go-stocktracking.ai)</li>
                </ul>
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-2">
            <h4 className="font-semibold">Docker Compose Services</h4>
            <ul className="space-y-1 text-sm list-disc list-inside text-muted-foreground ml-4">
              <li><strong>backend</strong> - Go Gin API server</li>
              <li><strong>frontend</strong> - Next.js web application</li>
              <li><strong>nginx</strong> - Reverse proxy with SSL termination</li>
              <li>All services connected via custom Docker network</li>
              <li>Environment variables injected from .env file</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* API Integration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5 text-pink-500" />
            External API Integration
          </CardTitle>
          <CardDescription>
            How stock data is fetched from Alpha Vantage
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3 text-sm">
            <p className="leading-relaxed">
              The application integrates with the <strong>Alpha Vantage API</strong>, a free stock market
              data provider. The backend makes two concurrent API calls for maximum data retrieval:
            </p>

            <div className="rounded-lg border p-3 bg-muted/50">
              <p className="font-medium mb-2">API Endpoint 1: GLOBAL_QUOTE</p>
              <p className="text-muted-foreground mb-2">
                <code className="text-xs bg-muted px-1 py-0.5 rounded">
                  https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=AAPL
                </code>
              </p>
              <p className="text-muted-foreground">
                Provides real-time price data: current price, open, high, low, volume, previous close,
                change, change percentage
              </p>
            </div>

            <div className="rounded-lg border p-3 bg-muted/50">
              <p className="font-medium mb-2">API Endpoint 2: OVERVIEW</p>
              <p className="text-muted-foreground mb-2">
                <code className="text-xs bg-muted px-1 py-0.5 rounded">
                  https://www.alphavantage.co/query?function=OVERVIEW&symbol=AAPL
                </code>
              </p>
              <p className="text-muted-foreground">
                Provides company fundamentals: market cap, P/E ratio, EPS, profit margins, revenue,
                growth metrics, analyst targets, dividends, and 40+ additional fields
              </p>
            </div>

            <p className="leading-relaxed">
              The backend <strong>merges both API responses</strong> into a single comprehensive StockData
              object with 50+ fields, providing the frontend with all necessary information in one response.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Development Workflow */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileCode className="h-5 w-5 text-yellow-500" />
            Development Workflow
          </CardTitle>
          <CardDescription>
            How to run and develop this application locally
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3 text-sm">
            <div className="rounded-lg border p-3 bg-muted/50">
              <p className="font-medium mb-2">1. Prerequisites</p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                <li>Docker and Docker Compose installed</li>
                <li>Alpha Vantage API key (free from alphavantage.co)</li>
                <li>Local /etc/hosts entry: <code className="text-xs bg-muted px-1 py-0.5 rounded">127.0.0.3 go-stocktracking.ai</code></li>
              </ul>
            </div>

            <div className="rounded-lg border p-3 bg-muted/50">
              <p className="font-medium mb-2">2. Environment Setup</p>
              <p className="text-muted-foreground mb-2">Create .env file with:</p>
              <pre className="text-xs bg-muted p-2 rounded font-mono">
{`STOCK_API_KEY=your_alpha_vantage_key
STOCK_API_PROVIDER=alphavantage
NEXT_PUBLIC_API_URL=https://go-stocktracking.ai/api`}
              </pre>
            </div>

            <div className="rounded-lg border p-3 bg-muted/50">
              <p className="font-medium mb-2">3. Run Application</p>
              <pre className="text-xs bg-muted p-2 rounded font-mono">
{`# Build and start all containers
docker-compose up --build

# Access application
https://go-stocktracking.ai`}
              </pre>
            </div>

            <div className="rounded-lg border p-3 bg-muted/50">
              <p className="font-medium mb-2">4. Development Commands</p>
              <pre className="text-xs bg-muted p-2 rounded font-mono">
{`# View logs
docker-compose logs -f

# Rebuild specific service
docker-compose up --build frontend

# Stop all services
docker-compose down`}
              </pre>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Learnings */}
      <Card className="border-primary">
        <CardHeader>
          <CardTitle>Key Learnings & Showcase Elements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <h4 className="font-semibold text-sm">Backend Skills Demonstrated</h4>
              <ul className="text-sm space-y-1 text-muted-foreground list-disc list-inside">
                <li>Go programming with modern patterns</li>
                <li>Gin framework routing and middleware</li>
                <li>RESTful API design</li>
                <li>External API integration</li>
                <li>Data modeling and serialization</li>
                <li>Error handling and logging</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-sm">Frontend Skills Demonstrated</h4>
              <ul className="text-sm space-y-1 text-muted-foreground list-disc list-inside">
                <li>Next.js 14 App Router</li>
                <li>React hooks and state management</li>
                <li>TypeScript type safety</li>
                <li>Shadcn UI component mastery</li>
                <li>Responsive design with Tailwind</li>
                <li>Client-side data fetching</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-sm">Infrastructure Skills</h4>
              <ul className="text-sm space-y-1 text-muted-foreground list-disc list-inside">
                <li>Docker multi-stage builds</li>
                <li>Docker Compose orchestration</li>
                <li>Nginx reverse proxy</li>
                <li>HTTPS with SSL certificates</li>
                <li>Environment configuration</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-sm">Best Practices</h4>
              <ul className="text-sm space-y-1 text-muted-foreground list-disc list-inside">
                <li>Separation of concerns</li>
                <li>Component-based architecture</li>
                <li>Type-safe development</li>
                <li>Clean code organization</li>
                <li>Comprehensive documentation</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
