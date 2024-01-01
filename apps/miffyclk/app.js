{
  const rad = Math.PI / 30;
  let drawTimeout;

  const draw = () => {
    g.reset();
    g.clearRect(Bangle.appRect);
  
    let fgcolor = g.getColor();
    let bgcolor = g.getBgColor();

    let date = new Date();
    let hour = date.getHours();
    let min = date.getMinutes();

    g.fillEllipse(35, 90, 142, 170);

    let lbase = [54, 100, 49, 65, 50, 55, 55, 50, 60, 48, 70, 48, 75, 52, 80, 58, 79, 90];
    g.fillPoly(lbase, false);
    let ltop = [-17, 0, -17, -21, -13, -35, 0, -46, 13, -35, 16, -21, 16, 0];
    let lpoly = [];
    let lsin = Math.sin((hour * 5 + min / 12) * rad);
    let lcos = Math.cos((hour * 5 + min / 12) * rad);
    for (let i = 0; i < ltop.length / 2; i++) {
      let x = i * 2;
      let y = i * 2 + 1;
      lpoly[x] = ltop[x] * lcos - ltop[y] * lsin + 65;
      lpoly[y] = ltop[x] * lsin + ltop[y] * lcos + 63;
    }
    g.fillPoly(lpoly, false);

    let rbase = [122, 100, 127, 65, 126, 55, 121, 50, 116, 48, 106, 48, 101, 52, 96, 58, 97, 90];
    g.fillPoly(rbase, false);
    let rtop = [-16, 0, -16, -21, -13, -35, 0, -46, 13, -35, 17, -21, 17, 0];
    let rpoly = [];
    let rsin = Math.sin(min * rad);
    let rcos = Math.cos(min * rad);
    for (let i = 0; i < rtop.length / 2; i++) {
      let x = i * 2;
      let y = i * 2 + 1;
      rpoly[x] = rtop[x] * rcos - rtop[y] * rsin + 111;
      rpoly[y] = rtop[x] * rsin + rtop[y] * rcos + 63;
    }
    g.fillPoly(rpoly, false);

    g.setColor(bgcolor);
    g.drawPoly(lpoly, false);
    g.drawPoly(rpoly, false);

    g.fillEllipse(58, 129, 62, 136);
    g.fillEllipse(114, 129, 118, 136);

    g.drawLine(82, 148, 94, 154);
    g.drawLine(94, 148, 82, 154);

    if (drawTimeout) {
      clearTimeout(drawTimeout);
    }
    drawTimeout = setTimeout(() => {
      drawTimeout = undefined;
      draw();
    }, 60000 - Date.now() % 60000);
  };

  Bangle.on('lock', (on) => {
    if (!on) {
      if (drawTimeout) {
        clearTimeout(drawTimeout);
        drawTimeout = undefined;
      }
      draw();
    }
  });

  Bangle.setUI({
    mode : "clock",
    remove : () => {
      if (drawTimeout) {
        clearTimeout(drawTimeout);
      }
    }
  });

  Bangle.loadWidgets();
  draw();
  setTimeout(Bangle.drawWidgets, 0);
}
