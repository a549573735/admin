var path=require('path'); 
var fs=require('fs');
var api_market=require('../models/api_market');
var config=require('../utils/config')




exports.marketAll=function (req,res,next){
    
 
  //GET /api/app/market/all
	  api_market.marrketAll('api/app/market/all',"GET",null).then(function (data){
            
           console.log(data)
            res.json(data)

	  }).catch(function (err){

            res.json({msg:'市场所服务器返回错误','state':false})

	  })
	     
}


exports.marketBriefAll=function (req,res,next){
    
 
  //GET /api/app/market/all
	  api_market.marrketAll('api/app/market/brief/all',"GET",null).then(function (data){
            
           console.log(data)
            res.json(data)

	  }).catch(function (err){

            res.json({msg:'市场所服务器返回错误','state':false})

	  })
	     

}

