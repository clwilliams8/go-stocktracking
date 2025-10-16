package models

// StockData represents comprehensive stock information from multiple API endpoints
type StockData struct {
	// Basic Info
	Symbol      string `json:"symbol"`
	Name        string `json:"name"`
	Description string `json:"description"`
	Exchange    string `json:"exchange"`
	Currency    string `json:"currency"`
	Country     string `json:"country"`
	Sector      string `json:"sector"`
	Industry    string `json:"industry"`

	// Price Data
	Price         string `json:"price"`
	Change        string `json:"change"`
	ChangePercent string `json:"changePercent"`
	Open          string `json:"open"`
	High          string `json:"high"`
	Low           string `json:"low"`
	PreviousClose string `json:"previousClose"`
	Volume        string `json:"volume"`

	// 52 Week Data
	Week52High string `json:"week52High"`
	Week52Low  string `json:"week52Low"`

	// Moving Averages
	MA50  string `json:"ma50"`
	MA200 string `json:"ma200"`

	// Valuation Metrics
	MarketCap       string `json:"marketCap"`
	PERatio         string `json:"peRatio"`
	PEGRatio        string `json:"pegRatio"`
	BookValue       string `json:"bookValue"`
	DividendPerShare string `json:"dividendPerShare"`
	DividendYield   string `json:"dividendYield"`
	EPS             string `json:"eps"`

	// Profitability Metrics
	RevenuePerShareTTM string `json:"revenuePerShareTTM"`
	ProfitMargin       string `json:"profitMargin"`
	OperatingMarginTTM string `json:"operatingMarginTTM"`
	ReturnOnAssetsTTM  string `json:"returnOnAssetsTTM"`
	ReturnOnEquityTTM  string `json:"returnOnEquityTTM"`

	// Growth Metrics
	RevenueTTM                 string `json:"revenueTTM"`
	GrossProfitTTM             string `json:"grossProfitTTM"`
	QuarterlyEarningsGrowthYOY string `json:"quarterlyEarningsGrowthYOY"`
	QuarterlyRevenueGrowthYOY  string `json:"quarterlyRevenueGrowthYOY"`

	// Risk Metrics
	Beta                string `json:"beta"`
	SharesOutstanding   string `json:"sharesOutstanding"`

	// Analyst Targets
	AnalystTargetPrice string `json:"analystTargetPrice"`

	// Dates
	LastUpdated     string `json:"lastUpdated"`
	LatestQuarter   string `json:"latestQuarter"`
	ExDividendDate  string `json:"exDividendDate"`
	DividendDate    string `json:"dividendDate"`

	// Additional Info
	Address string `json:"address"`

	// Metadata
	Provider string `json:"provider"`
}
