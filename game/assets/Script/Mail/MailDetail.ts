import MailDataManager from "../Data/MailDataManager";

const {ccclass, property} = cc._decorator;

//邮件详情ui层
@ccclass
export default class MailDetails extends cc.Component {

    

  //资源节点
    buttons:cc.Node = null;
    _nodeTitle:cc.Node = null;
    _nodeBody:cc.Node = null;

    _nodeClose:cc.Node = null;
   



    onLoad () {
        this.buttons = this.node.getChildByName("Buttons");
        this._nodeTitle = this.node.getChildByName("Title");
        this._nodeBody = this.node.getChildByName("Body");
        this._nodeClose = this.buttons.getChildByName("Close");
    }

    start () {
        this._nodeClose.getComponent("clickEventComponent").onClickEventHandler(this.node,this._nodeClose,"MailDetail","onButtonClose");
    }

    onButtonClose(){
        this.node.destroy();
    }

    updateText(mailId){
        let mailDataManager = MailDataManager.getInstance();
        let mailData = mailDataManager.getMailDataById(mailId);
        let title = mailData.getTitle();
        let body = mailData.getBody();
        let receiveTime = mailData.getReceiveTime();

        this._nodeTitle.getComponent(cc.Label).string = title;
        this._nodeBody.getComponent(cc.RichText).string = body;
        
    }
}
