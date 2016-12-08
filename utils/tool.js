var Promise=require('bluebird');
var request=Promise.promisify(require('request'));
var config=require('./config')
var prex=config.internal.host;



function Services(){}


Services.prototype.Interfacelogin=function (url,method,data,req){
   
     return new Promise(function (resolve,reject){
         request({method:method,url:url,form:data,json:true}).then(function (response){
          //   console.log(response.headers.latesttoken,response.headers)
             resolve({body:response.body,headers:response.headers})

         }).catch(function (err){
              console.log(err)
         	    reject(err)
         })
     }) 
}

Services.prototype.InterfacePassword=function (url,method,data,req){
   
     return new Promise(function (resolve,reject){
 
         request({method:method,url:url,body:data,json:true,headers:config.headers}).then(function (data){
            
             resolve(data.body)   
               //  resolve(response.body)
         }).catch(function (err){
              console.log(err)
              reject(err)
         })
     }) 
}



Services.prototype.Interface=function (url,method,data,req){
   
     return new Promise(function (resolve,reject){
 
         request({method:method,url:url,body:data,json:true,headers:config.headers}).then(function (data){
           
            if(data.headers.latesttoken===''){
                delete req.session.user;
                resolve(data.body)

            }else if(data.headers.latesttoken!=req.session.user.lastSessionId){
                console.log(data.headers.latesttoken)
                  var str = req.session.user.userMsg;
                  request({method:'POST',url:prex+'api/app/user/verify?'+str,json:true,headers:config.headers}).then(function (response){
                    
                    if (response.body.success) {
                        req.session.user = response.body
                        req.session.user.lastSessionId=response.headers.latesttoken
                    }
                        resolve(data.body)

                  }).catch(function (err) {
                
                    console.log(err)
                     reject(err)
               })    

            }else{
                  resolve(data.body)
            }
              

               //  resolve(response.body)
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