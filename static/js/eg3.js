/**
 * Created by Administrator on 2017/12/4.
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
eg.data = [
    ["./static/imges/photo01.jpg"],
    ["./static/imges/photo02.jpg"],
    ["./static/imges/photo03.jpg"],
    ["./static/imges/photo04.jpg"],
    ["./static/imges/photo05.jpg"],
    ["./static/imges/photo06.jpg"],
    ["./static/imges/photo07.jpg"],
    ["./static/imges/photo01.jpg"],
    ["./static/imges/photo02.jpg"],
    ["./static/imges/photo03.jpg"],
    ["./static/imges/photo04.jpg"],
    ["./static/imges/photo05.jpg"],
    ["./static/imges/photo06.jpg"],
    ["./static/imges/photo07.jpg"]
];
eg.shownumberswatching = 0;
eg.groupNumber = 1;
eg.groupSize = 6;
eg.showThubm = function (group) {
    var ul = eg.$("smallPhotosList");
    ul.innerHTML = '';
    var start = (group-1)*eg.groupSize;
    var end = group*eg.groupSize;
    for (var i=start;(i<end&&i<eg.data.length); i++){
        var li = document.createElement("li");
        li.innerHTML = '<img src="'+eg.data[i][0]+'"id="thumb'+i+'"width="80" height="40"/>';
        (function (i) {
            eg.addListener(li, "click", function(){
                eg.showNumber = i;
                eg.showBig();
            });

        })(i);
        ul.appendChild(li);
    }
};
eg.showBig = function () {
    eg.$("bigPhotoSrc").src = eg.$("thumb"+eg.showNumber).src.replace("thumb", "photo");
    alert(eg.$("bigPhotoSrc").src);
};
eg.init = function () {
    eg.showThubm(1);
    eg.addListener(eg.$("next"),"click", function () {
        eg.nextThumb();
    });
    eg.addListener(eg.$("prve"), "click", function () {
        eg.prveThumb();
    });
    eg.addListener(document, "keyup", function (e) {
        e = e|| event;
        if(e.keyCode==37){
            alert('37');
            eg.prvePhoto();
        }
        if (e.keyCode==39){
            eg.nextPhoto();
        }

    })
};

eg.nextThumb = function(){
    alert(eg.groupNumber);
    if((eg.groupNumber*eg.groupSize)+1 <= eg.data.length){
        alert('ok');
        eg.showThubm(eg.groupNumber+1);
        eg.showNumber = eg.groupNumber*eg.groupSize;
        eg.showBig();
        eg.groupNumber++;
    }
};
eg.prveThumb = function(){
    if((eg.groupNumber-1 >= 1)){
        eg.showThubm(eg.groupNumber-1);
        eg.groupNumber--;
        eg.showNumber = eg.groupNumber*eg.groupSize-eg.groupSize;
        eg.showBig();
    }
};
eg.nextPhoto = function () {
    if(eg.showNumber%eg.groupSize == (eg.groupSize-1)){
        eg.nextThumb();
    }else if(eg.showNumber < eg.data.length-1){
        eg.showNumber++;
        eg.showBig();
    }
};
eg.prvePhoto = function () {
    if (eg.showNumber==((eg.groupNumber-1)*eg.groupSize)){
        eg.prveThumb()
    }else if(eg.showNumber >0){
        eg.showNumber--;
        eg.showBig();
    }
};
eg.init();