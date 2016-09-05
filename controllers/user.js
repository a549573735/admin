

var path=require('path');
var ccap = require('ccap')();//Instantiated ccap class   
var fs=require('fs');





exports.login = function(req, res, next) {


    var ary = ccap.get();
    var txt = ary[0];
    var buf = ary[1];

 //   res.writeHead(200, { 'Content-Type': 'image/png', 'Content-Length': buf.length });
   console.log(res)
    res.render('pages/login',{buf:buf});

};
exports.login_img=function (req,res,next){

    var ary = ccap.get();
    var txt = ary[0];
    var buf = ary[1];
    
    
    console.log((buf))
    res.end(buf)

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






