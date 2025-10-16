"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { TrendingUp, TrendingDown, Star, Flame, Zap, Award, ArrowUpRight, ArrowDownRight } from "lucide-react"

// Mock trending stocks data
const trendingStocks = [
  { symbol: "NVDA", name: "NVIDIA Corporation", price: 875.28, change: 12.45, changePercent: 1.44, volume: "45.2M", momentum: 85 },
  { symbol: "TSLA", name: "Tesla, Inc.", price: 242.84, change: -5.23, changePercent: -2.11, volume: "125.3M", momentum: 72 },
  { symbol: "AAPL", name: "Apple Inc.", price: 178.72, change: 2.15, changePercent: 1.22, volume: "52.1M", momentum: 68 },
  { symbol: "MSFT", name: "Microsoft Corporation", price: 378.91, change: 4.32, changePercent: 1.15, volume: "28.7M", momentum: 81 },
  { symbol: "GOOGL", name: "Alphabet Inc.", price: 141.80, change: 1.85, changePercent: 1.32, volume: "22.4M", momentum: 75 },
  { symbol: "AMZN", name: "Amazon.com, Inc.", price: 178.25, change: 3.42, changePercent: 1.96, volume: "38.9M", momentum: 79 },
]

const topGainers = [
  { symbol: "COIN", name: "Coinbase Global", price: 256.31, change: 28.45, changePercent: 12.48 },
  { symbol: "RIOT", name: "Riot Platforms", price: 14.52, change: 1.67, changePercent: 12.99 },
  { symbol: "MARA", name: "Marathon Digital", price: 22.18, change: 2.41, changePercent: 12.19 },
  { symbol: "HOOD", name: "Robinhood Markets", price: 38.91, change: 3.92, changePercent: 11.21 },
]

const topLosers = [
  { symbol: "SNAP", name: "Snap Inc.", price: 11.24, change: -2.14, changePercent: -16.01 },
  { symbol: "PINS", name: "Pinterest, Inc.", price: 36.47, change: -4.83, changePercent: -11.70 },
  { symbol: "DASH", name: "DoorDash, Inc.", price: 128.91, change: -12.32, changePercent: -8.72 },
  { symbol: "UBER", name: "Uber Technologies", price: 71.45, change: -5.21, changePercent: -6.80 },
]

const mostActive = [
  { symbol: "TSLA", volume: "125.3M", trades: "2.4M" },
  { symbol: "AAPL", volume: "52.1M", trades: "1.8M" },
  { symbol: "NVDA", volume: "45.2M", trades: "1.5M" },
  { symbol: "AMZN", volume: "38.9M", trades: "1.2M" },
  { symbol: "MSFT", volume: "28.7M", trades: "0.9M" },
]

const sectorPerformance = [
  { name: "Technology", change: 2.45, companies: 145 },
  { name: "Healthcare", change: 1.32, companies: 98 },
  { name: "Financial", change: -0.87, companies: 112 },
  { name: "Consumer", change: 0.95, companies: 87 },
  { name: "Energy", change: -1.24, companies: 56 },
  { name: "Industrials", change: 0.42, companies: 71 },
]

