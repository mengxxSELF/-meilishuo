
/*common*/
// 得到随机数
function getRan(b,a){
    a=a||0;
    return Math.round(Math.random()*(b-a)+a);
}

/* 主体部分 */
~function (){
    /* 处理banner左侧 导航部分 */
//    连接随机显示红色
    var ranAry=[] ,n=0;
    while(n<10){
        ranAry.push(getRan($('.outer-ul:first-child a').length));
        n++;
    }
    for(var i=0,len=ranAry.length;i<len;i++){
        $('.outer-ul>li>a ,.inner-ul a ').eq(ranAry[i]).addClass('red');
    }

// 划过显示隐藏
    $('.outer-ul>li').hover(function () {
        $(this).toggleClass('hover').children('.inner-ul').toggle();
    })


}();