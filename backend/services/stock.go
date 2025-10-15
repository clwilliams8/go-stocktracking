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

// fetchFromAlphaVantage retrieves stock data from Alpha Vantage API
func fetchFromAlphaVantage(symbol string) (*models.StockData, error) {
	apiKey := os.Getenv("STOCK_API_KEY")
	if apiKey == "" {
		return nil, fmt.Errorf("STOCK_API_KEY environment variable not set")
	}

	url := fmt.Sprintf(
		"https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=%s&apikey=%s",
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
		GlobalQuote struct {
			Symbol           string `json:"01. symbol"`
			Price            string `json:"05. price"`
			Change           string `json:"09. change"`
			ChangePercent    string `json:"10. change percent"`
			Volume           string `json:"06. volume"`
			LatestTradingDay string `json:"07. latest trading day"`
		} `json:"Global Quote"`
	}

	if err := json.Unmarshal(body, &result); err != nil {
		return nil, fmt.Errorf("failed to parse response: %w", err)
	}

	if result.GlobalQuote.Symbol == "" {
		return nil, fmt.Errorf("invalid symbol or API limit reached")
	}

	return &models.StockData{
		Symbol:        result.GlobalQuote.Symbol,
		Price:         result.GlobalQuote.Price,
		Change:        result.GlobalQuote.Change,
		ChangePercent: result.GlobalQuote.ChangePercent,
		Volume:        result.GlobalQuote.Volume,
		LastUpdated:   result.GlobalQuote.LatestTradingDay,
		Provider:      "alphavantage",
	}, nil
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
