# frontend_puzzle

## 服务器

1.请使用node.js在命令行下打开Sever/httpServer.js


2.Sever/mail.json 为满足要求的JSON文件

## 界面问题:（已经完善）

1.邮件的接收需要满足后来居上的规则，content 的Vertical Direction 应该为自下而上排列


2.MailDetail预制件没有背景图片，还要增加BlockInputEvents来阻挡点击事件，避免在详细界面下误触其他邮件


3.个别Widget组件适应性有错误


4.没有返回其他场景的UI Button

## API问题:

API不合理，能满足JSON SCHEMA校验要求的JSON文件可以假设为以下内容:

```
{
  "mails": [
    {
      "mailId": "1",
      "title": "获得武器",
      "body": "挂机时获得无尽之刃",
      "isReaded": false,
      "receiveTime": "2020年03月31日 9:30"
    },
    {
      "mailId": "2",
      "title": "损失金币",
      "body": "挂机时遭遇妙手空空，失去3800金币",
      "isReaded": false,
      "receiveTime": "2020年03月31日 11:15"
    },
    {
      "mailId": "3",
      "title": "活动通知",
      "body": "今晚18:30分在线可获得振奋盔甲",
      "isReaded": false,
      "receiveTime": "2020年03月31日 14:20"
    }
  ]
}
```

```
{
  "mails": [
    "1",
    "2",
    "3"
  ]
}
```

1.当邮件众多成千上万时，JSON文件将会有大量重复键值，文件体积极大，不利于读取、修改、传输。


2.可以将邮件可能出现的关键字或词条按照不同类别制作为多个JSON文件，服务端按照要发送的邮件的内容甄选相关JSON文件，进行读写操作。METHOD: GET



被测试者:

胡晓瑞 18946037673