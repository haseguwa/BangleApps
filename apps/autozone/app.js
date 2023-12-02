{
  const spotzone = [
    [[0, 0, 0, 0]],
    [[1, 0, 0, 0]],
    [[2, 0, 0, 0]],
    [[3, 0, 0, 0]],
    [[4, 0, 0, 0]],
    [[5, 0, 0, 0]],
    [[6, 0, 0, 0]],
    [[7, 0, 0, 0]],
    [[8, 0, 0, 0]],
    [[9, 0, 0, 0]],
    [[10, 0, 0, 0]],
    [[11, 0, 0, 0]],
    [[12, 0, 0, 0]],
    [[13, 0, 0, 0]],
    [[14, 0, 0, 0]],
    [[15, 0, 0, 0]],
    [[16, 0, 0, 0]],
    [[17, 0, 0, 0]],
    [[18, 0, 0, 0]],
    [[19, 0, 0, 0]],
    [[20, 0, 0, 0]],
    [[21, 0, 0, 0]],
    [[22, 0, 0, 0]],
    [[23, 0, 0, 0]]
  ];

  let autozone = (gps) => {
    if (gps.satellites > 0) {
      E.setGPSPower(0);
      zone = Math.round(gps.lon / 15);
      for (let spot in spotzone[zone]) {
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

  Bangle.setGPSPower(1);
  Bangle.on('GPS', autozone);
  E.showMessage('Getting Location');
}
