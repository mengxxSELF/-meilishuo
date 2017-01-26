/* 图片渐隐渐现轮播图  jq   */

// ajax获取数据  根据数据渲染页面
// 渐现第一张
//开启定时器渐隐渐现图片 显示当前图片的时候 隐藏其他图片
// 鼠标划过 暂停定时器
// 焦点切换  左右切换


function Banner(opt){
    this.ele = opt.ele;
    this.duration = opt.duration||2000; // 切换图片时间

    this.data=null; // 图片数据
    this.timer=null;
    this.index=0;
    this.init();
}

Banner.prototype={
    constructor:Banner,
    init: function () {
        var _this =this;
        // 获取数据 渲染页面 图片延迟加载 渐现第一张图片
        this.getDate();
        // 开启定时器 渐隐渐现图片
        this.timer = setInterval(function () {
            _this.changeImg();
        },this.duration)

        // 鼠标划过 暂停定时器
        this.mouseMove();
        // 焦点切换  左右切换
        this.tipChange();

    },
    getDate: function () {
        var _this =this;
        $.ajax({
            type:'get',
            async:false,
            url:'imgs.json',
            dataType:'json',
            success:function (data) {
                _this.data =data;
            }
        });
        this.pageShow(); // 渲染页面 渐现第一张图片
    },
    pageShow: function () {
        var str = '' ,liStr='';
        for(var i=0,len =this.data.length;i<len;i++){
            var item= this.data[i];
            str+= ' <a href=""><img data-src=" '+ item.imgSrc+' " /></a>';
            liStr+= i==0? ' <li class="now"></li>': ' <li></li>';
        }
        this.ele.html(str); // 图片
        this.ele.next().html(liStr); // li

        
        this.lazyImg();// 延迟加载
    },
    lazyImg: function () {
        var _this =this;
        $.each(this.ele.find('img'), function (index,item) {
            var img = new Image;
            img.src= $(item).attr('data-src');
            img.onload= function () {
                $(item).attr('src',this.src);
                // 渐现第一张
                _this.ele.children().first().fadeIn();
            }
        })
    },
    changeImg: function () {
        this.index++;
        this.showImge();
    },
    showImge: function () {
        var num =this.index%this.ele.children().length;
        this.ele.children().eq(num).fadeIn().siblings().fadeOut();
        this.ele.next().children().eq(num).addClass('now').siblings().removeClass('now');
    },
    mouseMove: function () {
        var _this = this;
        this.ele.parent().hover(function () {
            clearInterval(_this.timer);
        }, function () {
            _this.timer = setInterval(function () {
                _this.changeImg();
            },_this.duration)
        })
    },
    tipChange: function () {
        var _this =this;
        this.ele.next().children().click(function () {
            _this.index= $(this).index();
            _this.showImge();
        })
    }
};

