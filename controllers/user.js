var path=require('path'); 
var fs=require('fs');
var api_user=require('../models/api_user');

var md5=require('md5');



exports.login = function(req, res, next) {

    res.render('pages/login',{});

};


exports.loginUp = function(req, res, next) {

          
        var data=req.body;

        data.password=md5(data.password)
        console.log(JSON.stringify(data))
    
        api_user.loginUp('api/app/user/login/','GET',data).then(function (data){
             
            if(data.success){

               
                
                 
                 req.session.user=data
                
                 res.json({msg:'登录成功',state:true})

            }else {
                 res.json({msg:'用户名密码错误',state:false})
            }

        }).catch(function (err){
             console.log(err)
             res.json({msg:'服务器错误',state:false})

        })
}

exports.signOut=function (req,res,next){
    
      delete req.session.user;
       
      redirect('/login') 

}




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



exports.user_edit_list = function(req, res, next) {

   res.render('pages/user_edit_list', { title: 'Express',data:'123123' });

}




exports.user_add = function(req, res, next) {

   res.render('pages/user_add', { title: 'Express',data:'123123' });
   
}



exports.user_edit=function(req, res, next) {

     res.render('pages/user_edit', { title: 'Express',data:'123123' });

}


exports.user_admin_add=function(req, res, next) {

   res.render('pages/user_admin_add', { title: 'Express',data:'123123' });

}






