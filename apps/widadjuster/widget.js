(() => {
  require("Font4x5").add(Graphics);

  const SETTING = 'widadjuster.settings.json';

  let adjust = -125;
  let cycle = 2160000; //36min as default
  let connected = false;
  let elapsed;
  let lasttime;
  let checktid;
  let updatetid;

  let saved = require('Storage').readJSON(SETTING, true);
  if (saved) {
    adjust = saved.adjust;
    cycle = saved.cycle;
  } 

  WIDGETS.widadjuster = { area: 'tr', width: 17, draw: function() {
    g.reset();
    if (lasttime) {
      g.setBgColor(0, 0, 1);
    } else {
      g.setBgColor(1, 0, 1);
    }
    g.clearRect(this.x, this.y, this.x + 16, this.y + 23);
    g.setFont('4x5').setFontAlign(1, 1);
    let dailyerror = (-86400000 / cycle) * adjust / 1000;
    let sign = dailyerror > 0 ? "+" : "";
    let str = sign + dailyerror.toFixed(1);
    g.drawString(str.substring(0,3), this.x + 1, this.y + 2);
    g.drawString(str.substring(3), this.x + 12, this.y + 2);
    g.drawString(parseInt(cycle / 60000), this.x + 6, this.y + 18);
  }};

  const check = () => {
    let currenttime = Date.now();

    if (connected) {
      if (lasttime) {
        elapsed += 60000 - parseInt(elapsed / cycle) * adjust;
        let timediff = currenttime - lasttime - elapsed;
        adjust = (timediff > 0) ? 125 : -125;
        let count = timediff / adjust;
        cycle = parseInt(elapsed / count);
      }
      elapsed = 0;
      lasttime = Date.now();
      connected = false;

      WIDGETS.widadjuster.draw();

      require('Storage').writeJSON(SETTING, {
        adjust: adjust,
        cycle: cycle,
      });

      runupdate();
    } else {
      elapsed = currenttime - lasttime;
    }
    runcheck();
  }

  const runcheck = () => {
    checktid = setTimeout(() => {
      checktid = undefined;
      check();
    }, 60000 - Date.now() % 60000);
  }

  const update = () => {
    Date.setTime(Date.now() + adjust);
    runupdate();
  }

  const runupdate = () => {
    updatetid = setTimeout(() => {
      updatetid = undefined;
      update();
    }, cycle);
  }

  NRF.on('connect', () => {
    connected = true;
    if (updatetid) {
      clearTimeout(updatetid);
      updatetid = undefined;
    }
    if (!checktid) {
      runcheck();
    }
  });

  runupdate();

})();
