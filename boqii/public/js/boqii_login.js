function postlogin(){
  var xhr=new XMLHttpRequest();
  xhr.onreadystatechange=function (){
    if(xhr.readyState==4 && xhr.status==200){
    var result=xhr.responseText;
    console.log(result);
    }
  }
  xhr.open('post','user/login',true);
  var input_uphone=uphone.value;
  var input_upwd=upwd.value;
  xhr.setRequestHeader('Content-Type',"application/x-www-form-urlencoded");
  var formdata=`uphone=${input_uphone}&upwd=${input_upwd}`;
  xhr.send(formdata);
  console.log(formdata);
}


// var c=120;
// // $("#last>input").click(setInterval());
// setInterval(
//   function(){
//     console.log(1);
//     c--;
//     if(c==0){ c=120;}
//     var $span=$("#yzm").last();
//     $span.html(`还有${c}秒更新验证码`);
//     },1000);


//手机号码是否符合正则要求
$("[name=uphone]").blur(function(){
  regular(/^1[3-8]\d{9}$/,this);
});
//密码是否符合要求
$("[name=upwd]").blur(function(){
  vali($(this),8,16)
});

//验证验证码是否符合要求
$("[name=text2]").blur(function(){
  vali($(this),6,12,"昵称必须介于6~12位之间!")
});
//正则验证验证码是否符合要求
// $("[name=password3]").blur(function(){
//     regular(/^\d{4}$/,"验证码有误!","验证码正确.",this);
// });
//正则验证短信验证码是否符合要求
$("[name=password4]").blur(function(){
  regular(/^\d{6,8}$/,this);
});
//验证文本内容是否符合要求
function vali($txt,minlen,maxlen){
  //var $txt=$(txt);//获取当前文本框
  var $value=$txt.val();//获得当前文本框的内容
  var $span=$txt.next();//找到旁边的span
//如果文本框的内容符合条件
  if($value.length>=minlen && $value.length<=maxlen){
  //就填充span的内容为正确图片
    $span.html("<img src='img/register/right.png'>");
    return true;
  }//否则，就填充span的内容为错误的图片和错误的提示
  else {
    $span.html(`<img src='img/register/err.png'>`).css("color","red");
    return false;
  }
}
//验证两次密码输入是否一致
function validate(){
  var $pwd=$("[name=password1]").val();
  var $pwd1=$("[name=password2]").val();
  var $span=$("[name=password2]").next();
  if($pwd==$pwd1 && $pwd!=""){
    $span.css("color","green");
    $span.html(`<img src='img/register/right.png'>`);
  }else if($pwd1==""){
    $span.css("color","red");
    $span.html(`<img src='img/register/err.png'>确认密码不能为空!`);
  }else{
    $span.css("color","red");
    $span.html(`<img src='img/register/err.png'>确认密码与新设置密码不一致!`);
  }
}
//正则表达式
function regular($regu,txt){
  var $reg=$regu;
  var $moblie=$(txt).val();
  var $span=$(txt).next();
  var $bool=$reg.test($moblie);
  if($bool==false){
    $span.html(`<img src='img/register/err.png'>`);
    $span.css("color","red");
  }else{
    $span.html(`<img src='img/register/right.png'>`);
    $span.css("color","green");
  }
}
//正则验证验证码是否符合要求
$("[name=password3]").blur(function(){
  var $text=$(this);
  var $span=$text.next();
  if($("[name=password3]").val()==$("#li1 div").html()){
    $span.html(`<img src='img/register/right.png'>验证码与随机验证码一致.`)
    .css("color","green");
  }else{
    $span.html(`<img src='img/register/err.png'>验证码与随机验证码不一致！`)
    .css("color","red");
    }
});
// console.log($("[name=password3]").next());
  
//随机生成(1000~9999)四位数字
function getRandom(){
  return Math.floor(Math.random()*9000+1000);
}
function auto(c){
  c--;
  if(c<=0){
    getRandom();
  }
}
//获取一个四位的随机数
$("#yzm>a").click(function(){
  var $text=$(this);
  var $num=getRandom();
  var c=10;
  setInterval(()=>{
    if(c>1){
      c--;
      $("#yzm").children(":nth-child(3)").html(`还有${c}秒更新验证码`);
      console.log($("#yzm").children(":last-child"));
    }else{
      c=10;
      getRandom();
      $("#yzm").children(":nth-child(1)").html(getRandom()).css("color","red");
    } 
  },1000);
  $("#yzm").children(":nth-child(1)").html($num).css("color","red");
});
//如果没有同意阅读 其他选项都禁用
$(":checkbox").change(function(){
  if(!$(this).checked){
  // $("div.last_parent_fristchild>ul input").prop("disabled",true);
  $("div.last_parent_fristchild>ul input").prop("disabled",true);
      }
});
$("form").submit(function(e){
  if(!vali($(":text"),8,16,"用户名必须介于8~16位之间!"))
    e.preventDefault();
  else if(!vali($(":passward"),6,12,"密码必须介于6~12位之间!"))
    e.preventDefault();
});