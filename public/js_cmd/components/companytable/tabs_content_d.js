define(function (require, exports, module) {
    var Vue = require('lib_cmd/vue-cmd');

    Vue.component('table-content-d', {
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
                                                        <td v-if="item.invoiceNo" class="text-center">{{ item.invoiceNo }}</td>\
                                                        <td v-if="item.invoiceDate" class="text-center">{{ item.invoiceDate }}</td>\
                                                        <td v-if="item.invoiceType" class="text-center">{{ item.invoiceType }}</td>\
                                                        <td v-if="item.orderNo" class="text-center">{{ item.orderNo }}</td>\
                                                        <td v-if="item.orderDate"  class="text-center">{{ item.orderDate}}</td>\
                                                        <td v-if="item.customer"  class="text-center">{{ item.customer }}</td>\
                                                        <td v-if="item.taxNo"  class="text-center">{{ item.taxNo }}</td>\
                                                        <td v-if="item.amount"  class="text-center">{{ item.amount }}</td>\
                                                        <td v-if="item.receiver"  class="text-center">{{ item.receiver }}</td>\
                                                        <td v-if="item.provider"  class="text-center">{{ item.provider }}</td>\
                                                        <td v-if="item.product"  class="text-center">{{ item.product }}</td>\
                                                        <td v-if="item.operator"  class="text-center">{{ item.operator }}</td>\
                                                        <td v-if="item.invoiceFile"  class="text-center"><a href="javascript:;" :data-src="item.invoiceFile"  >单据</a> </td>\
                                                        <td v-if="item.purchaseBill"  class="text-center">{{ item.purchaseBill }}</td>\
                                                        <td v-if="item.salesRep"  class="text-center">{{ item.salesRep }}</td>\
                                                        <td v-if="item.notes"  class="text-center">{{ item.notes }}<a href="javascript:;" :data-id="item.id" class="btn-link"> 详情</a></td>\
                                                    </tr>\
                                                  </tbody>\
                                              </table>\
                                        </div>\
                                    </div>\
                                </div>\
                  </div>',
        methods: {}

    })

                    //['采购订单号','采购日期','供货企业','供货名称','经办人','采购随行单','备注']

//  {
// amount (number): 开票金额 ,
// customer (string): 客户 ,
// customerId (string): 客户ID ,
// id (string, optional),
// invoiceDate (string): 开票日期 ,
// invoiceFile (string): 发票影像 ,
// invoiceNo (string): 发票单号 ,
// invoiceType (string): 发票类别 ,
// notes (string): 备注 ,
// operator (string): 经办人 ,
// receiver (string): 收票人（寄给客户的指定接收人或自己接收人) ,
// taxNo (string): 税号 ,
// type (string): 采购或销售 = ['SALE', 'PURCHASE']
// }






})                                 