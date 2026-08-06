// Package gin provides Engine.Run default timeout configuration (#4760 Fix)
package gin

import (
	"net/http"
	"time"
)

type Engine struct {}

func (engine *Engine) Run(address string) error {
	server := &http.Server{
		Addr:              address,
		Handler:           engine,
		ReadHeaderTimeout: 10 * time.Second, // 10s default ReadHeaderTimeout protection against slowloris
	}
	return server.ListenAndServe()
}

func (engine *Engine) ServeHTTP(w http.ResponseWriter, req *http.Request) {
	w.WriteHeader(http.StatusOK)
}
