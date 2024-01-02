{
  const miffy = {
    width : 176, height : 152, bpp : 1,
    buffer : require("heatshrink").decompress(atob("AH4A/AH4A/AH4A/AH4A/AH4A/AH4A/AH4A/AH4APh//AYP/+AVPj//wEB//4Cp8///Agf//gVlv//8EH//+CvvwTgIVQ/4VDWYQV/Cv4V/Cv4V/Ct/gg4Vnv4VD/wV/CqYACCs0/Cof8Cv4VRCgbxQgIVFwAVNgYVF4AVNa4IAE8AVNh4VF+AVjj4VF/AVjYgjGQCtd/Cov+CvIUFAAIV7TYX+LoIVO/zzC/gZBCv4VPM4JtEePQVVKoQAD/gV5VoXH8YDB/AVQ+OPCqEPbIn/+AVNg4rF8AVNgZXF4AVNgKDFwAVNbgraONwhsQIQxAPWIitOAAgVBCiQA/AH4A/AH4A/AH4A/AH4A/AH4AgA=="))
  };

  const watchface = {
    width : 176, height : 152, bpp : 4, transparent : 1,
    buffer : require("heatshrink").decompress(atob("iIA/AH4A/AH4AwgEAgJC/ACcQ///+BD/iCbBCaEPK4P/WCAoTADRDCIR6uCAAJFBCxwoSeTrzQCYhGBCxooTVzouBcJxCCCIIXCTxgoTK7xDCIRhXB+Hu9z2PFCZXcQgIyCcJqWBK4PgK6AoSK7cOIQYuMV4ITBCgRCNFCYAaiEAIYSLCIR5DCeRooTV7fwFoIuCIZauBK4kAFECubQAIuDQphXCCgRCOFCaubFwkAIRwABgEALgQofK7jzC8BCNK4fwAYYofK7vwgAECQ5gUDK6QoRK7n/AYYuMWAUBI4YogADLzDFyMAgBbEFEKwb+AyDFyJbCFEqwWgApBGQQo/GTAo/AH4A/AH4A/AH4A/AH4A/ACMAgEBIX5HTiH///wKX5HTh4PB/6w/I6RmCAALCOV2xHMB4fwNYLCMK+5HLB4RlBYRpX3I5gPB+Hu9xnBK/5HRMoIPB8BX/I6JnBhwPD+BW/I566BB4iu/I55mBB4kAK35HPB4XwB4JsBV/5HPB4X/gEACgRX/I5wPD+ADDK/5HPXQJX/I6poCgITDK/5HQgEACYhX/I6gTCAH5H/AH4A/AH4A/AH4A/AH4A/AH4A/AH4A/AH4A/AH4A/AH4A/AH4A/AH4A/AH4A/AH4A/AF8AgEBIX5LTiH///wJ35LTh4LB/6w/JaRiCAAK+KV3xLIBYfwM4K+IK/5LHBYRhBXxJX/JZALB+Hu9xjBK/5XGJZRhBBYPgK/4AGJZRjBhwLD+BS/V4pLJWwILEV34AEJZRiBBYkAKX6uFJZILC+ALBNAKv/JZ4LC/8AgAQCKn5LOBYfwAYZU/JZ62BK/4AJJZZkCgIPDKf5LQgEAB4hT/JagPCAH5L/AH4A/AH4A/AH4A/AH4A/AH4A/AH4A/AH4A/AH4A/AH4A/AH4A/AH4A/AH4A/AH4A/AGcAgEBIX5HTiH///wKX5HTh4PB/6w/I6RmCAALCOV2xHMB4fwNYLCMK+5HLB4RlBYRpX3I5gPB+Hu9xnBK/5HRMoIPB8BX/I6JnBhwPD+BW/I566BB4iu/I55mBB4kAK35HPB4XwB4JsBV/5HPB4X/gEACgRX/I5wPD+ADDK/5HPXQJX/I6poCgITDK/5HQgEACYhX/I6gTCAH5H/AH4A/AH4A/AH4A/AH4AwiEAgAo/ACkP///gIo/QqYtB//wCqCaBISAoVQrYuBcJ5DCISAoUK7sAcJ4UDWB4oUK7aEBGQSeMeQZDBgBrPFCJXch3u8BXS+BHCFEAAaiEAFwPuIZxXCVoJbCWBgoTV7fwFoIuCIRo9BCYYUNFCauaIQYuBQpytBCYLzCIZYoVVzIuEgCFNIYLyCK4JDMFChXbIYRCOCgRXEIZgoUK7nwgAECeRpXEgAogK7v/AYZXOeYQVBV54oQADRDCK6f/gEALgQofWDvwGQZXP+ADDFD6wcgApBGQRCOK6QoTLcTzOgJbDFEAAvgEALYhD8LbQA/AH4A/AH4AvA="))
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
