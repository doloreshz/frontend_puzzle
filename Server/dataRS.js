const fs = require('fs');

module.exports = {
    getMails: getMails
}

//邮件id
let id = 10001; 
fs.writeFileSync('./mails.json', createNewMails(id));
console.log('初始化邮件数据成功！');

//参数 limit:number; 返回 mails:string
function getMails(limit) {
    id = id + 2;
    let chunk = fs.readFileSync('./mails.json', 'utf-8');
    fs.writeFileSync('./mails.json', createNewMails(id));
    return chunk;
}

//邮件生成函数
function createNewMails(id) {
    let newMails = {
        mails: [
            {
                mailId: `${id}`,
                title: `${id}号邮件`,
                body: `${id}号邮件${id}号邮件${id}号邮件${id}号邮件${id}号邮件`,
                isReaded: `false`,
                receiveTime: `date` 
            },
            {
                mailId: `${id+1}`,
                title: `${id+1}号邮件`,
                body: `${id+1}号邮件${id+1}号邮件${id+1}号邮件${id+1}号邮件${id+1}号邮件`,
                isReaded: `false`,
                receiveTime: `date` 
            }
        ]
    }
    return JSON.stringify(newMails)
}