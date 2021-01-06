/**
 * author: Ljj
 * description: 分环境打包配置
 * @createTime: 2020-8-4 12:01:06
 */

(function() {
  const NODE_ENV = 'prod' // prod:生产环境 | test180:180环境...
  let ENV_VAR = null

  if (process.env.NODE_ENV === 'development') { // 本地运行
    ENV_VAR = require('./dev.js')
  } else if (process.env.NODE_ENV === 'production') { // 打包
    if (NODE_ENV === 'prod') {
      ENV_VAR = require('./prod.js')
    } else if (NODE_ENV === 'test180') {
      ENV_VAR = require('./180.js')
    } else if (NODE_ENV === 'test190') {
      ENV_VAR = require('./190.js')
    }
  }

  if (ENV_VAR) {
    process.uniEnv = {}
    for (const key in ENV_VAR) {
      process.uniEnv[key] = ENV_VAR[key]
    }
  }
})()
