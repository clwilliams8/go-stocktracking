"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import {
  BarChart3,
  PieChart,
  LineChart,
  Activity,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  Target,
  Zap,
  AlertCircle,
  CheckCircle2
} from "lucide-react"

// Mock analytics data
const portfolioMetrics = {
  totalValue: 125840.50,
  dayChange: 3245.20,
  dayChangePercent: 2.65,
  weekChange: 8450.30,
  monthChange: -2340.10,
  ytdReturn: 18.45,
  totalReturn: 25.84,
}

const performanceData = [
  { period: "1D", return: 2.65, benchmark: 1.42 },
  { period: "1W", return: 6.8, benchmark: 4.2 },
  { period: "1M", return: -1.9, benchmark: -0.8 },
  { period: "3M", return: 12.5, benchmark: 9.3 },
  { period: "YTD", return: 18.45, benchmark: 14.2 },
  { period: "1Y", return: 25.84, benchmark: 19.5 },
]

const assetAllocation = [
  { category: "Technology", value: 45, amount: 56628 },
  { category: "Healthcare", value: 20, amount: 25168 },
  { category: "Financial", value: 15, amount: 18876 },
  { category: "Consumer", value: 12, amount: 15101 },
  { category: "Energy", value: 8, amount: 10067 },
]

const riskMetrics = [
  { metric: "Sharpe Ratio", value: 1.85, status: "good", description: "Risk-adjusted return" },
  { metric: "Beta", value: 1.12, status: "neutral", description: "Market correlation" },
  { metric: "Alpha", value: 3.4, status: "good", description: "Excess return" },
  { metric: "Volatility", value: 18.5, status: "warning", description: "30-day std dev" },
  { metric: "Max Drawdown", value: -12.3, status: "good", description: "Largest decline" },
  { metric: "Win Rate", value: 68, status: "good", description: "Winning trades %" },
]

const topHoldings = [
  { symbol: "NVDA", name: "NVIDIA", value: 28450, allocation: 22.6, return: 45.2 },
  { symbol: "AAPL", name: "Apple", value: 18920, allocation: 15.0, return: 12.5 },
  { symbol: "MSFT", name: "Microsoft", value: 15680, allocation: 12.5, return: 18.7 },
  { symbol: "GOOGL", name: "Alphabet", value: 12340, allocation: 9.8, return: 8.3 },
  { symbol: "AMZN", name: "Amazon", value: 10450, allocation: 8.3, return: -2.1 },
]

