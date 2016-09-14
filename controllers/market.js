var path=require('path'); 
var fs=require('fs');
var api_services=require('../models/api_services');





exports.marketAll=function (req,res,next){
    
 
  //GET /api/app/market/all  // 市场所
	  api_services.commonRequest('api/app/market/all',"GET",null).then(function (data){
            
            res.json(data)

	  }).catch(function (err){

            res.json({msg:'市场所服务器返回错误','state':false})

	  })
	     
}



exports.marketBriefAll=function (req,res,next){
    
 
  //GET /api/app/market/brief/all

	  api_services.commonRequest('api/app/market/brief/all',"GET",null).then(function (data){
            
     
            res.json(data)

	  }).catch(function (err){

            res.json({msg:'市场所服务器返回错误','state':false})

	  })
	     

}

