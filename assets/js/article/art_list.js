$(function () {
    var layer = layui.layer
    var form = layui.form
    var laypage = layui.laypage
    //时间过滤器
    template.defaults.imports.dataFormat = function (date) {
        const dt = new Date(date)
        var y = dt.getFullYear()
        var m = dt.getMonth() + 1
        m = m < 10 ? '0' + m : m
        var d = dt.getDate()
        d = d < 10 ? '0' + d : d
        var hh = dt.getHours()
        hh = hh < 10 ? '0' + hh : hh
        var mm = dt.getMinutes()
        mm = mm < 10 ? '0' + mm : mm
        var ss = dt.getSeconds()
        ss = ss < 10 ? '0' + ss : ss
        return y + '-' + m + '-' + d + '    ' + hh + ':' + mm + ':' + ss
    }

    // 定义一个查询参数对象
    var q = {
        pagenum: 1,//页码值
        pagesize: 2,//每页几条
        cate_id: '',//文章分类的ID
        state: ''//文章发布状态
    }
    // 获取文章列表数据的方法
    initTabal()
    // var total = null
    function initTabal() {
        $.ajax({
            method: 'get',
            url: '/my/article/list',
            data: q,
            success: function (res) {
                // console.log(res)
                if (res.status !== 0) {
                    return layer.msg('获取失败')
                }
                var htmlStr = template('tpl_tabal', res)
                $('tbody').html(htmlStr)
                rederPage(res.total)
            }
        })
    }
    // 初始化文章分类
    initCate()
    function initCate() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                // console.log(res)
                if (res.status !== 0) {
                    return layer.msg('获取分类数据失败!')
                }
                var htmlStr = template('tpl_shai', res)
                $('[name=cate_id]').html(htmlStr)
                form.render()
            }
        })
    }
    // 为筛选表单绑定submit事件
    $('#form_list').on('submit', function (e) {
        e.preventDefault()
        var state = $('[name=state]').val()
        var cate_id = $('[name=cate_id]').val()
        q.state = state
        q.cate_id = cate_id
        initTabal()
    })
    function rederPage(total) {
        laypage.render({
            elem: 'pagebox',
            count: total,
            limit: q.pagesize,
            curr: q.pagenum,
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            limits: [2, 3, 5, 10],
            jump: function (obj, first) {
                //obj包含了当前分页的所有参数，比如：
                q.pagenum = obj.curr;
                q.pagesize = obj.limit
                // console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
                // console.log(obj.limit); //得到每页显示的条数

                //首次不执行
                if (!first) {
                    initTabal()
                }
            }
        });

    }
    $('tbody').on('click', '.btn-delete', function () {
        var len = $('.btn-delete').length//页面中删除按钮的个数
        var id = $(this).attr('date-id')
        // console.log('ok')
        layer.confirm('确认删除?', { icon: 3, title: '提示' }, function (index) {
            //do something
            $.ajax({
                method: 'get',
                url: '/my/article/delete/' + id,
                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg('删除失败')
                    }
                    layer.msg('删除成功')
                    if (len === 1) {
                        q.pagenum = q.pagenum === 1 ? 1 : q.pagenum - 1
                    }
                    initTabal()

                }
            })

            layer.close(index);
        });
    })
    var index = null;
    $('tbody').on('click', '.btn-edit', function () {
        // console.log('ok')
        // location.href = '/article/art_pub.html/ '
        location.href = '/article/art_edit.html'

    })
})