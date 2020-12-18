// 功能入口文件
module.exports = (type, params) => {
  require(`./${type}.js`)(...params)
}