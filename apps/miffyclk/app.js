{
  const miffy = {
    width : 176, height : 152, bpp : 1,
    buffer : require("heatshrink").decompress(atob("AH4A/AH4A/AH4A/AH4A/AH4A/AH4A/AH4A/AH4APh//AYP/+AVPj//wEB//4Cp8///Agf//gVlv//8EH//+CvvwTgIVQ/4VDWYQV/Cv4V/Cv4V/Ct/gg4Vnv4VD/wV/CqYACCs0/Cof8Cv4VRCgbxQgIVFwAVNgYVF4AVNa4IAE8AVNh4VF+AVjj4VF/AVjYgjGQCtd/Cov+CvIUFAAIV7TYX+LoIVO/zzC/gZBCv4VPM4JtEePQVVKoQAD/gV5VoXH8YDB/AVQ+OPCqEPbIn/+AVNg4rF8AVNgZXF4AVNgKDFwAVNbgraONwhsQIQxAPWIitOAAgVBCiQA/AH4A/AH4A/AH4A/AH4A/AH4AgA=="))
  };

  const watchface = {
    width : 176, height : 152, bpp : 4, transparent : 0,
    buffer : require("heatshrink").decompress(atob("AH4A/AH4A/ADXdAA4TKhoTH6AoeK/5X/K/5X/K/5X/K/5X/K/5X/K/5X/K/5X/K/5X/K/5X/K/5X/K/5X/K/5XyAH4A/AH4A/AH4A/AH4A/AH4A/AFsN7oAG6BJ/JZpX/K/5X/K/5X/K/5X/K/5X/K/5X/K/5X/K/5X/K/5X/K/5X/K/5X/K/5X/K64A/AH4A/AH4A/AH4A/AH4A/AH4A/AH4A/AH4A/AH4A/AH4A/AH4A/AH4A/AH4A/AH4A/AD8N7oAG6BJ/JZpX/K/5X/K/5X/K/5X/K/5X/K/5X/K/5X/K/5X/K/5X/K/5X/K/5X/K/5X/K64A/AH4A/AH4A/AH4A/AH4A/AH4A/AH4A/AH4A/AH4A/AH4A/AH4A/AH4A/AH4A/AH4A/AD8N7oAG6BJ/JZpX/K/5X/K/5X/K/5X/K/5X/K/5X/K/5X/K/5X/K/5X/K/5X/K/5X/K/5X/K64A/AH4A/AH4A/AH4A/AH4A/AH4A/ACPdAA4TKhoTH6AoeK/5X/K/5X/K/5X/K/5X/K/5X/K/5X/K/5X/K/5X/K/5X/K/5X/K/5X/K/5XyAH4A/AH4A0A=="))
  };

  const rad = Math.PI / 30;
  const fgcolor = g.getColor();
  const bgcolor = g.getBgColor();
  let drawTimeout;

  let min = Math.floor(Math.random() * 60);
  let hour = Math.floor(Math.random() * 23);

  const ear = [-11, 0, -11, -8, -9, -14, 0, -22, 9, -14, 11, -8, 11, 0];

  const drawear = (x,y,angle) => {
    let poly = [];
    let sin = Math.sin(angle * rad);
    let cos = Math.cos(angle * rad);
    for (let i = 0; i < ear.length; i += 2) {
      poly[i] = ear[i] * cos - ear[i+1] * sin + x;
      poly[i+1] = ear[i] * sin + ear[i+1] * cos + y;
    }
    g.setColor(fgcolor);
    g.fillPoly(poly, false);
    g.setColor(bgcolor);
    g.drawPoly(poly, false);
  };

  const draw = () => {
    g.reset();
    g.clearRect(Bangle.appRect);

    g.drawImage(miffy, 0, 24);
    g.drawImage(watchface, 0, 24);
/*
    let date = new Date();
    let hour = date.getHours();
    let min = date.getMinutes();
*/
    if (min <= 30) {
      drawear(102, 77, min);
      drawear(73, 77, hour * 5 + min / 12);
    } else {
      drawear(73, 77, hour * 5 + min / 12);
      drawear(102, 77, min);
    }

    min = (min + 1) % 60;
    hour = (hour + 1) % 24;

    if (drawTimeout) {
      clearTimeout(drawTimeout);
    }
    drawTimeout = setTimeout(() => {
      drawTimeout = undefined;
      draw();
    }, 500 - Date.now() % 500);
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
