(() => {
  const SETTING = 'widadjuster.settings.json';
  let lasttime = Date.now();
  let pasttime = 0;
  let needupdate = false;
  let adjust = -125;
  let cycle = 2160000; //36min
  let checktid;
  let updatetid;

  let saved = require('Storage').readJSON(SETTING, true);
  if (saved) {
    adjust = saved.adjust;
    cycle = saved.cycle;
  } 

  const check = () => {
    let currenttime = Date.now();

    if (needupdate) {
      pasttime = pasttime + 60000 - parseInt(pasttime / cycle) * adjust;
      let realpasttime = currenttime - lasttime;
      let timediff = realpasttime - pasttime;
      adjust = (timediff > 0) ? 125 : -125;
      let count = timediff / adjust;
      cycle = parseInt(pasttime / count);

      pasttime = 0;
      lasttime = Date.now();
      needupdate = false;

      WIDGETS.widadjuster.draw();

      require('Storage').writeJSON(SETTING, {
        adjust: adjust,
        cycle: cycle,
      });

      updatetid = setTimeout(() => {
        updatetid = undefined;
        update();
      }, cycle);
    } else {
      pasttime = currenttime - lasttime;
    }
    checktid = setTimeout(() => {
      checktid = undefined;
      check();
    }, 60000 - Date.now() % 60000);
  }

  const update = () => {
    Date.setTime(Date.now() + adjust);

    updatetid = setTimeout(() => {
      updatetid = undefined;
      update();
    }, cycle);
  }

  NRF.on('connect', () => {
    needupdate = true;
    clearTimeout(updatetid);
  });

  checktid = setTimeout(check, 60000 - Date.now() % 60000);
  updatetid = setTimeout(update, cycle);

  WIDGETS.widadjuster = { area: 'tr', width: 22, draw: function() {
    g.reset();
    g.setFont('6x8').setFontAlign(0, 0);
    g.clearRect(this.x, this.y, this.x + 21, this.y + 23);
    let dailyerror = (86400000 / cycle) * adjust / 1000;
    g.drawString(dailyerror, this.x + 11, this.y + 6);
    g.drawString(parseInt(cycle / 60000), this.x + 11, this.y + 18);
  }};
})();
