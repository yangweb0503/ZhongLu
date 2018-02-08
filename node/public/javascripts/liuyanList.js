$('.del').click(function(){
		var data=$(this).attr("data");
		console.log(data);
		$(this).parent().remove();
		$.ajax({
			type:"post",
			url:"/users/delliuyan",
			data:{_id:data},
			success:function(data){
				if(data==1){
					alert("删除成功");
					location.href="/liuyanList"
				}else{
					alert("删除留言失败")
				}
			}
		})
	})
