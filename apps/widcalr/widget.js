(() => {
  require("FontTeletext5x9Mode7").add(Graphics);
  require("Font8x16").add(Graphics);

  WIDGETS.calr = {
    area: "tr", width: 22, draw: function() {
      const x = this.x, y = this.y,
        x2 = x+20, y2 = y+22,
        date = new Date(),
        month = require("locale").month(date, true),
        day = date.getDate();

      g.reset().setFontAlign(0, 0);
      const fgcolor = g.getColor();

      g.setBgColor("#f00").setColor("#fff")
        .clearRect(x, y, x2, y+8).setFont("Teletext5x9Mode7").drawString(month, x+11, y+5)
        .setBgColor(fgcolor).setColor(fgcolor ^ 0xFFFF)
        .clearRect(x, y+9, x2, y2).setFont("8x16").drawString(day, x+11, y+17);

      if (WIDGETS.calr.to) {
        clearTimeout(WIDGETS.calr.to);
      }
      WIDGETS.calr.to = setTimeout(()=>WIDGETS.calr.draw(), ((86400000 - date) % 86400000));
    }
  };
})();
