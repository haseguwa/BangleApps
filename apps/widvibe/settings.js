(function(back) {
  const SETTINGS_FILE = 'widvibe.settings.json';
  const storage = require('Storage');

  const settings = {
    touch : true,
    twist : true,
    faceup : true,
    doubletap : true,
  };

  const saved_settings = storage.readJSON(SETTINGS_FILE, true);
  if (saved_settings) {
    for (const key in saved_settings) {
      if (!settings.hasOwnProperty(key)) continue;
      settings[key] = saved_settings[key];
    }
  }

  const save = function() {
    storage.write(SETTINGS_FILE, settings);
  }

  E.showMenu({
    '': { 'title': 'Viber Widget' },
    '< Back': back,
    'Touch': {
      value: settings.touch,
      onchange: () => {
        settings.touch = !settings.touch;
        save();
      },
    },
    'Twist': {
      value: settings.twist,
      onchange: () => {
        settings.twist = !settings.twist;
        save();
      },
    },
    'FaceUp': {
      value: settings.faceup,
      onchange: () => {
        settings.faceup = !settings.faceup;
        save();
      },
    },
    'DoubleTap': {
      value: settings.doubletap,
      onchange: () => {
        settings.doubletap = !settings.doubletap;
        save();
      },
    },
  });
})
