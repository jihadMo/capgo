package main

import (
	"fmt"
)

type SpiceAITaskPayload struct {
	Engine     string  `json:"engine"`
	Query      string  `json:"query"`
	RewardUSDC float64 `json:"rewardUsdc"`
	Network    string  `json:"network"`
}

func PrepareSpiceAITask(query string, rewardUSDC float64) (SpiceAITaskPayload, error) {
	if query == "" {
		return SpiceAITaskPayload{}, fmt.Errorf("query required")
	}
	if rewardUSDC <= 0 {
		return SpiceAITaskPayload{}, fmt.Errorf("reward must be positive")
	}

	return SpiceAITaskPayload{
		Engine:     "SpiceAI",
		Query:      query,
		RewardUSDC: rewardUSDC,
		Network:    "base-mainnet",
	}, nil
}

func main() {
	payload, _ := PrepareSpiceAITask("SELECT * FROM eth.blocks LIMIT 10", 5.0)
	fmt.Printf("✅ Prepared TaskMarket SpiceAI payload: %+v\n", payload)
}
