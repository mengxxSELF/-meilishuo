/* ͼƬ���������ֲ�ͼ  jq   */

// ajax��ȡ����  ����������Ⱦҳ��
// ���ֵ�һ��
//������ʱ����������ͼƬ ��ʾ��ǰͼƬ��ʱ�� ��������ͼƬ
// ��껮�� ��ͣ��ʱ��
// �����л�  �����л�


function Banner(opt){
    this.ele = opt.ele;
    this.duration = opt.duration||2000; // �л�ͼƬʱ��

    this.data=null; // ͼƬ����
    this.timer=null;
    this.index=0;
    this.init();
}

Banner.prototype={
    constructor:Banner,
    init: function () {
        var _this =this;
        // ��ȡ���� ��Ⱦҳ�� ͼƬ�ӳټ��� ���ֵ�һ��ͼƬ
        this.getDate();
        // ������ʱ�� ��������ͼƬ
        this.timer = setInterval(function () {
            _this.changeImg();
        },this.duration)

        // ��껮�� ��ͣ��ʱ��
        this.mouseMove();
        // �����л�  �����л�
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
        this.pageShow(); // ��Ⱦҳ�� ���ֵ�һ��ͼƬ
    },
    pageShow: function () {
        var str = '' ,liStr='';
        for(var i=0,len =this.data.length;i<len;i++){
            var item= this.data[i];
            str+= ' <a href=""><img data-src=" '+ item.imgSrc+' " /></a>';
            liStr+= i==0? ' <li class="now"></li>': ' <li></li>';
        }
        this.ele.html(str); // ͼƬ
        this.ele.next().html(liStr); // li

        
        this.lazyImg();// �ӳټ���
    },
    lazyImg: function () {
        var _this =this;
        $.each(this.ele.find('img'), function (index,item) {
            var img = new Image;
            img.src= $(item).attr('data-src');
            img.onload= function () {
                $(item).attr('src',this.src);
                // ���ֵ�һ��
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

