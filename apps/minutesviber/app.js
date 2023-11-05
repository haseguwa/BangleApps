const HOUR_VIBRATION = 150;
const HOUR_INTERVAL = 300;
const QUARTER_VIBRATION = 300;
const QUARTER_INTERVAL = 500;
const REMAINING_VIBRATION = 100;
const REMAINING_INTERVAL = 300;
const SEPARATOR_INTERVAL = 400;

var currentDate = new Date();
var hour = currentDate.getHours();
var min = currentDate.getMinutes();
var qmin = Math.floor(min / 15);
var rmin = min % 15;

/*
 // for debug
hour = 2;
qmin = 1;
rmin = 4;
*/

// Hour vibration
Bangle.buzz(HOUR_VIBRATION, 1);
hour -= 1;
var hid = setInterval(function() {
  if (hour > 0) {
    Bangle.buzz(HOUR_VIBRATION, 1);
    hour -= 1;
  } else {
    clearInterval(hid);
  }
}, HOUR_INTERVAL);

// Quarter vibration
setTimeout(function() {
  var qid = setInterval(function() {
    if (qmin > 0) {
      Bangle.buzz(QUARTER_VIBRATION, 1);
      qmin -= 1;
    } else {
      clearInterval(qid);
    }
  }, QUARTER_INTERVAL);
}, HOUR_INTERVAL * hour);

// Remaining vibration
setTimeout(function() {
  var rid = setInterval(function() {
    if (rmin > 0) {
      Bangle.buzz(REMAINING_VIBRATION, 1);
      rmin -= 1;
    } else {
      clearInterval(rid);
    }
  }, REMAINING_INTERVAL);
}, HOUR_INTERVAL * hour + QUARTER_INTERVAL * qmin + SEPARATOR_INTERVAL);
