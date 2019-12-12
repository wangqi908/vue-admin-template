/* 
获取ip地址
返回文件路径用
*/
const os = require('os')
const config = require('../config/index.js');
// ip地址
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

// 带端口路径
const ipWithPort = 'http://' + getIPAddress() + ":" + config.PORT + "/"

module.exports = {
  getIPAddress,
  ipWithPort
};
