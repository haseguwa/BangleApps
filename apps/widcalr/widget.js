(() => {
  require("FontTeletext5x9Mode7").add(Graphics);
  require("Font8x16").add(Graphics);
  let drawTimeout;

  WIDGETS.calr = {
    area: "tr", width: 22, draw: function() {
      const x = this.x;
      const y = this.y;
      const date = new Date();
      const month = require("locale").month(date, true);
      const day = date.getDate();

      g.reset();
      g.setFontAlign(0, 0);
      const fgcolor = g.getColor();

      g.setBgColor(1, 0, 0);
      g.setColor(1, 1, 1);
      g.clearRect(x, y, x + 20, y + 8);
      g.setFont("Teletext5x9Mode7");
      g.drawString(month, x + 11, y + 5);

      g.setBgColor(fgcolor);
      g.setColor(fgcolor ^ 0xFFFF);
      g.clearRect(x, y + 9, x + 20, y + 22);
      g.setFont("8x16");
      g.drawString(day, x + 11, y + 17);

      if (drawTimeout) {
        clearTimeout(drawTimeout);
      }
      drawTimeout = setTimeout(() => {
        drawTimeout = undefined;
        WIDGETS.calr.draw();
      }, 86400000 - Date.now() % 86400000);
    }
  };
})();
