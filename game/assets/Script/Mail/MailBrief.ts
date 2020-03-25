import net from "../Net/net";


const {ccclass, property} = cc._decorator;

//单个邮件条例的ui层
@ccclass
export default class MailBrief extends cc.Component {

    
    nodeCanvas: cc.Node = null;
    _nodeTitle:cc.Node = null;
    

    // LIFE-CYCLE CALLBACKS:
    _mailId:number = null;
    _title:string = null;
    _isReaded:boolean = false;

    onLoad () {
        this._nodeTitle = this.node.getChildByName("Title");
        
        // this.nodeCanvas = cc.find("Canvas");
    }

    start () {
        

    }

    //根据mailId进行选择数据显示
    onMailNode(){
        let self = this;
        cc.loader.loadRes("Prefabs/MailDetail", function (err, prefab) {
            let nodeItem = cc.instantiate(prefab);
            cc.director.getScene().addChild(nodeItem);
            let nodeMailScript = nodeItem.getComponent("MailDetail");
            nodeMailScript.updateText(self._mailId);
        });


        let mailIds = [this._mailId];
        //发送消息给服务器标记已读
        //调用HTTPFunction中的patch api
        //patch(url,"",mailIds);
        //模拟服务器回应并进行响应,该接口应该由接到服务器回应之后触发,如果使用消息派发机制则注册相应消息号并将其接口函数作为回调函数
        let _net = net.getInstance();
        _net.onResponseForReaded(mailIds);

        
    }
    

    updateText(mailData){
        this._mailId = mailData.getMailId();
        this._title = mailData.getTitle();
        this._isReaded = mailData.getIsReaded();
        this.updateTitleColor();
        this._nodeTitle.getComponent(cc.Label).string = this._title;
    }

    updateTitleColor(){
        if(this._isReaded){
            this._nodeTitle.color = cc.Color.GRAY;
        }else{
            this._nodeTitle.color = cc.Color.RED;
        }
    }

    setIsReaded(isReaded){
        this._isReaded = isReaded;
    }

    getMailId(){ return this._mailId; }
}
