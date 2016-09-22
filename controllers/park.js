
var api_services=require('../models/api_services');






exports.parkAll=function (req,res,next){

          var _id=req.params.id;
 
	  api_services.commonRequest('api/app/park/'+_id,"GET",null).then(function (data){
            
    	    data.content.page=Math.ceil(data.content.total/data.content.size);
    	  
            res.json(data)

	  }).catch(function (err){

            res.json({msg:'市场所服务器返回错误','state':false})

	  })
	     
}



exports.parkBriefAll=function (req,res,next){
      
      var _id=req.params.id;


 
	  api_services.commonRequest('api/app/park/brief/'+_id,"GET",null).then(function (data){
            
            console.log(data)
      				
      		//data.content.page=Math.ceil(data.content.total/data.content.size);
            res.json(data)

	  }).catch(function (err){

            res.json({msg:'市场所服务器返回错误','state':false})

	  })
	     

}






