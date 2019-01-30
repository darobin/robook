#!/usr/bin/env node

let robook = require('..')
  , commander = require('commander')
  , getPort = require('get-port')
;

commander
  .version(require('../package.json').version)
  .option('-o, --open', 'open in browser')
  .option('-p, --port <n>', 'the port', parseInt)
  .option('-d, --dir <path>', 'the directory')
  .action((options) => {
    maybeGetPort(options, (err, port) => {
      if (err) return console.error(err);
      robook(
        {
          dir: options.dir,
          open: options.open,
          port,
        },
        (err) => {
          if (err) console.error(err);
          console.warn(`…`);
        }
      );
    });
  })
  .parse(process.argv)
;

function maybeGetPort (options, cb) {
  if (options.port) return cb(null, options.port);
  getPort({ port: 8888 })
    .then(port => cb(null, port))
    .catch(cb)
  ;
}
