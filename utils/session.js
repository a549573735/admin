var session=require('express-session');
var nav=require('./rolt_nav');
var _=require('lodash');

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
             if(_user.content.type=="BACKSTAGE"){

                 _user.content.navlist=nav.navData.backStage
            	 
             }else{
              
               if( _user.content.permissions.length==0)return 

                var dest=[]
          
               nav.navData.subAdmin.forEach(function (item){
 
                   if (_.includes(_user.content.permissions, item.code)){ 

                         dest.push(item)

                   }

                   if(item.list){
                       item.list.forEach(function (part){

                             if (_.includes(_user.content.permissions, part.code)){ 
                                    dest.push(item)
                             }
                       })
                   }
               })
               
                _user.content.navlist=_.uniq(dest)
             }
        }
             app.locals.user=_user

       next()

   })

}