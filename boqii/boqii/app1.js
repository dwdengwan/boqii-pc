//使用express构建web服务器 
const express = require('express');
//引入数据库模块
const pool = require("./pool");
/*引入路由模块*/

var app = express();

// 加载第三方模块:express-session
// 创建session对象 保存用户id
const session=require("express-session");
//对模块配置
app.use(session({
  secret:"128位随机字符串",//安全令牌
  resave:false,           //每次请求是否需要保存
  saveUninitialized:true, //初始化
  cookie:{                //sessionid保存时
    maxAge:1000*60*60*24  //1天
  }
}));
var server = app.listen(3000);

//跨域访问配置
//1.加载模块cors
const cors=require("cors");
//2.配置cors
app.use(cors({
    //允许列表
    origin:["http://127.0.0.1:5500","http://localhost:5500"],
    //是否验证
    credentials:true
}))

//托管静态资源到public目录下
app.use(express.static('public'));
/*使用路由器来管理路由*/

//http://127.0.0.1:3000/img/banner1.png
//express mysql 参数 request; response复习好好复习

//功能一:列表页轮播 getImages
app.get("/getListImages",(req,res)=>{
    var rows=[
        {id:1,img_url:"img/list/list_headerfirst1.jpg"},
        {id:2,img_url:"img/list/list_headerfirst2.jpg"},
        {id:3,img_url:"img/list/list_headerfirst3.jpg"},
        {id:4,img_url:"img/list/list_headerfirst4.jpg"}
    ];
    res.send(rows);
})

//功能二:新闻分页显示
app.get("/getNews",(req,res)=>{
    //1:参数       pno 页码;pageSize 页大小
    var pno = req.query.pno;
    var pageSize = req.query.pageSize;
    //1.2:默认值
    if(!pno){
      pno = 1;
    }
    if(!pageSize){
      pageSize = 7;
    }
    //2:验证正则表达式
    var reg = /^[0-9]{1,}$/;
    if(!reg.test(pno)){
       res.send({code:-1,msg:"页码格式不正确"});
       return;
    }
    if(!reg.test(pageSize)){
      res.send({code:-2,msg:"页大小格式不正确"});
      return;
    }
    //3:创建sql
    //  查询总页数
    var sql = "SELECT count(id) as c FROM xz_news";
    var progress = 0; //sql执行进度
    obj = {code:1};
    pool.query(sql,(err,result)=>{
         if(err)throw err;
         //console.log(result[0].c);
         var pageCount = Math.ceil(result[0].c/pageSize);
         obj.pageCount = pageCount;
         progress += 50;
         if(progress == 100){
            //  console.log(obj);
          res.send(obj);
         }
    });
    //  查询当前页内容
  var sql=" SELECT id,ctime,title,img_url,point";
      sql +=" FROM xz_news";
      sql +=" LIMIT ?,?"
  var offset = parseInt((pno-1)*pageSize);
  pageSize = parseInt(pageSize);
    pool.query(sql,[offset,pageSize],(err,result)=>{
      if(err)throw err;
      //console.log(result);
      obj.data = result;
      progress+=50;
      if(progress==100){
        // console.log(obj);
        res.send(obj);
      }
    }); 
  })

//功能三:依据新闻编号查询新闻详细信息
app.get("/getNewsInfo",(req,res)=>{
  //1:参数   id
  var id = req.query.id;
  //2:sql    SELECT id,title,ctime,content FROM 
  //         xz_news WHERE id = ?
  var sql=" SELECT id,title,ctime,content";
      sql+=" FROM xz_news WHERE id = ?";
  //3:json   {code:1,data:obj}
  pool.query(sql,[id],(err,result)=>{
      if(err)throw err;
      res.send({code:1,data:result[0]});
  })
})
//功能四:增加评论信息
app.get("/addComment",(req,res)=>{
  var nid=req.query.nid;//评论者id
  var content=req.query.content;//评论内容
  var sql="INSERT INTO xz_comment(id,content,ctime,nid) VALUES(null,?,now(),?)";
  pool.query(sql,[content,nid],(err,result)=>{
    if (err) throw err;
    if(result.affectedRows>0)
    res.send({code:1,msg:"评论发表成功!"});
    else 
    res.send({code:-1,msg:"评论发表失败!"});
  })
})

