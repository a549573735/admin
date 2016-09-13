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
            	 
             }else if(_user.content.type=="COMPANY"){

                   _user.content.navlist=null

             }else{
              
               if( _user.content.permissions.length==0)return 

                var dest=[]
          
               nav.navData.subAdmin.forEach(function (item){
 
                   if (_.includes(_user.content.permissions, item.code)){ 

                         dest.push(item)
                   }
               })
               var a={href:'javascript:;','parentTitle':'item1',title:'组织',list:[]};
               var b=[]

                dest.forEach(function (item,val){

                    if(item.parentTitle==1){
               
                         a.list.push(item)

                    }else {
                        b.push(item)
                    }
                })

               var c=[a];
               var d =c.concat(b)

               _user.content.navlist=d


             }
        }

             app.locals.user=_user

       next()

   })

}