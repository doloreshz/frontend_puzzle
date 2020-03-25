import {testDatas} from "../testData/testDatas";
import MailDataManager from "../Data/MailDataManager";
import net from "../Net/net";
import {get} from "../Net/HTTPFunction";

const {ccclass, property} = cc._decorator;

//邮件的ui层,相应的一些调用网络层函数是模仿服务器回应并回调的过程
@ccclass
export default class Mail extends cc.Component {


    @property(cc.Prefab)
    nodeMailBrief: cc.Node = null;

    _buttonRefresh :cc.Node = null;
    _buttonMarkRead :cc.Node = null;
    _content:cc.Node = null;

    _mailDataMgr = null;
    _nodeContents = [];


    onLoad () {
        let buttons = this.node.getChildByName("Buttons");
        this._buttonRefresh = buttons.getChildByName("Refresh");
        this._buttonMarkRead = buttons.getChildByName("MarkRead");
        let Content = this.node.getChildByName("Content");
        this._content = Content.getChildByName("view").getChildByName("content");
        this._mailDataMgr = MailDataManager.getInstance();
    }

    start () {
        this._buttonRefresh.getComponent("clickEventComponent").onClickEventHandler(this.node,this._buttonRefresh,"Mail","onButtonRefresh");
        this._buttonMarkRead.getComponent("clickEventComponent").onClickEventHandler(this.node,this._buttonMarkRead,"Mail","onButtonMarkRead");
        this.onButtonRefresh();
    }

    //点击刷新，从服务器下拉新的邮件
    onButtonRefresh(){

        //发送请求拉新邮件
        //调用HTTPFunction中的get api
        //get(url,"",{});
        //模拟服务器回应并进行响应,该接口应该由接到服务器回应之后触发,如果使用消息派发机制则注册相应消息号并将其接口函数作为回调函数
        let _net = net.getInstance();
        _net.onResponseForMail(testDatas);
    }

    //点击标记已读，将所有未读邮件标为已读，并发送给服务器告知哪些已读
    onButtonMarkRead(){
        //获取未读邮件的id
        let mailIds = [];
        mailIds = this._mailDataMgr.getMailIdsNoRead();
        //向服务器发送请求
        //调用HTTPFunction中的patch api
        //patch(url,"",mailIds);
        //模拟服务器回应并进行响应,该接口应该由接到服务器回应之后触发,如果使用消息派发机制则注册相应消息号并将其接口函数作为回调函数
        let _net = net.getInstance();
        _net.onResponseForReaded(mailIds);
    }

    

    updateMailContent(){
        this._content.removeAllChildren();
        let mailDataList = this._mailDataMgr.getMailDataList();
        for(let mailData of mailDataList){
            let nodeMail = cc.instantiate(this.nodeMailBrief); 
            this._content.addChild(nodeMail);
            this._nodeContents.push(nodeMail);
            let nodeMailScript = nodeMail.getComponent("MailBrief");
            nodeMailScript.updateText(mailData);
        }
    }

    updateMailIsReaded(){
        let mailDataList = this._mailDataMgr.getMailDataList();
        for(let mailData of mailDataList){
            let mailId = mailData.getMailId();
            for(let nodeMail of this._nodeContents){
                let nodeMailScript = nodeMail.getComponent("MailBrief");
                if(mailId == nodeMailScript.getMailId())
                {
                    nodeMailScript.setIsReaded(mailData.getIsReaded());
                    nodeMailScript.updateTitleColor();
                }
            }
        }
    }

    

    
    
}
