
cc.Class({
    extends: cc.Component,

    properties: {
		nodeMailDetail: cc.Node
    },

    btnCloseCallBack: function () {
        this.nodeMailDetail.destroy();
    },

    onLoad () {},

    //start () {},

    //update (dt) {},
	
	//lateUpdate (dt) {},
	
	//onEnable () {},
	
	//onDisable () {},
	
	//onDestroy () {}
});
