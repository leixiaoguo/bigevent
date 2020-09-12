$(function () {
    //注册
    $('#reg_zh').on('click', function () {
        $('.reg').show()
        $('.login').hide()
    })
    $('#dl_zh').on('click', function () {
        $('.reg').hide()
        $('.login').show()
    })

    var form = layui.form
    var msg = layer.msg
    form.verify({
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        repwd: function (value) {
            if ($('.reg  [name=password]').val() != value) {
                return '两次密码不一致'
            }
        }
    })
    // 注册
    $('#form_reg').on('submit', function (e) {
        e.preventDefault()
        var data = {
            username: $('.reg [name=username]').val(),
            password: $('.reg [name=password]').val()
        }
        $.post('/api/reguser', data, function (res) {
            if (res.status !== 0) {
                return layer.msg(res.message)
            }
            layer.msg('注册成功')
            $('#dl_zh').click()
        })
    })
    // 登录
    $('#form_login').on('submit', function (e) {
        e.preventDefault()
        var data = {
            username: $('.login [name=username]').val(),
            password: $('.login [name=password]').val()
        }
        $.post('/api/login', data, function (res) {
            if (res.status !== 0) {
                return layer.msg(res.message)
            }
            layer.msg('登陆成功')
            console.log('token')
            localStorage.setItem('token',res.token)
            location.href = 'index.html'
        })
    })
})  