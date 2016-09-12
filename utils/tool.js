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


Services.prototype.setNav=function (nav){
          
          if(!!nav.length) return 
            var arr=[
                  {href:"/organize/architecture",title:'组织架构',code:'same_level_manage'},
                  {href:"/organize/market",title:'市场所',code:'same_level_manage'},
                  {href:"/organize/park",title:'园区',code:'lower_level_manage'},
                  {href:"/organize/company",title:'企业',code:'company_info'}, 
                  {href:'/inspect/list',title:'网络检查列表',code:'network_check_list'},
                  {href:'/appointment/list',title:'预约检查列表',code:'appointment_list'},
                  {href:'/interview/list',title:'行政约谈列表',code:'interview_list'},
                  {href:'/suggestion/list',title:'行政建议列表',code:'suggestion_list'},
                  {href:'/publicity/list',title:'年报公示列表',code:'publicity_list'}
                ]
           var arr1=[];       

           for(var j=0;j<arr.length;j++){

                  if(nav[arr[j].code].code==arr[j].code){

                        arr1[nav[arr[j].code]]= arr[j]

                  }
           }


         return arr1
  

}








module.exports=Services;