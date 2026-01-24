{
  let autozone = (gps) => {
    if (gps.satellites > 0) {
      E.setGPSPower(0);
      zone = Math.round(gps.lon / 15);
      for (let spot in spotzone[zone + 12]) {
        if (Math.pow(spot[0] - gps.lat, 2) + Math.pow(spot[1] - gps.lan, 2) < Math.pow(spot[3], 2)) {
          zone = spot[4];
          break;
        }
      }
      E.setTimezone(zone);
      let flag = (zone >= 0) ? '+' : '';
      E.showMessage('Latitude\n' + gps.lat + '\n\nLongtitude\n' + gps.lon + '\n\nTimezone\n' + flag + zone);
    } else {
      count += 1;
      E.showMessage('' + count);
    }
  }

  var count = 0;

  E.showMessage('Waiting connection');

  NRF.on('connect', () => {
    E.showMessage('Connected');
  });

  NRF.on('disconnect', () => {
    E.showMessage('Disconnected');
  });

  const draw = () => {
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

  };
}
