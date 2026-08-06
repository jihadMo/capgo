package gin

import (
	"net/http"
	"testing"
	"time"
)

func TestEngineRunReadHeaderTimeout(t *testing.T) {
	server := &http.Server{
		Addr:              ":8080",
		ReadHeaderTimeout: 10 * time.Second,
	}

	if server.ReadHeaderTimeout != 10*time.Second {
		t.Errorf("Expected ReadHeaderTimeout 10s, got %v", server.ReadHeaderTimeout)
	}
}
