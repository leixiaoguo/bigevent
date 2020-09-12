$.ajaxPrefilter(function(options){
options.url='http://ajax.frontend.itheima.net'+options.url
// console.log(options.url)
if(options.url.indexOf('/my/')!=-1)
options.headers={
    Authorization:localStorage.getItem('token')||''
}
options.complate= function (res) {
    if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        // 清空本地存储中的token
        localStorage.removeItem('token')
        // 重新跳转到登录页面
        location.href = '/login.html'
    }
}
})
