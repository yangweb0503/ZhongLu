$(".searchUser").click(function() {
	if($('.title1').val() != "") {
		$.ajax({
			type:"post",
			url:"/users/searchUser",
			data:{tit:$(".title1").val()},
			success:function(data){
				console.log(data);
				if(data.length==0){
					alert("查询到0条评论，请重新输入")
					$(".title1").val('');
				}else{
					alert("共查询到"+data.length+"条")
					var str="";
					data.map(function(item,index){
						str+=`<tr class="text-c">
					<td><input type="checkbox" value="1" name=""></td>
					<td>
						${(index+1)}
					</td>
					<td>
						<a href="/memberdetail?id=${index}">
							${item.username}
						</a>
					</td>
					<td>
						${item.sex}
					</td>
					<td>
						${item.phone}
					</td>
					<td>
						${item.eml}
					</td>
					<td class="text-l">
						${item.addr}
					</td>
					<td class="td-manage">
						<a title="编辑" href="/editor?id=${item._id}" class="ml-5" style="text-decoration:none"><i class="Hui-iconfont">编辑</i></a>
						<a href="javascript:;" class="ml-5 delmember" style="text-decoration:none" data='${item._id}'> <i class="Hui-iconfont">删除</i></a>
					</td>
				</tr>`
					})
					$("tbody").html(str);	
					$(".fenye").hide();
					}
				}
			
		})
	}

})