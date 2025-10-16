package services

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"
	"time"

	"github.com/clwilliams8/go-stocktracking/backend/models"
)

// FetchStockData retrieves stock data from the configured API provider
func FetchStockData(symbol string) (*models.StockData, error) {
	provider := os.Getenv("STOCK_API_PROVIDER")
	if provider == "" {
		provider = "alphavantage" // default
	}

	switch provider {
	case "alphavantage":
		return fetchFromAlphaVantage(symbol)
	case "finnhub":
		return fetchFromFinnhub(symbol)
	default:
		return nil, fmt.Errorf("unsupported stock API provider: %s", provider)
	}
}

// fetchFromAlphaVantage retrieves comprehensive stock data from Alpha Vantage API
// It combines data from GLOBAL_QUOTE (real-time) and OVERVIEW (fundamentals) endpoints
func fetchFromAlphaVantage(symbol string) (*models.StockData, error) {
	apiKey := os.Getenv("STOCK_API_KEY")
	if apiKey == "" {
		return nil, fmt.Errorf("STOCK_API_KEY environment variable not set")
	}

	// Fetch real-time quote data
	quoteData, err := fetchAlphaVantageQuote(symbol, apiKey)
	if err != nil {
		return nil, err
	}

	// Fetch company overview and fundamentals
	overviewData, err := fetchAlphaVantageOverview(symbol, apiKey)
	if err != nil {
		// If overview fails, return quote data only (better than nothing)
		return quoteData, nil
	}

	// Merge overview data into quote data
	mergeOverviewData(quoteData, overviewData)

	return quoteData, nil
}

// fetchAlphaVantageQuote fetches real-time quote data
func fetchAlphaVantageQuote(symbol, apiKey string) (*models.StockData, error) {
	url := fmt.Sprintf(
		"https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=%s&apikey=%s",
		symbol,
		apiKey,
	)

	client := &http.Client{Timeout: 10 * time.Second}
	resp, err := client.Get(url)
	if err != nil {
		return nil, fmt.Errorf("failed to fetch quote data: %w", err)
	}
	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, fmt.Errorf("failed to read quote response: %w", err)
	}

	var result struct {
		GlobalQuote struct {
			Symbol           string `json:"01. symbol"`
			Open             string `json:"02. open"`
			High             string `json:"03. high"`
			Low              string `json:"04. low"`
			Price            string `json:"05. price"`
			Volume           string `json:"06. volume"`
			LatestTradingDay string `json:"07. latest trading day"`
			PreviousClose    string `json:"08. previous close"`
			Change           string `json:"09. change"`
			ChangePercent    string `json:"10. change percent"`
		} `json:"Global Quote"`
	}

	if err := json.Unmarshal(body, &result); err != nil {
		return nil, fmt.Errorf("failed to parse quote response: %w", err)
	}

	if result.GlobalQuote.Symbol == "" {
		return nil, fmt.Errorf("invalid symbol or API limit reached")
	}

	return &models.StockData{
		Symbol:        result.GlobalQuote.Symbol,
		Price:         result.GlobalQuote.Price,
		Open:          result.GlobalQuote.Open,
		High:          result.GlobalQuote.High,
		Low:           result.GlobalQuote.Low,
		PreviousClose: result.GlobalQuote.PreviousClose,
		Change:        result.GlobalQuote.Change,
		ChangePercent: result.GlobalQuote.ChangePercent,
		Volume:        result.GlobalQuote.Volume,
		LastUpdated:   result.GlobalQuote.LatestTradingDay,
		Provider:      "alphavantage",
	}, nil
}

// fetchAlphaVantageOverview fetches company overview and fundamental data
func fetchAlphaVantageOverview(symbol, apiKey string) (map[string]string, error) {
	url := fmt.Sprintf(
		"https://www.alphavantage.co/query?function=OVERVIEW&symbol=%s&apikey=%s",
		symbol,
		apiKey,
	)

	client := &http.Client{Timeout: 10 * time.Second}
	resp, err := client.Get(url)
	if err != nil {
		return nil, fmt.Errorf("failed to fetch overview data: %w", err)
	}
	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, fmt.Errorf("failed to read overview response: %w", err)
	}

	var overview map[string]interface{}
	if err := json.Unmarshal(body, &overview); err != nil {
		return nil, fmt.Errorf("failed to parse overview response: %w", err)
	}

	// Convert all values to strings
	result := make(map[string]string)
	for key, value := range overview {
		if str, ok := value.(string); ok {
			result[key] = str
		}
	}

	return result, nil
}

