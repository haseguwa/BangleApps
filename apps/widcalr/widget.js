(() => {
  WIDGETS.calr = {
    area: "tr", width: 22, draw: function() {
      let date = new Date(),
      let day = date.getDate();

      g.reset();
      g.setFontAlign(0, 0, 0);
      g.clearRect(this.x, this.y, this.x + 22, this.y + 22);
      g.drawRect(this.x, this.y, this.x + 22, this.y + 22);
      g.setFont("Vector:16");
      g.drawString(day, x+11, y + 11);

      if (WIDGETS["calr"].to) {
	clearTimeout(WIDGETS["calr"].to);
      }
      WIDGETS.calr.to = setTimeout(() => {
        WIDGETS.calr.draw();
      }, (86401 - Math.floor(date/1000) % 86400)*1000);
    }
  };
})();
