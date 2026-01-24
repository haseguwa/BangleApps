{
  let lasttime = getTime();
  let pasttime = 0;
  let connected = false;

  let check = () => {
    setTimeout(check, 60000);

    pasttime += 60;
    if (connected) {
      let current = getTime();
      let real = current - lasttime;
      let diff = pasttime - real;
      E.showMessage('diff = ' + String(diff));
      pasttime = 0;
      lasttime = current;
      connected = false;
    }
  }

  NRF.on('connect', () => {
    E.showMessage('Connected');
    connected = true;
  });

  NRF.on('disconnect', () => {
  });

  setTimeout(check, 60000);

  E.showMessage('Waiting connection');

}