const tradingActivity = [
  { date: "2025-10-15", trades: 8, volume: "$45,230", pnl: "$1,240" },
  { date: "2025-10-14", trades: 12, volume: "$62,180", pnl: "$2,450" },
  { date: "2025-10-13", trades: 5, volume: "$28,950", pnl: "-$320" },
  { date: "2025-10-12", trades: 15, volume: "$78,640", pnl: "$3,890" },
  { date: "2025-10-11", trades: 7, volume: "$38,220", pnl: "$890" },
]

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Portfolio Analytics</h1>
        <p className="text-muted-foreground mt-2">
          Comprehensive analysis of your investment performance and risk metrics
        </p>
      </div>

      {/* Portfolio Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Value</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${portfolioMetrics.totalValue.toLocaleString()}</div>
            <div className="flex items-center text-xs mt-1">
              <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
              <span className="text-green-500 font-medium">
                +${portfolioMetrics.dayChange.toLocaleString()} ({portfolioMetrics.dayChangePercent}%)
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Today</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Return</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+{portfolioMetrics.totalReturn}%</div>
            <p className="text-xs text-muted-foreground mt-1">
              Since inception
            </p>
            <Progress value={portfolioMetrics.totalReturn} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">YTD Performance</CardTitle>
            <Activity className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+{portfolioMetrics.ytdReturn}%</div>
            <p className="text-xs text-muted-foreground mt-1">
              Year to date
            </p>
            <Badge className="mt-2" variant="outline">
              Outperforming S&P 500
            </Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Positions</CardTitle>
            <Target className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground mt-1">
              Across 5 sectors
            </p>
            <div className="flex gap-1 mt-2">
              <Badge className="text-xs">12 stocks</Badge>
              <Badge className="text-xs" variant="secondary">8 ETFs</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Analysis */}
      <Tabs defaultValue="performance" className="space-y-4">
        <TabsList>
          <TabsTrigger value="performance">
            <LineChart className="h-4 w-4 mr-2" />
            Performance
          </TabsTrigger>
          <TabsTrigger value="allocation">
            <PieChart className="h-4 w-4 mr-2" />
            Allocation
          </TabsTrigger>
          <TabsTrigger value="risk">
            <AlertCircle className="h-4 w-4 mr-2" />
            Risk Analysis
          </TabsTrigger>
          <TabsTrigger value="activity">
            <Zap className="h-4 w-4 mr-2" />
            Activity
          </TabsTrigger>
        </TabsList>

        <TabsContent value="performance" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Performance vs Benchmark</CardTitle>
                <CardDescription>Your returns compared to S&P 500</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {performanceData.map((period) => (
                    <div key={period.period} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{period.period}</span>
                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <p className={`text-sm font-bold ${period.return > 0 ? 'text-green-500' : 'text-red-500'}`}>
                              {period.return > 0 ? '+' : ''}{period.return}%
                            </p>
                            <p className="text-xs text-muted-foreground">You</p>
                          </div>
                          <div className="text-right">
                            <p className={`text-sm font-bold ${period.benchmark > 0 ? 'text-green-500' : 'text-red-500'}`}>
                              {period.benchmark > 0 ? '+' : ''}{period.benchmark}%
                            </p>
                            <p className="text-xs text-muted-foreground">S&P 500</p>
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <Progress value={Math.abs(period.return) * 5} className="h-2" />
                        <Progress value={Math.abs(period.benchmark) * 5} className="h-2 opacity-50" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Holdings</CardTitle>
                <CardDescription>Your largest positions by value</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topHoldings.map((holding) => (
                    <div key={holding.symbol}>
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <p className="text-sm font-bold">{holding.symbol}</p>
                          <p className="text-xs text-muted-foreground">{holding.name}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-bold">${holding.value.toLocaleString()}</p>
                          <p className={`text-xs ${holding.return > 0 ? 'text-green-500' : 'text-red-500'}`}>
                            {holding.return > 0 ? '+' : ''}{holding.return}%
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Progress value={holding.allocation * 4} className="flex-1" />
                        <span className="text-xs text-muted-foreground w-12 text-right">
                          {holding.allocation}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="allocation" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Asset Allocation by Sector</CardTitle>
              <CardDescription>Distribution of your portfolio across different sectors</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {assetAllocation.map((asset) => (
                  <div key={asset.category} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <BarChart3 className="h-4 w-4 text-primary" />
                        <span className="text-sm font-medium">{asset.category}</span>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold">${asset.amount.toLocaleString()}</p>
                        <p className="text-xs text-muted-foreground">{asset.value}%</p>
                      </div>
                    </div>
                    <Progress value={asset.value * 2} />
                  </div>
                ))}
              </div>
              <Separator className="my-4" />
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold">Total Allocation</span>
                <span className="text-sm font-bold">100%</span>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="risk" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {riskMetrics.map((metric) => (
              <Card key={metric.metric}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium">{metric.metric}</CardTitle>
                    {metric.status === 'good' && <CheckCircle2 className="h-4 w-4 text-green-500" />}
                    {metric.status === 'warning' && <AlertCircle className="h-4 w-4 text-yellow-500" />}
                    {metric.status === 'neutral' && <Activity className="h-4 w-4 text-blue-500" />}
                  </div>
                  <CardDescription className="text-xs">{metric.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {typeof metric.value === 'number' && metric.value < 0 ? '' : ''}{metric.value}{typeof metric.value === 'number' && metric.metric === 'Win Rate' ? '%' : ''}
                  </div>
                  <Badge
                    className="mt-2"
                    variant={metric.status === 'good' ? 'default' : metric.status === 'warning' ? 'destructive' : 'secondary'}
                  >
                    {metric.status === 'good' ? 'Healthy' : metric.status === 'warning' ? 'Monitor' : 'Neutral'}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Risk Assessment</CardTitle>
              <CardDescription>Overall portfolio risk evaluation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Overall Risk Score</span>
                    <Badge>Moderate</Badge>
                  </div>
                  <Progress value={55} className="h-3" />
                  <p className="text-xs text-muted-foreground">
                    Your portfolio risk is moderate, balanced between growth and stability
                  </p>
                </div>
                <Separator />
                <div className="space-y-2">
                  <p className="text-sm font-medium">Key Insights:</p>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                      <span>Strong Sharpe ratio indicates good risk-adjusted returns</span>
                    </li>
                    <li className="flex items-start">
                      <AlertCircle className="h-4 w-4 text-yellow-500 mr-2 mt-0.5" />
                      <span>Volatility is slightly elevated - consider diversification</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                      <span>Maximum drawdown is within acceptable limits</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Trading Activity</CardTitle>
              <CardDescription>Your trading history for the past 5 days</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {tradingActivity.map((day) => (
                  <div key={day.date} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="text-sm font-medium">{day.date}</p>
                      <p className="text-xs text-muted-foreground">{day.trades} trades</p>
                    </div>
                    <div className="text-right space-y-1">
                      <p className="text-sm font-medium">{day.volume}</p>
                      <p className={`text-xs font-medium ${day.pnl.startsWith('-') ? 'text-red-500' : 'text-green-500'}`}>
                        P&L: {day.pnl}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
