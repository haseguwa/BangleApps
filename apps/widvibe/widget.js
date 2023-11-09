
(function() {

  const HOUR_VIBRATION = 150;
  const HOUR_INTERVAL = 300;
  const QUARTER_VIBRATION = 300;
  const QUARTER_INTERVAL = 500;
  const REMAINING_VIBRATION = 100;
  const REMAINING_INTERVAL = 300;
  const SEPARATOR_INTERVAL = 300;

  function vibe(hour, qmin, rmin) {
    if (hour > 0) {
      if (hour == 1) {
        setTimeout(function() { vibe(hour - 1, qmin, rmin) }, HOUR_INTERVAL + SEPARATOR_INTERVAL);
      } else {
        setTimeout(function() { vibe(hour - 1, qmin, rmin) }, WIDGETS.viber.vibe, HOUR_INTERVAL);
      }
      Bangle.buzz(HOUR_VIBRATION, 1);
    } else if (qmin > 0) {
      if (qmin == 1) {
        setTimeout(function() { vibe(hour, qmin - 1, rmin) }, QUARTER_INTERVAL + SEPARATOR_INTERVAL);
      } else {
        setTimeout(function() { vibe(hour, qmin - 1, rmin) }, QUARTER_INTERVAL);
      }
      Bangle.buzz(QUARTER_VIBRATION, 1);
    } else if (rmin > 0) {
      setTimeout(function() { vibe(hour, qmin, rmin - 1) }, REMAINING_INTERVAL);
      Bangle.buzz(REMAINING_VIBRATION, 1);
    } else {
    }
  }
  
  function draw() {
    g.setColor(0x07ff);
    g.drawImage(atob("GBgBAAAAAAAAAAAAAAAAAH4AAf+AB4HgDgBwHDw4OH4cMOcMYMMGYMMGMOcMOH4cHDw4DgBwB4HgAf+AAH4AAAAAAAAAAAAAAAAA"),this.x,this.y);
  }
  
  WIDGETS.viber = { area: "tl", width: 22, draw: draw, vibe: vibe };

  Bangle.on('touch', function(button, xy) {
    var currentDate = new Date();
    var hour = (currentDate.getHours() + 11) % 12 + 1;
    var min = currentDate.getMinutes();
    var qmin = Math.floor(min / 15);
    var rmin = min % 15;
    vibe(hour, qmin, rmin);
  }); 
})(); 
