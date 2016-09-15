var path=require('path'); 
var fs=require('fs');
var api_services=require('../models/api_services');
var Services=require('../utils/tool');
var tools=new Services();


exports.organize_company=function (req,res,next){
    
            var form=req.body||{};
                form.page=req.body.page||0;
                form.size=15;
            
            if(req.query.id){
                form.park=req.query.id
              }
    
    
    api_services.commonRequest('api/app/company/list','POST',form).then(function (data){

        var  datalist={ 
                       href:'/organize/details?view=company&id=',
                       title:['企业名称','企业地址','所属','联系人','联系方式','经营范围',"操作"],
                       content:data.content.content,
                       style:['20%','auto','120px','100px','80px','20%','80px'],
                       details:[{_id:'1',msg:'该公司的销售及供应商'},{_id:'2',msg:'该公司的销售及供应商'}],
                       overflow:false,
                       page:data.content.page

          }
            console.log(data)

        res.render('pages/organize_company',{data:datalist});
    })
}




exports.api_organize_company_list = function(req, res, next) {

       var form=req.body||{};
           form.page=req.body.page||0;
           form.size=15;
           if( form.park=='0'){
             delete form.park;
           }
           if( form.market=='0'){
             delete form.market;
           }
           
        api_services.commonRequest('api/app/company/list','POST',form).then(function (data){
            
            var  datalist={ 
                           href:'/organize/details?view=company&id=',
                           title:['企业名称','企业地址','所属','联系人','联系方式','经营范围',"操作"],
                           content:data.content.content,
                           style:['20%','auto','100px','100px','80px','20%','100px'],
                           details:[{_id:'1',msg:'该公司的销售及供应商'},{_id:'2',msg:'该公司的销售及供应商'}],
                           overflow:false,
                           page:data.content.page

              }
               
            res.json(datalist);
        })
}



exports.organize_market = function(req, res, next) {
   
   var form={
      page:req.query.page||0,
      size:15
   }

  api_services.commonRequest('api/app/market/all','GET',null).then(function (data){


        var  datalist={ 
                       href:'/organize/park?id=',
                       title:['市场所名称','市场所地址','联系人','联系方式'],
                       content:data.content,
                       style:['25%','auto','100px','15%'],
                       details:[{_id:'1',msg:'该公司的销售及供应商'},{_id:'2',msg:'该公司的销售及供应商'}],
                       overflow:false,
                       overflow_btn:true

          }
        console.log(data)

         res.render('pages/organize_market', {data:datalist});
       
  })

}



exports.organize_park_id = function(req, res, next) {

    var id=req.query.id||req.session.user.content.id;
 
    api_services.commonRequest('api/app/market/all','GET',null).then(function (dataSelect){
          
          console.log(dataSelect)

          res.render('pages/organize_park', { select:dataSelect.content });

    }).catch(function (data){

         console.log(data)
    })

}


exports.api_organize_park_list=function(req, res, next) {

    var id=req.query.id||req.session.user.content.id;
    var parkName=encodeURI(req.query.parkname)||'';


    var form={
        page:req.body.page||0,
        size:15
    }
     
    api_services.commonRequest('api/app/park/'+id+'/'+parkName,'POST',form).then(function (dataSelect){
             console.log(dataSelect)
             res.json(dataSelect)

    }).catch(function (data){
             console.log(data)
             res.json(data)
    })
    
}



exports.architecture = function(req, res, next) {


     api_services.commonRequest('api/app/organize/architecture','GET',null).then(function (dataSelect){
                       
                         console.log(dataSelect)
                          var parkall=0;
                          var companyall=0;
                           dataSelect.content.forEach(function (item){
                                    parkall+=item.parkCount;
                                    companyall+=item.companyCount
                           })


                         res.render('pages/architecture',{data:dataSelect,parkAll:parkall,companyAll:companyall});

                 
     }).catch(function (data){

                         console.log(data)
     })
}


