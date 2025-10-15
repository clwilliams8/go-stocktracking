package handlers

import (
	"net/http"
	"strings"

	"github.com/clwilliams8/go-stocktracking/backend/services"
	"github.com/gin-gonic/gin"
)

// GetStock retrieves stock information for a given ticker symbol
func GetStock(c *gin.Context) {
	symbol := strings.ToUpper(c.Param("symbol"))

	if symbol == "" {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Stock symbol is required",
		})
		return
	}

	stockData, err := services.FetchStockData(symbol)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Failed to fetch stock data",
			"details": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, stockData)
}
