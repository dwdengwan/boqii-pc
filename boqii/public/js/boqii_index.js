// 轮播图
var lunbotu=document.getElementById("lunbotu");
var img=lunbotu.getElementsByTagName("img");
var li=lunbotu.getElementsByTagName("li");
var c=0;
setInterval(function(){
    c++;
    if(c==5){
        c=0;
    }
    for(var i=0;i<img.length;i++){
        img[i].style.display="none";
        li[i].style.background="blue";
    }
        img[c].style.display="block";
        li[c].style.background="red";
},5000)
