$(".thiredparent_lastgrandson ul")
	.on("click",".title",function(){
		var $title=$(this);
		$title.is(":visible");
		if($title.next().is(":visible"))
 			$title.next().slideUp();
		else{
			$title
			.next()//return 当前.content
 			.slideDown()////return 当前.content
 			.siblings(".content:visible")
 			.slideUp();
 		}
 	})//return $(".accordion")
 	//孩子中的class为content中的第一个之后的其他
 	.children(".content:gt(0)")
 	.hide();