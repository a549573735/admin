var path=require('path'); 
var fs=require('fs');
var api_user=require('../models/api_user');
var config=require('../utils/config')

var md5=require('md5');



exports.login = function(req, res, next) {

    res.render('pages/login',{});

};


 /*  用户登录 */
exports.loginUp = function(req, res, next) {

        var data=req.body;
        data.password=md5(data.password)
        var str='username='+data.username+'&password='+data.password;

        api_user.loginUp('api/app/user/verify','POST',str).then(function (data){
             
            data=JSON.parse(data);

            if(data.success){
                 
                 req.session.user=data

                 config.headers['User-Token']=data.content.id;
                 
                 res.json({msg:'登录成功',state:true})

            }else {
                // 
                 res.json({msg:'用户名密码错误',state:false})
            }

        }).catch(function (err){
             console.log(err)
             res.json({msg:'服务器错误',state:false})

        })
}


/* 用户登出*/
exports.signOut=function (req,res,next){
    
      delete req.session.user;
       
      res.redirect('/') 

}



/* 判断用户是否登录 */
exports.signRequired=function (req,res,next)
{
        
        var user=req.session.user;

        if(!user){
          res.redirect('/')
        }
        next()
        
}

 exports.adminRequired=function (req,res,next)
{
	var user=req.session.user;



	if(user.rolt<10|| !user.rolt){
		res.redirect('/')
	}
	next()

}


  /*获取用户列表*/

exports.user_edit_list = function(req, res, next) {


      var _id= req.session.user.content.id
      var data={
                "page": 0,
                "size": 0
                }

      api_user.usercommon('api/app/user/'+_id+'/list',"POST",data).then(function (data){

          console.log(data)
         res.render('pages/user_edit_list', data);

      }).catch(function (err){
           
           console.log(err)
           res.json({msg:'用户列表服务器错误',state:false})

      })

}


/* 获取用户权限列表*/

exports.user_add = function(req, res, next) {

   var type=req.body.type||"DISTRICT"; 

   api_user.usercommon('api/app/role/permission/'+type+'/list',"GET",null).then(function (data){
        
         console.log(data)
         res.render('pages/user_add', data);
     

   }).catch(function (err){
           
         console.log(err)
         res.json({msg:'用户权限列表服务器错误',state:false})

   })

   
}

exports.user_add_list = function(req, res, next) {

   var type=req.body.type||"DISTRICT"; 

   api_user.usercommon('api/app/role/permission/'+type+'/list',"GET",null).then(function (data){
        
       
         res.json(data);
     

   }).catch(function (err){
           
         console.log(err)
         res.json({msg:'用户权限列表服务器错误',state:false})

   })
}



exports.user_edit=function(req, res, next) {

     res.render('pages/user_edit', { title: 'Express',data:'123123' });



}


exports.user_admin_add=function(req, res, next) {
    
    var type=req.body.type||"DISTRICT"; 
   
    api_user.usercommon('api/app/role/'+type+'/list',"GET",null).then(function (data){
        
            console.log(data)
         res.render('pages/user_admin_add', data);
     
   }).catch(function (err){
           
           console.log(err)

         res.render('pages/user_admin_add',{msg:'用户权限列表服务器错误',state:false});
     

   })

  //  GET /api/app/role/{type}/list

 

}






