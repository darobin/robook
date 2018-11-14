
let express = require('express')
  , debug = require('debug')('robook')
  , app = express()
;

module.exports = function server (dir, port, cb) {
  debug(`Setting up server for ${dir} at ${port}`);
  app.use(express.static(dir));
  app.listen(port, (err) => {
    if (err) return cb(err);
    debug(`Server listening…`);
    cb(null, app);
  });
};
