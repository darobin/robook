#!/usr/bin/env node

let robook = require('..')
  , commander = require('commander')
;

commander
  .version(require('../package.json').version)
  .command('watch <dir>', 'watch the given directory and serve from it')
  .option('-p, --port <n>', 'the port', parseInt)
  .action((command, dir, options) => {
    if (!options) {
      dir = options;
      options = {};
    }
    robook(
      {
        command,
        dir,
        port: options.port
      },
      (err) => {
        if (err) {
          console.error(err);
          if (!options.watch) process.exit(42);
        }
        if (!options.watch) process.exit(0);
      }
    );
  })
  .parse(process.argv)
;
