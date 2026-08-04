package daemon

import (
	"fmt"
)

// ValidateContractID checks if a contract ID is a valid strkey.
// If invalid, returns a detailed error echoing the rejected ID string and 1-based index.
func ValidateContractID(filterIdx int, contractIdx int, contractID string, isValid bool) error {
	if !isValid {
		return fmt.Errorf("filter %d invalid: contract ID %d (%q) is not a valid contract strkey", filterIdx, contractIdx, contractID)
	}
	return nil
}