// 功能五 依据新闻编号(id),查询指定新闻标号评论列表
app.get("/getComments",(req,res)=>{
  //1:参数       pno 页码;pageSize 页大小
  var pno = req.query.pno;
  var pageSize = req.query.pageSize;
  var nid = parseInt(req.query.nid);
  //1.2:默认值
  if(!pno){
    pno = 1;
  }
  if(!pageSize){
    pageSize = 7;
  }
  //2:验证正则表达式
  var reg = /^[0-9]{1,}$/;
  if(!reg.test(pno)){
     res.send({code:-1,msg:"页码格式不正确"});
     return;
  }
  if(!reg.test(pageSize)){
    res.send({code:-2,msg:"页大小格式不正确"});
    return;
  }
  //3:创建sql
  //  查询总页数
  var sql = "SELECT count(id) as c FROM xz_comment";
  sql +=" WHERE nid = ?"
  var progress = 0; //sql执行进度
  obj = {code:1};
  pool.query(sql,[nid],(err,result)=>{
       if(err)throw err;
       //console.log(result[0].c);
       var pageCount = Math.ceil(result[0].c/pageSize);
       obj.pageCount = pageCount;
       progress += 50;
       if(progress == 100){
        res.send(obj);
       }
  });
  //  查询当前页内容
var sql=" SELECT id,ctime,content";
    sql +=" FROM xz_comment";
    sql +=" WHERE nid = ? ORDER BY id DESC"
    sql +=" LIMIT ?,?"
var offset = parseInt((pno-1)*pageSize);
pageSize = parseInt(pageSize);
  pool.query(sql,[nid,offset,pageSize],(err,result)=>{
    if(err)throw err;
    //console.log(result);
    obj.data = result;
    progress+=50;
    if(progress==100){
      res.send(obj);
    }
  }); 
})
//#功能六(1):热卖商品列表
app.get("/getRmList",(req,res)=>{
  var pno=req.query.pno;
  var pageSize=req.query.pageSize;
  if(!pno) pno=1;
  if(!pageSize) pageSize=3;
  var sql = "SELECT count(id) as c FROM list2_rm";
  var progress = 0; //sql执行进度
  obj = {code:1};
  pool.query(sql,(err,result)=>{
       if(err)throw err;
       //console.log(result[0].c);
       var pageCount = Math.ceil(result[0].c/pageSize);
       obj.pageCount = pageCount;
       progress += 50;
       if(progress == 100){
        res.send(obj);
       }
  });
  //  查询当前页内容
var sql=" SELECT * FROM list2_rm LIMIT ?,?";
var offset = parseInt((pno-1)*pageSize);
pageSize = parseInt(pageSize);
  pool.query(sql,[offset,pageSize],(err,result)=>{
    if(err)throw err;
    //console.log(result);
    obj.data = result;
    progress+=50;
    if(progress==100){
      res.send(obj);
    }
  })
})
//#功能六(2):品牌推荐列表
app.get("/getPptjList",(req,res)=>{
  var obj=req.query;
  var sql="select * from list2_pptj";
  pool.query(sql,(err,result)=>{
    if(err) throw err;
    console.log(result);
    res.send(result);
  })
})
//#功能六(3):list 狗狗推荐
app.get("/getGgtjList",(req,res)=>{
  var pno=req.query.pno;
  var pageSize=req.query.pageSize;
  if(!pno) pno=1;
  if(!pageSize) pageSize=6;
  var sql = "SELECT count(id) as c FROM list_ggtj";
  var progress = 0; //sql执行进度
  obj = {code:1};
  pool.query(sql,(err,result)=>{
       if(err)throw err;
       //console.log(result[0].c);
       var pageCount = Math.ceil(result[0].c/pageSize);
       obj.pageCount = pageCount;
       progress += 50;
       if(progress == 100){
        res.send(obj);
       }
  });
  //  查询当前页内容
var sql=" SELECT * FROM list_ggtj LIMIT ?,?";
var offset = parseInt((pno-1)*pageSize);
pageSize = parseInt(pageSize);
  pool.query(sql,[offset,pageSize],(err,result)=>{
    if(err)throw err;
    //console.log(result);
    obj.data = result;
    progress+=50;
    if(progress==100){
      res.send(obj);
    }
  })
});
//#功能六(4):details 同类推荐
app.get("/getDetailsList",(req,res)=>{
  var pno=req.query.pno;
  var pageSize=req.query.pageSize;
  if(!pno) pno=1;
  if(!pageSize) pageSize=5;
  var sql="select * from details_tltj";
  pool.query(sql,(err,result)=>{
    if(err) throw err;
    res.send(result);
  })
})
//#功能六(5):index_page 轮播图下列表
app.get("/getIndexPage",(req,res)=>{
  var sql="select * from index_page";
  pool.query(sql,(err,result)=>{
    if(err)throw err;
    res.send(result);
  })
})
//#功能六:商品列表
app.get("/getGoodsList",(req,res)=>{
  //1:参数       pno 页码;pageSize 页大小
  var pno = req.query.pno;
  var pageSize = req.query.pageSize;
  // console.log(pno,pageSize)
  //1.2:默认值
  if(!pno){
    pno = 1;
  }
  if(!pageSize){
    pageSize = 6;
  }
  //2:验证正则表达式
  var reg = /^[0-9]{1,}$/;
  if(!reg.test(pno)){
     res.send({code:-1,msg:"页码格式不正确"});
     return;
  }
  if(!reg.test(pageSize)){
    res.send({code:-2,msg:"页大小格式不正确"});
    return;
  }
  //3:创建sql
  //  查询总页数
  var sql = "SELECT count(id) as c FROM list2_lby";
  var progress = 0; //sql执行进度
  obj = {code:1};
  pool.query(sql,(err,result)=>{
       if(err)throw err;
       //console.log(result[0].c);
       var pageCount = Math.ceil(result[0].c/pageSize);
       obj.pageCount = pageCount;
       progress += 50;
       if(progress == 100){
        res.send(obj);
       }
  });
  //  查询当前页内容
var sql=" SELECT * FROM list2_lby LIMIT ?,?";
var offset = parseInt((pno-1)*pageSize);
pageSize = parseInt(pageSize);
  pool.query(sql,[offset,pageSize],(err,result)=>{
    if(err)throw err;
    //console.log(result);
    obj.data = result;
    progress+=50;
    if(progress==100){
      res.send(obj);
    }
  }); 
});

