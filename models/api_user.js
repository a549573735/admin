var Promise=require('bluebird');
var request=Promise.promisify(require('request'));

var Services=require('../utils/tool');
var services=new Services();
var config=require('../utils/config');
var prex=config.internal.host;






exports.loginUp=function (url,method,data){
		
	return  new Promise(function (resolve,reject){
	  
		
		services.Interface(prex+url+data.username+'/'+data.password,'GET',null).then(function (data){

                resolve(data)
           
		}).catch(function (err){

				console.log(err)
                reject(err)
		})

	})
}







