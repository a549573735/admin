var path=require('path'); 
var fs=require('fs');
var api_services=require('../models/api_services');
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

        api_services.loginUp('api/app/user/verify','POST',str).then(function (data){
             
            data=JSON.parse(data);
            //console.log(data)

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

                //user/edit/list

      res.render('pages/user_edit_list');          
    

}

exports.api_user_edit_list = function(req, res, next) {

    var _id=req.query.id || req.session.user.content.id 
    var page=req.query.page

      var data={
                "page": page||0,
                "size": 15
                }

    api_services.commonRequest('api/app/user/'+_id+'/list',"POST",data).then(function (data){

           console.log(data.content)
           res.json(data)

      }).catch(function (err){
           
           console.log(err)
           res.json({msg:'用户列表服务器错误',state:false})

      })

}



/* 获取用户权限列表*/

exports.user_add = function(req, res, next) {

   var type=req.body.type||"DISTRICT"; 


         res.render('pages/user_add');
   
}


    /* 权限列表 用户权限列表*/

exports.user_add_list = function(req, res, next) {

   var type=req.body.type||"DISTRICT"; 

   api_services.commonRequest('api/app/role/permission/'+type+'/list',"GET",null).then(function (data){
        
       
         res.json(data);
     

   }).catch(function (err){
           
         console.log(err)
         res.json({msg:'用户权限列表服务器错误',state:false})

   })
}



exports.user_role=function(req, res, next) {

     res.render('pages/user_role_list');


}



   /* 权限列表 用户权限列表*/

exports.user_admin_add=function(req, res, next) {
    
    var type=req.body.type||"DISTRICT"; 
   
    api_services.commonRequest('api/app/role/'+type+'/list',"GET",null).then(function (data){
        
            //console.log(data)
         res.render('pages/user_admin_add', data);
     
   }).catch(function (err){
           
           console.log(err)

         res.render('pages/user_admin_add',{msg:'用户权限列表服务器错误',state:false});
     

   })

}




/* 添加用户 */

 exports.Post_add_user=function (req,res,next){

     var form=req.body;
       // console.log(form)
     form.belongId=form.type=='DISTRICT'?req.session.user.content.id:form.belongId

     api_services.commonRequest('api/app/user/add',"POST",form).then(function (data){

            console.log(data)
            res.json(data)

     }).catch(function (err){
            console.log(err)
            res.json({msg:'服务器用户添加错误',state:false})

     })


 }


 exports.delete_user=function (req,res,next){
     
       var arr=[]

       var data=req.body['user[]'];
        if(typeof data =='string'){
          arr.push(data)
        }else {
          arr=data
        }
  
       api_services.commonRequest('api/app/user/delete',"DELETE",arr).then(function (data){

                  res.json(data)

       }).catch(function (err){

                  res.json({msg:'服务器用户添加错误',state:false})

       })

 }



 exports.put_user=function (req,res,next){

       var data=req.body;

       api_services.commonRequest('api/app/user/modify',"PUT",data).then(function (data){
                console.log(data)
                  res.json(data)

       }).catch(function (err){

                  res.json({msg:'服务器用户更新错误',state:false})

       })

 }


  exports.add_role=function (req,res,next){
      
       var data={
            name:req.body.name,
            permissionIds:[],
            type:req.body.type,
          
       }

       if(typeof req.body['permissionIds[]'] =='string'){
          data.permissionIds.push(req.body['permissionIds[]'])
    
        }else {
           data.permissionIds=req.body['permissionIds[]']
        }
  

       api_services.commonRequest('api/app/role/add',"POST",data).then(function (data){
             
                  res.json(data)

       }).catch(function (err){

                  res.json({msg:'服务器用户更新错误',state:false})

       })

 }



exports.user_role_list = function(req, res, next) {

   var type=req.body.type||"DISTRICT"; 



   api_services.commonRequest('api/app/role/'+type+'/list',"GET",null).then(function (data){
        
    
       
         res.json(data);
     

   }).catch(function (err){
           
         console.log(err)
         res.json({msg:'用户权限列表服务器错误',state:false})

   })
}

//DELETE /api/app/role/delete
exports.delete_user_role = function (req,res,next){

       var arr=[]

       var data=req.body['id[]'];
        if(typeof data =='string'){
          arr.push(data)
        }else {
          arr=data
        }

          console.log(11111,arr)
       
       api_services.commonRequest('/api/app/role/delete',"DELETE",arr).then(function (data){
                  console.log(data)
                  res.json(data)

       }).catch(function (err){


                  res.json({msg:'服务器用户添加错误',state:false})

       })

}






//  GET /api/app/role/{type}/list


 


















