var session=require('express-session');

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
       app.locals.user=_user
       next()

   })

}