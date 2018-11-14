
let EventEmitter = require('events')
  , mmm = require('mmmagic')
  , mime = require('mime')
  , debug = require('debug')('robook')
  , { access, constants: { R_OK } } = require('fs')
  , { isAbsolute, extname } = require('path')
  , m = new mmm.Magic(mmm.MAGIC_MIME_TYPE)
  , secondChanceTypes = ['text/plain', 'application/octet-stream', 'inode/x-empty']
;

module.exports = class FileIngester extends EventEmitter {
  ingest (path) {
    debug(`ingesting file ${path}`);
    if (!isAbsolute(path)) return this.emit('error', new Error(`Can only ingest absolute file paths.`));
    access(path, R_OK, err => {
      if (err) return this.emit('error', new Error(`Cannot access file ${path}: ${err}.`));
      m.detectFile(path, (err, mediaType) => {
        if (err) return this.emit('error', new Error(`Media type detection error for ${path}: ${err}.`));
        if (secondChanceTypes.find(type => type === mediaType)) {
          let newType = mime.getType((extname(path) || '').replace(/^\./, ''));
          if (newType) mediaType = newType;
        }
        this.emit('file', { path, mediaType });
        this.emit('end');
        debug(`ingested file ${path} as type ${mediaType}`);
      });
    });
  }
};
