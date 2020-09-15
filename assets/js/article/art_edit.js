$(function () {
    var layer = layui.layer
    var form = layui.form
    initEditor() //富文本
    initCate()
    function initCate() {
        $.ajax({
            method: 'get',
            url: '/my/article/cates',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('初始化文章列表失败')
                }
                // 调用模板引擎
                var htmlStr = template('temp-tl', res)
                $('[name=cate_id]').html(htmlStr)
                // 一定要记得调用 form.render() 方法
                form.render()
                article()
            }
        })
    }
    // 获取文章详情数据
    var search = location.search.split('=')
    var id = search[1]
    function article() {
        $.ajax({
            method: 'get',
            url: '/my/article/' + id,
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取文章数据失败')
                }
                // layer.msg('获取文章数据成功')
                form.val('form-edit', res.data)
                initEditor()
            }
        })
    }
    // 1. 初始化图片裁剪器
    var $image = $('#image')

    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }

    // 3. 初始化裁剪区域
    $image.cropper(options)
    //为选择封面的按钮,绑定点击事件处理函数
    $('#btn_edit').on('click', function () {
        $('#coverFile').click()
    })
    // 监听coverFile的change事件, 获取用户选择的文件列表
    $('#coverFile').on('change ', function (e) {
        // 拿到用户选择的文件
        console.log(e.target.files)
        var file = e.target.files[0]
        //判断用户是否选择了文件
        if (file.length === 0) { return }
        //根据选择的文件，创建一个对应的 URL 地址：
        var newImgURL = URL.createObjectURL(file[0])
        //先销毁旧的裁剪区域，再重新设置图片路径，之后再创建新的裁剪区域：
        $image
            .cropper('destroy')      // 销毁旧的裁剪区域
            .attr('src', newImgURL)  // 重新设置图片路径
            .cropper(options)        // 重新初始化裁剪区域
    })
    var save = '已发布'
    $('.save2').on('click', function () {
        save = '存为草稿'
    })
    $('#form_edit').on('submit', function (e) {
        e.preventDefault()
        // 创建一个formdate对象
        var fd = new FormData($(this)[0])
        // 添加文章发布状态state状态
        fd.append('state', save)
        $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function (blob) {       // 将 Canvas 画布上的内容，转化为文件对象
                // 得到文件对象后，进行后续的操作
                //将图片添加到fd中
                fd.append('cover_img', blob)
                edit(fd)
                // $.ajax({
                //     method: 'post',
                //     url: "/my/article/add",
                //     data: fd,
                //     contentType: false,
                //     processData: false,
                //     success: function (res) {
                //         if (res.status !== 0) {
                //             return layer.msg('文章发布失败')
                //         }
                //         layer.msg('文章发布成功')
                //         location.href = '/article/art_pub.html'
                //     }
                // })
            })

    })
    function edit(fd) {
        $.ajax({
            method: 'post',
            url: '/my/article/edit',
            data: fd,
            contentType: false,
            processData: false,
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('编辑文章失败')
                }
                layer.msg('编辑文章成功')
                location.href = '/article/art_list.html'
            }
        })
    }
})
