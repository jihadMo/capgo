package gin

import (
	"testing"
)

func TestPostFormNilRequestGuard(t *testing.T) {
	c := &Context{Request: nil}

	if val := c.PostForm("key"); val != "" {
		t.Errorf("Expected empty string, got %s", val)
	}

	if val, ok := c.GetPostForm("key"); ok || val != "" {
		t.Errorf("Expected ('', false), got (%s, %v)", val, ok)
	}

	if val := c.DefaultPostForm("key", "default"); val != "default" {
		t.Errorf("Expected 'default', got %s", val)
	}
}
