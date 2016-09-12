var session=require('express-session');
var nav=require('./rolt_nav');
var Services=require('./tool')
var tools=new Services();
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

  function json(obj){
  
      var arr=[]
      for(var i=0;i<obj.length;i++){
          var json={};
         if(!json[obj[i]]){
            json[obj[i]]={code:obj[i]}
         }
         arr.push(json)
      }
      return arr
  }
 
	 //预处理
   app.use(function (req,res,next){

       var _user=req.session.user||false

        if(_user){
             if(_user.content.belongId=="backStage"){

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
               console.log(dest)
                _user.content.navlist=_.uniq(dest)
             }
        }
             app.locals.user=_user

       next()

   })

}