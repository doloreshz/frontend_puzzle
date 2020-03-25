import Mail from "./Mail";

const {ccclass, property} = cc._decorator;

@ccclass
export default class MailDetail extends cc.Component {
    protected onLoad(): void {
        this.node.getChildByName('Buttons').getChildByName('Close').on('click', this.close, this);
    }

    close() {
        this.node.destroy();
    }

    init(mail: Mail) {
        this.node.getChildByName('Title').getComponent(cc.Label).string = mail.title;
        this.node.getChildByName('Body').getComponent(cc.RichText).string = mail.body;
    }
}
