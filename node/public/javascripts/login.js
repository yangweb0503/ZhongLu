$(".login2").click(function(){
	
	/*接口：
	 * 1：登录成功
	 * 2：用户名不存在
	 * 3：密码错误*/
	console.log(1);
	$.ajax({
		type:"post",
		url:"users/login",
		data:{user:$("#inputEmail3").val(),psw:$("#inputPassword3").val()},
		success:function(data){
			if(data==1){
				location.href="/";
			}else if(data==2){
				alert("用户名不存在,请重新输入");
				location.href="/login"
			}else{
				alert("密码错误,请重新输入");
				location.href="/login"
			}
		}
	})
})
