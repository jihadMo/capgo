package queryrange

import (
	"testing"
)

func TestShardAwareCacheKeyGenerator(t *testing.T) {
	gen := NewShardAwareCacheKeyGenerator("tenant-alpha", "shard-v1-abc")

	keyV1 := gen.GenerateCacheKey("tenant-alpha", "rate(http_requests_total[5m])", "1770000-1773600")
	if keyV1 == "" {
		t.Fatalf("expected non-empty cache key")
	}

	// Rotate shard configuration during rebalance
	gen.RotateShardConfig("tenant-alpha", "shard-v2-xyz")

	keyV2 := gen.GenerateCacheKey("tenant-alpha", "rate(http_requests_total[5m])", "1770000-1773600")
	if keyV2 == "" {
		t.Fatalf("expected non-empty cache key")
	}

	// Cache key under new shard hash must differ to prevent cross-rebalance fragment pollution
	if keyV1 == keyV2 {
		t.Errorf("cache key collision across shuffle-sharding rebalance: %s == %s", keyV1, keyV2)
	}
}
