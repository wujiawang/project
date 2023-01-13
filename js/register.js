/**
 * 注册验证实现
 */
$(function() {
    $('#getCode').click(function() {
        var flag = /^1[3456789]\d{9}$/.test($('#phone').val())
        var index = 60
        if ($('#phone').val() == '') {
            $('#phone').siblings('em').css('backgroundImage', 'url(../img/error.png)').siblings('span').html('请输入手机号').css('color', 'red')
        } else {
            if (flag) {
                $('#phone').siblings('em').css('backgroundImage', 'url(../img/success.png)').siblings('span').html('恭喜你输入正确').css('color', 'green')
                var timeId = setInterval(function() {
                    index--
                    $(this).html('验证码已发送至该手机(' + index + ')').attr('disabled', true)
                    if (index <= 0) {
                        clearInterval(timeId)
                        $(this).html('获取验证码').attr('disabled', false)
                    }
                }.bind(this), 1000)
            } else {
                $('#phone').siblings('em').css('backgroundImage', 'url(../img/error.png)').siblings('span').html('手机号码格式错误，请重新输入').css('color', 'red')
            }
        }
        return false
    })
    $('#code').blur(function() {
        var flag = /^[0-9a-z]{6}$/.test($(this).val().toLocaleLowerCase())
        if (flag) {
            $(this).siblings('em').css('backgroundImage', 'url(../img/success.png)').siblings('span').html('恭喜你输入正确').css('color', 'green')
        } else {
            $(this).siblings('em').css('backgroundImage', 'url(../img/error.png)').siblings('span').html('验证码错误，请重新输入').css('color', 'red')
        }
    })
    $('#password').keyup(function() {
        $('#grade').children()[0].className = ''
        var para = $(this).val()
        if (para.length > 4) {
            var grade = getGrade(para)
            $('#grade').children()[0].className = 'grade' + grade + ''
            $(this).parent().siblings('em').css('backgroundImage', 'url(../img/success.png)').siblings('span').html('密码长度正确').css('color', 'green')
        } else {
            $(this).parent().siblings('em').css('backgroundImage', 'url(../img/error.png)').siblings('span').html('密码长度不够').css('color', 'red')
        }
    })
    $('#password').next().click(function() {
        if ($('#password').attr('type') == 'password') {
            $(this).css('backgroundImage', 'url(../img/open.png)')
            $('#password').attr('type', 'text')
        } else {
            $(this).css('backgroundImage', 'url(../img/close.png)')
            $('#password').attr('type', 'password')
        }
    })

    function getGrade(para) {
        var g = 0
        if (/[0-9]/.test(para)) {
            g++
        }
        if (/[a-zA-Z]/.test(para)) {
            g++
        }
        if (/[\W]/.test(para)) {
            g++
        }
        return g
    }
    $('#checkPassword').blur(function() {
        if ($(this).val() === $('#password').val()) {
            $(this).parent().siblings('em').css('backgroundImage', 'url(../img/success.png)').siblings('span').html('密码验证正确').css('color', 'green')
        } else {
            $(this).parent().siblings('em').css('backgroundImage', 'url(../img/error.png)').siblings('span').html('密码不一致').css('color', 'red')
        }
    })
    $('#checkPassword').next().click(function() {
        if ($('#checkPassword').attr('type') == 'password') {
            $(this).css('backgroundImage', 'url(../img/open.png)')
            $('#checkPassword').attr('type', 'text')
        } else {
            $(this).css('backgroundImage', 'url(../img/close.png)')
            $('#checkPassword').attr('type', 'password')
        }
    })
})

//给获取登录按钮添加点击事件
var nameArr, nameObj = {}; //设置全局变量；
$('button').eq(0).click(function() {
if (a && b && c && d) { // 当以上事件都为真时，提示注册成功，否则失败
    //判断cookie是否存在
    if (getCookie('username')) { //如果cookie存在

        nameArr = JSON.parse(getCookie('username')); //解析cookie
        console.log(nameArr);
        for (var i = 0; i < nameArr.length; i++) { //遍历数组
            if (nameArr[i].username == $('input').eq(0).val()) { //如果用户名在数组对象中存在则显示提示、退出循环
                $('.tip').show();
                alert('用户名已注册！');
                break;
                return false;
            }
        }
        if (i >= nameArr.length) { //当用户名不存在对应对象 隐藏提示、对新对象添加属性并追加到数组中
            $('.tip').hide();
            nameObj = { 'username': $('input').eq(0).val(), 'psw': $('input').eq(1).val() }
            nameArr.push(nameObj);
            alert('注册成功！');
        }
    } else { //如果cookie不存在，隐藏提示，令数组等于空，对新对象添加属性并追加到数组中
        $('.tip').hide();
        nameArr = [];
        nameObj = { 'username': $('input').eq(0).val(), 'psw': $('input').eq(1).val() }
        nameArr.push(nameObj);
        alert('注册成功！');
    }
    nameArr = JSON.stringify(nameArr);
    var s = new Date('2017-11-1') //设置cookie过期日期
    var username = setCookie('username', nameArr, s, '/'); //设置用户名cookie
} else {
    alert("注册失败！")
    return false; //注册失败阻止跳转
}
});
});