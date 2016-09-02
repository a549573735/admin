define(function (require, exports, module) {
    var Vue = require('lib_cmd/vue-cmd');
    

    Vue.component('table-btns',{  
                 props: {
                    mydata: []
                 },
                 template:'<ul class="nav nav-tabs nav-justified " id="v-nav-tab">\
                                        <li class="active">\
                                            <a href="javascript:;"> 企业信息</a>\
                                        </li>\
                                        <li >\
                                            <a href="javascript:;">采购信息</a>\
                                        </li>\
                                        <li>\
                                            <a href="javascript:;">销售信息</a>\
                                        </li>\
                                        <li >\
                                            <a href="javascript:;">发票信息</a>\
                                        </li>\
                                        <li >\
                                            <a href="javascript:;">客户资质</a>\
                                        </li>\
                                        <li >\
                                            <a href="javascript:;">生产商资质</a>\
                                        </li>\
                                        <li >\
                                            <a href="javascript:;">供应商资质</a>\
                                        </li>\
                                        <li >\
                                            <a href="javascript:;">产品资质</a>\
                                        </li>\
                           </ul>',
                methods:{
               }         
      
    })        


      seajs.use("js_cmd/group/marketList-cmd");
})                             