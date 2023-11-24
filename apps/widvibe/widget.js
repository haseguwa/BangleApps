
(() => {
  const hour_vibration = 150;
  const hour_interval = 300;
  const quarter_vibration = 300;
  const quarter_interval = 500;
  const remain_vibration = 100;
  const remain_interval = 300;
  const separator_interval = 300;
  var running = false;

  function vibe(hour, qmin, rmin) {
    if (hour > 0) {
      setTimeout(vibe, hour_interval + (hour == 1 ? separator_interval : 0), hour - 1, qmin, rmin);
      Bangle.buzz(hour_vibration, 1);
    } else if (qmin > 0) {
      setTimeout(vibe, quarter_interval + (qmin == 1 ? separator_interval : 0), hour, qmin - 1, rmin);
      Bangle.buzz(quarter_vibration, 1);
    } else if (rmin > 0) {
      setTimeout(vibe, remain_interval, hour, qmin, rmin - 1);
      Bangle.buzz(remain_vibration, 1);
    } else {
      running = false;
    }
  }
  
  function draw() {
    g.setColor(0x07ff);
    g.drawImage(atob("GBgBAAAAAAAAAAAAAAAAAH4AAf+AB4HgDgBwHDw4OH4cMOcMYMMGYMMGMOcMOH4cHDw4DgBwB4HgAf+AAH4AAAAAAAAAAAAAAAAA"),this.x,this.y);
  }
  
  WIDGETS.viber = { area: "tl", width: 22, draw: draw };

  setWatch(function() {
    if (Bangle.CLOCK == 1) {
      if (running) {
        Bangle.showLauncher();
      } else {
        Bangle.showClock();
        running = true; 
        let currentDate = new Date();
        let hour = (currentDate.getHours() + 11) % 12 + 1;
        let min = currentDate.getMinutes();
        let qmin = Math.floor(min / 15);
        let rmin = min % 15;
        vibe(hour, qmin, rmin);
      }
    }
  }, BTN, {repeat:true, edge:'falling' });

  Bangle.on('touch', function(button, xy) {
    if (!running && Bangle.CLOCK == 1) {
      running = true;
      let currentDate = new Date();
      let hour = (currentDate.getHours() + 11) % 12 + 1;
      let min = currentDate.getMinutes();
      let qmin = Math.floor(min / 15);
      let rmin = min % 15;
      vibe(hour, qmin, rmin);
    }
  });
})();
