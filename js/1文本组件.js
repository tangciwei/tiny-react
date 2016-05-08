//component类，用来表示文本在渲染，更新，删除时应该做些什么事情
function ReactDOMTextComponent(text) {
    //存下当前的字符串
    this._currentElement = '' + text;
    //用来标识当前component
    this._rootNodeID = null;
}

//component渲染时生成的dom结构
ReactDOMTextComponent.prototype.mountComponent = function(rootID) {
    this._rootNodeID = rootID;
    return '<span data-reactid="' + rootID + '">' + this._currentElement + '</span>';
}


//component工厂  用来返回一个component实例
//instantiateReactComponent用来根据element的类型（现在只有一种string类型），
// 返回一个component的实例。其实就是个类工厂。
function instantiateReactComponent(node){
    if(typeof node === 'string' || typeof node === 'number'){
        return new ReactDOMTextComponent(node)
    }
}

React = {
    nextReactRootIndex:0,
    //React.render 作为入口负责调用渲染
    render:function(element,container){
        var componentInstance = instantiateReactComponent(element);
        var markup = componentInstance.mountComponent(React.nextReactRootIndex++);
        $(container).html(markup);
        //触发完成mount的事件
        $(document).trigger('mountReady');
    }
}