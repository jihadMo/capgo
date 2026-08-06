const { formatWorkloadLogsResponse } = require('../scripts/workload-logs-state-fix');

function testStoppedWorkloadLogsSurfacesState() {
  const stoppedState = { running: false, status: 'exited' };
  const res = formatWorkloadLogsResponse('monk-test-app/app', 'line1\nline2\n', stoppedState);

  console.assert(res.ok === true, 'Response ok should be true');
  console.assert(res.running === false, 'running should be false for stopped container');
  console.assert(res.state === 'exited', 'state should reflect stopped container state');
  console.log('✅ PASS: Stopped workload logs response surfaces running=false and state=exited');
}

testStoppedWorkloadLogsSurfacesState();
