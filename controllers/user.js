

var path=require('path');




exports.login = function(req, res, next) {
  
  // req.session.user='user'

   res.render('pages/login', { title: 'Express' });

};


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






