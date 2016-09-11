var path=require('path'); 
var fs=require('fs');
var api_services=require('../models/api_services');


exports.organize_company=function (req,res,next){
    
            var form=req.body||{};
            form.page=req.body.page||0;
            form.size=15;

            switch(req.session.user.content.belongId){
                      case  'ROOT':
                    form.market=req.query.id||req.session.user.content.id
                      break;
                      case 'DISTRICT':
                    form.market=req.query.id||req.session.user.content.id
                      break;  
                      case   'PARK':
                    form.park=req.query.id||req.session.user.content.id
                      break;  
            }
    
    
    api_services.commonRequest('api/app/company/list','POST',form).then(function (data){


        var  datalist={ 
                       href:'/organize/details?',
                       title:['企业名称','企业地址','所属','联系人','联系方式','经营范围',"操作"],
                       content:data.content.content,
                       style:['20%','auto','100px','100px','80px','20%','100px'],
                       details:[{_id:'1',msg:'该公司的销售及供应商'},{_id:'2',msg:'该公司的销售及供应商'}],
                       overflow:false,
                       page:data.content.page

          }
            console.log(data)

        res.render('pages/organize_company',{data:datalist});
    })
}




exports.api_organize_company_list = function(req, res, next) {
  
  
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
                       overflow:false

          }
        console.log(data)

         res.render('pages/organize_market', {data:datalist});
       
  })

}



exports.organize_park_id = function(req, res, next) {

    var id=req.query.id||req.session.user.content.id;
    
    api_services.commonRequest('api/app/park/brief/'+id,'GET',null).then(function (dataSelect){
          
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

   res.render('pages/architecture', { title: 'Express',data:'123123' });

}



exports.details = function(req, res, next) {

            
   var data={ 
                  data:{

                        title:['企业名称','检查状态','检查员','检查日期','备注'],
                        content:[
                                      ['上海医德医疗设备有限公司','true','王先生','2016-06-29'],
                                      ['上海医德医疗设备有限公司','true','朱王杰','2016-06-29']
                                 ],
                        style:['25%','100px','100px','15%','auto'],
                        details:[{_id:'1',msg:'该公司的销售及供应商'},{_id:'2',msg:'该公司的销售及供应商'}],
                        overflow:true,
                   },
                   btnlist:[
                    {href:"/organize/details/company",title:'企业信息',active:false},
                    {href:"/organize/details/purchase",title:'采购信息',active:false},
                    {href:"/organize/details/sale",title:'销售信息',active:false},
                    {href:"/organize/details/invoice",title:'发票信息',active:false},
                    {href:"/organize/details/customer",title:'客户资质',active:false},
                    {href:"/organize/details/producer",title:'生产商资质',active:false},
                    {href:"/organize/details/provider",title:'供应商资质',active:false},
                    {href:"/organize/details/product",title:'产品资质',active:false}
                  ],   
                  company:false,
                  type:'search',
                  pagelist:5 
   }
  
   switch(req.query.href){
       case 'company':
       data.company=true;
       data.btnlist[0].active=true;
           break;
       case 'purchase':
       data.btnlist[1].active=true;
       data.type='date';
           break;
        case 'sale':
       data.btnlist[2].active=true;
       data.type='date';
           break;
        case 'invoice':
       data.btnlist[3].active=true;
       data.type='date';
           break;
         case 'customer':
       data.btnlist[4].active=true;
       data.type='search';
           break;   
          case 'producer':
       data.btnlist[5].active=true;
       data.type='search';
           break;          
        case 'provider':
       data.btnlist[6].active=true;
       data.type='search';
           break;
        case 'product':
       data.btnlist[7].active=true;
       data.type='search';
           break;
        default:
       data.company=true;
       data.btnlist[0].active=true;    
   }
   if(req.params.id=='company'){
        data.company=true;
   }


   res.render('pages/details', data );


}



