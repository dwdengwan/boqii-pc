//引入连接池对象  ../ 上一级
const pool=require('../pool.js');
const express=require('express');
//路由器是express下的一个功能
//创建一个空的路由器
var router=express.Router();
//添加路由
//1.用户注册
router.post('/register',(req,res)=>{
  var obj=req.body;
  //获取用户名，判断用户名是否为空
  var $uphone=obj.uphone;
  if(!$uphone){//如果用户名为空
    res.send({code:401,msg:'uphone required'});
	return;//阻止函数中程序继续往后执行
  }
  var $upwd=obj.upwd;
  if(!$upwd){
    res.send({code:402,msg:'upwd required'});
	return;
  }
  var $uname=obj.uname;
  if(!$uname){
    res.send({code:403,msg:'uname required'});
	return;
  }
  //验证通过，将用户的数据插入到数据表
  pool.query('INSERT INTO boqii_user VALUES(NULL,?,?,?)',[$uphone,$upwd,$uname],(err,result)=>{
    if(err) throw err;
	//如果affectedRows属性大于0，数据插入成功
    if(result.affectedRows>0){
	  res.send({code:200,msg:'reg success'});
	}
  });
});
//2.用户登录
router.post('/login',(req,res)=>{
  //获取浏览器请求的数据
  var obj=req.body;
  console.log(obj);
  //对用户名和密码进行验证
  var $uphone=obj.uphone;
  var $upwd=obj.upwd;
  if(!$uphone){
    res.send({code:401,msg:'uphone required'});
	return;
  }
  if(!$upwd){
    res.send({code:402,msg:'upwd required'});
	return;
  }
  //向数据库boqii_user中查询是否含有用户名和密码相匹配的数据，打印查询结果
  pool.query('SELECT * FROM boqii_user WHERE uphone=? AND upwd=?',[$uphone,$upwd],(err,result)=>{
    console.log(result);
	//查询结果是数组，如果数组的元素个数大于0，说明登录成功；否则说明登录失败
    if(result.length>0){
	  res.send({code:200,msg:'login success'});
	}else{
	  res.send({code:301,msg:'login error'});
	}
  });
});
//3.删除用户
// router.get('/delete',(req,res)=>{
//   var obj=req.query;
//   //判断编号是否为空
//   var $uid=obj.uid;
//   if(!$uid){
//     res.send({code:401,msg:'uid required'});
// 	return;
//   }
//   //执行SQL语句，删除用户表中编号对应的数据
//   pool.query('DELETE FROM xz_user WHERE uid=?',[$uid],(err,result)=>{
//     if(err) throw err;
// 	//判断是否删除成功
// 	if(result.affectedRows>0){
// 	  res.send({code:200,msg:'delete success'});
// 	}else{
// 	  res.send({code:301,msg:'delete error'});
// 	}
//   });
// });
// //4.修改用户
// router.get('/update',(req,res)=>{
//   //获取数据
//   var obj=req.query;
//   //遍历对象，取出每一个属性中的值，判断是否为空
//   var i=400;
//   for(var key in obj){
// 	i++;
//     //获取属性值 obj[key]
// 	//如果属性值是空的，就提示这个属性是必须
// 	if(!obj[key]){
// 	   res.send({code:i,msg:key+' required'});
// 	   return;
// 	}
//   }
//   var $uid=obj.uid;
//   var $email=obj.email;
//   var $phone=obj.phone;
//   var $user_name=obj.user_name;
//   var $gender=obj.gender;
//   //执行SQL语句，更改数据
//   pool.query('UPDATE xz_user SET email=?,phone=?,user_name=?,gender=? WHERE uid=?',[$email,$phone,$user_name,$gender,$uid],(err,result)=>{
//     if(err) throw err;
// 	//根据结果做出相应
// 	if(result.affectedRows>0){
// 	  res.send({code:200,msg:'update success'});
// 	}else{
// 	  res.send({code:301,msg:'update error'});
// 	}
//   });
// });
// //5.检索用户
// router.post('/detail',(req,res)=>{
//   //获取数据
//   var obj=req.body;
//   //判断是否为空
//   var $uid=obj.uid;
//   if(!$uid){
//     res.send({code:401,msg:'uid required'});
// 	return;
//   }
//   //执行SQL语句，查询对应的数据
//   pool.query('SELECT * FROM xz_user WHERE  uid=?',[$uid],(err,result)=>{
//     if(err) throw err;
// 	//查询的结果是数组，根据数组的长度判断是否查询到了结果
// 	if(result.length>0){
// 	  //把结果响应给浏览器
// 	  res.send(result);
// 	}else{
// 	  res.send({code:301,msg:'not found'});
// 	}
//   });
// });
// //6.用户列表
// router.get('/list',(req,res)=>{
//   //获取数据
//   var obj=req.query;
//   //如果浏览器传递的页码和数量是字符串，需要转为整型
//   var $pno=parseInt(obj.pno);
//   var $count=parseInt(obj.count);
//   //如果页码或者数量为空设置默认值
//   if(!$pno){
//     $pno=1;
//   }
//   if(!$count){
//     $count=2;
//   }
//   //计算每页开始查询的值
//   var $start=($pno-1)*$count;
//   //执行SQL语句，查询用户
//   pool.query('SELECT * FROM xz_user LIMIT ?,?',[$start,$count],(err,result)=>{
//     if(err) throw err;
//     //无论结果是多少条记录，都直接响应给浏览器
//     res.send(result);
//   });
// });
//导出路由器
module.exports=router;




