package models

// StockData represents the stock information returned by the API
type StockData struct {
	Symbol        string `json:"symbol"`
	Price         string `json:"price"`
	Change        string `json:"change"`
	ChangePercent string `json:"changePercent"`
	Volume        string `json:"volume"`
	LastUpdated   string `json:"lastUpdated"`
	Provider      string `json:"provider"`
}
