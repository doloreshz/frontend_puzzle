import Mail from "./Mail";

const KEY = 'test-data';
export default class Model {
    private static _instance: Model;

    public static getInstance() {
        if (!Model._instance) {
            Model._instance = new Model();
        }
        return Model._instance;
    }

    private _model: Mail[] = [];

    constructor() {
        var data: any = localStorage.getItem(KEY);

        try {
            data = JSON.parse(data);
        } catch (e) {
            data = null;
        }

        var array: Mail[] = new Array(100).fill(1).map(function (val, index) {
            return new Mail(index);
        });

        if (data) {
            array.forEach(function (val, index) {
                val.init(data[index].isReaded, data[index].receiveTime);
            });
        }

        this._model = array;

        this.save();
    }

    public getMails() {
        return this._model;
    }

    public updateState(mailIds: string[]) {
        this._model.forEach(function (val) {
            if (mailIds.includes(val.mailId)) {
                val.setIsReaded(true);
            }
        });
        this.save();
    }

    public save() {
        localStorage.setItem(KEY, JSON.stringify(this._model));
    }
}
