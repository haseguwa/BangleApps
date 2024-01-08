(() => {
  require("Font5x9Numeric7Seg").add(Graphics);
  require("FontTeletext5x9Mode7").add(Graphics);

  function draw() {
    const date = new Date();
    const month = require("locale").month(date, true);
    const day = date.getDate();

    g.reset();
    g.setFontAlign(0, 0, 0);
    g.clearRect(this.x, this.y, this.x + 21, this.y + 21);
    g.drawRect(this.x, this.y, this.x + 21, this.y + 21);
    g.setFont("5x9Numeric7Seg");
    g.drawString(day, this.x + 11, this.y + 14);

    g.setColor(1,0,0);
    g.fillRect(this.x, this.y, this.x + 21, this.y + 7);
    g.setColor(1,1,1);
    g.setFont("Teletext5x9Mode7");
    g.drawString(month, this.x + 11, this.y + 4);

    if (WIDGETS.calr.to) {
     	clearTimeout(WIDGETS.calr.to);
    }
    WIDGETS.calr.to = setTimeout(draw, (86400000 - date) % 86400000);
  }

  WIDGETS.calr = { area: "tr", width: 22, draw: draw };

})();
