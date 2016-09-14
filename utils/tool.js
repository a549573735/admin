var Promise=require('bluebird');
var request=Promise.promisify(require('request'));
var config=require('./config')


function Services(){}


Services.prototype.Interfacelogin=function (url,method,data){
   
     return new Promise(function (resolve,reject){
        
         request({method:method,url:url,form:data}).then(function (response){

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


Services.prototype.addZero=function (obj){

   return obj=obj>9?obj:'0'+obj;
}


Services.prototype.Interface_company=function (obj,data,dataSelect){

        data.title=obj.title
        data.style=obj.style
        data.customer=obj.customer
        data.salesRep=obj.salesRep
        data.content=dataSelect.content
        data.pagelist=dataSelect.page+1

}




Services.prototype.setForm=function (){
    var date=new Date();

    var from= date.getFullYear()+'-'+this.addZero(date.getMonth())+'-'+this.addZero(date.getDate());
    var to=date.getFullYear()+'-'+this.addZero((date.getMonth()+1))+'-'+this.addZero(date.getDate());
  return { from:from,to:to}
}




module.exports=Services;