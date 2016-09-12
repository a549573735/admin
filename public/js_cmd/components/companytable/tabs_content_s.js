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
                                             <table class="table  table-hover table-borderless">\
                                                  <thead>\
                                                  <tr class="v-table-tr">\
                                                        <th class="text-center " v-for="item in datalist.title" v-bind:style="{ width: datalist.style[$index] }">{{item}}</th>\
                                                  </tr>\
                                                  </thead>\
                                                  <tbody class="v-tabs-check">\
                                                     <tr v-for="item in datalist.content.content">\
                                                        <td v-if="item.name" class="text-center">{{ item.name }}</td>\
                                                        <td v-if="item.address" class="text-center">{{ item.address }}</td>\
                                                        <td v-if="item.specification" class="text-center">{{ item.specification }}</td>\
                                                        <td v-if="item.registerNo" class="text-center">{{ item.registerNo }}</td>\
                                                        <td v-if="item.phone" class="text-center">{{ item.phone }}</td>\
                                                        <td v-if="item.certificate" class="text-center">{{ item.certificate }}</td>\
                                                        <td v-if="item.businesses" class="text-center">{{ item.businesses }}</td>\
                                                        <td v-if="item.expireDate" class="text-center">{{ item.expireDate }}</td>\
                                                    </tr>\
                                                  </tbody>\
                                              </table>\
                                        </div>\
                                    </div>\
                  </div></div>'
        , methods: {
                // { id: '8aaf887b5700248c0157003c31220017',
                //    name: '产品二',
                //    producerId: '8aaf887b5700248c015700360cf00011',
                //    businesses: '产品经营范围二',
                //    specification: '5555555555',
                //    registerNo: '33333333',
                //    measurement: '12*12',
                //    expireDate: '2018-09-09' }

                
// businesses (string): 经营范围 ,
// expireDate (string): 过期时间 ,
// id (string, optional),
// measurement (string, optional): 产品计量单位 ,
// name (string): 产品名称 ,
// producerId (string): 生产商ID ,
// registerNo (string): 产品注册号 ,
// specification (string): 规格
// }



            
        }
    })
})                                    