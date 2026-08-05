from audit_core.tools.abi_fingerprint import is_tool_applicable, auto_reconcile_tools

def test_bytecode_gating():
    # Source-available target: bytecode tools should be N/A
    assert is_tool_applicable("heimdall", has_source=True) is False
    assert is_tool_applicable("evmole", has_source=True) is False
    
    # Bytecode-only target: bytecode tools should run
    assert is_tool_applicable("heimdall", has_source=False) is True
    
    reconciled = auto_reconcile_tools(["heimdall", "slither"], has_source=True)
    assert reconciled["heimdall"]["status"] == "N/A"
    assert reconciled["slither"]["status"] == "RUNNABLE"
    print("✅ PASS: Bytecode suite gating tests passed")

if __name__ == "__main__":
    test_bytecode_gating()
