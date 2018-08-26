var assert = require('assert');
var crypto = require('crypto');
var program = require('commander');
var path = require('path');
var fs = require('fs');
var async = require('async');
var Logger = require('./logger');
var init = require('./init');


function main() {
  process.stdin.resume();

  var version = '1.0.0';
  program
    .version(version)
    .option('-d, --debug <level>', 'debug log level')
    .parse(process.argv);

  var baseDir = program.base || './';

  var pidFile = path.join(baseDir, 'nasgo.pid');
  if (fs.existsSync(pidFile)) {
    console.log('Failed: nasgo server already started');
    return;
  }

  var appConfigFile = path.join(baseDir, 'config.json');
  if (program.config) {
    appConfigFile = path.resolve(process.cwd(), program.config);
  }
  var appConfig = JSON.parse(fs.readFileSync(appConfigFile, 'utf8'));

  if (!appConfig.dapp.masterpassword) {
    var randomstring = require("randomstring");
    appConfig.dapp.masterpassword = randomstring.generate({
      length: 12,
      readable: true,
      charset: 'alphanumeric'
    });
    fs.writeFileSync(appConfigFile, JSON.stringify(appConfig, null, 2), "utf8");
  }

  appConfig.version = version;
  appConfig.baseDir = baseDir;
  appConfig.buildVersion = 'development';
  appConfig.netVersion = 'mainnet';
  appConfig.publicDir = path.join(baseDir, 'frontend', 'ui');
  appConfig.dappsDir = program.dapps || path.join(baseDir, 'dapps')

  global.Config = appConfig;
  var genesisblockFile = path.join(__dirname, 'helpers/genesis/genesisBlock.json');
    if (program.genesisblock) {
      genesisblockFile = path.resolve(process.cwd(), 'genesisBlock.json');
    }
  var genesisblock = JSON.parse(fs.readFileSync(genesisblockFile, 'utf8'));

  if (program.port) {
    appConfig.port = program.port;
  }

  if (program.address) {
    appConfig.address = program.address;
  }

  if (program.peers) {
    if (typeof program.peers === 'string') {
      appConfig.peers.list = program.peers.split(',').map(function (peer) {
        peer = peer.split(":");
        return {
          ip: peer.shift(),
          port: peer.shift() || appConfig.port
        };
      });
    } else {
      appConfig.peers.list = [];
    }
  }

  if (appConfig.netVersion === 'mainnet') {
    var seeds = [
        793464786,
        791964199,
        793451086
    ];
    var ip = require('ip');
    for (var i = 0; i < seeds.length; ++i) {
      appConfig.peers.list.push({ ip: ip.fromLong(seeds[i]), port: 9040 });
    }
  }

  if (program.log) {
    appConfig.logLevel = program.log;
  }

  var protoFile = path.join(baseDir, 'helpers/protocol', 'trans.proto');
  if (!fs.existsSync(protoFile)) {
    console.log('Failed: proto file not exists!');
    return;
  }

  if (program.daemon) {
    console.log('NASGO server started as daemon ...');
    require('daemon')({cwd: process.cwd()});
    fs.writeFileSync(pidFile, process.pid, 'utf8');
  }

  var logger = new Logger({
    filename: path.join(baseDir, 'logs', 'debug.log'),
    echo: program.deamon ? null : appConfig.logLevel,
    errorLevel: appConfig.logLevel
  });

  var options = {
    dbFile: program.blockchain || path.join(baseDir, 'blockchain.db'),
    appConfig: appConfig,
    genesisblock: genesisblock,
    logger: logger,
    protoFile: protoFile
  };

  if (program.reindex) {
    appConfig.loading.verifyOnLoading = true;
  }

  global.featureSwitch = {}
  global.state = {}

  init(options, function (err, scope) {
    if (err) {
      scope.logger.fatal(err);
      if (fs.existsSync(pidFile)) {
        fs.unlinkSync(pidFile);
      }
      process.exit(1);
      return;
    }


    scope.bus.message('bind', scope.modules);
    global.modules = scope.modules

    scope.logger.info('Modules ready and launched');
    if (!scope.config.publicIp) {
      scope.logger.warn('Failed to get public ip, block forging may not work!');
    }

    process.once('cleanup', function () {
      console.log('cleanup')
      scope.logger.info('Cleaning up...');
      async.eachSeries(scope.modules, function (module, cb) {
        if (typeof (module.cleanup) == 'function') {
          module.cleanup(cb);
        } else {
          setImmediate(cb);
        }
      }, function (err) {
        if (err) {
          scope.logger.error('Error while cleaning up', err);
        } else {
          scope.logger.info('Cleaned up successfully');
        }
        scope.dbLite.close();
        if (fs.existsSync(pidFile)) {
          fs.unlinkSync(pidFile);
        }
        process.exit(1);
      });
    });

    process.once('SIGTERM', function () {
      process.emit('cleanup');
    })

    process.once('exit', function () {
      scope.logger.info('process exited');
    });

    process.once('SIGINT', function () {
      process.emit('cleanup');
    });

    process.on('uncaughtException', function (err) {
      // handle the error safely
      scope.logger.fatal('uncaughtException', { message: err.message, stack: err.stack });
      process.emit('cleanup');
    });

    if (typeof gc !== 'undefined') {
      setInterval(function () {
        gc();
      }, 60000);
    }
  });
}

main();
