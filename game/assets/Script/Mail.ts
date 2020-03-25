export default class Mail {
    mailId: string;
    title: string;
    body: string;
    isReaded: boolean;
    receiveTime: string;

    constructor(id) {
        var strId = String(id);
        this.mailId = strId;
        this.title = 'test-title-' + strId;
        this.body = 'test-body-' + strId;
        this.isReaded = false;
        this.receiveTime = String(new Date());
    }

    init(isReaded: boolean, receiveTime: string) {
        this.isReaded = isReaded;
        this.receiveTime = receiveTime;
    }

    setIsReaded(val) {
        this.isReaded = val;
    }
}