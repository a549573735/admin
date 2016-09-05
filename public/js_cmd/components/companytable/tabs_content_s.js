define(function (require, exports, module) {
    var Vue = require('lib_cmd/vue-cmd');
    require('/js_cmd/components/tables/com_tables')


    Vue.component('table-content-s', {
        props: {
            mydata: [],
            datalist: []
        },
        template: '<div class="tab-pane">\
                                <div class="row v-table">\
                                    <div class="col-md-12">\
                                         <div class="block">\
                                             <com-table-list :datalist="datalist"></com-table-list>\
                                        </div>\
                                    </div>\
                  </div></div>'
        , methods: {



            
        }
    })
})                                    