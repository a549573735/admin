

var Promise=require('bluebird');
var request=Promise.promisify(require('request'));
var config=require('../utils/config')
var api_services=require('../models/api_services');





exports.interface = function(req, res, next) {
    
    
   res.render('pages/admin');

}


exports.admin_market=function(req, res, next) {        //单位管理  市场所

      var form={
		      page:req.query.page||0,
		      size:15
	  }

      api_services.commonRequest('api/app/market/all',"GET",null).then(function (data){

      	 var  datalist={ 
                       href:'/organize/park?id=',
                       title:['市场所名称','市场所地址','联系人','联系方式'],
                       content:data.content,
                       style:['25%','auto','100px','15%'],
                       details:[{_id:'1',msg:'该公司的销售及供应商'},{_id:'2',msg:'该公司的销售及供应商'}],
                       overflow:false,
                       overflow_btn:false

          }
            
              res.render('pages/admin_market',{data:datalist} );

	  }).catch(function (err){

            console.log(err)

	  })

}


exports.admin_park=function(req, res, next) {
    

     api_services.commonRequest('api/app/market/brief/all',"GET",null).then(function (data){
            
 			console.log(data)
             res.render('pages/admin_park', { dataSelect:data.content });

	  }).catch(function (err){

            console.log(err)

	  })
	     
   

}











