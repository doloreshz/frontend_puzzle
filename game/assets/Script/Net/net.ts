import MailDataManager from "../Data/MailDataManager";

//网络层,管理响应服务器回应和推送等
export default class net {
    private static _instance = new net()

    _mailDataMgr = null;

    constructor(){
        this._mailDataMgr = MailDataManager.getInstance();
    }

    public static getInstance(){
		return this._instance;
    }
    
   //响应服务器回应的回调函数
   onResponseForMail(testDatas){
        this._mailDataMgr.initDatas(testDatas);
        cc.find("Canvas").getComponent("Mail").updateMailContent();
    }

    //响应服务器回应的回调函数
    onResponseForReaded(testIds){
        this._mailDataMgr.updateMailIsReaded(testIds);
        cc.find("Canvas").getComponent("Mail").updateMailIsReaded();
    }

    
}
