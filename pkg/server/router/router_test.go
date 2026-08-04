package router

import (
	"net/http"
	"net/http/httptest"
	"sync"
	"testing"
)

type mockHandler struct {
	msg string
}

func (m *mockHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte(m.msg))
}

func TestConcurrentRouterSwap(t *testing.T) {
	rm := NewRouterManager(&mockHandler{msg: "initial"})

	var wg sync.WaitGroup
	// Run 20 concurrent updaters
	for i := 0; i < 20; i++ {
		wg.Add(1)
		go func(idx int) {
			defer wg.Done()
			rm.SwapHandler(&mockHandler{msg: "updated"})
		}(i)
	}

	// Run 50 concurrent request handlers
	for i := 0; i < 50; i++ {
		wg.Add(1)
		go func() {
			defer wg.Done()
			rec := httptest.NewRecorder()
			req := httptest.NewRequest("GET", "/", nil)
			rm.ServeHTTP(rec, req)
			res := rec.Body.String()
			if res != "initial" && res != "updated" {
				t.Errorf("unexpected response body: %s", res)
			}
		}()
	}

	wg.Wait()
}
