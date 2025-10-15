"use client"

import { useState } from "react"
import { Search, TrendingUp, TrendingDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface StockData {
  symbol: string
  price: string
  change: string
  changePercent: string
  volume: string
  lastUpdated: string
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

  return (
    <div className="container mx-auto p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Stock Dashboard</h1>
        <p className="text-muted-foreground">
          Search for any stock ticker symbol to get real-time data
        </p>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Search Stock</CardTitle>
          <CardDescription>
            Enter a stock ticker symbol (e.g., AAPL, GOOGL, TSLA)
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
        <Card className="mb-8 border-destructive">
          <CardHeader>
            <CardTitle className="text-destructive">Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-destructive">{error}</p>
          </CardContent>
        </Card>
      )}

      {stockData && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-3xl">{stockData.symbol}</CardTitle>
                <CardDescription>
                  Last updated: {stockData.lastUpdated}
                </CardDescription>
              </div>
              <div className="text-right">
                <div className="text-4xl font-bold">${stockData.price}</div>
                <div className={`flex items-center gap-1 text-lg font-semibold ${
                  isPositive ? "text-green-600" : "text-red-600"
                }`}>
                  {isPositive ? (
                    <TrendingUp className="h-5 w-5" />
                  ) : (
                    <TrendingDown className="h-5 w-5" />
                  )}
                  {stockData.change} ({stockData.changePercent})
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Volume</p>
                <p className="text-xl font-semibold">{stockData.volume}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Data Provider</p>
                <p className="text-xl font-semibold capitalize">{stockData.provider}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
