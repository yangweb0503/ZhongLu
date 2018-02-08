
//失去焦点时判断
var a=b=0;
$(".user").focusout(function(){
	if($(this).val()==""){
		alert("用户名不能为空")
	}else{
		if($(this).val()==$(".person").html()){
			a=1;
		}else{
			alert("用户名填写错误")
		}
	}
})

//判断密码：
$(".initPsw").focusout(function(){
	if($(this).val()==""){
		alert('密码不能为空')
	}else{
		var psw=$(this).attr("psw");
	console.log(psw);
	if($(this).val()!=psw){
		alert("初始密码输入错误，请重新输入");
		$(this).val("");
	}else{
		b=1;
	}
	}
	
})

//提交个人信息

$(".sum").click(function(){
	
	if(a==1&&b==1){
		$.ajax({
			type:"post",
			url:"/users/message",
			data:{user:$(".user").val(),psw:$(".psw").val(),phone:$(".phone").val(),say:$(".say").val()},
			success:function(data){
				if(data==1){
					alert('提交成功')
				}else{
					alert("提交失败，请重试");
				}
			}
		})
	}
})
