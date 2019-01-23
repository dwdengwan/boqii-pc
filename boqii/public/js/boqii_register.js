// $("#page1").load("boqii_header.html");
//正则验证手机号码是否满足正确格式
$("[name=text1]").blur(function(){
    regular(/^1[3-8]\d{9}$/,"请输入正确格式的手机号码.","输入手机号码格式正确.",this);
});
//验证密码是否符合要求
$("[name=password1]").blur(function(){
    vali($(this),8,16,"密码必须介于8~16位之间!")
});
//验证两次密码是否一致
$("[name=password2]").blur(function(){
    validate();
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
    regular(/^\d{6,8}$/,"短信验证码有误!","短信验证码正确.",this);
});
//验证文本内容是否符合要求
function vali($txt,minlen,maxlen,errMsg){
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
        $span.html(`<img src='img/register/err.png'>${errMsg}`);
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
function regular($regu,$msg1,$msg2,txt){
    var $reg=$regu;
    var $moblie=$(txt).val();
    var $span=$(txt).next();
    var $bool=$reg.test($moblie);
    if($bool==false){
        $span.html(`<img src='img/register/err.png'>${$msg1}`);
        $span.css("color","red");
    }else{
        $span.html(`<img src='img/register/right.png'>${$msg2}`);
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
console.log($("[name=password3]").next());

//随机生成(1000~9999)四位数字
function getRandom(){
    return Math.floor(Math.random()*9000+1000);
}
function auto(c){
   c--;
   if(c<=0){
    getRandom();
    $("#li1>span:nth-child(3)").html(`还有10秒更新验证码`)
   }
}
//获取一个四位的随机数
$("#li1 div").click(function(){
    var $text=$(this);
    var $num=getRandom();
    var c=10;
    $("#li1>span:nth-child(3)").html(`还有${c}秒更新验证码`);
    setInterval(()=>{
        if(c>1){
            c--;
         $("#li1>span:nth-child(3)").html(`还有${c}秒更新验证码`);
        }else{
            c=10;
            getRandom();
            $text.html(getRandom()).css("color","red");
        }
    },1000);
    $text.html($num).css("color","red");
});
//如果没有同意阅读 其他选项都禁用
$(":checkbox").change(function(){
    if(!$(this).checked){
        // $("div.last_parent_fristchild>ul input").prop("disabled",true);
        $("div.last_parent_fristchild>ul input").prop("disabled",true);
    }
});
$("#li5").submit(function(e){
    if(!vali($(":text"),8,16,"用户名必须介于8~16位之间!"))
    e.preventDefault();
    else if(!vali($(":passward"),6,12,"密码必须介于6~12位之间!"))
    e.preventDefault();
});
//姓名错误时: "<img src='img/err.png'>用户名必须介于3~9位之间!"
//密码错误时: "<img src='img/err.png'>密码必须介于6~8位之间!"
//阻止默认行为: e.preventDefault();
//表单提交: $(form).submit();