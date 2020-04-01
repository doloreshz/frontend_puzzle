var http = require('http');


cc.Class({
    extends: cc.Component,

    properties: {
	   mailPrefab:{
	   	   default:null,
	       type:cc.Prefab,
	   },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
	   this.mails=[];

	   this.BeTouch={"mailIds": [" "]};

	   this.BePatch=[];


	},

    start () {

    },

	timeToDoing:function()
	{
	   	   var Sum=this.mails.length;
	       cc.log("123123123123123",Sum);

	       for(let i=0;i<Sum;++i)
	       {
	           let newPrefab =	cc.instantiate(this.mailPrefab);
	           newPrefab.parent=this.node.getChildByName("view").getChildByName("content");
	           newPrefab.setPosition(cc.v2(0, 0));
			   newPrefab.getChildByName("Title").getComponent(cc.Label).string=this.mails[i].mailId+" "+this.mails[i].title;
			   newPrefab.getComponent("MailBeTouch").titleThis=this.mails[i].mailId+" "+this.mails[i].title;
			   newPrefab.getComponent("MailBeTouch").bodyThis=this.mails[i].receiveTime+"\n"+this.mails[i].body;
			   newPrefab.getComponent("MailBeTouch").mailIdThis=this.mails[i].mailId;

	       }
	
	},

	getPATH:function()
	{
	   this.GetMails();//需要延迟处理
	   this.scheduleOnce(function() {
	       this.timeToDoing();
       }, 0.15);

	
	},

	patchPATH:function()
	{
	   this.PatchMails();//需要延迟处理
	
	},

	patchAllPATH:function()
	{
	   let childCount = this.node.getChildByName("view").getChildByName("content").childrenCount;
	   for(let i=0;i<childCount;++i)
	   {
	       this.node.getChildByName("view").getChildByName("content").children[i].getComponent("MailBeTouch").ChangeWhite();
	   }


	   var sum=this.mails.length;
	   var AllMails={"mailIds": []};
	   for(let i=0;i<sum;++i)
	   {
	       AllMails.mailIds.push((i+1).toString());
	   }
	   this.PatchAllMails(AllMails);//需要延迟处理

	
	},


	GetMails: function() {//接收请求
         var obj = {
            'url' : 'http://127.0.0.1:18181/',
			'method':'POST',
            'success' : function(jsonData) {
               //this.responstData.getComponent(cc.Label).string = jsonData['type'];
			   this.mails=jsonData['mails'];

            }.bind(this),
		 };
         http.GETMAILS(obj);
    },

	PatchMails: function() {//发送请求
         var obj = {
            'url' : 'http://127.0.0.1:18181/',
			'method':'POST',
			'jsonData':{"mailIds": []},
            'success' : function(jsonData) {
               //this.responstData.getComponent(cc.Label).string = jsonData['type'];
			   this.BePatch=jsonData['mailIds'];

            }.bind(this),
		 };
		 obj.jsonData=this.BeTouch;
         http.PATCHMAILS(obj);
    },

	PatchAllMails: function(AllMails) {//发送请求
         var obj = {
            'url' : 'http://127.0.0.1:18181/',
			'method':'POST',
			'jsonData':{"mailIds": []},
            'success' : function(jsonData) {
               //this.responstData.getComponent(cc.Label).string = jsonData['type'];
			   this.BePatch=jsonData['mailIds'];

            }.bind(this),
		 };
		 obj.jsonData=AllMails;
         http.PATCHMAILS(obj);
    },


    // update (dt) {},
});
