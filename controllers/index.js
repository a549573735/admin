
var Promise=require('bluebird');
var request=Promise.promisify(require('request'));
var config=require('../utils/config')


var api_user=require('../models/api_user');


exports.index=function(req, res, next) {

  var data={ 
                  data:{

                        title:['企业名称','检查状态','检查员','检查日期','备注'],
                        content:[
                                      ['上海医德医疗设备有限公司','true','王先生','2016-06-29'],
                                      ['上海医德医疗设备有限公司','true','朱王杰','2016-06-29']
                                 ],
                        style:['25%','100px','100px','15%','auto'],
                        details:[{_id:'1',msg:'该公司的销售及供应商'},{_id:'2',msg:'该公司的销售及供应商'}]
                         
                   },
                  pagelist:5 
           }
             
   //   request({method:'POST',url:config.internal.host+'/api/app/role/permission/DISTRICT/list',json:true}).then(function (data){
       

   //     console.log(data.body)


   // })GET /api/app/user/login/{username}/{password}


 

   
   res.render('pages/details', data );

}


exports.common = function(req, res, next) {


   //  api_user.loginUp('api/app/user/login/','GET',{username:123,password:123}).then(function (data){
    
   //    console.log(data)

   // }).catch(function (err){

   //    console.log(err)
   // })


   res.render('pages/common', {
      title: 'common'
   });



}




exports.publicity = function(req, res, next) {

   res.render('pages/publicity', { title: 'Express',data:'123123' });

}




exports.inspect = function(req, res, next) {            //网络

   res.render('pages/inspect', { title: 'Express',data:'123123' });

}



exports.suggestion = function(req, res, next) {        //行政建议列表

   res.render('pages/suggestion', { title: 'Express',data:'123123' });

}



exports.interview = function(req, res, next) {        //行政约谈列表

   res.render('pages/interview', { title: 'Express',data:'123123' });

}






exports.appointment = function(req, res, next) {

   res.render('pages/appointment', { title: 'Express',data:'123123' });

}





