

var Promise=require('bluebird');
var request=Promise.promisify(require('request'));
var config=require('../utils/config')







exports.company = function(req, res, next) {

   res.render('pages/company', { title: 'Express',data:'123123' });

}


exports.company_market=function(req, res, next) {        //单位管理  市场所

   res.render('pages/company_market', { title: 'Express',data:'123123' });

}


exports.company_park=function(req, res, next) {

    res.render('pages/company_park', { title: 'Express',data:'123123' });

}







