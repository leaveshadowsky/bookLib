// 获取图书列表接口

// 定义一个mysql实例
const {
  mysql
} = require('../qcloud')

// 类似koa2的中间件
module.exports = async (ctx) => {
    const books = await mysql('books').select('*')
  // 如果成功查询到books列表，将数据返回
    ctx.state.data = {
      list: books
  }
}
