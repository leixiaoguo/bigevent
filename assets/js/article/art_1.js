$(function () {
    var layer = layui.layer;
    var form = layui.form
    var index = null;
    getArt()
    function getArt() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                var htmlStr = template('temp', res)
                $('tbody').html(htmlStr)
                // console.log(res)
            }
        })
    }
    // 添加按钮的点击事件
    $('#addBut').on('click', function () {
        index = layer.open({
            type: 1,
            area: ['500px', '250px'],
            titli: '标题',
            content: $('.layui-open').html()
        });
        // 通过代理的形式为form_li绑定事件

    })
    $('body').on('submit', '#form_li', function (e) {
        e.preventDefault()
        // console.log(e)
        $.ajax({
            method: 'post',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function (res) {
                // console.log(res)
                if (res.status !== 0) {
                    return layer.msg('添加失败')
                }

                layer.msg('添加成功')
                getArt()
            }
        })
        layer.close(index)
    })
    // 编辑按钮.btn_edit代理form_edit
    var index = null;
    $('tbody').on('click', '.btn_edit', function () {
        // console.log('ok')
        index = layer.open({
            type: 1,
            title: '修改内容',
            area: ['500px', '250px'],
            content: $('.layui_edit').html()
        });


        var id = $(this).attr('data-id')
        // console.log(tarid);
        $.ajax({
            method: 'GET',
            url: '/my/article/cates/' + id,
            // data: id,
            success: function (res) {
                console.log(res.data)
                form.val('form_edit', res.data);
            }
        })
    })
    $('body').on('submit', '#form_edit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function (res) {
                console.log(res)
                if (res.status !== 0) {
                    return layer.msg('更新失败')
                }

                layer.msg('更新成功')
                getArt()
                layer.close(index)
            }
        })

    })
    $('tbody').on('click', '.btn_delete', function () {
        // console.log('ok')
        var id = $(this).attr('data-id')
        layer.confirm('确认删除吗?', { icon: 3, title: '提示' }, function (index) {
            $.ajax({
                method: 'get',
                url: '/my/article/deletecate/' + id,
                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg('删除信息失败')
                    }
                    layer.msg('删除信息成功')
                    getArt()
                }
            })

            layer.close(index);
        })
    })
})