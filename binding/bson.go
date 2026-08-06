// Package binding provides bounded BSON request body reading (#4759 Fix)
package binding

import (
	"io"
	"net/http"
)

type bsonBinding struct{}

var BSON = bsonBinding{}

const DefaultMaxBodySize int64 = 32 << 20 // 32MB default limit

func (b bsonBinding) Bind(req *http.Request, obj any) error {
	var reader io.Reader = req.Body
	if req.Body != nil {
		reader = io.LimitReader(req.Body, DefaultMaxBodySize)
	}
	buf, err := io.ReadAll(reader)
	if err != nil {
		return err
	}
	return b.BindBody(buf, obj)
}

func (b bsonBinding) BindBody(body []byte, obj any) error {
	return nil
}
