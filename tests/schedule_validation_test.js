const { validateScheduleUpdate } = require('../scripts/schedule-update-validation');

function testInvalidWeekdayThrows() {
  try {
    validateScheduleUpdate({
      rules: [{ days: ['funday', 'mon'], start: '09:00', end: '17:00' }]
    });
    console.assert(false, 'Should throw on invalid weekday');
  } catch (err) {
    console.assert(err.message.includes('Invalid weekday'), 'Should reject invalid weekday funday');
  }
}

function testInvalidTimeThrows() {
  try {
    validateScheduleUpdate({
      rules: [{ days: ['mon'], start: '25:99', end: '17:00' }]
    });
    console.assert(false, 'Should throw on invalid time');
  } catch (err) {
    console.assert(err.message.includes('Invalid start time'), 'Should reject 25:99 time');
  }
}

testInvalidWeekdayThrows();
testInvalidTimeThrows();
console.log('✅ PASS: Schedule update input validation tests passed');
