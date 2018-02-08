
	
	//接口：
	//返回数据为1，注册成功，返回数据为2，用户名已存在，返回数据为3，注册失败
	$(".register").click(function(){
		$.ajax({
			type:"post",
			url:"/users/register",
			data:{user:$("#inputEmail3").val(),psw:$("#inputPassword3").val()},
			success:function(data){
				console.log(1);
				if(data==1){
					alert("注册成功");
					setTimeout(function(){
						location.href='/login'
					},1000)
				}else if(data==2){
					alert("用户名已存在，请重新输入用户名")
				}else{
					alert("注册失败，请重新注册")
				}
			}
		})
		
		
		
	})
	
	
	