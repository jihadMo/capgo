package queryfrontend

import (
	"fmt"
	"crypto/sha256"
	"encoding/hex"
	"sync"
	"sync/atomic"
)

// RouterState holds topology epoch and shard assignment hashes.
type RouterState struct {
	Epoch      int64
	TenantID   string
	ShardHash  string
}

// TopologyAwareKeyGenerator manages epoch-aware cache keys to prevent cross-rebalance collisions.
type TopologyAwareKeyGenerator struct {
	mu          sync.RWMutex
	activeEpoch atomic.Int64
	state       atomic.Pointer[RouterState]
}

func NewKeyGenerator(tenantID string, initialEpoch int64, shardHash string) *TopologyAwareKeyGenerator {
	kg := &TopologyAwareKeyGenerator{}
	kg.activeEpoch.Store(initialEpoch)
	kg.state.Store(&RouterState{
		Epoch:     initialEpoch,
		TenantID:  tenantID,
		ShardHash: shardHash,
	})
	return kg
}

func (kg *TopologyAwareKeyGenerator) UpdateTopology(newEpoch int64, shardHash string) {
	kg.mu.Lock()
	defer kg.mu.Unlock()
	kg.activeEpoch.Store(newEpoch)
	currentState := kg.state.Load()
	tenantID := ""
	if currentState != nil {
		tenantID = currentState.TenantID
	}
	kg.state.Store(&RouterState{
		Epoch:     newEpoch,
		TenantID:  tenantID,
		ShardHash: shardHash,
	})
}

func (kg *TopologyAwareKeyGenerator) GenerateKey(reqBody string, tenantID string) (string, int64) {
	state := kg.state.Load()
	epoch := int64(0)
	shardHash := "default"
	if state != nil {
		epoch = state.Epoch
		shardHash = state.ShardHash
	}

	h := sha256.New()
	h.Write([]byte(reqBody))
	queryHash := hex.EncodeToString(h.Sum(nil)[:8])

	key := fmt.Sprintf("%s:%d:%s:%s", tenantID, epoch, shardHash, queryHash)
	return key, epoch
}

func (kg *TopologyAwareKeyGenerator) ValidateWriteBack(startEpoch int64) bool {
	return kg.activeEpoch.Load() == startEpoch
}
