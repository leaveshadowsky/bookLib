// 新增图书的路由
// 1、查询豆瓣api中的信息
// 2、然后入库
const https = require('https')
// 获取当前环境的mysql实例
const {
  mysql
} = require('../qcloud')
module.exports = async (ctx) => {
  // post请求都在request.body字段内部，从中获取isbn
    const {
    isbn
  } = ctx.request.body
  // 如果可以获取到isbn，则开始调用api
    if (isbn) {
    // 当添加图书时判断图书是否已经存在
      const findRes = await mysql('books').select().where('isbn', isbn)
      if (findRes.length) {
        ctx.state = {
          code: -1,
          data: {
            msg: '图书已存在'
        }
      }
        return
    }
      let url = 'https://api.douban.com/v2/book/isbn/' + isbn
      const bookinfo = await getJSON(url)
      const rate = bookinfo.rating.average
      const {
      title,
      image,
      alt,
      publisher,
      summary,
      price,
      author
    } = bookinfo
      const tags = bookinfo.tags.map(v => {
        return `${v.title}${v.count}`
    }).join(',')
    // 使用mysql实例将获取的数据入库,并做异常处理
      try {
        await mysql('books').insert({
          isbn,
          rate,
          title,
          image,
          alt,
          publisher,
          summary,
          price,
          tags,
          author
      })
      // 若成功，则将结果返回
        ctx.state.data = {
          title,
          msg: '添加success'
      }
    } catch (error) {
        console.log('fail')
        ctx.state = {
          code: -1,
          data: {
            msg: '新增失败' + error
        }

      }
    }
      console.log({
        rate,
        title,
        image,
        alt,
        publisher,
        summary,
        price,
        tags
    })
  }
}

// 将所获得的信息下载成json格式
function getJSON (url) {
    return new Promise((resolve, reject) => {
      https.get(url, res => {
        let urlData = ''
        res.on('data', data => {
          urlData += data
      })
        res.on('end', data => {
          const bookinfo = JSON.parse(urlData)
          if (bookinfo.title) {
            resolve(bookinfo)
        }
          reject(bookinfo)
      })
    })
  })
}
