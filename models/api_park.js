var Promise=require('bluebird');
var request=Promise.promisify(require('request'));

var Services=require('../utils/tool');
var services=new Services();
var config=require('../utils/config');
var prex=config.internal.host;


exports.parkAll=function (url,method,data){
		
	return  new Promise(function (resolve,reject){
	      console.log(2)
		services.Interface(prex+url,method,null).then(function (data){

                resolve(data)
           
		}).catch(function (err){

				console.log(err)
                reject(err)
		})

	})
}




