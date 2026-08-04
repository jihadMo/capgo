package daemon

import (
	"testing"
	"strings"
)

func TestValidateContractIDEchoesString(t *testing.T) {
	badID := "CCREDIB3DG3IBVUKBL7QMEK4MTPSTODR7MQ34QY4SQ5LZ5L4WFWNVNXG"
	err := ValidateContractID(1, 5, badID, false)
	if err == nil {
		t.Fatalf("expected error for invalid contract ID")
	}
	expectedSubstring := `("CCREDIB3DG3IBVUKBL7QMEK4MTPSTODR7MQ34QY4SQ5LZ5L4WFWNVNXG")`
	if !strings.Contains(err.Error(), expectedSubstring) {
		t.Errorf("error message %q does not echo bad contract ID string %q", err.Error(), expectedSubstring)
	}
}
