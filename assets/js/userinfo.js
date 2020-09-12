$(function () {
    var form = layui.form
    var layer = layui.layer
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '用户的昵称必须是1-6个字符之间'
            }
        }
    })
    get_Info()
    function get_Info() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败')
                }
                console.log(res)
                form.val('user_form', res.data)
            }
        })
    }
    $('#btnReset').on('click', function (e) {
        // 阻止默认行为 
        e.preventDefault()
        get_Info()
    })
    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'post',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('更新户信息失败')
                }
                layer.msg('更新户信息成功')
                window.parent.getUserInfo()
            }
        })
    })
})
