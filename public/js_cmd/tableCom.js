define(function (require, exports, module) {
    var Vue = require('lib_cmd/vue-cmd');
    

    Vue.component('table-past1',{  
                 props: {
                    mydata: []
                 },
                 template:'<div class="block" > \
                                    <ul class="nav nav-tabs nav-justified " id="v-nav-tab">\
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
                                    </ul>\
                                   \
<div class="block-content tab-content v-tab-content">\
    <div class="tab-pane active">\
        <div class="v-tabs-date">\
            <form class="form-horizontal clearfix" method="post" onsubmit="return false;">\
                <div class="col-md-12">\
                    <div class="form-group clearfix">\
                        <label class="col-md-2 o-pd v-fz">检查时间:</label>\
                        <div class="col-md-5">\
                            <div class="input-daterange input-group" data-date-format="mm/dd/yyyy">\
                                <input class="form-control" type="text" name="example-daterange1" placeholder="开始">\ <span class="input-group-addon">~</span>\
                                <input class="form-control" type="text" name="example-daterange2" placeholder="结束">\</div>\</div>\</div>\</div>\</form>\</div>\
        <div class="row v-table">\
            <div class="col-md-12">\
                <div class="block">\
                    <table class="table table-hover table-borderless"><thead><tr class="v-table-tr"><th class="text-center " v-for="item in mydata.title" v-bind:style="{ width: style[$index] }">{{title}}</th></tr></thead><tbody><tr v-for="item in mydata"><td class="text-center">{{item.title}}</td><td class="text-center">{{item.state}}</td><td class="text-center">{{item.name}}</td><td class="text-center">{{item.date}}</td><td class="text-center">\ {{message}} <a  class="btn btn-link" data-toggle="modal" data-target="#modal-fromtext"> 详情</a></td></tr></tbody></table></div></div></div></div></div>\
                        </div>',
           
                }
   );
});





