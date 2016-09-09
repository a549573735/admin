
var api_services=require('../models/api_services');


exports.park_index = function(req, res, next) {

   res.render('pages/park_index', { title: 'Express',data:'123123' });

}




exports.park_publicity = function(req, res, next) {

   res.render('pages/park_publicity', { title: 'Express',data:'123123' });

}





exports.parkAll=function (req,res,next){

          var _id=req.params.id;
 
	  api_services.commonRequest('api/app/park/'+_id,"GET",null).then(function (data){
            
    
            res.json(data)

	  }).catch(function (err){

            res.json({msg:'市场所服务器返回错误','state':false})

	  })
	     
}


exports.parkBriefAll=function (req,res,next){
      
      var _id=req.params.id;

 
	  api_services.commonRequest('api/app/park/brief/'+_id,"GET",null).then(function (data){
            
      
            res.json(data)

	  }).catch(function (err){

            res.json({msg:'市场所服务器返回错误','state':false})

	  })
	     

}






