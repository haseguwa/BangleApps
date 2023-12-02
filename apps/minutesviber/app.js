{
  const hour_vibration = 150;
  const hour_interval = 300;
  const quarter_vibration = 300;
  const quarter_interval = 500;
  const remain_vibration = 100;
  const remain_interval = 300;
  const separator_interval = 300;

  let vibe = (hour, qmin, rmin) => {
    if (hour > 0) {
      setTimeout(vibe, hour_interval + (hour == 1 ? separator_interval : 0), hour - 1, qmin, rmin);
      Bangle.buzz(hour_vibration, 1);
    } else if (qmin > 0) {
      setTimeout(vibe, quarter_interval + (qmin == 1 ? separator_interval : 0), hour, qmin - 1, rmin);
      Bangle.buzz(quarter_vibration, 1);
    } else if (rmin > 0) {
      setTimeout(vibe, remain_interval, hour, qmin, rmin - 1);
      Bangle.buzz(remain_vibration, 1);
    } else {
      Bangle.load();
    }
  }

  let date = new Date();
  let min = date.getMinutes();
  vibe((date.getHours() + 11) % 12 + 1, Math.floor(min / 15), min % 15);
}
