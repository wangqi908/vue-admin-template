const config = require('../config/index.js');
const AccessSchema = require('../db/models').AccessSchema
const https = require('https');
const qs = require('querystring');

// 封装请求百度access方法
const accessReq = () => {
  const { grant_type, client_id, client_secret, bdHostname, accessPath, agent } = config
  const param = qs.stringify({
    grant_type,
    client_id,
    client_secret
  });

  const option = {
    hostname: bdHostname,
    path: accessPath + param,
    agent
  }

  return new Promise((resolve, reject) => {
    https.get(option, myRes => {
      let str = "";
      myRes.on("data", function (chunk) {
        str += chunk;//监听数据响应，拼接数据片段
      })
      myRes.on("end", function () {
        let { expires_in, access_token, refresh_token, session_key } = JSON.parse(str.toString())
        resolve({ expires_in, access_token, refresh_token, session_key })
      })
    });
  })
}

/* 
封装操作百度access 
数据库没有access,发送请求并写入,并返回
数据库有access,对比时间
如果过期,从新请求并更新,再返回
没过期,直接返回
*/
const getAccess = () => {
  return new Promise((resolve, reject) => {
    const { grant_type, client_id, client_secret } = config
    if (!grant_type || !client_id || !client_secret) {
      // res.send({ code: 0, data: { msg: '缺少参数' } })
      resolve({ code: 0, data: { msg: '缺少参数' } })
      return
    }

    AccessSchema.find((err, accessList) => {
      if (accessList.length === 0) {
        // console.log('数据库没有access');
        // 数据库没有access,发送请求并写入
        accessReq().then(data => {
          new AccessSchema(data).save((err, access) => {
            // res.send({ code: 200, data: access })
            resolve(access)
          })
        })
      } else {
        // console.log('数据库有access');
        // 数据库有access,对比时间
        let accessObj = accessList[0]
        let accessTime = accessObj.createTime * 1 + accessObj.expires_in * 1000 //expires_in为秒,需要转成毫秒
        let nowTime = +new Date()
        let isExpired = nowTime > accessTime //access过期
        if (isExpired === true) {
          // 如果过期,从新请求并更新
          // console.log('如果过期,从新请求并更新');
          accessReq().then(data => {
            let { expires_in, access_token, refresh_token, session_key } = data
            let newData = { expires_in, access_token, refresh_token, session_key, updateTime: +new Date() }
            AccessSchema.findByIdAndUpdate(accessObj._id, newData, function (err, ret) {
              if (err) {
                // console.log('更新失败')
                // res.send({ code: 0, msg: '更新失败' })
                resolve({ msg: "更新失败", err })
              } else {
                resolve(newData)
                // res.send({ code: 200, data: newData })
              }
            })
          })

        } else {
          // 没过期,直接返回
          // console.log('没过期,直接返回');
          // res.send({ code: 200, data: accessObj })
          resolve(accessObj)
        }
      }
    })
  })
}

// 调用百度文字识别接口
const ocrReq = (image = "") => {
  return new Promise(async (resolve, reject) => {
    const accessRes = await getAccess()
    let post_data = {
      access_token: accessRes.access_token,
      image,
    };//这是需要提交的数据 
    let content = qs.stringify(post_data);
    const { bdHostname, generalPath } = config
    let options = {
      hostname: bdHostname,
      path: generalPath,
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      }
    };

    let req = https.request(options, res => {
      res.setEncoding('utf8');
      res.on('data', chunk => {
        // console.log(chunk)
        // let res = JSON.parse(chunk)
        resolve(chunk)
      });
    });

    req.on('error', err => {
      // console.log('problem with request: ' + e.message);
      reject(err)
    });

    // 将数据写入请求体
    req.write(content);//注意这个地方  

    req.end();

  })
}

module.exports = {
  ocrReq
};
