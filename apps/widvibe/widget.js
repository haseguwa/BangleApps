
(() => {
  const HOUR_VIBRATION = 150;
  const HOUR_INTERVAL = 300;
  const QUARTER_VIBRATION = 300;
  const QUARTER_INTERVAL = 500;
  const REMAINING_VIBRATION = 100;
  const REMAINING_INTERVAL = 300;
  const SEPARATOR_INTERVAL = 300;

  function vibe(hour, qmin, rmin) {
    if (hour > 0) {
      setTimeout(vibe, (hour == 1) ? HOUR_INTERVAL + SEPARATOR_INTERVAL : HOUR_INTERVAL, hour - 1, qmin, rmin);
      Bangle.buzz(HOUR_VIBRATION, 1);
    } else if (qmin > 0) {
      if (qmin == 1) {
        setTimeout(vibe, QUARTER_INTERVAL + SEPARATOR_INTERVAL, hour, qmin - 1, rmin);
      } else {
        setTimeout(vibe, QUARTER_INTERVAL, hour, qmin - 1, rmin);
      }
      Bangle.buzz(QUARTER_VIBRATION, 1);
    } else if (rmin > 0) {
      setTimeout(vibe, REMAINING_INTERVAL, hour, qmin, rmin - 1);
      Bangle.buzz(REMAINING_VIBRATION, 1);
    } else {
    }
  }
  
  function draw() {
    g.setColor(0x07ff);
    g.drawImage(atob("GBgBAAAAAAAAAAAAAAAAAH4AAf+AB4HgDgBwHDw4OH4cMOcMYMMGYMMGMOcMOH4cHDw4DgBwB4HgAf+AAH4AAAAAAAAAAAAAAAAA"),this.x,this.y);
  }
  
  WIDGETS.viber = { area: "tl", width: 22, draw: draw };

  Bangle.on('touch', function(button, xy) {
    let currentDate = new Date();
    let hour = (currentDate.getHours() + 11) % 12 + 1;
    let min = currentDate.getMinutes();
    let qmin = Math.floor(min / 15);
    let rmin = min % 15;
    vibe(hour, qmin, rmin);
  });
})();
