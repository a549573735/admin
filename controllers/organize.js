

exports.organize_company = function(req, res, next) {

   res.render('pages/organize_company', { title: 'Express',data:'123123' });

}



exports.organize_market = function(req, res, next) {

   res.render('pages/organize_market', { title: 'Express',data:'123123' });

}



exports.organize_park = function(req, res, next) {

   res.render('pages/organize_park', { title: 'Express',data:'123123' });

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
                        details:[{_id:'1',msg:'该公司的销售及供应商'},{_id:'2',msg:'该公司的销售及供应商'}]
                         
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
  
   switch(req.params.id){

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



