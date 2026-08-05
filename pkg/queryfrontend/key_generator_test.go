package queryfrontend

import (
	"testing"
)

func TestTopologyAwareKeyGenerator(t *testing.T) {
	kg := NewKeyGenerator("tenant-1", 1, "shard-a")

	key1, epoch1 := kg.GenerateKey("SELECT * FROM metrics", "tenant-1")
	if epoch1 != 1 {
		t.Errorf("expected epoch 1, got %d", epoch1)
	}

	// Mid-flight check should validate epoch 1
	if !kg.ValidateWriteBack(epoch1) {
		t.Errorf("expected write-back validation to succeed for matching epoch")
	}

	// Trigger topology rebalance to epoch 2
	kg.UpdateTopology(2, "shard-b")

	key2, epoch2 := kg.GenerateKey("SELECT * FROM metrics", "tenant-1")
	if epoch2 != 2 {
		t.Errorf("expected epoch 2, got %d", epoch2)
	}

	// Cache key under new epoch must differ from key1 to prevent collision
	if key1 == key2 {
		t.Errorf("cache key collision across shard rebalance: %s == %s", key1, key2)
	}

	// Mid-flight write back from epoch 1 should now be invalidated
	if kg.ValidateWriteBack(epoch1) {
		t.Errorf("expected stale epoch 1 write-back to be invalidated after rebalance")
	}
}
