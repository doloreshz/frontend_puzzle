const {ccclass, property} = cc._decorator;


@ccclass
export default class clickEventComponent extends cc.Component{

    

    onClickEventHandler(node,btnNode,componetScript,_callback,customEventData?){
        let clickEventHandler = new cc.Component.EventHandler();
        clickEventHandler.target = node; // 这个 node 节点是你的事件处理代码组件所属的节点
        clickEventHandler.component = componetScript;// 这个是代码文件名
        clickEventHandler.handler = _callback;
        clickEventHandler.customEventData = customEventData;

        let button = btnNode.getComponent(cc.Button);
        button.clickEvents.push(clickEventHandler);
    }
}
