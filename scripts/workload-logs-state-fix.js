/**
 * Monk Workload Logs Response Handler (#266 Fix)
 * Surfacing container running state ('running' boolean and 'state' string) in workload.logs output.
 */

function formatWorkloadLogsResponse(workload, logsStr, containerState) {
  const isRunning = containerState ? containerState.running === true : false;
  const stateStr = containerState ? containerState.status || "stopped" : "stopped";

  return {
    ok: true,
    workload: workload,
    running: isRunning,
    state: stateStr,
    logs: logsStr,
    lineCount: logsStr ? logsStr.trim().split("\n").length : 0
  };
}

module.exports = { formatWorkloadLogsResponse };
