{
  const watchface = {
    width : 176, height : 152, bpp : 1,
    buffer : require("heatshrink").decompress(atob("ADMD+P4AgMfw//wAFBg/gCqHACqgRCCpUAuE4DQQ/BCIYV/CqODNoYVQTIgVQx7FDCqGOBQgV/NqaZTCswA/AH0fwCQECp+B//wCqWD//4CR0BHoMDw+AngVQ+DoBgFeCqH4geOgPuKyE4CoMDCqkP5wVTj8OCqd+CqBtD/AVPTIeO+AVPgbFCx9AjwVPwACBbaIVDwZbBCqWBLYIVSwBbBNqA9PCt4A/AH4A/AH4A/AH4A/AHkH/wSQgf/8EP/4VS+Ef/+ACqP4jkD4BWRvEcgIVSnAVJgfgCqcH+AVJNoIVHg0wNpKZBCqcHCqkAK6gVJQZYVJV5YiBbaZtBwATPQYgpQCoPwg/+CqR3JAH4A/AH4A/AH4A/AH4A/AH4AIgP8CSEDwE4g//CtMPg+ACqUOAYIVoIKptT//4h//FaIVBj//4AVSjkBCqAABnAV/CoJtSCoSZSCoTFSCoQTSAH4AJ//8AgUf/AECv/+CpQLDn4VUv4VPgE8AYXwBAdwWx/gCqF4Cqg9DCqv/NoijDAA0BE4a0En6DKgPATw8f/4VJgYVD8EOBQcHCpMHwAVph6HECp4PEv5tDv5tKjwEDn6ZDDQgAGngEDj7FPAHgA=="))
  };
  const miffy = {
    width : 30, height : 45, bpp : 1,
    buffer : require("heatshrink").decompress(atob("ABPggPgg/AAIM/gE/wH8gH+g/4gf8j/gh/wv+An/D/0A/8PBwP+n4OB/H/BwPjBwWPBw8Aj/jFgN/x/wgP///Agf/DIMP/4OC/4dBBwPwj4DB8ACB//DAYQKC/wVB//5BQXnAYWfBwV+v/5AAINBBw38n4wCEIWB/8n/xZC+ED/V/gEHIwIDCTxA"))
  };

  const rad = Math.PI / 30;
  const offset = [[-1,-2],[0,-2],[1,-2],[-2,-1],[-1,-1],[1,-1],[2,-1],[-2,0],[2,0],[-2,1],[-1,1],[1,1],[2,1],[-1,2],[0,2],[1,2]];

  require("FontSinclair").add(Graphics);

  let drawTimeout;

  let drawhand = (angle,st,ed) => {
    let x = Math.cos(angle * rad);
    let y = Math.sin(angle * rad);
    let x1 = 88 + x * st;
    let y1 = 88 + 11 + y * st;
    let x2 = 88 + x * ed;
    let y2 = 88 + 11 + y * ed;
    for (let i = 0; i < offset.length; i++) {
      let ary = offset[i];
      g.drawLine(x1+ary[0], y1+ary[1], x2+ary[0], y2+ary[1]);
    }
    g.drawLine(88+x*4, 88+11+y*4, 88+x*st, 88+11+y*st);
  };

  let draw = () => {
    g.reset();
    g.clearRect(Bangle.appRect);
    g.drawImage(watchface, 0, 24);

    let date = new Date();

    g.setFont("Sinclair");
    g.setFontAlign(0,0,0);
    g.drawString(require('locale').date(date,0).substr(0,3).toUpperCase(), 46, 95);
    g.drawString(date.getFullYear(), 45, 105);
    g.drawString(require('locale').dow(date).substr(0,3).toUpperCase(), 130, 95);
    g.drawString(date.getDate(), 130,105);

    g.setColor(g.getBgColor() ^ 0x1F);
    g.drawImage(miffy, 73, 105);
  
    g.setColor(g.getBgColor() ^ 0xffff);
    drawhand((date.getHours() - 3) * 5 + date.getMinutes() / 12, 12, 50);
    g.setColor(((g.getBgColor() & 0x7E0) ^ 0x7E0) | 0x1F);
    drawhand(date.getMinutes() - 15, 12, 65);

    if (drawTimeout) {
      clearTimeout(drawTimeout);
    }
    if (Bangle.isLocked()) {
      drawTimeout = setTimeout(() => {
        drawTimeout = undefined;
        draw();
      }, 60000 - Date.now() % 60000);
    } else {
      g.setColor(((g.getBgColor() & 0xFFE0) ^ 0xF800) | 0x1F);
      let sa = date.getSeconds() - 15;
      let sx = Math.cos(sa * rad);
      let sy = Math.sin(sa * rad);
      g.drawLine(88+sx*4, 88+11+sy*4, 88+sx*70, 88+11+sy*70);
      drawTimeout = setTimeout(() => {
        drawTimeout = undefined;
        draw();
      }, 1000 - Date.now() % 1000);
    }
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
