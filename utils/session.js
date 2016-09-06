var session=require('express-session');
var nav=require('../utils/rolt_nav');

module.exports=function (app){
   
	app.use(session({
		secret:'secret',
		resave:true,
		saveUninitialized:false,
		cookie:{
		maxAge:1000*60*1000 //过期时间设置(单位毫秒)
		}
	}));


	 //预处理
   app.use(function (req,res,next){
       var _user=req.session.user||false
           if(_user){
         		  _user.content.navlist=nav.navData.subAdmin
            }
       app.locals.user=_user

       console.log(app.locals.user)

       next()

   })

}