// mergeOverviewData merges overview data into the stock data
func mergeOverviewData(stock *models.StockData, overview map[string]string) {
	stock.Name = overview["Name"]
	stock.Description = overview["Description"]
	stock.Exchange = overview["Exchange"]
	stock.Currency = overview["Currency"]
	stock.Country = overview["Country"]
	stock.Sector = overview["Sector"]
	stock.Industry = overview["Industry"]
	stock.Address = overview["Address"]

	// 52 Week Data
	stock.Week52High = overview["52WeekHigh"]
	stock.Week52Low = overview["52WeekLow"]

	// Moving Averages
	stock.MA50 = overview["50DayMovingAverage"]
	stock.MA200 = overview["200DayMovingAverage"]

	// Valuation Metrics
	stock.MarketCap = overview["MarketCapitalization"]
	stock.PERatio = overview["PERatio"]
	stock.PEGRatio = overview["PEGRatio"]
	stock.BookValue = overview["BookValue"]
	stock.DividendPerShare = overview["DividendPerShare"]
	stock.DividendYield = overview["DividendYield"]
	stock.EPS = overview["EPS"]

	// Profitability Metrics
	stock.RevenuePerShareTTM = overview["RevenuePerShareTTM"]
	stock.ProfitMargin = overview["ProfitMargin"]
	stock.OperatingMarginTTM = overview["OperatingMarginTTM"]
	stock.ReturnOnAssetsTTM = overview["ReturnOnAssetsTTM"]
	stock.ReturnOnEquityTTM = overview["ReturnOnEquityTTM"]

	// Growth Metrics
	stock.RevenueTTM = overview["RevenueTTM"]
	stock.GrossProfitTTM = overview["GrossProfitTTM"]
	stock.QuarterlyEarningsGrowthYOY = overview["QuarterlyEarningsGrowthYOY"]
	stock.QuarterlyRevenueGrowthYOY = overview["QuarterlyRevenueGrowthYOY"]

	// Risk Metrics
	stock.Beta = overview["Beta"]
	stock.SharesOutstanding = overview["SharesOutstanding"]

	// Analyst Targets
	stock.AnalystTargetPrice = overview["AnalystTargetPrice"]

	// Dates
	stock.LatestQuarter = overview["LatestQuarter"]
	stock.ExDividendDate = overview["ExDividendDate"]
	stock.DividendDate = overview["DividendDate"]
}

// fetchFromFinnhub retrieves stock data from Finnhub API
func fetchFromFinnhub(symbol string) (*models.StockData, error) {
	apiKey := os.Getenv("STOCK_API_KEY")
	if apiKey == "" {
		return nil, fmt.Errorf("STOCK_API_KEY environment variable not set")
	}

	url := fmt.Sprintf(
		"https://finnhub.io/api/v1/quote?symbol=%s&token=%s",
		symbol,
		apiKey,
	)

	client := &http.Client{Timeout: 10 * time.Second}
	resp, err := client.Get(url)
	if err != nil {
		return nil, fmt.Errorf("failed to fetch data: %w", err)
	}
	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, fmt.Errorf("failed to read response: %w", err)
	}

	var result struct {
		Current       float64 `json:"c"`
		Change        float64 `json:"d"`
		PercentChange float64 `json:"dp"`
		High          float64 `json:"h"`
		Low           float64 `json:"l"`
		Open          float64 `json:"o"`
		PreviousClose float64 `json:"pc"`
		Timestamp     int64   `json:"t"`
	}

	if err := json.Unmarshal(body, &result); err != nil {
		return nil, fmt.Errorf("failed to parse response: %w", err)
	}

	if result.Current == 0 {
		return nil, fmt.Errorf("invalid symbol or no data available")
	}

	return &models.StockData{
		Symbol:        symbol,
		Price:         fmt.Sprintf("%.2f", result.Current),
		Change:        fmt.Sprintf("%.2f", result.Change),
		ChangePercent: fmt.Sprintf("%.2f%%", result.PercentChange),
		Volume:        "N/A",
		LastUpdated:   time.Unix(result.Timestamp, 0).Format("2006-01-02"),
		Provider:      "finnhub",
	}, nil
}
