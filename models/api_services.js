var Promise=require('bluebird');
var request=Promise.promisify(require('request'));
var Services=require('../utils/tool');
var services=new Services();
var config=require('../utils/config');
var prex=config.internal.host;


exports.loginUp=function (url,method,data,req){
		
	return  new Promise(function (resolve,reject){
	  
		services.Interfacelogin(prex+url,method,data,req).then(function (data){

                resolve(data)
           
		}).catch(function (err){

				console.log(err)
                reject(err)
		})

	})
}



exports.commonRequest=function (url,method,data,req){


	return  new Promise(function (resolve,reject){

		console.log(prex+url,method,data)
         
       services.Interface(prex+url,method,data,req).then(function(data){
  				resolve(data)
       }).catch(function (err){
             console.log(err);
        		reject(err)
       })
	})
}



exports.loginPassword=function (url,method,data,req){

	return  new Promise(function (resolve,reject){

		console.log(prex+url,method,data)
         
       services.InterfacePassword(prex+url,method,data,req).then(function(data){

  				resolve(data)
       
       }).catch(function (err){
             console.log(err);
        		reject(err)

       })

	})

}






