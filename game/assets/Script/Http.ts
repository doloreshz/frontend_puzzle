export default class Http {
    public static request(config) {
        return new Promise(function (resolve, reject) {
            setTimeout(resolve, 100);
        });
    }
}
