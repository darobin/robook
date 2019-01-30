
let express = require('express')
  , { join } = require('path')
  , SSEChannel = require('sse-channel')
  , debug = require('debug')('robook')
  , app = express()
  , channel = new SSEChannel({
      historySize:  50,
      pingInterval: 60 * 1000, // 60s, longer than normal, don't do it too much
      jsonEncode:   true,
    })
;

module.exports = function server (dir, port, cb) {
  debug(`Setting up server for ${dir} at ${port}`);
  app.get('/sse/book', (req, res) => {
    channel.addClient(req, res);
  });
  app.use(express.static(dir));
  app.use(express.static(join(__dirname, '../public')));
  app.listen(port, (err) => {
    if (err) return cb(err);
    debug(`Server listening…`);
    cb(null, app, channel);
  });
};
