//POST请求
const https = require('http')
const fs = require('fs')

// 对GitBook传过来的路径信息进行截取
var pathstr = process.argv.splice(2)[0];
// console.log(pathstr)

var data;
try{
    data = fs.readFileSync(pathstr)
    //console.log('读取图片成功: '+ data.length)
}catch(err){
    // console.log('读取图片失败')
    return
}

// 配置请求信息
const options = {
    hostname: '121.40.16.97',
    port: 8081,
    path: '/gburlimg',
    method: 'POST',
    headers: {
        'Content-Type': 'application/octet-stream',
        'Content-Length': data.length
    }
}

// 发起请求
var req = https.request(options, res => {
	// 接受服务器返回信息
    //console.log(`状态码：${res.statusCode}`)
    res.on('data', d => {
        process.stdout.write(d)
    })
})

req.on('error', error => {
    console.log(error)
})
// req.on('finish',()=>{
//     console.log('upload finish')
// })

// 将图片转换为流发送给服务器
req.write(data)
req.end()