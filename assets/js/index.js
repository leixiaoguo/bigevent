$(function () {
    getUserInfo()
    $('#btnout').on('click', function () {
        // 内置-->comfirm  
        layer.confirm('确定退出', {icon: 3, title:'提示'}, function(index){
            //do something
            // 清除本地token值
            localStorage.removeItem('token')
            // 跳转到登录页
            location.href='/login.html'
            layer.close(index);
          });
    })
})
// 用户信息
var layer = layui.layer
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        success: function (res) {
            if (res.status !== 0) {
                return layer.msg('获取用户信息失败!')
            } 
            renderAvatar(res.data)
        },
        // complate: function (res) {
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        //         // 清空本地存储中的token
        //         localStorage.removeItem('token')
        //         // 重新跳转到登录页面
        //         location.href = '/login.html'
        //     }
        // }
    })
}
function renderAvatar(user) {
    var name = user.nickname || user.username
    $('.welcome').html('欢迎&nbsp;&nbsp;' + name)
    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-img').hide()
    } else {
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $('.text-img').html(first).show()
    }
}