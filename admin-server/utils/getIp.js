const os = require('os')
const config = require('../config/index.js');
const getIPAddress = () => {
  let interfaces = os.networkInterfaces();
  for (let devName in interfaces) {
    let iface = interfaces[devName];
    for (let i = 0; i < iface.length; i++) {
      let alias = iface[i];
      if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
        return alias.address;
      }
    }
  }
}
const ipWithPort = getIPAddress() + ":" + config.PORT + "/"

exports.getIPAddress = getIPAddress;
exports.ipWithPort = ipWithPort;
