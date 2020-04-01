// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {



    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
	   this.RealMail=this.node.parent.parent.parent.getChildByName("MailDetail");
	   this.titleThis="";
	   this.bodyThis="";
	   this.mailIdThis="";
	},

    start () {

    },

	ChangeWhite:function()
	{
	   this.node.getChildByName("Title").color=cc.color(255,255,255,255);
	   this.node.parent.parent.parent.getComponent("GetPatchButton").BeTouch.mailIds[0]=this.mailIdThis;
	},

	//this.node.parent.parent.getComponent("GetPatchButton").mails
	CreatRealMail:function()
	{	    
	   this.RealMail.active=true;
	   this.ChangeWhite();
	   this.RealMail.getChildByName("Title").getComponent(cc.Label).string=this.titleThis;
	   this.RealMail.getChildByName("Body").getComponent(cc.RichText).string=this.bodyThis;
	   this.node.parent.parent.parent.getComponent("GetPatchButton").patchPATH();
	},

    // update (dt) {},
});
