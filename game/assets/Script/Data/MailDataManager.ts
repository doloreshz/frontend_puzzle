import MailData from "./MailData";


//邮件数据管理器,统一管理邮件数据,对邮件数据进行修改调用该模块相关函数
export default class MailDataManager  {
    
    _mailDataList = [];
    private static _instance = new MailDataManager()

    constructor(){
        
    }

    public static getInstance(){
		return this._instance;
	}

    //清空数组
    clearList(){
        if(this._mailDataList.length > 0){
            this._mailDataList.splice(0,this._mailDataList.length);
        }
    }

    initDatas(mailDatas){
        this.clearList();
        for(let i = 0; i<mailDatas.length;i++){
            let mailData = new MailData(mailDatas[i]);
            this._mailDataList.push(mailData);
        }
    }


    getMailDataById(mailId){
        for(let i = 0; i < this._mailDataList.length;i ++){
            let mailData = this._mailDataList[i];
            if(mailId == mailData.getMailId()){
                return mailData;
            }
        }
    }

    updateMailIsReaded(mailIdList){
        for(let mailId of mailIdList){
            for(let mailData of this._mailDataList){
                if(parseInt(mailId) == mailData.getMailId()){
                    mailData.setIsReaded(true);
                }
            }

        }
    }


    getMailIdsNoRead(){
        let mailIds = [];
        for(let mailData of this._mailDataList){
            if(!mailData.getIsReaded()){
                mailIds.push(mailData.getMailId());
            }
        }
        return mailIds;
    }


    getMailDataList(){ return this._mailDataList; }
}


