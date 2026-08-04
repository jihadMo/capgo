package router

import (
	"context"
	"net/http"
	"sync"
	"sync/atomic"
)

// RouterManager provides thread-safe, atomic switching of middleware chains and HTTP handlers.
type RouterManager struct {
	mu           sync.RWMutex
	currentChain atomic.Value
}

// NewRouterManager initializes a thread-safe RouterManager.
func NewRouterManager(initialHandler http.Handler) *RouterManager {
	rm := &RouterManager{}
	if initialHandler != nil {
		rm.currentChain.Store(initialHandler)
	}
	return rm
}

// SwapHandler atomically updates the active HTTP handler chain.
func (rm *RouterManager) SwapHandler(newHandler http.Handler) {
	rm.mu.Lock()
	defer rm.mu.Unlock()
	rm.currentChain.Store(newHandler)
}

// ServeHTTP implements http.Handler using the atomically stored handler chain.
func (rm *RouterManager) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	handlerVal := rm.currentChain.Load()
	if handlerVal != nil {
		if handler, ok := handlerVal.(http.Handler); ok {
			handler.ServeHTTP(w, r)
			return
		}
	}
	http.Error(w, "Router initializing", http.StatusServiceUnavailable)
}
