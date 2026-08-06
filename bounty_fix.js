/**
 * Spellbook Bounty CLI Restore & Pipe Truncation Fix (#80)
 */

function handleBountyOpen(options, existingBoard) {
  if (options.restore && existingBoard) {
    throw new Error(
      `Cannot restore snapshot '${options.restore}': board with session key '${existingBoard.key}' is already active. Pass --force-restore to overwrite.`
    );
  }
  return existingBoard || { status: 'created' };
}

function handleBountyStateOutput(fullJsonState, isPipe = false) {
  const payload = JSON.stringify(fullJsonState);
  if (isPipe) {
    process.stdout.write(payload + '\n');
  }
  return payload;
}

module.exports = { handleBountyOpen, handleBountyStateOutput };
