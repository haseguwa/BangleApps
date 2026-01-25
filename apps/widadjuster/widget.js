(() => {
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

  const runupdate = () => {
    updatetid = setTimeout(() => {
      updatetid = undefined;
      update();
    }, cycle);
  }

  const update= () => {
    Date.setTime(Date.now() + adjust);
    update();
  }

  NRF.on('connect', () => {
    connected = true;
    clearTimeout(updatetid);
    if (!checktid) {
      runcheck();
    }
  });

  updatetid = setTimeout(update, cycle);

  WIDGETS.widadjuster = { area: 'tr', width: 22, draw: function() {
    g.reset();
    if (lasttime) {
      g.setBgColor(0, 0, 1);
    } else {
      g.setBgColor(1, 0, 1);
    }
    g.clearRect(this.x, this.y, this.x + 21, this.y + 23);
    g.setFont('6x8').setFontAlign(0, 0);
    let dailyerror = parseInt((-86400000 / cycle) * adjust / 100) / 10;
    g.drawString(dailyerror, this.x + 11, this.y + 6);
    g.drawString(parseInt(cycle / 60000), this.x + 11, this.y + 18);
  }};
})();
