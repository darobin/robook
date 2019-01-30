
let EventEmitter = require('events')
  , findit = require('findit')
  , debug = require('debug')('robook')
  , { isAbsolute } = require('path')
  , FileIngester = require('./file')
;

module.exports = class DirectoryIngester extends EventEmitter {
  ingest (path) {
    debug(`ingesting directory ${path}`);
    if (!isAbsolute(path)) return this.emit('error', new Error(`Can only ingest absolute directory paths.`));
    let finder = findit(path)
      , fi = new FileIngester()
    ;
    fi.on('error', (err) => this.emit('error', err));
    fi.on('file', (file) => this.emit('file', file));
    finder.on('path', (fullPath) => fi.ingest(fullPath, path));
    finder.on('error', (err) => {
      finder.stop();
      this.emit('error', err);
    });
    finder.on('end', () => this.emit('end'));
  }
};
