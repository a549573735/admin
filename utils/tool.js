var Promise=require('bluebird');
var request=Promise.promisify(require('request'));
var config=require('./config')


function Services(){}


Services.prototype.Interfacelogin=function (url,method,data){
   
     return new Promise(function (resolve,reject){
        
         request({method:method,url:url,body:data,json:true}).then(function (response){

              resolve(response.body)
 
         }).catch(function (err){
              console.log(err)
         	  reject(err)
         })
     }) 
}

Services.prototype.Interface=function (url,method,data){
   
     return new Promise(function (resolve,reject){
     
         request({method:method,url:url,body:data,json:true,headers:config.headers}).then(function (response){

              resolve(response.body)
 
         }).catch(function (err){
              console.log(err)
         	  reject(err)
         })
     }) 
}




module.exports=Services;