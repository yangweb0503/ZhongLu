var express = require('express');
var router = express.Router();
var mongodb = require("mongodb").MongoClient;
const db_str = "mongodb://39.106.149.233:27017/ZhongLu";
var ObjectID = require('mongodb').ObjectID;
var multiparty=require('multiparty')
var fs=require('fs')
var upload=require("./upload")

/* GET users listing. */
router.get('/', function(req, res, next) {
	res.send('respond with a resource');
});

//登录
router.post("/login", (req, res) => {
	let str = req.body;
	//console.log(str);
	mongodb.connect(db_str, (err, database) => {
		database.collection("users",(err, col) => {
			col.find({user:str.user}).toArray((err, data) => {
				if(data.length > 0) {
					col.find(str).toArray((err, data) => {
						if(data.length > 0) {
							req.session.user=str.user;
							req.session.psw=str.psw;
							res.send("1")
						} else {
							res.send("3")
						}
					})
				}else{
					res.send("2")
				}
				database.close();
			})

		})
	})
})


//提交个人信息
router.post("/message",(req,res)=>{
	let str=req.body;
	console.log(str)
	mongodb.connect(db_str,(err,database)=>{
		database.collection("info",(err,col)=>{
			col.update({user:str.user},{$set:str},false,true);
			res.send("1");
			database.close();
		})
	})
	
})


//留言
router.post("/liuyan",(req,res)=>{
	let str=req.body;
	console.log(typeof str)
	mongodb.connect(db_str,(err,database)=>{
		database.createCollection("liuyan",(err,col)=>{
			col.insertOne(str);
			res.send("1")
			database.close();
		})
	})
})

//逐条删除留言
router.post("/delliuyan",(req,res)=>{
	//console.log(req.body._id);
	let str={_id:ObjectID(req.body._id)};
	console.log(str);
	mongodb.connect(db_str,(err,database)=>{
		database.collection("liuyan",(err,col)=>{
			col.remove(str,()=>{
				res.send("1");
				database.close();
			})
		})
	})
})



//修改留言
router.post("/recompose",(req,res)=>{
	var str=req.body;
	var str1={_id:ObjectID(req.body.id)}
	mongodb.connect(db_str,(err,database)=>{
		database.collection("liuyan",(err,col)=>{
			col.update(str1,{$set:str},false,true);
			res.send("1");
			database.close();
		})
	})
})


//查询留言
router.post("/search",(req,res)=>{
	var str=req.body.tit;
	mongodb.connect(db_str,(err,database)=>{
		database.collection("liuyan",(err,col)=>{
			col.find({tit:str}).toArray((err,data)=>{
				res.send(data);
				database.close();
			})
		})
	})

})


//添加会员
router.post("/addMember",(req,res)=>{
	let str=req.body;
	console.log(str)
	mongodb.connect(db_str,(err,database)=>{
		database.createCollection("member",(err,col)=>{
			col.insertOne(str);
			res.send("1")
			database.close();
		})
	})
})

//删除会员
router.post("/delmember",(req,res)=>{
	let str={_id:ObjectID(req.body._id)};
	console.log(str);
	mongodb.connect(db_str,(err,database)=>{
		database.collection("member",(err,col)=>{
			col.remove(str,()=>{
				res.send("1");
				database.close();
			})
		})
	})
})


//修改会员信息
router.post("/editor",(req,res)=>{
	var str=req.body;
	console.log(str);
	console.log(req.body.id)
	var str1={_id:ObjectID(req.body.id)}
	console.log({_id:ObjectID(req.body.id)})
	mongodb.connect(db_str,(err,database)=>{
		database.collection("member",(err,col)=>{
			col.update(str1,{$set:str},false,true);
			res.send("1");
			database.close();
		})
	})
})


//查询用户
router.post("/searchUser",(req,res)=>{
	var str=req.body.tit;
	console.log(str);
	mongodb.connect(db_str,(err,database)=>{
		database.collection("member",(err,col)=>{
			col.find({username:str}).toArray((err,data)=>{
				res.send(data);
				database.close();
			})
		})
	})

})

//批量删除
router.post("/delManyMember",(req,res)=>{
	//console.log(req.body);
	let str=req.body;
	console.log(str);
	mongodb.connect(db_str,(err,database)=>{
		database.collection("member",(err,col)=>{
			for(var i in str){
				let str1={_id:ObjectID(str[i])};
				console.log(str1);
				col.remove(str1,()=>{
				})
			}
			res.send("1");
			database.close()
		})
	})
})


//图片上传
router.post("/uploadImg",(req,res)=>{
	upload(req,res);
})


module.exports = router;