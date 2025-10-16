"use client"

import { useState } from "react"
import {
  Search,
  TrendingUp,
  TrendingDown,
  Building2,
  DollarSign,
  BarChart3,
  PieChart,
  TrendingUpIcon,
  AlertCircle,
  CalendarDays,
  Globe,
  MapPin,
  Activity
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"

interface StockData {
  // Basic Info
  symbol: string
  name: string
  description: string
  exchange: string
  currency: string
  country: string
  sector: string
  industry: string

  // Price Data
  price: string
  change: string
  changePercent: string
  open: string
  high: string
  low: string
  previousClose: string
  volume: string

  // 52 Week Data
  week52High: string
  week52Low: string

  // Moving Averages
  ma50: string
  ma200: string

  // Valuation Metrics
  marketCap: string
  peRatio: string
  pegRatio: string
  bookValue: string
  dividendPerShare: string
  dividendYield: string
  eps: string

  // Profitability Metrics
  revenuePerShareTTM: string
  profitMargin: string
  operatingMarginTTM: string
  returnOnAssetsTTM: string
  returnOnEquityTTM: string

  // Growth Metrics
  revenueTTM: string
  grossProfitTTM: string
  quarterlyEarningsGrowthYOY: string
  quarterlyRevenueGrowthYOY: string

  // Risk Metrics
  beta: string
  sharesOutstanding: string

  // Analyst Targets
  analystTargetPrice: string

  // Dates
  lastUpdated: string
  latestQuarter: string
  exDividendDate: string
  dividendDate: string

  // Additional Info
  address: string

  // Metadata
  provider: string
}

export default function DashboardPage() {
  const [symbol, setSymbol] = useState("")
  const [stockData, setStockData] = useState<StockData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!symbol.trim()) return

    setLoading(true)
    setError(null)

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://go-stocktracking.ai/api"
      const response = await fetch(`${apiUrl}/stock/${symbol.toUpperCase()}`)

      if (!response.ok) {
        throw new Error("Failed to fetch stock data")
      }

      const data = await response.json()
      setStockData(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
      setStockData(null)
    } finally {
      setLoading(false)
    }
  }

  const isPositive = stockData && parseFloat(stockData.change) >= 0
  const formatNumber = (value: string) => {
    if (!value || value === "None" || value === "") return "N/A"
    const num = parseFloat(value)
    if (isNaN(num)) return value
    if (num >= 1e12) return `$${(num / 1e12).toFixed(2)}T`
    if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`
    if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`
    return `$${num.toFixed(2)}`
  }

  const formatPercent = (value: string) => {
    if (!value || value === "None" || value === "") return "N/A"
    const num = parseFloat(value)
    if (isNaN(num)) return "N/A"
    return `${(num * 100).toFixed(2)}%`
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Stock Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Search for any stock ticker to get comprehensive real-time data and analytics
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Search Stock</CardTitle>
          <CardDescription>
            Enter a stock ticker symbol (e.g., AAPL, GOOGL, TSLA, MSFT, NVDA)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearch} className="flex gap-2">
            <Input
              type="text"
              placeholder="Enter ticker symbol..."
              value={symbol}
              onChange={(e) => setSymbol(e.target.value.toUpperCase())}
              className="flex-1"
            />
            <Button type="submit" disabled={loading}>
              <Search className="mr-2 h-4 w-4" />
              {loading ? "Searching..." : "Search"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {error && (
        <Card className="border-destructive">
          <CardHeader>
            <CardTitle className="text-destructive flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              Error
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-destructive">{error}</p>
          </CardContent>
        </Card>
      )}

      {stockData && (
        <div className="space-y-6">
          {/* Header Section */}
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <CardTitle className="text-4xl">{stockData.symbol}</CardTitle>
                    {stockData.sector && (
                      <Badge variant="outline" className="text-sm">
                        {stockData.sector}
                      </Badge>
                    )}
                    {stockData.exchange && (
                      <Badge variant="secondary" className="text-sm">
                        {stockData.exchange}
                      </Badge>
                    )}
                  </div>
                  {stockData.name && (
                    <CardDescription className="text-lg font-medium">
                      {stockData.name}
                    </CardDescription>
                  )}
                  {stockData.industry && (
                    <p className="text-sm text-muted-foreground flex items-center gap-2">
                      <Building2 className="h-4 w-4" />
                      {stockData.industry}
                    </p>
                  )}
                  {stockData.country && (
                    <p className="text-sm text-muted-foreground flex items-center gap-2">
                      <Globe className="h-4 w-4" />
                      {stockData.country} • {stockData.currency}
                    </p>
                  )}
                </div>
                <div className="text-right">
                  <div className="text-5xl font-bold">${stockData.price}</div>
                  <div className={`flex items-center gap-2 text-xl font-semibold mt-2 ${
                    isPositive ? "text-green-600" : "text-red-600"
                  }`}>
                    {isPositive ? (
                      <TrendingUp className="h-6 w-6" />
                    ) : (
                      <TrendingDown className="h-6 w-6" />
                    )}
                    <span>{stockData.change} ({stockData.changePercent})</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Last updated: {stockData.lastUpdated}
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {stockData.description && (
                <div className="mb-4">
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {stockData.description}
                  </p>
                </div>
              )}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground">Open</p>
                  <p className="text-lg font-semibold">${stockData.open}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">High</p>
                  <p className="text-lg font-semibold text-green-600">${stockData.high}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Low</p>
                  <p className="text-lg font-semibold text-red-600">${stockData.low}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Volume</p>
                  <p className="text-lg font-semibold">{parseInt(stockData.volume).toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Detailed Analysis Tabs */}
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="overview">
                <Activity className="h-4 w-4 mr-2" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="valuation">
                <DollarSign className="h-4 w-4 mr-2" />
                Valuation
              </TabsTrigger>
              <TabsTrigger value="financials">
                <BarChart3 className="h-4 w-4 mr-2" />
                Financials
              </TabsTrigger>
              <TabsTrigger value="performance">
                <TrendingUpIcon className="h-4 w-4 mr-2" />
                Performance
              </TabsTrigger>
              <TabsTrigger value="risk">
                <PieChart className="h-4 w-4 mr-2" />
                Risk
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>52-Week Range</CardTitle>
                    <CardDescription>Annual price movement</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Low</span>
                        <span className="font-medium">${stockData.week52Low}</span>
                      </div>
                      <Progress value={50} />
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">High</span>
                        <span className="font-medium">${stockData.week52High}</span>
                      </div>
                    </div>
                    <Separator />
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">Current Position</p>
                      <p className="text-2xl font-bold">${stockData.price}</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Moving Averages</CardTitle>
                    <CardDescription>Technical indicators</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">50-Day MA</span>
                        <Badge variant="outline">${stockData.ma50 || "N/A"}</Badge>
                      </div>
                      {stockData.ma50 && (
                        <Progress value={65} className="h-2" />
                      )}
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">200-Day MA</span>
                        <Badge variant="outline">${stockData.ma200 || "N/A"}</Badge>
                      </div>
                      {stockData.ma200 && (
                        <Progress value={45} className="h-2" />
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {stockData.analystTargetPrice && (
                <Card>
                  <CardHeader>
                    <CardTitle>Analyst Target</CardTitle>
                    <CardDescription>Average price target from analysts</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-3xl font-bold">${stockData.analystTargetPrice}</p>
                        <p className="text-sm text-muted-foreground mt-1">Target Price</p>
                      </div>
                      <Badge className="text-lg px-4 py-2">
                        {((parseFloat(stockData.analystTargetPrice) / parseFloat(stockData.price) - 1) * 100).toFixed(2)}% Upside
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="valuation" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium">Market Cap</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold">{formatNumber(stockData.marketCap)}</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium">P/E Ratio</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold">{stockData.peRatio || "N/A"}</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium">PEG Ratio</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold">{stockData.pegRatio || "N/A"}</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium">EPS</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold">${stockData.eps || "N/A"}</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium">Book Value</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold">${stockData.bookValue || "N/A"}</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium">Shares Outstanding</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold">{formatNumber(stockData.sharesOutstanding)}</p>
                  </CardContent>
                </Card>
              </div>

              {(stockData.dividendPerShare || stockData.dividendYield) && (
                <Card>
                  <CardHeader>
                    <CardTitle>Dividend Information</CardTitle>
                    <CardDescription>Dividend metrics and dates</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Dividend Per Share</p>
                        <p className="text-xl font-semibold">${stockData.dividendPerShare || "N/A"}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Dividend Yield</p>
                        <p className="text-xl font-semibold">{formatPercent(stockData.dividendYield)}</p>
                      </div>
                      {stockData.exDividendDate && (
                        <div>
                          <p className="text-sm text-muted-foreground flex items-center gap-1">
                            <CalendarDays className="h-3 w-3" />
                            Ex-Dividend Date
                          </p>
                          <p className="text-xl font-semibold">{stockData.exDividendDate}</p>
                        </div>
                      )}
                      {stockData.dividendDate && (
                        <div>
                          <p className="text-sm text-muted-foreground flex items-center gap-1">
                            <CalendarDays className="h-3 w-3" />
                            Dividend Date
                          </p>
                          <p className="text-xl font-semibold">{stockData.dividendDate}</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="financials" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Profitability Metrics</CardTitle>
                  <CardDescription>Trailing twelve months (TTM)</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Profit Margin</span>
                        <span className="text-sm font-bold">{formatPercent(stockData.profitMargin)}</span>
                      </div>
                      <Progress value={parseFloat(stockData.profitMargin || "0") * 100} />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Operating Margin</span>
                        <span className="text-sm font-bold">{formatPercent(stockData.operatingMarginTTM)}</span>
                      </div>
                      <Progress value={parseFloat(stockData.operatingMarginTTM || "0") * 100} />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Return on Assets (ROA)</span>
                        <span className="text-sm font-bold">{formatPercent(stockData.returnOnAssetsTTM)}</span>
                      </div>
                      <Progress value={parseFloat(stockData.returnOnAssetsTTM || "0") * 100} />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Return on Equity (ROE)</span>
                        <span className="text-sm font-bold">{formatPercent(stockData.returnOnEquityTTM)}</span>
                      </div>
                      <Progress value={parseFloat(stockData.returnOnEquityTTM || "0") * 100} />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Revenue Metrics</CardTitle>
                    <CardDescription>TTM revenue data</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Revenue TTM</p>
                      <p className="text-2xl font-bold">{formatNumber(stockData.revenueTTM)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Revenue Per Share TTM</p>
                      <p className="text-2xl font-bold">${stockData.revenuePerShareTTM || "N/A"}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Gross Profit TTM</p>
                      <p className="text-2xl font-bold">{formatNumber(stockData.grossProfitTTM)}</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Growth Metrics</CardTitle>
                    <CardDescription>Year-over-year growth</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <p className="text-sm text-muted-foreground">Quarterly Earnings Growth YOY</p>
                      <div className="flex items-center gap-2">
                        <p className="text-2xl font-bold">{formatPercent(stockData.quarterlyEarningsGrowthYOY)}</p>
                        {parseFloat(stockData.quarterlyEarningsGrowthYOY || "0") > 0 && (
                          <Badge className="bg-green-500">Growing</Badge>
                        )}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Quarterly Revenue Growth YOY</p>
                      <div className="flex items-center gap-2">
                        <p className="text-2xl font-bold">{formatPercent(stockData.quarterlyRevenueGrowthYOY)}</p>
                        {parseFloat(stockData.quarterlyRevenueGrowthYOY || "0") > 0 && (
                          <Badge className="bg-green-500">Growing</Badge>
                        )}
                      </div>
                    </div>
                    {stockData.latestQuarter && (
                      <div>
                        <p className="text-sm text-muted-foreground">Latest Quarter</p>
                        <p className="text-lg font-semibold">{stockData.latestQuarter}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="performance" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Price Performance</CardTitle>
                  <CardDescription>Daily trading data</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Previous Close</p>
                      <p className="text-xl font-semibold">${stockData.previousClose}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Day&apos;s Change</p>
                      <p className={`text-xl font-semibold ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                        {stockData.change}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">% Change</p>
                      <p className={`text-xl font-semibold ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                        {stockData.changePercent}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Volume</p>
                      <p className="text-xl font-semibold">{parseInt(stockData.volume).toLocaleString()}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Technical Indicators</CardTitle>
                  <CardDescription>Moving averages and price levels</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {stockData.ma50 && (
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">50-Day Moving Average</span>
                          <Badge variant="outline" className="text-lg">${stockData.ma50}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Current price is {parseFloat(stockData.price) > parseFloat(stockData.ma50) ? 'above' : 'below'} the 50-day MA
                        </p>
                        <Progress value={65} className="h-3" />
                      </div>
                    )}
                    {stockData.ma200 && (
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">200-Day Moving Average</span>
                          <Badge variant="outline" className="text-lg">${stockData.ma200}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Current price is {parseFloat(stockData.price) > parseFloat(stockData.ma200) ? 'above' : 'below'} the 200-day MA
                        </p>
                        <Progress value={55} className="h-3" />
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="risk" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Risk Analysis</CardTitle>
                  <CardDescription>Beta and volatility indicators</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {stockData.beta && (
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium">Beta</p>
                            <p className="text-sm text-muted-foreground">Market correlation (1.0 = market average)</p>
                          </div>
                          <div className="text-right">
                            <p className="text-3xl font-bold">{stockData.beta}</p>
                            {parseFloat(stockData.beta) > 1 ? (
                              <Badge variant="destructive">High Volatility</Badge>
                            ) : parseFloat(stockData.beta) < 0.8 ? (
                              <Badge className="bg-green-500">Low Volatility</Badge>
                            ) : (
                              <Badge variant="secondary">Moderate</Badge>
                            )}
                          </div>
                        </div>
                        <Progress
                          value={Math.min(parseFloat(stockData.beta) * 50, 100)}
                          className="h-3"
                        />
                      </div>
                    )}
                    <Separator />
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <p className="text-sm text-muted-foreground mb-2">52-Week High</p>
                        <p className="text-2xl font-bold text-green-600">${stockData.week52High}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Current: {((parseFloat(stockData.price) / parseFloat(stockData.week52High)) * 100).toFixed(1)}% of high
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-2">52-Week Low</p>
                        <p className="text-2xl font-bold text-red-600">${stockData.week52Low}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {(((parseFloat(stockData.price) - parseFloat(stockData.week52Low)) / parseFloat(stockData.week52Low)) * 100).toFixed(1)}% above low
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Additional Info Footer */}
          {stockData.address && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Company Address
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">{stockData.address}</p>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <p>Data provided by {stockData.provider}</p>
                <p>Last updated: {stockData.lastUpdated}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
