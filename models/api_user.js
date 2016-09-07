var Promise=require('bluebird');
var request=Promise.promisify(require('request'));

var Services=require('../utils/tool');
var services=new Services();
var config=require('../utils/config');
var prex=config.internal.host;


exports.loginUp=function (url,method,data){
		
	return  new Promise(function (resolve,reject){
	  
		
		services.Interfacelogin(prex+url+data.username+'/'+data.password,method,null).then(function (data){

                resolve(data)
           
		}).catch(function (err){

				console.log(err)
                reject(err)
		})

	})
}

exports.usercommon=function (url,method,data){


	return  new Promise(function (resolve,reject){

		console.log(prex+url,method,data)
         
       services.Interface(prex+url,method,data).then(function(data){

  				resolve(data)
       
       }).catch(function (err){
             console.log(err);
        		reject(err)

       })

	})

}




exports.userAdd=function (url,method,data){


	return  new Promise(function (resolve,reject){

		console.log(prex+url,method,data)
         
       services.Interface(prex+url,method,data).then(function(data){

  				resolve(data)
       
       }).catch(function (err){
             console.log(err);
        		reject(err)

       })

	})

}



