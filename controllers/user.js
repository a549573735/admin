

var path=require('path');




exports.login = function(req, res, next) {

   res.render('pages/login', { title: 'Express' });

};



exports.yhlb_bjyh = function(req, res, next) {

   res.render('pages/yhlb_bjyh', { title: 'Express',data:'123123' });

}




exports.yhlb_zjyh = function(req, res, next) {

   res.render('pages/yhlb_zjyh', { title: 'Express',data:'123123' });

}



exports.jsgl_bjgly=function(req, res, next) {

     res.render('pages/jsgl_bjgly', { title: 'Express',data:'123123' });

}


exports.jsgl_zjyh=function(req, res, next) {

   res.render('pages/jsgl_zjyh', { title: 'Express',data:'123123' });

}






