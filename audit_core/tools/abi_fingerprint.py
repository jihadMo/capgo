"""
ABI Fingerprint & Bytecode Tool Registry (#3393)
Gates 6 bytecode recovery tools (Heimdall, Ethpector, EVMole, evm-cfg-builder, Ethersolve, Erever) on target source availability.
"""

BYTECODE_ONLY_TOOLS = [
    "heimdall",
    "ethpector",
    "evmole",
    "evm-cfg-builder",
    "ethersolve",
    "erever"
]

def is_tool_applicable(tool_name: str, has_source: bool) -> bool:
    """Returns False if tool requires bytecode-only target and source is present."""
    if has_source and tool_name.lower() in BYTECODE_ONLY_TOOLS:
        return False
    return True

def auto_reconcile_tools(tools_list: list, has_source: bool) -> dict:
    reconciled = {}
    for tool in tools_list:
        if not is_tool_applicable(tool, has_source):
            reconciled[tool] = {"status": "N/A", "reason": "Target provides verified source code"}
        else:
            reconciled[tool] = {"status": "RUNNABLE", "reason": "Target precondition met"}
    return reconciled
