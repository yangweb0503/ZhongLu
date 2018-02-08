$(".search").click(function() {
	if($('.titl').val() != "") {
		$.ajax({
			type:"post",
			url:"/users/search",
			data:{tit:$(".titl").val()},
			success:function(data){
				console.log(data);
				if(data.length==0){
					alert("查询到0条评论，请重新输入")
					$(".titl").val('');
				}else{
					alert("共查询到"+data.length+"条")
					var str="";
					data.map(function(item,index){
						str+=`<tr >
					  			<td class='listNum'>${(index+1)}</td>
					  			<td><a href="/detail?id=${index}">${item.tit}</a></td>
					  			<td>${item.con}</td>
					  			<td class="author" data=${item.user}></td>
					  			<td class="recompose" onclick="location.href='/recompose?id=${item._id}'">修改</td>
					  			<td class="del" data=${item._id}>删除</td>
  							</tr>`
					})
					$("tbody").html(str);	
					$(".fenye").hide();
					}
				}
			
		})
	}

})