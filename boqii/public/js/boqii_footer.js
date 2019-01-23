$(function(){
    $.ajax({
      url:"http://127.0.0.1:5500/boqii_footer.html",
      type:"get",
      success:function(res){
        $("<link rel='stylesheet' href='css/boqii_footer.css'>").appendTo("head");
        $(res)//<header>
        .replaceAll("#footer");
      }
    })
  })