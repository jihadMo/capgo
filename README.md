# Claude Code Destructive Command Guard Hook ($100 Bounty)

A lightweight `pre-tool-use` security hook for Claude Code that intercepts and blocks dangerous bash commands before execution.

## Features

- 🛡️ **Pattern Protection**: Blocks `rm -rf`, `DROP TABLE`, `git push --force` (`-f`), `TRUNCATE`, and `DELETE FROM` without a `WHERE` clause.
- 📝 **Audit Logging**: Logs every blocked attempt with an ISO timestamp, attempted command, and project path to `~/.claude/hooks/blocked.log`.
- ⚠️ **Clear User Alerts**: Displays informative security warning messages explaining why the command was blocked.
- ⚡ **Zero Interruption**: Allows all safe bash commands to execute cleanly.

## Installation in 2 Commands

```bash
mkdir -p ~/.claude/hooks && curl -sSL https://raw.githubusercontent.com/jihadMo/capgo/fix/destructive-command-guard-hook/hooks/block-destructive-commands.py -o ~/.claude/hooks/pre-tool-use
chmod +x ~/.claude/hooks/pre-tool-use
```

## Testing

```bash
python3 hooks/block-destructive-commands.py "rm -rf /"
# Output: [SECURITY GUARD BLOCKED] Destructive command detected: rm -rf (Recursive forced removal)
```
