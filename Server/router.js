const Drs = require('./dataRS');

module.exports = {
    route: route
}

function route(path, data, response) {
    switch (path) {
        case 'GET /favicon.ico':
            response.end();
            break;
        case 'GET /test':
            response.end('成功连接！');
            break;  
        case 'GET /mails':
            let mails = getMails(data.limit);
            response.end(mails);
            break;
        case 'PATCH /mails':
            let readIds = patchMails(data.mailIds);
            response.end(readIds);
            break;           
        default:
            response.end();
            break;
    }
}

function getMails(limit) {//number
    let mails = Drs.getMails(limit);
    return mails;
}

function patchMails(mailIds) {//array
    let mails = {
        mails: mailIds
    }
    let readIds = JSON.stringify(mails);
    return readIds;
}