export default function TrendingPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Trending Stocks</h1>
        <p className="text-muted-foreground mt-2">
          Real-time market movers, top gainers, losers, and most active stocks
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Market Sentiment</CardTitle>
            <Flame className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Bullish</div>
            <p className="text-xs text-muted-foreground">
              68% positive sentiment
            </p>
            <Progress value={68} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Trending Now</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-muted-foreground">
              Stocks trending upward
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">High Volume</CardTitle>
            <Zap className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.4B</div>
            <p className="text-xs text-muted-foreground">
              Total volume today
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Top Mover</CardTitle>
            <Award className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">COIN</div>
            <p className="text-xs text-muted-foreground">
              +12.48% today
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Trending Section */}
      <Tabs defaultValue="trending" className="space-y-4">
        <TabsList>
          <TabsTrigger value="trending">
            <Star className="h-4 w-4 mr-2" />
            Trending
          </TabsTrigger>
          <TabsTrigger value="gainers">
            <ArrowUpRight className="h-4 w-4 mr-2" />
            Top Gainers
          </TabsTrigger>
          <TabsTrigger value="losers">
            <ArrowDownRight className="h-4 w-4 mr-2" />
            Top Losers
          </TabsTrigger>
          <TabsTrigger value="active">
            <Zap className="h-4 w-4 mr-2" />
            Most Active
          </TabsTrigger>
        </TabsList>

        <TabsContent value="trending" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Trending Stocks by Momentum</CardTitle>
              <CardDescription>
                Stocks with the highest momentum scores based on price action and volume
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {trendingStocks.map((stock, index) => (
                  <div key={stock.symbol}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <Avatar>
                          <AvatarFallback className="bg-primary/10 text-primary font-bold">
                            {index + 1}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center space-x-2">
                            <p className="text-sm font-bold">{stock.symbol}</p>
                            <Badge variant="outline" className="text-xs">
                              Momentum: {stock.momentum}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{stock.name}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold">${stock.price.toFixed(2)}</p>
                        <div className="flex items-center space-x-1">
                          {stock.change > 0 ? (
                            <TrendingUp className="h-3 w-3 text-green-500" />
                          ) : (
                            <TrendingDown className="h-3 w-3 text-red-500" />
                          )}
                          <p className={`text-xs font-medium ${stock.change > 0 ? 'text-green-500' : 'text-red-500'}`}>
                            {stock.change > 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-2 flex items-center space-x-4 text-xs text-muted-foreground">
                      <span>Vol: {stock.volume}</span>
                      <Progress value={stock.momentum} className="w-32 h-1" />
                    </div>
                    {index < trendingStocks.length - 1 && <Separator className="mt-4" />}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="gainers" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {topGainers.map((stock) => (
              <Card key={stock.symbol}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">{stock.symbol}</CardTitle>
                      <CardDescription>{stock.name}</CardDescription>
                    </div>
                    <Badge className="bg-green-500">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      +{stock.changePercent.toFixed(2)}%
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Price</span>
                      <span className="text-sm font-bold">${stock.price.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Change</span>
                      <span className="text-sm font-bold text-green-500">+${stock.change.toFixed(2)}</span>
                    </div>
                    <Button className="w-full mt-2" size="sm">View Details</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="losers" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {topLosers.map((stock) => (
              <Card key={stock.symbol}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">{stock.symbol}</CardTitle>
                      <CardDescription>{stock.name}</CardDescription>
                    </div>
                    <Badge variant="destructive">
                      <TrendingDown className="h-3 w-3 mr-1" />
                      {stock.changePercent.toFixed(2)}%
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Price</span>
                      <span className="text-sm font-bold">${stock.price.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Change</span>
                      <span className="text-sm font-bold text-red-500">${stock.change.toFixed(2)}</span>
                    </div>
                    <Button className="w-full mt-2" size="sm" variant="outline">View Details</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="active" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Most Active Stocks</CardTitle>
              <CardDescription>Highest trading volume in the last 24 hours</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mostActive.map((stock, index) => (
                  <div key={stock.symbol} className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarFallback className="bg-yellow-500/10 text-yellow-600 font-bold">
                          {index + 1}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-bold">{stock.symbol}</p>
                        <p className="text-xs text-muted-foreground">{stock.trades} trades</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold">{stock.volume}</p>
                      <p className="text-xs text-muted-foreground">Volume</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Sector Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Sector Performance</CardTitle>
          <CardDescription>Performance by sector in the last 24 hours</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {sectorPerformance.map((sector) => (
              <div key={sector.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <p className="text-sm font-medium">{sector.name}</p>
                    <Badge variant="outline" className="text-xs">
                      {sector.companies} companies
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-2">
                    {sector.change > 0 ? (
                      <TrendingUp className="h-4 w-4 text-green-500" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-500" />
                    )}
                    <span className={`text-sm font-bold ${sector.change > 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {sector.change > 0 ? '+' : ''}{sector.change.toFixed(2)}%
                    </span>
                  </div>
                </div>
                <Progress
                  value={Math.abs(sector.change) * 20}
                  className={sector.change > 0 ? 'bg-green-100' : 'bg-red-100'}
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
