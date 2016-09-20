var session=require('express-session');
var nav=require('./rolt_nav');
var _=require('lodash');

module.exports=function (app){
   
	app.use(session({
		secret:'secret',
		resave:true,
		saveUninitialized:false,
		cookie:{
		maxAge:43200000 //过期时间设置(单位毫秒)
		}
	}));

	 //预处理


}