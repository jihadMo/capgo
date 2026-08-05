package queryrange

import (
	"crypto/sha256"
	"encoding/hex"
	"fmt"
	"sync"
	"sync/atomic"
)

// ShardConfig holds active tenant shuffle-sharding state.
type ShardConfig struct {
	TenantID  string
	ShardHash string
}

// ShardAwareCacheKeyGenerator builds cache keys incorporating tenant shuffle-sharding hash.
type ShardAwareCacheKeyGenerator struct {
	mu     sync.RWMutex
	config atomic.Pointer[ShardConfig]
}

func NewShardAwareCacheKeyGenerator(tenantID string, shardHash string) *ShardAwareCacheKeyGenerator {
	gen := &ShardAwareCacheKeyGenerator{}
	gen.config.Store(&ShardConfig{
		TenantID:  tenantID,
		ShardHash: shardHash,
	})
	return gen
}

func (g *ShardAwareCacheKeyGenerator) RotateShardConfig(tenantID string, newShardHash string) {
	g.mu.Lock()
	defer g.mu.Unlock()
	g.config.Store(&ShardConfig{
		TenantID:  tenantID,
		ShardHash: newShardHash,
	})
}

func (g *ShardAwareCacheKeyGenerator) GenerateCacheKey(tenantID string, query string, timeRange string) string {
	cfg := g.config.Load()
	shardHash := "default"
	if cfg != nil && cfg.ShardHash != "" {
		shardHash = cfg.ShardHash
	}

	h := sha256.New()
	h.Write([]byte(fmt.Sprintf("%s:%s", query, timeRange)))
	queryHash := hex.EncodeToString(h.Sum(nil)[:8])

	return fmt.Sprintf("mimir:%s:%s:%s", tenantID, shardHash, queryHash)
}
