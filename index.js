
let { isAbsolute, join } = require('path')
  , debug = require('debug')('robook')
  , opn = require('opn')
  , server = require('./lib/server')
  , DirectoryWatchingIngester = require('./lib/watch')
  , makeErrorReporter = require('./lib/error-reporter')
;

module.exports = function robook ({ open = false, dir = '.', port = 4000 }, cb) {
  if (!isAbsolute(dir)) dir = join(process.cwd(), dir);
  debug(`Processing ${dir}`);

  server(dir, port, (err, app, channel) => {
    if (err) return cb(err);
    let dw = new DirectoryWatchingIngester({ preIngest: true })
      , reportError = makeErrorReporter()
      , hasInit = false
      , nav = []
      , index = null
      , address = `http://localhost:${port}/`
    ;
    dw.on('error', reportError);
    dw.on('init', () => {
      hasInit = true;
      maybeOpen(address, open, (err) => {
        if (err) reportError(err);
        channel.send({ nav, index });
      });
      // XXX: at this point we have all the search and nav ready, send it to SEE
    });
    dw.on('file', (source) => {
      if (!hasInit) return;
      debug(`File`, source);
      if (source.mediaType === 'text/markdown') {
        // XXX:
        //  - search index
        //  - add to nav
        //    - for both of the above we need to process the MD in full anyway, so just use that
        //    - it is worth noting that the nav should largely be in an index file?
        //  - tell SSE but only if hasInit
      }
    });
    // XXX need to handle this too by sending SSE
    // dw.on('delete', ...)
    dw.ingest(dir);
    cb();
  });
};

function maybeOpen (address, open, cb) {
  let done = () => process.nextTick(cb);
  if (!open) return done();
  opn(address);
  done();
}
