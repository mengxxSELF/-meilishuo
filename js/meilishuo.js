
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

//    产品部分
//    四个图片部分

    $.getJSON('./imgs4.json', function (data) {
        var str='';
        $.each(data, function (index,item) {
            str+='<li><a href=""><img src="'+item['imgSrc']+'" alt=""/></a></li>'
        });
        $('.boxs-four').html(str);
    });
//     所有产品展示
    dataStartNum =0; // 数据开始展示index
    dataChangeNum = 10; // 数据每次增加10个
    randerPage(dataStartNum);

}();
function randerPage(dataNum) {
    $.getJSON('./products.json', function (data) {
        var str= $('.pros ul').html();
        var dataLength = data.length;// 总数据长度
        $.each(data, function (index,item) {
            if(index>=dataLength) {
                $('.loading').html('数据加载完毕');
                return;
            };
            // 当处于 20 -30 之间的数据加载
            if(index>=dataNum&& index<=dataNum+dataChangeNum) {
                str+='<li>\
                <figure><a href=""><img data-src="'+item['imgSrc']+'"  src="./imgs/loading.png" /></a></figure>\
            <section class="desc">\
                <h3 class="title"><a href="">'+item['title']+'</a></h3>\
            <p class="price"> <b>'+item['priceNow']+'</b> <span>'+item['priceOld']+'</span>  </p>\
            <div class="buy">\
                <div class="left">\
                <span  >仅剩'+item['number']+'件</span>\
                <p> <b class="after" data-total="'+item['total']+'" data-last="'+item['number']+'"></b> </p>\
                </div>\
                <div class="right">\
                <a class="btn btn-buy" href="">立即购买</a>\
                </div>\
                </div>\
                </section>\
                </li>';
            }
        });
        $('.pros ul').html(str);
        // 注意在产品那里 有一个剩余产品件数 需要根据计算得出真正长度
        $('.buy .left b').each(function (index,item) {
            var total = $(item).attr('data-total');
            var last = $(item).attr('data-last');
            $(item).css('width',(last/total).toFixed(2)*100+'%');
        });
    })
};

//  下拉刷新
$(window).scroll(function () {
    var screenH = $(window).height(); // 屏幕高度
    var scrollH = $(window).scrollTop(); // 文档卷去高度
    var bodyH = $('html,body').height();// 文档高度
    if(screenH+scrollH>bodyH-200){
        $('.loading').show().html('loading');
        setTimeout(function () {
            // 渲染新数据
            dataStartNum+=dataChangeNum;
            randerPage(dataStartNum);
        },2000)
    };
});
