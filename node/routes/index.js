var express = require('express');
var router = express.Router();
var http = require('http');
var mongodb = require("mongodb").MongoClient;
const db_str = "mongodb://39.106.149.233:27017/ZhongLu";
var async=require("async");
var ObjectID = require('mongodb').ObjectID;





/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { user: req.session.user,psw:req.session.psw,tit:'11'});
});



//登录
router.get("/login",(req,res)=>{
	res.render("login");
}) 

//重新登录
router.get("/reload",(req,res)=>{
	req.session.destroy((err)=>{
		if(err){
			alert("错误")
		}else{
			res.redirect("/")	;
		}
	})
})

//进入后台
router.get("/home",(req,res)=>{
	res.render("home",{user: req.session.user,psw:req.session.psw,tit:"0"});
})


//个人信息编辑
router.get("/myMessage",(req,res)=>{
	res.render("home",{user: req.session.user,psw:req.session.psw,tit:"1"});
})



//提交个人信息
router.get("/message",(req,res)=>{
	res.render("home",{user: req.session.user,psw:req.session.psw,tit:"1"});
	
})



//去留言
router.get("/liuyan",(req,res)=>{
	res.render("liuyan",{user: req.session.user,psw:req.session.psw})
})


//评论列表
router.get("/liuyanList",(req,res)=>{
let pageNo=req.query.pageNo;
	let page=0;
	let count=0;
	let pageSize=3;
	pageNo=pageNo?pageNo:1;
	mongodb.connect(db_str,(err,database)=>{
		database.collection("liuyan",(err,col)=>{
			async.series([
				function(callback){
					col.find({}).toArray((err,data)=>{
						count=data.length;
						page=Math.ceil(data.length/pageSize);
						pageNo=pageNo<1?1:pageNo;
						pageNo=pageNo>page?page:pageNo;
						callback(null,"");
					})
				},
				function(callback){
					col.find({}).sort({_id:-1}).limit(pageSize).skip((pageNo-1)*pageSize).toArray((err,data)=>{
						callback(null,data);
					})
				}
			],function(err,result){
				res.render("home",{data:result[1],page:page,count:count,pageNo:pageNo,user: req.session.user,psw:req.session.psw,tit:"3"})
			})
		})
	})
})

//留言详情
router.get("/detail",(req,res)=>{
	console.log(req.query.id)
	let index=req.query.id;
	mongodb.connect(db_str,(err,database)=>{
		database.collection("liuyan",(err,col)=>{
			col.find({}).sort({_id:-1}).toArray((err,data)=>{
				res.render("home",{title:data[index].tit,con:data[index].con,tit:"4",user: req.session.user,_id:data[index]._id});
				//console.log(data[index]._id);
				database.close();
			})
		})
	})
})

//修改留言
router.get("/recompose",(req,res)=>{
	let str={_id:ObjectID(req.query.id)};
	console.log(str);
	mongodb.connect(db_str,(err,database)=>{
		database.collection("liuyan",(err,col)=>{
			col.find(str).toArray((err,data)=>{
				console.log(data)
				res.render("home",{tit:"5",data:data,user: req.session.user});
				database.close();
			})
		})
	})
})


//查询留言

router.get('/search',(req,res)=>{
		res.render("home",{tit:"6",user: req.session.user});
})


//添加会员

router.get("/addMember",(req,res)=>{
	res.render("home",{tit:"7",user: req.session.user});
})

//会员列表
router.get("/memberList",(req,res)=>{
let pageNo=req.query.pageNo;
	let page=0;
	let count=0;
	let pageSize=5;
	pageNo=pageNo?pageNo:1;
	mongodb.connect(db_str,(err,database)=>{
		database.collection("member",(err,col)=>{
			async.series([
				function(callback){
					col.find({}).toArray((err,data)=>{
						count=data.length;
						page=Math.ceil(data.length/pageSize);
						pageNo=pageNo<1?1:pageNo;
						pageNo=pageNo>page?page:pageNo;
						callback(null,"");
					})
				},
				function(callback){
					col.find({}).sort({_id:-1}).limit(pageSize).skip((pageNo-1)*pageSize).toArray((err,data)=>{
						callback(null,data);
					})
				}
			],function(err,result){
				res.render("home",{data:result[1],page:page,count:count,pageNo:pageNo,user: req.session.user,psw:req.session.psw,tit:"8"})
			})
		})
	})
})



//会员详细信息
router.get("/memberdetail",(req,res)=>{
	console.log(req.query.id)
	let index=req.query.id;
	mongodb.connect(db_str,(err,database)=>{
		database.collection("member",(err,col)=>{
			col.find({}).sort({_id:-1}).toArray((err,data)=>{
				res.render("home",{data:data[index],tit:"9",user: req.session.user,_id:data[index]._id});
				console.log(data[index]);
				database.close();
			})
		})
	})
})



//编辑修改会员信息
router.get("/editor",(req,res)=>{
	let str={_id:ObjectID(req.query.id)};
	console.log(str);
	mongodb.connect(db_str,(err,database)=>{
		database.collection("member",(err,col)=>{
			col.find(str).toArray((err,data)=>{
				console.log(data)
				res.render("home",{tit:"10",data:data,user: req.session.user});
				database.close();
			})
		})
	})
})









//  转接

router.get("/jsonData",(req,res)=>{
  var option = {
    hostname: "www.yangyu7.top",
    port: 443,//如果是http协议，这个值为80 ----- 确定的
    path:"/",
    method: "get" //可以忽略
  }
  
  var eleReq = http.request(option, (eleRes) => {
    var html = ""
    eleRes.on("data", function(result){
//    res.send(result)
    html += result;
//    console.log(result)
    })
    eleRes.on("error", function(err){
      console.log(err)
    })
    eleRes.on("end", function(){
      res.send(html)
    })
  })
  eleReq.on("error",function(err){
    console.log(err)
  })
  eleReq.end()


})


module.exports = router;
