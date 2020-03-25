# frontend_puzzle

## 要求

假设这是一个新开发系统，前后端同时进行，所以还没有后端的服务可以调用

game目录底下是一个

基本要求：

1. 完成下方需求的三个界面逻辑，包括API请求，界面逻辑
2. 因为后端没有就绪，所以需要自己想个办法如何自测, 希望提交时候是一个带自测演示的版本

Bonus（加分项）

1. 工程里面有哪些界面设计的问题
2. 下面给出的API比较简单，如果邮件可能很多，例如几千上万条，那么这个API是否合理，应该如何修改？

## 设计一个简单的邮件展示的逻辑

### 需求

一个接收系统邮件的小系统，具备以下功能

1. 通过服务端接口获取邮件
2. 展示邮件列表
3. 邮件列表中，通过字体颜色区分已读未读（未读为红色，已读为灰色）
4. 点击邮件列表的邮件，展示邮件详情，并且更新邮件状态为已读

#### 邮件

邮件由管理端发送到玩家的邮箱里面

包含以下信息

1. 邮件标题，最多36个中文字符长度
2. 邮件正文，最多360个中文字符长度
3. 邮件发送时间
4. 邮件阅读状态

#### 界面

##### 邮件列表

工程里面有个mail.scene

1. Content，一个邮件列表，按时间顺序展示邮件, item的内容在assets/Prefabs/MailBrief
2. Buttons/Refresh，刷新邮件列表的按钮，点击之后拉新邮件
3. Buttons/MarkRead, 标记所有已读

##### 邮件详情

在assets/Prefabs/MailDetail 里

点击邮件列表里面具体的邮件，需要跳转到游戏详情里面

1. Title, 展示邮件标题
2. Body, 展示邮件内容
3. Buttons/Close，点击之后关闭详情页面，跳回列表页面

#### 协议

假定第一版服务端的协议包含3个API, 都为HTTP，底下使用JSON SCHEM定义

##### 获取邮件

PATH: /mails
METHOD: GET

返回的JSON SCHEMA为

```
{
    "definitions": {
        "mail": {
            "type": "object",
            "properties": {
                "mailId": { "type": "string" },
                "title": { "type": "string" },
                "body": { "type": "string" },
                "isReaded": { "type": "boolean" },
                "receiveTime": { "type": "string"}
            }
        }
    },
    "type": "object",
    "properties": {
        "mails": {
            "type": "array",
            "items":  {
                "type": "object",
                "$ref": "#/definitions/mail"
            }
        }
    }
}
```

** 你可以认为mailId可以是按照时间排序的


##### 更新邮件状态

PATH: /mails
METHOD: PATCH

请求的参数的JSON SCHEMA为

```
{
    "type": "object",
    "properties": {
        "mailIds": {
            "type": "array",
            "items": {
                "type": "string"
            },
            "$comment": "就是需要标识已读的mailId"
        }
    }
}
```


返回的JSON SCHEMA为

```
{
    "type": "object",
    "properties": {
        "mails": {
            "type": "array",
            "items": {
                "type": "string"
            },
            "$comment": "成功标记已读的mailId"
        }
    }
}
```

** 你可以认为mailId可以是按照时间排序的


