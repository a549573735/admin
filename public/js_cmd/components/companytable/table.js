define(function (require, exports, module) {
    var Vue = require('lib_cmd/vue-cmd');
 
    require('/js_cmd/components/companytable/tabs_content_s')
    require('/js_cmd/components/companytable/tabs_content_d')
    require('/js_cmd/components/companytable/tabs_btn')




    var message=new Vue({
         'el':'#tables',
         data:function (){
           	return {
           	    btnlist:[
                    {href:"/organize/details/company",title:'企业信息',active:true},
                    {href:"/organize/details/purchase",title:'采购信息',active:false},
                    {href:"/organize/details/sale",title:'销售信息',active:false},
                    {href:"/organize/details/invoice",title:'发票信息',active:false},
                    {href:"/organize/details/customer",title:'客户资质',active:false},
                    {href:"/organize/details/producer",title:'生产商资质',active:false},
                    {href:"/organize/details/provider",title:'供应商资质',active:false},
                    {href:"/organize/details/product",title:'产品资质',active:false}
                ]     
           	}
         }
    });


   seajs.use("js_cmd/group/marketList-cmd");

}) 
    