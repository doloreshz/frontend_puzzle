const http = require('http');
const url = require('url');
const router = require('./router');

//接收http请求
const server = http.createServer(function (request,response) {
    let urlParse = url.parse(request.url, true);
    let data = null;
    let mark = request.method + ' ' + urlParse.pathname;
    console.log(mark);
    //设置响应头
    response.writeHead(200, {
        //指定响应Body类型和编码
        'Content-Type': 'text/plain;charset=UTF-8',
        //允许跨域访问此服务的请求方地址
        'Access-Control-Allow-Origin': 'http://localhost:7456',
        //紧跟CORS上下文，作为预检请求OPTIONS的响应，声明允许的非简单请求
        'Access-Control-Allow-Methods': 'PUT,DELETE,CONNECT,OPTIONS,TRACE,PATCH',
        //允许的简单请求
        'Allow': 'GET,HEAD,POST'
    });
    //按请求方法相应处理
    if ('GET' == request.method) {
        data = JSON.parse(JSON.stringify(urlParse.query));//json重转，解决[Object: null prototype]
        console.log(data);
        router.route(mark, data, response);
    }else if ('OPTIONS' == request.method) {
        response.end('options请求的返回');
    }else if ('PATCH' == request.method) {
        let bodyData = '';
        request.on('data', function (chunk) {
            bodyData += chunk;
        });
        request.on('end', function () {
            console.log(bodyData);
            data = JSON.parse(bodyData);
            router.route(mark, data, response);
        })
        //response.end('{"mails":["104"]}');
    }  
    //console.log(request.method +': '+ request.url);
}).listen('4567',function () {
    console.log('服务器正在监听 4567 端口...')
}); 

