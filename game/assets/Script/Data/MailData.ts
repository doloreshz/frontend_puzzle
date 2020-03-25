

//单封邮件数据管理
export default class MailData {

    mailId:number= null;
    title:string = null;
    body:string = null;
    receiveTime:string = null;
    isReaded:boolean = null;

    constructor(mailData){
        this.mailId = parseInt(mailData["mailId"]);
        this.title = mailData["title"];
        this.body = mailData["body"];
        this.receiveTime = mailData["receiveTime"];
        this.isReaded = mailData["isReaded"];
    }


    setIsReaded(isReaded){ this.isReaded = isReaded; }

    getMailId(){ return this.mailId;}
    getTitle(){ return this.title;}
    getBody(){ return this.body;}
    getReceiveTime(){ return this.receiveTime;}
    getIsReaded(){ return this.isReaded;}



    
}
