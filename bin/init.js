const fs = require('fs-extra');
const chalk = require('chalk');
const {basename, join} = require('path');
const readline = require('readline');
const download = require('download-git-repo');
const ora = require('ora');
const vfs = require('vinyl-fs');
const map = require('map-stream');

const common = require('./common');
const {message, write} = common;

let template = '';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const boilerplatePath = join(__dirname, '../mx-template');

console.log(boilerplatePath)

function copyLog(file, cb) {
  message.success(file.path);
  cb(null, file);
}

function initComplete(app) {
  message.success(`Success! Created ${app} project complete!`);
  message.light(`begin by typing:

    cd ${app}
    npm run dev
    
    `)
  process.exit();
}

function createProject(dest, type) {
  const spinner = ora('downloading template')
  spinner.start();
  // (type === 'mobile') ? template = 'github:fangzhoui/react-webpack-template#mobile' : template = 'github:fangzhoui/react-webpack-template#antd';
  (type === 'mobile') ? template = 'direct:https://github.com/fangzhoui/react-webpack-template.git#dev' : template = 'direct:https://github.com/fangzhoui/react-webpack-template.git';
  if (fs.existsSync(boilerplatePath)) fs.emptyDirSync(boilerplatePath);
  download(template, boilerplatePath, {clone: true}, function (err) {
    spinner.stop()
    if (err) {
      console.log(err)
      process.exit()
    }

    fs
    .ensureDir(dest)
    .then(() => {
      vfs
        .src(['**/*', '!node_modules/**/*'], {
          cwd: boilerplatePath,
          cwdbase: true,
          dot: true,
        })
        .pipe(map(copyLog))
        .pipe(vfs.dest(dest))
        .on('end', function() {
          const app = basename(dest);
          // const configPath = `${dest}/config.json`;
          // const configFile = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
          // configFile.dist = `../build/${app}`;
          // configFile.title = app;
          // configFile.description = `${app}-project`;
          // write(configPath, JSON.stringify(configFile, null, 2));
          message.info('run install packages');
          require('./install')({
            success: initComplete.bind(null, app),
            cwd: dest,
          });
        })
        .resume();
    })
    .catch(err => {
      console.log(err);
      process.exit();
    });
})
}

function init({app, type}) {
  const dest = process.cwd();
  const appDir = join(dest, `./${app}`);
  if (fs.existsSync(appDir)) {
    rl.question(
      chalk.blue(`${app} dir exist! Do you want clear this dir? (Y/N)`),
      str => {
        const answer = str && str.trim().toUpperCase();
        if (answer === 'Y') {
          const spinner = ora(`remove ${app} dir`).start();
          fs
            .emptyDir(appDir)
            .then(() => {
              spinner.stop();
              createProject(appDir, type);
            })
            .catch(err => {
              console.error(err);
            });
        } else if (answer === 'N') {
          process.exit();
        }
      }
    );
  } else {
    createProject(appDir, type);
  }
}

module.exports = init;
