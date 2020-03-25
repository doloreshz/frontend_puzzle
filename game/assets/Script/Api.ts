import Http from "./Http";
import Model from "./Model";

export default class Api {
    public static async getMails() {
        var res = await Http.request({
            url: '/mails',
            method: 'GET'
        });

        // test data
        res = {
            mails: Model.getInstance().getMails()
        };

        return res;
    }

    public static async updateState(mailIds) {
        var res = await Http.request({
            url: '/mails',
            method: 'PATCH',
            data: {mailIds}
        });

        Model.getInstance().updateState(mailIds);

        // test data
        res = {
            mails: mailIds
        };

        return res;
    }
}