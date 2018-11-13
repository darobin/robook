
module.exports = function robook ({ command, dir, port }, cb) {
  if (command === 'watch') {
    // XXX:
    //  - set up express
    //  - set up dir watcher (and start traversing)
    cb();
  }
  else {
    return cb(new Error(`Unknown command ${command}`));
  }
};
