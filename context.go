// Package gin provides Gin Web Framework context nil guard (#4772 Fix)
package gin

import (
	"net/http"
	"net/url"
)

type Context struct {
	Request *http.Request
	formCache url.Values
}

func (c *Context) initFormCache() {
	if c.formCache == nil {
		c.formCache = make(url.Values)
		if c.Request != nil {
			if err := c.Request.ParseMultipartForm(32 << 20); err != nil && err != http.ErrNotMultipart {
				// Log error if needed
			}
			c.formCache = c.Request.PostForm
		}
	}
}

func (c *Context) GetPostForm(key string) (string, bool) {
	c.initFormCache()
	if values, ok := c.formCache[key]; ok && len(values) > 0 {
		return values[0], true
	}
	return "", false
}

func (c *Context) PostForm(key string) string {
	val, _ := c.GetPostForm(key)
	return val
}

func (c *Context) DefaultPostForm(key, defaultValue string) string {
	if val, ok := c.GetPostForm(key); ok {
		return val
	}
	return defaultValue
}
