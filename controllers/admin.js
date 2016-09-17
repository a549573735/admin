

var Promise=require('bluebird');
var request=Promise.promisify(require('request'));
var config=require('../utils/config')
var api_services=require('../models/api_services');





exports.interface = function(req, res, next) {

        var form=req.body||{};
                form.page=req.body.page||0;
                form.size=15;
            
            if(req.query.id){
                form.park=req.query.id
              }
    
    
    api_services.commonRequest('api/app/company/list','POST',form).then(function (data){


        console.log(data.content)
        var  datalist={ 
                       href:'/organize/details?view=company&id=',
                       title:['企业名称','企业地址','所属','联系人','联系方式','经营范围',"操作"],
                       content:data.content.content,
                       style:['20%','auto','120px','100px','80px','20%','80px'],
                       details:[{_id:'1',msg:'该公司的销售及供应商'},{_id:'2',msg:'该公司的销售及供应商'}],
                       overflow:false,
                       page:data.content.page

          }

        res.render('pages/admin',{data:datalist});
    })


}




exports.admin_market=function(req, res, next) {        //单位管理  市场所

      var form={
		      page:req.query.page||0,
		      size:15
	  }
   console.log(data.content)
      api_services.commonRequest('api/app/market/all',"GET",null).then(function (data){

         console.log(data)

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









