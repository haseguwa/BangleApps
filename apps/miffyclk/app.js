{
  const miffy = {
    width : 176, height : 152, bpp : 1,
    buffer : require("heatshrink").decompress(atob("AH4A/AH4A/AH4A/AH4A/AH4A/AH4A/AH4A/AH4APh//AYP/+AVPj//wEB//4Cp8///Agf//gVlv//8EH//+CvvwTgIVQ/4VDWYQV/Cv4V/Cv4V/Ct/gg4Vnv4VD/wV/CqYACCs0/Cof8Cv4VRCgbxQgIVFwAVNgYVF4AVNa4IAE8AVNh4VF+AVjj4VF/AVjYgjGQCtd/Cov+CvIUFAAIV7TYX+LoIVO/zzC/gZBCv4VPM4JtEePQVVKoQAD/gV5VoXH8YDB/AVQ+OPCqEPbIn/+AVNg4rF8AVNgZXF4AVNgKDFwAVNbgraONwhsQIQxAPWIitOAAgVBCiQA/AH4A/AH4A/AH4A/AH4A/AH4AgA=="))
  };

  const flowers = [
    { width : 18, height : 18, bpp : 4, transparent : 1, buffer : require("heatshrink").decompress(atob("iMRiAEDAAcP///gIHDiAHB//wCAwIBDoYIDgAdDBAIPBBgQdBAgMO93gBAY9B9wABCwQRB+AIEgI9BBAgiDBAcAGgYsECIY+FgJPDAYYsCBAwtDBgYIBKAIMESQoMDA=")) },
    { width : 18, height : 18, bpp : 4, transparent : 1, buffer : require("heatshrink").decompress(atob("iMRAYYADiH//8BBAkPBAPwiEABYIQCAAIMB+AIHDwIIC+EADwgDBh3u8AICFgPw9wABEgkABAwRHEYIIDgA1BGAQsCHAJYEHwRZBBAZSCBBR8DMIaOEHISSFBgIQCA==")) },
    { width : 18, height : 18, bpp : 4, transparent : 1, buffer : require("heatshrink").decompress(atob("iMQgEBiIAEh//+AMEiH/AAMBBggIC+AMDBA/wBAXwgAaBDYQEBh3u8AIDGIPuAAItDh/wBAgsCBAgiDBAZQCGAQsDCIY+ELIkAJ4Z0BQAIUCBAZ/DNQQIDMoaSFDoIQC")) },
    { width : 18, height : 18, bpp : 4, transparent : 1, buffer : require("heatshrink").decompress(atob("iMRiADCAAkP/8BiIQE///+ADCBgIEC/4UBBgIIL+EABAgFBh3u8AnEgHuAAI5CAQPwBAYZBBAsAHoIRK/4sEEYQ+FgJhDKQRiCEgQIFQoIeERAh8EAAiODA=")) },
    { width : 18, height : 18, bpp : 4, transparent : 1, buffer : require("heatshrink").decompress(atob("iICCAAIECiH//8BAggDC+ERh4IF/8AAYQIECAQfCAoQCCDwIIGCAIxDgHwgAIDIYPuCQIaE+AICGokPHwfwFYg2DDIQFCBBAFCAQIhC+A6CAAJ2EAAgUBJwQADC4IFDA")) },
    { width : 18, height : 18, bpp : 4, transparent : 1, buffer : require("heatshrink").decompress(atob("iICBgMRAAkP//wAgMQBoQIB/8BiANDBAXwAYYVBAgQCBBAQsBBAoQCgAIDgIeCBIIZDE4fuJYYIEAgIIBEYUPDQg1DBQIsCMYYIDKAgIJEghiDQQgICHYRICAYKcBAAY")) },
    { width : 18, height : 18, bpp : 4, transparent : 1, buffer : require("heatshrink").decompress(atob("iIACgEBAoYABiH/+AIFh///8BDgcBBAUACgIFBAQX/Ao4IG+ABCBAghBBAUBHYIMB9wZCHgYIBHQROCgEPHgIZBK4YrEK4gIECAQIDGohgCHwx2EBAQxBAgibEAgQA==")) },
    { width : 18, height : 18, bpp : 4, transparent : 1, buffer : require("heatshrink").decompress(atob("iIADAwMBiMQAYf//4EBh//+ADCBAn/gACBBAvwBBQeBFAYICHoYkDBQQ7D+HuD4ZICgAIFH43wFgX/h4JCgIQCBAI1DBApQGFY3wgJUDQwiCEAAhLCiI")) },
    { width : 18, height : 18, bpp : 4, transparent : 1, buffer : require("heatshrink").decompress(atob("iICCAAIECiGZzMBAggDCyERhIIFzMAAYQIECAQfCAoQCCDwIIGCAIxDgGQgAIDIYPuCQIaEyAICGokJHweQFYg2DDIQFCBBAFCAQIhCyA6CAAJ2EAAgUBJwQADC4IFDA")) },
    { width : 18, height : 18, bpp : 4, transparent : 1, buffer : require("heatshrink").decompress(atob("iMRgEBAYIADiHM4AJBBgcM5gJBgACBBAgACBDo1BAAY1CBBAbEDIQSCL4QQDAgUVBgQCBu9wgEVgEHu8BAQIABgoDCuAIDuoIDDQIICBoSBCBgMFHAQ2EGoIACA=")) },
    { width : 18, height : 18, bpp : 4, transparent : 1, buffer : require("heatshrink").decompress(atob("iMRgEBAYIADiHu8AJBBgcO9wJBgACBBAgACBDo1BAAY1CBBAbEDIQSCL4QQDAgUVBgQCBu9wgEVgEHu8BAQIABgoDCuAIDuoIDDQIICBoSBCBgMFHAQ2EGoIACA=")) },
    { width : 18, height : 18, bpp : 4, transparent : 1, buffer : require("heatshrink").decompress(atob("iMRgEBAYIADiGZyAJBBgcJzIJBgACBBAgACBDo1BAAY1CBBAbEDIQSCL4QQDAgUVBgQCBu9wgEVgEHu8BAQIABgoDCuAIDuoIDDQIICBoSBCBgMFHAQ2EGoIACA=")) },
    {  width : 18, height : 18, bpp : 4, transparent : 1, buffer : require("heatshrink").decompress(atob("iIABAgMQgEBA4fu90O93gA4MQA4PuBYQSBBAfgh0A8EQCwQFB8AEBiADBBwIMBhwUBBoIKBDgQIBFIICBBAgPDBAYsCAAkBCIwIKKgIbE8EBLAISEg9wPAISDgFwuBrBEoUAg93Q4QTBA4NwBAaSDGYMBA==")) }
  ];
  const pos = [[79,27],[120,29],[151,53],[155,91],[151,129],[120,153],[79,155],[38,153],[7,129],[3,91],[7,53],[38,29]];

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
    for (let i = 0; i < 12; i++) {
      let ary = pos[i];
      g.drawImage(flowers[Math.floor(Math.random() * flowers.length)], ary[0], ary[1]);
    }

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