exports.details = function(req, res, next) {
   
  console.log(req.query)
   var id= req.query.id; 
   var data={ 
               data:{
                      title:[],
                      content:null,
                      style:[],
                      details:[{_id:'1',msg:'该公司的销售及供应商'},{_id:'2',msg:'该公司的销售及供应商'}],
                      overflow:false,
                 },

                 btnlist:[
                  {href:"/organize/details?view=company&id="+id,title:'企业信息',active:false},
                  {href:"/organize/details?view=purchase&id="+id,title:'采购信息',active:false},
                  {href:"/organize/details?view=sale&id="+id,title:'销售信息',active:false},
                  {href:"/organize/details?view=invoice&id="+id,title:'发票信息',active:false},
                  {href:"/organize/details?view=customer&id="+id,title:'客户资质',active:false},
                  {href:"/organize/details?view=producer&id="+id,title:'生产商资质',active:false},
                  {href:"/organize/details?view=provider&id="+id,title:'供应商资质',active:false},
                  {href:"/organize/details?view=product&id="+id,title:'产品资质',active:false}
                ],   
                company:false,
                type:'search',
                pagelist:1,
                companyName:''
           }
   var form={
      page:req.query.page||req.body.page||0,
      size:15,
      name:req.query.name||req.body.name||''
   }
   //encodeURIComponent

   var date=new Date();
    form.from=req.query.from||req.body.from|| date.getFullYear()+'-'+tools.addZero(date.getMonth())+'-'+tools.addZero(date.getDate());
    form.to=req.query.to||req.body.to|| date.getFullYear()+'-'+tools.addZero((date.getMonth()+1))+'-'+tools.addZero(date.getDate());

   
   switch(req.query.view){
       case 'company':
       data.company=true;
       data.btnlist[0].active=true;
       api_services.commonRequest('api/app/company/'+id+'/detail','GET',null).then(function (dataSelect){
                        console.log(dataSelect)
                         req.session.user.content.companyName=dataSelect.content.name;
                         data.data.content=dataSelect.content;


                            // 控制 权限 公司不加关联
                         if(req.query.api=='true'){
                            res.json( data );
                         }else {
                            res.render('pages/details', data );
                         }
                 }).catch(function (data){
                       console.log(data)
       })
                     
           break;
       case 'purchase':
 
        data.btnlist[1].active=true;
        data.type='date';
     
        api_services.commonRequest('api/app/company/'+id+'/purchase/list','POST',form).then(function (dataSelect){
              console.log(dataSelect.content)
                  tools.Interface_company({title:['采购订单号','采购日期','供货企业','供货名称','经办人','采购随行单','备注'],
                                           style: ['20%','20%','10%','10%','10%','20%','10%']},
                                           data.data,
                                           dataSelect
                                           )
                   data.data.product=req.session.user.content.type!="COMPANY"?true:false   // 控制 权限 公司不加关联
                   if(req.query.api=='true'){
                            res.json( data );
                         }else {

                            res.render('pages/details', data );
                         }
               }).catch(function (data){
                  console.log(data)
        })
           break;
        case 'sale':
       data.btnlist[2].active=true;
       data.type='date';
       api_services.commonRequest('api/app/company/'+id+'/sale/list','POST',form).then(function (dataSelect){

              console.log(dataSelect.content)
             tools.Interface_company({title:['订货单号','销售日期','采购企业','供货名称','销售代表','备注'],
                                         style: ['20%','20%','20%','10%','10%','10%']},
                                         data.data,
                                         dataSelect
                                      )
                        
          data.data.product=req.session.user.content.type!="COMPANY"?true:false   // 控制 权限 公司不加关联
                      if(req.query.api=='true'){
                            res.json( data );
                         }else {
                            res.render('pages/details', data );
                         }
             }).catch(function (data){
                   console.log(data)
        })
        break;
        case 'invoice':
       data.btnlist[3].active=true;
       data.type='date';
       api_services.commonRequest('api/app/company/'+id+'/invoice/list','POST',form).then(function (dataSelect){

             console.log(dataSelect.content)
             tools.Interface_company({title:['发票单号','开票日期','发票类别','客户','税号','开票金额','收票人','经办人','发票单'],
                                         style: ['10%','15%','10%','10%','15%','10%','10%','10%','10%']},
                                         data.data,
                                         dataSelect
                                      )
               data.data.product=req.session.user.content.type!="COMPANY"?true:false   // 控制 权限 公司不加关联
                         if(req.query.api=='true'){
                            res.json( data );
                         }else {
                            res.render('pages/details', data );
                         }
             }).catch(function (data){
                   console.log(data)
       })
           break;
         case 'customer':
       data.btnlist[4].active=true;
       data.type='search';

       api_services.commonRequest('api/app/company/'+id+'/customer/aptitude/list','POST',form).then(function (dataSelect){

                  console.log(dataSelect.content)
             tools.Interface_company({title:['客户名称','客户地址','联系方式','经营许可证','经营范围','许可证截止日期'],
                                         style: ['10%','15%','10%','20%','auto','20%']},
                                         data.data,
                                         dataSelect
                                      )
                        data.data.product=req.session.user.content.type!="COMPANY"?true:false   // 控制 权限 公司不加关联
                   
                        
                        data.data.type="provider" 
    
                       if(req.query.api=='true'){
                            res.json( data );
                         }else {
                            res.render('pages/details', data );
                         }
             }).catch(function (data){
                   console.log(data)
      })
           break;   
          case 'producer':
       data.btnlist[5].active=true;
       data.type='search';
         api_services.commonRequest('api/app/company/'+id+'/producer/aptitude/list','POST',form).then(function (dataSelect){
                  console.log(dataSelect.content)
             tools.Interface_company({title:['生产商姓名','生产商地址','联系方式','经营许可证','经营范围','许可证截止日期'],
                                         style: ['15%','15%','10%','20%','auto','20%']},
                                         data.data,
                                         dataSelect
                                      )
                        data.data.product=req.session.user.content.type!="COMPANY"?true:false   // 控制 权限 公司不加关联
                   
                    
                        data.data.type="provider" 
                   
                        if(req.query.api=='true'){
                            res.json( data );
                         }else {
                            res.render('pages/details', data );
                         }
             }).catch(function (data){
                   console.log(data)
      })
           break;          
        case 'provider':
       data.btnlist[6].active=true;
       data.type='search';
       api_services.commonRequest('api/app/company/'+id+'/provider/aptitude/list','POST',form).then(function (dataSelect){
                     console.log(dataSelect.content)
                      tools.Interface_company({title:['供应商姓名','供应商地址','联系方式','经营许可证','经营范围','许可证截止日期'],
                                         style: ['15%','15%','10%','20%','auto','20%']},
                                         data.data,
                                         dataSelect
                                      )
                        data.data.product=req.session.user.content.type!="COMPANY"?true:false   // 控制 权限 公司不加关联
                   
                          // 给关联 设置路由 
                        data.data.type="provider" 
                        if(req.query.api=='true'){
                            res.json( data );
                         }else {
                            res.render('pages/details', data );
                         }
             }).catch(function (data){
                   console.log(data)
        })
         break;
        case 'product':
       data.btnlist[7].active=true;
       data.type='search';

       api_services.commonRequest('api/app/company/'+id+'/product/aptitude/list','POST',form).then(function (dataSelect){
              console.log(dataSelect.content)
                      tools.Interface_company({
                                         title:['产品名称','生产地址','产品规格','经营范围','产品注册证号','注册证有效期'],
                                         style: ['15%','20%','15%','10%','auto','20%']},
                                         data.data,
                                         dataSelect
                                      )
                       
                        data.data.product=req.session.user.content.type!="COMPANY"?true:false   // 控制 权限 公司不加关联
                      
                        data.data.type="product" 
                        if(req.query.api=='true'){
                            res.json( data );
                         }else {
                            res.render('pages/details', data );
                         }
             }).catch(function (data){
                   console.log(data)
       })
           break;
     
   }


}









