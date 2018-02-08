var express = require('express');
var router = express.Router();

//导入协议
var https = require("https");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/getData', function(req, res, next) {
 
  res.send("11111111111")
});

//https://h5.ele.me/restapi/shopping/openapi/entries?latitude=32.147141&longitude=114.092789&templates[]=main_template&templates[]=favourable_template&templates[]=svip_template
/**
 * --  解决跨域访问问题
 * http.request
 * https.request
 * 1、导入协议
 *2 配置选项
 * 3、接受数据
 * 4、发送数据
 */
router.get("/getEleList", (req, res, next) => {
  var option = {
    hostname: "h5.ele.me",
    port: 443,//如果是http协议，这个值为80 ----- 确定的
    path:"/restapi/shopping/openapi/entries?latitude=32.147141&longitude=114.092789&templates[]=main_template&templates[]=favourable_template&templates[]=svip_template",
    method: "get" //可以忽略
  }
  
  var eleReq = https.request(option, (eleRes) => {
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
