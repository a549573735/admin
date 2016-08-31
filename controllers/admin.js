

//var services=require('../services/index.js');


exports.data=function(req, res, next) {

 
   
   res.json({ title: 'Express',data:'123123'});

}



exports.index=function(req, res, next) {


   console.log(req.query.name)
   
   res.render('pages/index', { title: 'Express',data:'123123'} );

}


exports.zxp = function(req, res, next) {

   res.render('pages/zxp', {
      title: 'zxp'
   });

}


exports.login = function(req, res, next) {

   res.render('pages/login', { title: 'Express' });

};




exports.dwgl_scs=function(req, res, next) {

 res.render('pages/dwgl_scs', { title: 'Express',data:'123123' });

}



exports.dwgl_yq=function(req, res, next) {

    res.render('pages/dwgl_yq', { title: 'Express',data:'123123' });

}


exports.jsgl_bjgly=function(req, res, next) {

     res.render('pages/jsgl_bjgly', { title: 'Express',data:'123123' });

}


exports.jsgl_zjyh=function(req, res, next) {

   res.render('pages/jsgl_zjyh', { title: 'Express',data:'123123' });

}


exports.nbgs_lb = function(req, res, next) {

   res.render('pages/nbgs_lb', { title: 'Express',data:'123123' });

}


exports.qujujinru = function(req, res, next) {

   res.render('pages/qujujinru', { title: 'Express',data:'123123' });

}

exports.qiyejinru = function(req, res, next) {

   res.render('pages/qiyejinru', { title: 'Express',data:'123123' });

}




exports.wljc_lb = function(req, res, next) {

   res.render('pages/wljc_lb', { title: 'Express',data:'123123' });

}



exports.xzjy_lb = function(req, res, next) {

   res.render('pages/xzjy_lb', { title: 'Express',data:'123123' });

}



exports.xzyt_lb = function(req, res, next) {

   res.render('pages/xzyt_lb', { title: 'Express',data:'123123' });

}



exports.yhlb_bjyh = function(req, res, next) {

   res.render('pages/yhlb_bjyh', { title: 'Express',data:'123123' });

}




exports.yhlb_zjyh = function(req, res, next) {

   res.render('pages/yhlb_zjyh', { title: 'Express',data:'123123' });

}




exports.yqjr_qy = function(req, res, next) {

   res.render('pages/yqjr_qy', { title: 'Express',data:'123123' });

}




exports.yqnb_gslb = function(req, res, next) {

   res.render('pages/yqnb_gslb', { title: 'Express',data:'123123' });

}



exports.yyjc_lb = function(req, res, next) {

   res.render('pages/yyjc_lb', { title: 'Express',data:'123123' });

}




exports.qjjr_qy = function(req, res, next) {

   res.render('pages/qjjr_qy', { title: 'Express',data:'123123' });

}



exports.qjjr_scs = function(req, res, next) {

   res.render('pages/qjjr_scs', { title: 'Express',data:'123123' });

}


exports.qjjr_qyjy = function(req, res, next) {

   res.render('pages/qjjr_qyjy', { title: 'Express',data:'123123' });

}


exports.qjjr_yq = function(req, res, next) {

   res.render('pages/qjjr_yq', { title: 'Express',data:'123123' });

}


exports.qijujinru = function(req, res, next) {

   res.render('pages/qujujinru', { title: 'Express',data:'123123' });

}



exports.wljc_lb = function(req, res, next) {

   res.render('pages/wljc_lb', { title: 'Express',data:'123123' });

}


