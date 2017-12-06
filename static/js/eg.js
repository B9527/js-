/**
 * Created by Administrator on 2017/12/6.
 */
var eg = {};
// 申明一个对象当作命名空间使用
// 定义一个公共函数获取id元素 减少代码量 提高复用率
eg.$ = function (id) {
    return document.getElementById(id);
};
// 定义一个公共函数来获取制定class的名称元素集合，能兼容各浏览器
eg.getElementsByClassName = function (className, element) {
  if (document.getElementsByClassName){
      return (element || document).getElementsByClassName(className)
  }
  var children = (element || document).getElementsByTagName('*');
  var elements = [];
  for (var i =0; i <children.length; i++){
      var child = children[i];
      var classNames = child.className.split(' ');
      for (var j=0; j < classNames.length; j++){
          if (classNames[j] == className){
              elements.push(child);
              break;
          }
      }
  }
  return elements;
};
// 定义一个公共函数解决监听事件兼容问题
eg.addListener = function (target, type, handler) {
  if (target.addEventListener){
      target.addEventListener(type, handler, false);
  }else if (target.attachEvent) {
      target.attachEvent("on" + type, handler);
  }else{
      target["on" + type] = handler;
  }



};
eg.AJAX = function(url, data) {
    $.ajax({
        url: url,
        type: "GET",
        data: data,
        dataType: 'json',
        traditional: true,
        success: function (data, statusText, xmlHttpRequest) {
            //当请求成功后执行
            // data返回的字符串 ＝》dataType: 'text'
            // data js对象 ＝》dataType: 'json'
            // {"k1":"v1"}  {"k1":"v1"
            // var obj = JSON.parse(data);
            if (data.status == '200') {
                return 'success'
            } else {
                return 'fail'
            }
        },
        error: function (xmlHttpRequest, statusText, errorThrown) {
            //
            return "fail"
        }
    });
};