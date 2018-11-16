
let { isAbsolute, join } = require('path')
  , debug = require('debug')('robook')
  , server = require('./lib/server')
  , DirectoryWatchingIngester = require('./lib/watch')
  , makeErrorReporter = require('./lib/error-reporter')
;

module.exports = function robook ({ command = 'watch', dir = '.', port = 4000 }, cb) {
  if (!isAbsolute(dir)) dir = join(process.cwd(), dir);
  debug(`Processing ${command} ${dir}`);

  if (command === 'watch') {
    server(dir, port, (err, app, channel) => {
      if (err) return cb(err);
      let dw = new DirectoryWatchingIngester({ preIngest: true })
        , reportError = makeErrorReporter()
        , hasInit = false
        , nav = []
        , index = null
      ;
      dw.on('error', reportError);
      dw.on('init', () => {
        hasInit = true;
        // XXX: at this point we have all the search and nav ready, send it to SEE
        channel.send({ nav, index });
      });
      dw.on('file', (source) => {
        if (!hasInit) return;
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
  }
  else {
    return cb(new Error(`Unknown command ${command}`));
  }
};
