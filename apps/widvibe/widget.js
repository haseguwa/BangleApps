(function() {

  const HOUR_VIBRATION = 150;
  const HOUR_INTERVAL = 300;
  const QUARTER_VIBRATION = 300;
  const QUARTER_INTERVAL = 500;
  const REMAINING_VIBRATION = 100;
  const REMAINING_INTERVAL = 300;
  const SEPARATOR_INTERVAL = 300;

/*
 // for debug
hour = 2;
qmin = 1;
rmin = 14;
*/

  function viber() {
    var currentDate = new Date();
    var hour = (currentDate.getHours() - 1) % 12 + 1;
    var min = currentDate.getMinutes();
    var qmin = Math.floor(min / 15);
    var rmin = min % 15;
    vibe();
  }
  
  function vibe() {
    if (hour > 0) {
      if (hour == 1) {
        setTimeout(vibe, HOUR_INTERVAL + SEPARATOR_INTERVAL);
      } else {
        setTimeout(vibe, HOUR_INTERVAL);
      }
      Bangle.buzz(HOUR_VIBRATION, 1);
      hour -= 1;
    } else if (qmin > 0) {
      if (qmin == 1) {
        setTimeout(vibe, QUARTER_INTERVAL + SEPARATOR_INTERVAL, 1);
      } else {
        setTimeout(vibe, QUARTER_INTERVAL, 1);
      }
      Bangle.buzz(QUARTER_VIBRATION, 1);
      qmin -= 1;
    } else if (rmin > 0) {
      setTimeout(vibe, REMAINING_INTERVAL, 1);
      Bangle.buzz(REMAINING_VIBRATION, 1);
      rmin -= 1;
    } else {
    }
  }
  
  function draw() {
    g.setColor(0x07ff);
    g.drawImage(atob("GBgBAAAAAAAAAAAAAAAAAH4AAf+AB4HgDgBwHDw4OH4cMOcMYMMGYMMGMOcMOH4cHDw4DgBwB4HgAf+AAH4AAAAAAAAAAAAAAAAA"),this.x,this.y);
  }
  
  WIDGETS.viber = { area: "tl", width: 22, draw: draw };

  Bangle.on('touch', viber); 
})(); 