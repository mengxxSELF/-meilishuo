/* 封装图片延迟加载
*  判断图片当前位置 如果处于第一屏之内 不需要触发滚动事件
*  如果大于第一屏 需要触发滚动事件才显示
* */
// 使用方式

//new LazyImg(oBox);

function LazyImg(oBox,bgImg){
    if(!oBox) return;
    this.bgImg =bgImg; // 默认背景图
    this.imgs = oBox.getElementsByTagName('img');
    this.init();
}
LazyImg.prototype={
    construct:LazyImg,
    init: function () {
        var _this =this;
        var screenH = document.documentElement.clientHeight||document.body.clientHeight;
        window.onscroll = function () {
            var scrollT = document.documentElement.scrollTop||document.body.scrollTop;
            for(var i= 0,len=_this.imgs.length;i<len;i++){
                (function (index) {
                    var cur =_this.imgs[index];
                    if(cur['flag']) return;
                    var pos= cur.offsetTop; // 当前图片距离头部高度
                   // cur.setAttribute('src',_this.bgImg);
                    if(pos<screenH+scrollT){
                        // 图片距离顶部高度小于 滚动+屏幕
                        var img = new Image();
                        img.src=cur.getAttribute('data-src');
                        img.onload= function () {
                            cur.setAttribute('src',this.src);
                            // 其实图片有一个渐变的过程
                            cur['flag']=true;
                        };
                    }
                })(i);
            };
        };
    }
};