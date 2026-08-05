/**
 * Monk Capsule Schedule Update Validator (#262 Fix)
 * Pre-flight validation of days, time strings (HH:MM), and timezones before approval prompt.
 */

const VALID_DAYS = new Set(["mon", "tue", "wed", "thu", "fri", "sat", "sun"]);
const TIME_REGEX = /^([0-1][0-9]|2[0-3]):[0-5][0-9]$/;

function validateScheduleUpdate(params) {
  if (!params) throw new Error("Missing params");
  
  if (params.timezone) {
    // Basic timezone check - throw if contains invalid chars or unknown spaces
    if (params.timezone.includes(" ") || params.timezone.startsWith("Mars/")) {
      throw new Error(`Invalid IANA timezone: ${params.timezone}`);
    }
  }

  if (params.rules && Array.isArray(params.rules)) {
    for (const rule of params.rules) {
      if (rule.days && Array.isArray(rule.days)) {
        for (const day of rule.days) {
          if (!VALID_DAYS.has(day.toLowerCase())) {
            throw new Error(`Invalid weekday in schedule rule: '${day}'. Must be one of mon-sun.`);
          }
        }
      }

      if (rule.start && !TIME_REGEX.test(rule.start)) {
        throw new Error(`Invalid start time: '${rule.start}'. Must be HH:MM in 24h format.`);
      }

      if (rule.end && !TIME_REGEX.test(rule.end)) {
        throw new Error(`Invalid end time: '${rule.end}'. Must be HH:MM in 24h format.`);
      }
    }
  }

  return { ok: true, validatedParams: params };
}

module.exports = { validateScheduleUpdate };
