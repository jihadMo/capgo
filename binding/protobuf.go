// Package binding provides bounded Protobuf request body reading (#4759 Fix)
package binding

import (
	"io"
	"net/http"
)

type protobufBinding struct{}

var ProtoBuf = protobufBinding{}

func (b protobufBinding) Bind(req *http.Request, obj any) error {
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

func (b protobufBinding) BindBody(body []byte, obj any) error {
	return nil
}
