
var Promise=require('bluebird');
var request=Promise.promisify(require('request'));
var config=require('../utils/config')







exports.qujujinru = function(req, res, next) {


   res.render('pages/qujujinru', { title: 'Express',data:'123123' });

}


exports.qiyejinru = function(req, res, next) {

   res.render('pages/qiyejinru', { title: 'Express',data:'123123' });

}


exports.company_market=function(req, res, next) {        //单位管理  市场所

   res.render('pages/company_market', { title: 'Express',data:'123123' });

}


exports.dwgl_yq=function(req, res, next) {

    res.render('pages/dwgl_yq', { title: 'Express',data:'123123' });

}
