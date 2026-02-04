(() => {
  require("Font4x5").add(Graphics);

  const SETTING = 'widadjuster.settings.json';

  let currentadjust = -0.125;
  let currentcycle = 2160;
  let synced = false;
  let lastsync;
  let elapsed = 0;
  let calctid;
  let updatetid;
  let adjusts = [];
  let cycles = [];

  let saved = require('Storage').readJSON(SETTING, true);
  if (saved) {
    currentadjust = saved.currentadjust;
    currentcycle = saved.currentcycle;
    lastsync = saved.lastsync;
    adjusts = saved.adjusts;
    cycles = saved.cycles;
  } else {
    lastsync = getTime();
  }

  WIDGETS.widadjuster = { area: 'tr', width: 17, draw: function() {
    g.reset();
    g.setBgColor(g.getBgColor() ^ 0x001F);
    g.clearRect(this.x, this.y, this.x + 16, this.y + 23);
    if (synced) {
      g.drawRect(this.x, this.y, this.x + 16, this.y + 23);
    }
    let dailyerror = -86400 * currentadjust / currentcycle;
    if (dailyerror > 9.9) {
      dailyerror = 9.9;
    }
    if (dailyerror < -9.9) {
      dailyerror = -9.9;
    }
    let sign = dailyerror > 0 ? "+" : "";
    let str = sign + dailyerror.toFixed(1);
    g.setFont('4x5').setFontAlign(-1, -1);
    g.drawString(str.substring(0,3), this.x + 2, this.y + 10);
    g.drawString(str.substring(3), this.x + 12, this.y + 10);
    g.setFontAlign(0, 0);
    g.drawString(cycles.length, this.x + 9, this.y + 4);
    let value = currentcycle / 60;
    let unit = 'm';
    if (value >= 100) {
      value = value / 60;
      unit = 'h';
      if (value >= 100) {
        value = value / 24;
        unit = 'd';
      }
    }
    g.drawString(parseInt(value) + unit, this.x + 9, this.y + 19);
  }};

  const calc = () => {
    let currenttime = getTime();

    if (synced) {
      elapsed += 60 - parseInt(elapsed / currentcycle) * currentadjust;
      if (elapsed >= 3600) {
        let timediff = currenttime - lastsync - elapsed;
        let adjust = (timediff > 0) ? 0.125 : -0.125;
        let count = timediff / adjust;
        let cycle = parseInt(elapsed / count);
        if (cycle < 18) {
          cycle = 18;
        }
        adjusts.push(adjust);
        if (adjusts.length > 10) {
          adjusts.shift();
        }
        if (adjusts.reduce((a, b) => { return a + b; }) > 0) { 
          currentadjust = 0.125;
        } else {
          currentadjust = -0.125;
        }
        cycles.push(cycle);
        if (cycles.length > 10) {
          cycles.shift();
        }
        let target = cycles.filter((value, index) => { return adjusts[index] == currentadjust; });
        if (target.length > 0) {
          if (target.length > 5) {
            target.sort();
            target.shift();
            target.pop();
          }
          let sum = target.reduce((a, b) => { return a + b; });
          currentcycle = sum / target.length;
        } else {
          currentcycle = cycle;
        }
      }
      WIDGETS.widadjuster.draw();

      require('Storage').writeJSON(SETTING, {
        currentadjust: currentadjust,
        currentcycle: currentcycle,
        lastsync: lastsync,
        adjusts: adjusts,
        cycles: cycles,
      });

      elapsed = 0;
      lastsync = getTime();
      synced = false;
      runupdate();
    } else {
      elapsed = currenttime - lastsync;
    }
    runcalc();
  }

  const runcalc = () => {
    calctid = setTimeout(() => {
      calctid = undefined;
      calc();
    }, 60000 - Date.now() % 60000);
  }

  const update = () => {
    setTime(getTime() + currentadjust);
    runupdate();
  }

  const runupdate = () => {
    updatetid = setTimeout(() => {
      updatetid = undefined;
      update();
    }, currentcycle * 1000);
  }

  NRF.on('connect', () => {
    if (!synced) {
      synced = true;
      if (updatetid) {
        clearTimeout(updatetid);
        updatetid = undefined;
      }
      require('Storage').writeJSON(SETTING, {
        currentadjust: currentadjust,
        currentcycle: currentcycle,
        lastsync: getTime(),
        adjusts: adjusts,
        cycles: cycles,
      });
      WIDGETS.widadjuster.draw();
    }
  });

  runupdate();
  runcalc();

})();
