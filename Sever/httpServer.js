const http = require('http');
var fs = require('fs');
//http.createServer(function(req, res) {
//    //var response = {
//    //    'info' : 'Hello world'
//   //};
//	var GetJson=readJson();
//	console.log(GetJson);
//    res.write(JSON.stringify(GetJson));
//    res.end();
//}).listen(18181);




http.createServer(function(req, res) {
        res.writeHead(200, {
            'Access-Control-Allow-Credentials': 'true',     // 后端允许发送Cookie
            'Access-Control-Allow-Origin': '*',    // 允许访问的域（协议+域名+端口）
            /* 
             * 此处设置的cookie还是domain2的而非domain1，因为后端也不能跨域写cookie(nginx反向代理可以实现)，
             * 但只要domain2中写入一次cookie认证，后面的跨域接口都能从domain2中获取cookie，从而实现所有的接口都能跨域访问
             */
            //'Set-Cookie': 'l=a123456;Path=/;Domain=www.domain2.com;HttpOnly'  // HttpOnly的作用是让js无法读取cookie
        });


	let datas;
	let APItype=0;
    req.on('data',function(data){
        //datas = JSON.parse(data)
		datas=data.toString();

    })
    req.on('end',()=>{
            // 对buffer数组阵列列表进行buffer合并返回一个Buffer
		if(datas.search("PATH: /mails METHOD: GET")>-1)
		   APItype=1;
		else if(datas.search("PATH: /mails METHOD: PATCH")>-1)
		{
		   APItype=2;
		   datas=datas.slice(datas.search("&")+1);
		}
        console.log(datas)//提取Buffer正确
        console.log("first",APItype)//提取Buffer正确

    })
 setTimeout( function(){

    console.log("second",APItype)//提取Buffer正确



	console.log("____________________________");

	if(APItype==1)
	{
		readJson();
		setTimeout( function(){
		    console.log(GetJson);
	        res.write(JSON.stringify(GetJson));
	        res.end();
		}, 30 );
	}
	else if(APItype==2)
	{
	    writeJson(JSON.parse(datas));
		setTimeout( function(){
	        res.write(datas);
	        res.end();
		}, 30 );
	}
  },30);
}).listen(18181);


function writeJson(params){
    //现将json文件读出来
    fs.readFile('./mail.json',function(err,data){
        if(err){
            return console.error(err);
        }

        var person = data.toString();//将二进制的数据转换为字符串
        person = JSON.parse(person);//将字符串转换为json对象
		for(let i=0;i<person.mails.length;++i)
		{
		    for(let j=0;j<params.mailIds.length;++j)
		    {
			    if(person.mails[i].mailId==params.mailIds[j])
				   person.mails[i].isReaded=true;
			}
		}

        var str = JSON.stringify(person);//因为nodejs的写入文件只认识字符串或者二进制数，所以把json对象转换成字符串重新写入json文件中
        fs.writeFile('./mail.json',str,function(err){
            if(err){
                console.error(err);
            }
            console.log('----------更新成功-------------');
        })
    })
};
//writeJson(params);

function readJson(){//需要不带签名的utf8
    //现将json文件读出来
    fs.readFile('./mail.json',function(err,data){
        if(err){
            return console.error(err);
        }
        var person = data.toString();//将二进制的数据转换为字符串
        person = JSON.parse(person);//将字符串转换为json对象
		GetJson=person;
		});//会有延迟，需要延迟手段
};


var GetJson=1;









/*

var ws = require('nodejs-websocket');
var server = ws.createServer(function (conn) {
    //处理消息
    conn.on('text', function (str) {
        conn.sendText('from server..');
    })
 
    conn.on("close", function (code, reason) {
        console.log("关闭连接");
    })
    conn.on("error", function (code, reason) {
        console.log("异常关闭");
    });
}).listen(8183);
*/