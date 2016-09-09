var session=require('express-session');
var nav=require('../utils/rolt_nav');

module.exports=function (app){
   
	app.use(session({
		secret:'secret',
		resave:true,
		saveUninitialized:false,
		cookie:{
		maxAge:1000*60*10000 //过期时间设置(单位毫秒)
		}
	}));

	 //预处理
   app.use(function (req,res,next){

       var _user=req.session.user||false

        if(_user){
           if(_user.content.belongId=="ROOT"|| _user.content.belongId=="DISTRICT"|| _user.content.belongId=="MARKET"){
         	
          	  _user.content.navlist=nav.navData.subAdmin
           
           }else if(_user.belongId=="PARK"){

              _user.content.navlist=nav.navData.parkAdmin

           }else if(_user.belongId=="backStage"){
              
              _user.content.navlist=nav.navData.backStage

           }
        }
             app.locals.user=_user

       next()

   })

}