define(function (require, exports, module) {
    var Vue = require('lib_cmd/vue-cmd');
    require('/js_cmd/components/tables/com_tables')


    Vue.component('table-content-s', {
        props: {
            mydata: [],
            datalist: []
        },
        template: '<div class="tab-pane">\
                                <div class="v-tabs-date">\
                                    <form class="form-horizontal clearfix" action="" method="post" onsubmit="return false;">\
                                       <div class="col-md-12">\
                                           <div \
                                           class="form-group clearfix">\
                                            <label class="col-md-2 o-pd v-fz" >产品名称:</label>\
                                            <div class="col-md-5 ">\
                                                <div class="col-md-8 o-pd">\
                                                    <input class="form-control" type="text" id="example-if-password" name="example-if-password" placeholder="">\
                                                </div>\
                                                <div class="col-md-4 ">\
                                                    <button class="btn btn-default btn-primary" type="submit">查询</button>\
                                                </div>\
                                            </div>\
                                          </div>\
                                       </div>\
                                    </form>\
                                </div>\
                                <div class="row v-table">\
                                    <div class="col-md-12">\
                                         <div class="block">\
                                             <com-table-list :datalist="datalist"></com-table-list>\
                                        </div>\
                                    </div>\
                                </div></div>'
        , methods: {}

    })
})                                    