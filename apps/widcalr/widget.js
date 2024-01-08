(() => {
  require("FontTeletext5x9Mode7").add(Graphics);
  require("Font7x11Numeric7Seg").add(Graphics);
  WIDGETS.calr = {
    area: "tr", width: 22, draw: function() {
      const x = this.x, y = this.y,
        x2 = x+20, y2 = y+22,
        date = new Date(),
        month = require("locale").month(date, true),
        day = date.getDate();

      g.reset().setFontAlign(0, 0); // center all text
      const fgcolor = g.getColor();
        // header
      g.setBgColor("#f00").setColor("#fff")
        .clearRect(x, y, x2, y+7).setFont("Teletext5x9Mode7").drawString(month, x+11, y+4)
        // date
        .setBgColor(fgcolor).setColor(fgcolor ^ 0xFFFF)
        .clearRect(x, y+8, x2, y2).setFont("7x11Numeric7Seg").drawString(day, x+11, y+15);
      // redraw when date changes
      if (WIDGETS.calr.to) clearTimeout(WIDGETS.calr.to);
      WIDGETS.calr.to = setTimeout(()=>WIDGETS.calr.draw(), (86401 - Math.floor(date/1000) % 86400)*1000);
    }
  };
})();
