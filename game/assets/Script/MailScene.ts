import Api from "./Api";
import Mail from "./Mail";
import MailDetail from "./MailDetail";

const {ccclass, property} = cc._decorator;

@ccclass
export default class MailScene extends cc.Component {
    @property({
        type: cc.Prefab
    })
    mailDetailPrefab: cc.Prefab = null;

    @property({
        type: cc.Prefab
    })
    mailBriefPrefab: cc.Prefab = null;

    @property({
        type: cc.Node
    })
    content: cc.Node = null;

    @property({
        type: cc.Node
    })
    markReadNode: cc.Node = null;

    @property({
        type: cc.Node
    })
    refreshNode: cc.Node = null;

    private _updateMailsListIng = false;
    private _markReadIng = false;

    private _mails: Mail[];

    onLoad() {
        this.updateMailsList();

        this.markReadNode.on('click', this.markRead, this);
        this.refreshNode.on('click', this.updateMailsList, this);
    }

    async updateMailsList() {
        if (this._updateMailsListIng) {
            return;
        }

        this._updateMailsListIng = true;

        var {mails} = await Api.getMails();

        this._mails = mails;

        (mails as Mail[]).forEach((val, index) => {
            var node = this.content.children[index];

            if (!node) {
                node = cc.instantiate(this.mailBriefPrefab);
                this.content.addChild(node);

                node.on(cc.Node.EventType.TOUCH_END, this.onClickItem, this);
            }

            var title = node.getChildByName('Title');

            title.getComponent(cc.Label).string = val.title;

            if (val.isReaded) {
                title.color = cc.Color.GRAY;
            } else {
                title.color = cc.Color.RED;
            }
        });

        this._updateMailsListIng = false;

        console.log('刷新列表');
    }

    onClickItem(e) {
        var mail = this._mails[this.content.children.indexOf(e.currentTarget)];
        this.markRead([mail.mailId]);

        var node = cc.instantiate(this.mailDetailPrefab);
        this.node.addChild(node);
        node.getComponent(MailDetail).init(mail);
    }

    public async markRead(mails?: string[]) {
        if (this._markReadIng) {
            return;
        }

        this._markReadIng = true;

        if (!Array.isArray(mails)) {
            mails = this._mails.map(function (val) {
                return val.mailId;
            });
        }

        await Api.updateState(mails);

        this._mails.forEach((val, index) => {
            if (mails.includes(val.mailId)) {
                this.content.children[index].getChildByName('Title').color = cc.Color.GRAY;
            }
        });

        this._markReadIng = false;
    }
}
