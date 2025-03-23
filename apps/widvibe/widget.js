(() => {
  const settinsg = Object.assign({
    touch : true,
    twist : true,
  }, require('Storage').readJSON('widvibe.settings.json', true) || {});
  
  let running = false;

  const vibe = (hour, qmin, rmin) => {
    if (hour > 0) {
      setTimeout(vibe, 300 + (hour == 1 ? 300 : 0), hour - 1, qmin, rmin);
      Bangle.buzz(150, 1);
    } else if (qmin > 0) {
      setTimeout(vibe, 500 + (qmin == 1 ? 300 : 0), 0, qmin - 1, rmin);
      Bangle.buzz(300, 1);
    } else if (rmin > 0) {
      setTimeout(vibe, 300, 0, 0, rmin - 1);
      Bangle.buzz(100, 1);
    } else {
      running = false;
    }
  }
  
  WIDGETS.widvibe = { area: "tl", width: 12, draw: function() {
    g.reset();
    g.setColor(0x07ff);
    g.drawImage(atob("DBgBAAAAAgDgOAMAHABgDgOAcYOMDGBHAcAwA4AcAGAOA4BgBAAA"), this.x, this.y);
  }};

  Bangle.on('touch', (button, xy) => {
    if (!running && Bangle.CLOCK == 1 && settings.touch) {
      running = true;
      const date = new Date();
      const min = date.getMinutes();
      setTimeout(vibe, 50, (date.getHours() + 11) % 12 + 1, Math.floor(min / 15), min % 15);
    }
  });

  Bangle.on('twist', () => {
    if (!running && Bangle.CLOCK == 1 && settings.twist) {
      running = true;
      const date = new Date();
      const min = date.getMinutes();
      setTimeout(vibe, 50, (date.getHours() + 11) % 12 + 1, Math.floor(min / 15), min % 15);
    }
  });

})();
