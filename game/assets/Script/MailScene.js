
cc.Class({
    extends: cc.Component,

    properties: {
        prefabMailBrief: cc.Prefab,
        contentMail: cc.Node
    },

    onLoad () {
        //服务器地址
        this.serverAdress = 'http://3065i19n10.zicp.vip:4567';//花生壳域名
        //邮件数组，用于记录服务器返回的邮件数据
        this.mails = [];
        //未读邮件标题节点记录对象，key为邮件id，value为对应Title节点
        this.unreadTitles = {};

        //邮件界面打开时自动获取邮件
        this.getMails(5);
    },
    
    //刷新按钮回调
    btnRefreshCallBack: function () {
        this.getMails(5);
    },

    //标记已读按钮回调
    btnMarkReadCallBack: function () {
        //记录当前作用域this
        let that = this;

        //未读邮件id数组
        let unreadIds = [];
        for (const key in that.unreadTitles) {
            if (that.unreadTitles.hasOwnProperty(key)) {
                unreadIds.push(key);
            }
        }
        //请求更新所有未读邮件状态为已读
        if (unreadIds[0]) {
            let options = {
                method: 'PATCH',
                route: '/mails',
                data: {mailIds: unreadIds},
                async: true,
                success: function (rspJson) {
                    //console.log(rspJson);
                    let readIds = JSON.parse(rspJson).mails;
                    //更新邮件标题颜色
                    for (let index = 0; index < readIds.length; index++) {
                        that.unreadTitles[readIds[index]].color = new cc.color(200, 200, 200);
                        //从未读邮件记录对象中删除对应未读记录
                        delete that.unreadTitles[readIds[index]];
                    }
                }
            }
            that.httpRequest(options);
        }
        
    },

    //参数 邮件数量限制limit:number; 返回 邮件数据json对象：object 
    getMails: function (limit) {//获取一定数量邮件并刷新邮件列表。测试服务器目前未根据这个值做处理
        //记录当前作用域this
        let that = this;

        //设置http请求
        let options = {
            method: 'GET',
            route: '/mails',
            data: {limit: limit},
            async: true,
            success: function (rspJson) {
                //console.log(rspJson);
                //新邮件索引位置
                let index = that.mails.length;
                //将获取的邮件添加到邮件数组
                that.mails = that.mails.concat(JSON.parse(rspJson).mails);
                for (; index < that.mails.length; index++) {
                    let mail = that.mails[index];
                    //实例化出邮件标题node到容器
                    let nodeMailBrief = cc.instantiate(that.prefabMailBrief);
                    nodeMailBrief.parent = that.contentMail;
                    //记录邮件索引到MailBrief节点
                    nodeMailBrief.index = index; 

                    //设置邮件标题
                    let nodeTitle = nodeMailBrief.getChildByName('Title'); 
                    nodeTitle.getComponent(cc.Label).string = mail.title;
                    //记录邮件id到Title节点
                    nodeTitle.mailId = mail.mailId;

                    //根据是否已读设置字体颜色，并将未读的置入记录对象
                    if ('false' == mail.isReaded) {
                        nodeTitle.color = new cc.color(255, 20, 20);
                        that.unreadTitles[nodeTitle.mailId] = nodeTitle;
                    }else {
                        nodeTitle.color = new cc.color(200, 200, 200);
                    }
                }
            }
        }
        //执行http请求
        that.httpRequest(options);
    },

    //参数 options:{method:string, route:string, data:object, async:boolean, success:function}
    httpRequest: function (options) {//http请求封装
        let req = new XMLHttpRequest();
        let paramsQuery = transData(options.data);
        let paramsBody = JSON.stringify(options.data);
        let url = this.serverAdress + options.route;
        console.log(`${options.method} ${options.route}`);
        if ('GET' == options.method) {
            req.open(options.method, url + '?' + paramsQuery, options.async);
            req.send(null);
        }else {
            req.open(options.method, url, options.async);
            req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            req.send(paramsBody);
        }
        req.onreadystatechange = function () {
            if (req.readyState == 4 && req.status == 200) {
                options.success(req.responseText);
            }
        }
        //参数 data:object; 返回 url格式参数：string
        function transData(data) {//obejct数据转query形式
            let arr = [];
            for (const key in data) {
                if (data.hasOwnProperty(key)) {
                    arr.push(key + '=' + data[key]);                        
                }
            }
            return arr.join('&');
        }
    },
    
});
