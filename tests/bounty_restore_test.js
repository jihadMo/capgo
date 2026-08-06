const { handleBountyOpen, handleBountyStateOutput } = require('../bounty_fix');

function testSkippedRestoreThrows() {
  try {
    handleBountyOpen({ restore: 'snap-123' }, { key: 'anthill-dev' });
    console.assert(false, 'Should throw error when restore is skipped on active board');
  } catch (err) {
    console.assert(err.message.includes('Cannot restore snapshot'), 'Should throw clear restore conflict error');
  }
}

function testPipeStateOutputNotTruncated() {
  const state = { tasks: Array(100).fill({ id: 1, name: 'Task' }) };
  const output = handleBountyStateOutput(state, true);
  console.assert(output.endsWith('}]}'), 'Output should be valid full JSON');
}

testSkippedRestoreThrows();
testPipeStateOutputNotTruncated();
console.log('✅ PASS: Spellbook bounty restore and state pipe tests passed');
