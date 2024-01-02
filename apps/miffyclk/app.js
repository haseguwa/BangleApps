{
  const miffy = {
  width : 64, height : 77, bpp : 1,
  buffer : require("heatshrink").decompress(atob("gEP/4DB//wAYMf/+AgP//AHBn//4ED//8A5N///gg///wHT+A6BA4X/A4ZDDA/4H/S4YHKW7IHHAAQHKd4IACe4gHVAwZXCgIHFwEDA4vANYQAD8CDCAAaLDA4kfA4v4A45GEJAQHPPwiACA54GFACY5CEof+LIRFDA6whBE4hXQA46PXHoXH8a3F+OPA4TPCDYfwc4QPD8D3CD4fAgIvFwEAKAn+gEAfAnwA4IYECwIABIIX4AwQABA4IEC"))
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
    let sin = Math.sin(angle * rad);
    let cos = Math.cos(angle * rad);
    let poly = [];
    for (let i = 0; i < ear.length; i += 2) {
      poly[i] = ear[i] * cos - ear[i+1] * sin + x;
      poly[i+1] = ear[i] * sin + ear[i+1] * cos + y;
    }
    g.setColor(fgcolor);
    g.fillPoly(poly, false);
    g.setColor(bgcolor);
    g.drawPoly(poly, false);
  };

  const drawmiffy = (hour, min) => {
    g.drawImage(miffy, 56, 68);
    if (min <= 30) {
      drawear(102, 77, min);
      drawear(73, 77, hour * 5 + min / 12);
    } else {
      drawear(73, 77, hour * 5 + min / 12);
      drawear(102, 77, min);
    }
  };

  const draw = () => {
    g.reset();

    let date = new Date();
    let sec = Math.floor(date.getSeconds() / 5);
    if (sec == 0) {
      g.clearRect(32, 48, 143, 151);
      drawmiffy(date.getHours(), date.getMinutes());
    }

    let ary = pos[sec];
    g.clearRect(ary[0], ary[1], ary[0]+17, ary[1]+17);
    g.drawImage(flowers[Math.floor(Math.random() * flowers.length)], ary[0], ary[1]);

    if (drawTimeout) {
      clearTimeout(drawTimeout);
    }
    drawTimeout = setTimeout(() => {
      drawTimeout = undefined;
      draw();
    }, 5000 - Date.now() % 5000);
  };

  const drawall = () => {
    g.reset();
    g.clearRect(Bangle.appRect);

    let date = new Date();
    drawmiffy(date.getHours(), date.getMinutes());

    for (let i = 0; i < 12; i++) {
      let ary = pos[i];
      g.drawImage(flowers[Math.floor(Math.random() * flowers.length)], ary[0], ary[1]);
    }
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
  drawall();
  draw();
  setTimeout(Bangle.drawWidgets, 0);
}
