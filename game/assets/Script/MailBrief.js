
cc.Class({
    extends: cc.Component,

    properties: {
        prefabMailDetail: cc.Prefab,
        nodeTitle: cc.Node
    },

    btnMailBriefCallBack: function () {
        //记录当前作用域that
        let that = this;
        let Canvas = cc.find('Canvas');
        let MailScene = Canvas.getComponent('MailScene');

        //实例化邮件详情
        let nodeMailDetail = cc.instantiate(that.prefabMailDetail);
        nodeMailDetail.parent = Canvas;

        //获取邮件详情title和body对应node
        let nodeMailTitle = nodeMailDetail.getChildByName('Title');
        let nodeMailBody = nodeMailDetail.getChildByName('Body');
        //获取对应邮件信息
        let mail = MailScene.mails[that.node.index];
        //console.log(MailScene.mails);
        //刷新邮件详情
        nodeMailTitle.getComponent(cc.Label).string = mail.title;
        nodeMailBody.getComponent(cc.RichText).string = mail.body;

        //更新邮件状态
        if (MailScene.unreadTitles[mail.mailId]) {
            let options = {
                method: 'PATCH',
                route: '/mails',
                data: {mailIds: [mail.mailId]},
                async: true,
                success: function (rspJson) {
                    //console.log(rspJson);
                    let readId = JSON.parse(rspJson).mails[0];
                    //将点开的邮件标题设为灰色
                    if (readId == that.nodeTitle.mailId) {
                        that.nodeTitle.color = new cc.color(200, 200, 200);
                    }
                    //从未读邮件记录对象中删除对应未读记录
                    delete MailScene.unreadTitles[mail.mailId];
                }
            }
            MailScene.httpRequest(options);
        }
        
    },

    onLoad () {
        //给节点添加对应邮件索引属性，用于从服务器返回的邮件数据中取得对应邮件数据
        this.node.index = 0;
        //给标题节点添加对应邮件id属性，用于根据服务器返回的成功标记已读的邮件id更新邮件标题颜色
        this.nodeTitle.mailId = '';
    },

    //start () {},

    //update (dt) {},
	
	//lateUpdate (dt) {},
	
	//onEnable () {},
	
	//onDisable () {},
	
	//onDestroy () {}
});
