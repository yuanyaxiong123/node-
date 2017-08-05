1.npm install
2.将项目写在public 里包括js 和css
3.修改server url.js里的
const options = {
  host:'192.168.1.148',
  port:80,
  path:"/"
};
4.在文件夹下执行 npm start 开启服务器
注：本地访问必须是localhost：80 可在IDE开发环境中调试；
如果你要访问的是192.168.1.148:80/test.php;
就修改ip和端口；
在项目里直接用‘/test.php’；
如
=========================================
  $.ajax({
        url:'/test.php',
        data:{
        },
        type:'post',
        success:function (data) {
        }
    })
===========================================






