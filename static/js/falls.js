/**
 * Created by Administrator on 2017/12/6.
 */
var fall = {};
fall.getElementsByClassName = function (className, element) {
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
fall.getDataList = function (min,max) {
    var lst = [], n=32;
    for (var i=0; i<n; i++){
        var k = min +parseInt(Math.random()*(max-min));
        img_url = "./static/imges/"+k+".jpg";
        lst.push(img_url);
    }
    return lst;

};
fall.cols = fall.getElementsByClassName("col");
fall.colh = [0, 0, 0, 0];
fall.getColMin = function () {
    var min = 0, m = {};
    for (var i=0;i<4;i++){
        min = parseInt(fall.cols[i].offsetHeight);
        fall.colh[i] = min;
        m[min] = i ;
    }
    return fall.cols[m[Math.min.apply(Array, fall.colh)] || 0];
};
fall.add = function (dl) {
    for (var i=0;i<dl.length;i++){
        var newDiv = document.createElement("div");
        var newImg = document.createElement("img");
        newImg.src = dl[i];
        newDiv.appendChild(newImg);
        newDiv.innerHTML += '<p>['+ i+']</p>';
        fall.getColMin().appendChild(newDiv);
    }
};
fall.scroll = function () {
    window.onscorll = function () {
        var doc = document;
        var top = doc.documentElement.scrollTop || doc.body.scrollTop;
        var winH  =doc.documentElement.scrollHeight || doc.body.clientHeight;
        if (Math.min.apply(Array, fall.colh) < top + winH){
            fall.add(fall.getDataList(1,35));
        }
    }
};
fall.init = function () {
     alert("start");
    fall.getColMin();
    alert('1');
    var dl = fall.getDataList(1,32);
    alert('2');
    fall.add(dl);
    alert(3);
    fall.scroll();
    alert("ok");
};

fall.init();