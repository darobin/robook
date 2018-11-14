
let EventEmitter = require('events')
  , watchr = require('watchr')
  , debug = require('debug')('robook')
  , { isAbsolute } = require('path')
  , FileIngester = require('./file')
  , DirectoryIngester = require('./directory')
;

module.exports = class DirectoryWatchingIngester extends EventEmitter {
  constructor (options = {}) {
    super();
    this.preIngest = options.preIngest || false;
  }
  ingest (path) {
    debug(`watching directory ${path}`);
    if (!isAbsolute(path)) return this.emit('error', new Error(`Can only watch absolute directory paths.`));
    let doWatch = () => {
      this.stalker = watchr.open(
        path,
        (changeType, fullPath) => {
          let fi = new FileIngester();
          fi.on('error', (err) => this.emit('error', err));
          fi.on('file', (file) => this.emit('file', file));
          switch (changeType) {
            case 'update':
            case 'create':
              fi.ingest(fullPath);
              break;
            case 'delete':
              this.emit('delete', fullPath);
              break;
            default:
              this.emit('error', new Error(`Unknown watcher change type ${changeType}.`));
          }
        },
        (err) => {
          if (err) this.emit('error', err);
          // this.emit('end'); // XXX this is not the end, it is called when the watcher is set up
        }
      );
    };
    if (this.preIngest) {
      let di = new DirectoryIngester();
      di.on('error', (err) => this.emit('error', err));
      di.on('file', (file) => this.emit('file', file));
      di.on('end', () => this.emit('init'));
      di.on('end', doWatch);
      di.ingest(path);
    }
    else doWatch();
  }
};
