var Promise=require('bluebird');
var request=Promise.promisify(require('request'));


function Services(){}


Services.prototype.Interface=function (url,method,data){
   
     return new Promise(function (resolve,reject){
        
         request({method:method,url:url,form:data,json:true}).then(function (response){

              resolve(response.body)
 
         }).catch(function (err){
              console.log(err)
         	  reject(err)
         })
     }) 
}





module.exports=Services;