//关联接口

exports.api_byProduct = function(req, res, next) {


      var name=encodeURI(req.body.name);


       var form={
              page:req.body.page||0,
              size:15
          }
        //POST /api/app/company/by/product/{name}
      console.log(name)
        api_services.commonRequest('api/app/company/by/product/'+name,'POST',form).then(function (dataSelect){
                 console.log(dataSelect)
            

               res.json(dataSelect)
            


        }).catch(function (data){

                 console.log(data)
                 res.json(data)
        
        })
  

}


exports.api_byProvider = function(req, res, next) {


       var name=encodeURI(req.body.name);


       var form={
              page:req.body.page||0,
              size:15
          }
      //POST /api/app/company/by/provider/{name}
      console.log(name)
        api_services.commonRequest('api/app/company/by/provider/'+name,'POST',form).then(function (dataSelect){
                 console.log(dataSelect)
            

               res.json(dataSelect)
            


        }).catch(function (data){

                 console.log(data)
                 res.json(data)
        
        })
  

}





exports.api_appkey = function(req, res, next) {

    var id=req.session.user.content.id;

  api_services.commonRequest('/api/app/company/'+id+'/appKey','POST',null).then(function (dataSelect){
                 console.log(dataSelect)
            
               res.json(dataSelect)
            
        }).catch(function (data){

                 console.log(data)
                 res.json(data)
        
        })
}

exports.api_secret = function(req, res, next) {

    var id=req.session.user.content.id;

  api_services.commonRequest('/api/app/company/'+id+'/secret/generate','POST',null).then(function (dataSelect){
                 console.log(dataSelect)
            
               res.json(dataSelect)
            
        }).catch(function (data){

                 console.log(data)
                 res.json(data)
        
        })
}

   // POST /api/app/company/{id}/appKey
   // POST /api/app/company/{id}/secret/generate







  















