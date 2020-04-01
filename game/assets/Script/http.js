module.exports = {
    GETMAILS: function(obj) {
        var httpRequest = new XMLHttpRequest();
        var time = 5*1000;
        var timeout = false;

        // 超时设置
        var timer = setTimeout(function(){
            timeout = true;
            httpRequest.abort();
        }, time);

        var url = obj.url;

        // 组织请求参数
        if (typeof obj.data == 'object') {
            console.info('obj.data=' + JSON.stringify(obj.data));
            var kvs = []
            for (var k in obj.data) {
               kvs.push(encodeURIComponent(k) + '=' + encodeURIComponent(obj.data[k]));
            }
            url += '?';
            url += kvs.join('&');
        }

        httpRequest.open(obj.method?obj.method:'GET', url, true);
        
        httpRequest.setRequestHeader("Content-type", "text/plain");//设置请求头 注：post方式必须设置请求头（在建立连接后设置请求头）var obj = { name: 'zhansgan', age: 18 };

        httpRequest.send("PATH: /mails METHOD: GET");//发送请求 将json写入send中

        httpRequest.onreadystatechange = function () {
            var response = httpRequest.responseText;
            console.info('http url cb:' +  url + ' readyState:' + httpRequest.readyState + ' status:' + httpRequest.status);
            clearTimeout(timer);

            if (httpRequest.readyState == 4) {
                console.info('http success:' + url + ' resp:' + response);
                var resJson = JSON.parse(response);
                if (typeof obj.success == 'function') {
                obj.success(resJson);
                }
            } else {
                console.info('http fail:' + url);
                if (typeof obj.fail == 'function') {
                    obj.fail(response);
                }
            }
        };
    },


    PATCHMAILS: function(obj) {
        var httpRequest = new XMLHttpRequest();
        var time = 5*1000;
        var timeout = false;

        // 超时设置
        var timer = setTimeout(function(){
            timeout = true;
            httpRequest.abort();
        }, time);

        var url = obj.url;

        // 组织请求参数
        if (typeof obj.data == 'object') {
            console.info('obj.data=' + JSON.stringify(obj.data));
            var kvs = []
            for (var k in obj.data) {
               kvs.push(encodeURIComponent(k) + '=' + encodeURIComponent(obj.data[k]));
            }
            url += '?';
            url += kvs.join('&');
        }

        httpRequest.open(obj.method?obj.method:'GET', url, true);
        //json头格式浏览器会出错 用text/plain
        httpRequest.setRequestHeader("Content-type", "text/plain");//设置请求头 注：post方式必须设置请求头（在建立连接后设置请求头）var obj = { name: 'zhansgan', age: 18 };

        httpRequest.send("PATH: /mails METHOD: PATCH"+"&"+JSON.stringify(obj.jsonData));//发送请求 将json写入send中


        httpRequest.onreadystatechange = function () {
            var response = httpRequest.responseText;
            console.info('http url cb:' +  url + ' readyState:' + httpRequest.readyState + ' status:' + httpRequest.status);
            clearTimeout(timer);

            if (httpRequest.readyState == 4) {
                console.info('http success:' + url + ' resp:' + response);
                var resJson = JSON.parse(response);
                if (typeof obj.success == 'function') {
                obj.success(resJson);
                }
            } else {
                console.info('http fail:' + url);
                if (typeof obj.fail == 'function') {
                    obj.fail(response);
                }
            }
        };
    }

}

/*
    request: function(obj) {
        var httpRequest = new XMLHttpRequest();
        var time = 5*1000;
        var timeout = false;

        // 超时设置
        var timer = setTimeout(function(){
            timeout = true;
            httpRequest.abort();
        }, time);

        var url = obj.url;

        // 组织请求参数
        if (typeof obj.data == 'object') {
            console.info('obj.data=' + JSON.stringify(obj.data));
            var kvs = []
            for (var k in obj.data) {
               kvs.push(encodeURIComponent(k) + '=' + encodeURIComponent(obj.data[k]));
            }
            url += '?';
            url += kvs.join('&');
        }

        httpRequest.open(obj.method?obj.method:'GET', url, true);
        
        httpRequest.send();

        httpRequest.onreadystatechange = function () {
            var response = httpRequest.responseText;
            console.info('http url cb:' +  url + ' readyState:' + httpRequest.readyState + ' status:' + httpRequest.status);
            clearTimeout(timer);

            if (httpRequest.readyState == 4) {
                console.info('http success:' + url + ' resp:' + response);
                var resJson = JSON.parse(response);
                if (typeof obj.success == 'function') {
                obj.success(resJson);
                }
            } else {
                console.info('http fail:' + url);
                if (typeof obj.fail == 'function') {
                    obj.fail(response);
                }
            }
        };
    },
*/