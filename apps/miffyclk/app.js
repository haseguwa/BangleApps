{
  const miffy = {
    width : 176, height : 152, bpp : 1,
    buffer : require("heatshrink").decompress(atob("AH4A/AH4A/AH4A/AH4A/AH4A/AH4A/AH4A/AH4APh//AYP/+AVPj//wEB//4Cp8///Agf//gVlv//8EH//+CvvwTgIVQ/4VDWYQV/Cv4V/Cv4V/Ct/gg4Vnv4VD/wV/CqYACCs0/Cof8Cv4VRCgbxQgIVFwAVNgYVF4AVNa4IAE8AVNh4VF+AVjj4VF/AVjYgjGQCtd/Cov+CvIUFAAIV7TYX+LoIVO/zzC/gZBCv4VPM4JtEePQVVKoQAD/gV5VoXH8YDB/AVQ+OPCqEPbIn/+AVNg4rF8AVNgZXF4AVNgKDFwAVNbgraONwhsQIQxAPWIitOAAgVBCiQA/AH4A/AH4A/AH4A/AH4A/AH4AgA=="))
  };

  const watchface = {
    width : 176, height : 152, bpp : 4, transparent : 1,
    buffer : require("heatshrink").decompress(atob("iIA/AH4A/AH4A/AH4A/AEMAgBB/Kyu73ZY/iMQgEBCSBWBAAIVRFCJWbhe72AvPCQIAC2AoPhnM4BYqIYZCPK6hWBAAPAV1JCDeZwTFCh5WCAAKwoK/4AXeQjzOK6kMK4nAK/5X/K6YUFCZxX/K/7zMeRoUFCZ5XEChxXuiMACQMAFB5XteYjyOLAZWPAAMMKwXAK1CHBLAOwQskQLAPAV1IvCgAtmFFAA/AH4A/AH4A/AH4A/AH4A/AH4A/AH4A/AE0AgBB/I6kAkUiLH5HF7vdI5cQKwIABgJU/I4RWBAAJHKgRXDkBV/AAMNK4fQK/5XgiBWDAALAKAGsQKwYABI5BX/K/5X/K/4QIgRWDkBW/AAMNKwfQB5JX/K68QK4a+JAHEQK4ZHLgBWBgBU/I4hWBI5sAK35H/AH4A/AH4A/AH4A/AH4A/AH4A/AH4A/AH4A/AH4A/AH4A/AH4A/AH4A/AH4A/AH4A/AH4A/AH4A/AH4A/ACkAgBB/JakAzOZLH5LJ93uJY8QKwIABgJQ/JYxWBAAJLGhJXDyBR/AAsOK4fgK/5XciBWDAAK8GAHsQKwYABJYhX/K/5X/K/5XHiMJKweQKX4AFhxWD8ALFK/5XXiBXDXQoA/JYJXDJY8AKwMAKH4AHgBWBJZMAK35YLJf4A/AH4A/AH4A/AH4A/AH4A/AH4A/AH4A/AH4A/AH4A/AH4A/AH4A/AH4A/AH4A/AH4A/AH4A/AH4A/AH4AMgEAIP5HUgGIxBY/I4vu9xHLiBWBAAMBKn5HCKwIABI5UIK4eAKv4ABhxXD8BX/K8EQKwYABYBQA1iBWDAAJHIK/5X/K/5X/CBEIKweAK34ABhxWD8APJK/5XXiBXDXxIA4iBXDI5cAKwMAKn5HEKwJHNgBW/I/4A/AH4A/AH4A/AH4A/AH4A/AH4A/AH4A/ACsQgEBFH4tUhGIwAvkiEHu9wLFRWBAAOACqEAgASQKwIABuCupKwQABQ58ACQJYPiBWCAAKwoK6gUECZ5XthBXEwAUSCZ0HK4lwK/5X/K6cQCYmIeZpX/K/5DMIRpXUiBXECZpX/K+URhBBCwATSCiEHKwVwK1CHBIgOAQp5XUiBYBuCupF4UAFqEQK4YVRFCIAvgBWBgBD/LCpW/AH4A/AH4A/AH4A/AEY="))
  };

  const rad = Math.PI / 30;
  const fgcolor = g.getColor();
  const bgcolor = g.getBgColor();
  const ear = [-11, 0, -11, -8, -9, -14, 0, -22, 9, -14, 11, -8, 11, 0];

  let drawTimeout;

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

    let date = new Date();
    let hour = date.getHours();
    let min = date.getMinutes();

    if (min <= 30) {
      drawear(102, 77, min);
      drawear(73, 77, hour * 5 + min / 12);
    } else {
      drawear(73, 77, hour * 5 + min / 12);
      drawear(102, 77, min);
    }

    if (drawTimeout) {
      clearTimeout(drawTimeout);
    }
    drawTimeout = setTimeout(() => {
      drawTimeout = undefined;
      draw();
    }, 60000 - Date.now() % 60000);
  };

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
