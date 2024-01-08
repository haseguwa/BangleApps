(() => {
  require("FontTeletext5x9Mode7").add(Graphics);
  require("Font7x11Numeric7Seg").add(Graphics);

  function draw() {
    const x = this.x;
    const y = this.y;
    const x2 = x + 18;
    const date = new Date();
    const month = require("locale").month(date, true);
    const day = date.getDate();

    g.reset();
    g.setFontAlign(0, 0, 0);
    const fgcolor = g.getColor();
    const bgcolor = g.getBgColor();

    g.setColor(1,0,0);
    g.fillRect(x, y, x2, y + 7);
    g.setColor(1,1,1);
    g.setFont("Teletext5x9Mode7");
    g.drawString(month, x + 10, y + 4);

    g.setColor(fgcolor);
    g.fillRect(x, y + 8, x2, y + 22);
    g.setColor(bgcolor);
    g.setFont("7x11Numeric7Seg");
    g.drawString(day, x + 10, y + 15);

    if (WIDGETS.calr.to) {
      clearTimeout(WIDGETS.calr.to);
    }
    WIDGETS.calr.to = setTimeout(draw, (86400000 - date) % 86400000);
  }

  WIDGETS.calr = { area: "tr", width: 20, draw: draw };

})();
