var chokidar = require('chokidar');
var shell = require('shelljs');


const watcher = chokidar.watch('./src', {
    ignoreInitial:true
  });
  watcher.on('all', (event, path) => {
    if (shell.exec('npm run build').code !== 0) {
        shell.echo('Build failed');
    }
  });