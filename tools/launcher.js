const open = require('open');
const path = require('path');

(async () => {
  // Opens index.html in the default browser
  await open(path.join(__dirname, './builds/LonkOS.html'));
})();
