var express = require('express');
var router = express.Router();


// node链接数据库
const mysql  = require('mysql');  
var connection = mysql.createConnection({     
  host: 'localhost',       
  user: 'root',              
  password : 'wei21hao',       
  port: '3306',                   
  database: 'test' 
}); 
connection.connect();




/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

router.post('/login', function(req, res, next) {
  console.log(req);

  // 操作数据库
  let optUsername = "SELECT * FROM user WHERE username ='" + req.body.username + "'";

  connection.query(optUsername,function (err, userresult) {    
    if(!userresult.length){
      res.send({
        code: 200,
        success: false,
        message: '用户还没有注册'
      })
    }else{
      let optPassword = "SELECT * FROM user WHERE username='" + req.body.username + "'AND password='" + req.body.password + "'";
      connection.query(optPassword,function (err, passwordresult) { 
        if(!passwordresult.length){
          res.send({
            code: 200,
            success: false,
            message: '用户密码错误'
          })
        }else{
          res.send({
            user:{
              token: 'rdqfwegrehtfqwere',
              username: userresult[0].username
            },
            code: 200,
            success: true
          })
        }
      })

    }
  });
});

module.exports = router;