//功能七:商品购物车
app.get("/addCart",(req,res)=>{
  //1:参数 uid pid price count
  var uid   = parseInt(req.query.uid);
  var pid   = parseInt(req.query.pid);
  var price = parseFloat(req.query.price);
  var count = parseInt(req.query.count);
  //2:sql  INSERT
  var sql=" INSERT INTO `xz_cart`(`id`, ";
      sql+=" `uid`, `pid`, `price`,";
      sql+=" `count`) VALUES (null,?,?,?,?)";
  pool.query(sql,[uid,pid,price,count],(err,result)=>{
      if(err)throw err;
      if(result.affectedRows > 0){
        res.send({code:1,msg:"添加成功"});
      }else{
        res.send({code:-1,msg:"添加失败"});
      }
  })
  //3:json {code:1,msg:"添加成功"}
});

//功能八:查询商品详细信息
app.get("/getProduct",(req,res)=>{
  //1:参数 商品id
  var pid = parseInt(req.query.id);
  //2:sql  SELECT id,name,price,
  var sql =" SELECT `id`, `name`, `img_url`";
  sql+=" , `price`, `bank` FROM `xz_product`"; sql+=" WHERE id=?";
  pool.query(sql,[pid],(err,result)=>{
     if(err)throw err;
     res.send({code:1,data:result[0]})
  });
  //3:json {code:1,data:{}}
});

//功能九:用户注册
app.get("/register",(req,res)=>{
  var name=req.query.name;
  var pwd=req.query.pwd;
  var reg=/^\w{8,12}$/;
  if(!reg.test(name)){
    res.send({code:-1,msg:"用户名格式不正确"});
    return;
  }
  var sql="INSERT INTO xz_login values(null,?,md5(?))";
  pool.query(sql,[name,pwd],(err,result)=>{
    if(err) throw err;
    if(result.affectedRows>0){
      res.send({code:1,msg:"success"})
    }else{
      res.send({code:-1,msg:"err"})
    }
  })
})

//功能十:用户名是否存在
app.get("/existsName",(req,res)=>{
  var name=req.query.name;
  var sql="select count(id) as c,id from xz_login where name=?";
  pool.query(sql,[name],(err,result)=>{
      if(err) throw err;
      // console.log(result);
      if(result[0].c>0)
      res.send({
        code:-1,msg:"err"
      })
      else res.send({code:1,msg:"success"})
  })
})

//功能十一:用户登录
app.get("/login",(req,res)=>{
  // 1.获取登录
  var name=req.query.name;
  var pwd=req.query.pwd;
  // 2.正则验证
  // var reg=/^$/;
  // 3.创建sql
  var sql="SELECT count(id) as c,id FROM xz_login WHERE name=? AND pwd=md5(?)";
  pool.query(sql,[name,pwd],(err,result)=>{
    if(err) throw err;
    var c=result[0].c;
    if(c==1){
      req.session.uid=result[0].id;
      res.send({code:1,msg:"sucess"});
  }else{
    res.send({code:-1,msg:"defalt"})
  }
  })
  // 4.如果参数匹配成功将用户id保存session对象
  // 5.返回结果
})

//功能十二:查询购物车中的数据
app.get("/getCartList",(req,res)=>{
  // 1.参数
  var uid=req.session.uid;
  // 2.sql
  var sql="select p.name,c.count,c.price,c.id";
  sql+=" from xz_product p,xz_cart c";
  sql+=" where p.id=c.pid";
  sql+=" and c.uid=?";
  // 3.json
  pool.query(sql,[uid],(err,result)=>{
    if(err) throw err;
    res.send({code:1,data:result})
  })
})

//功能十三:同步更新购物车数据count id
app.get("/updateCart",(req,res)=>{
  var id=req.query.id;
  var count=req.query.count;
  var sql="update xz_cart set count=? where id=?";
  pool.query(sql,[count,id],(err,result)=>{
    if(err) throw err;
    if(result.affectedRows>0)
    res.send({code:1,msg:"update sucess"});
    else res.send({code:-1,msg:"update defalt!!"})
    // console.log(result);
  })
})