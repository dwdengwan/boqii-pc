$(function(){
    $.ajax({
      url:"http://127.0.0.1:5500/boqii_header.html",
      type:"get",
      success:function(res){
        //动态添加<link>到<head>元素中，自动引入header.css
        $("<link rel='stylesheet' href='css/boqii_header.css'>").appendTo("head");
        //用接收到的片段代替页面上空的<header>
        $(res)//<header>
        .replaceAll("#header");
        //获得搜索框
        // var $input=$("#first_parent>.first_parent_secondchild>.first_parent_sgrandson2 input");
        //获得查询按钮
        // var $btnSearch=$input.next();
        // $btnSearch.click(function(){//单击查询按钮
        //   //如果搜索框中有内容，且不是空字符时
        //   if($input.val().trim().length>0)
        //   //就携带搜索框的内容到products.html中
        //     location.href=
        //       "products.html?kwords="+$input.val()
        // });
        //当在搜索框上按下键盘时
        // $input.keyup(function(e){
        //   if(e.keyCode==13){//如果按的是回车键
        //     //就调用查询按钮的处理函数
        //     $btnSearch.click();
        //   }
        // })
        //如果地址栏中有kwords，
        // if(location.search.indexOf("kwords")!=-1){
        //   $input.val(//就读取kwords内容,放入搜索框
        //     decodeURI(//将编码后的字符串解码为原文
        //       location.search.split("=")[1]
        //     )
        //   );
        // }
      }
    })
  })