
/*common*/
// �õ������
function getRan(b,a){
    a=a||0;
    return Math.round(Math.random()*(b-a)+a);
}

/* ���岿�� */
~function (){
    /* ����banner��� �������� */
//    ���������ʾ��ɫ
    var ranAry=[] ,n=0;
    while(n<10){
        ranAry.push(getRan($('.outer-ul:first-child a').length));
        n++;
    }
    for(var i=0,len=ranAry.length;i<len;i++){
        $('.outer-ul>li>a ,.inner-ul a ').eq(ranAry[i]).addClass('red');
    }

// ������ʾ����
    $('.outer-ul>li').hover(function () {
        $(this).toggleClass('hover').children('.inner-ul').toggle();
    })


}();