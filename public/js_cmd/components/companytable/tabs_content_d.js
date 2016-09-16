define(function (require, exports, module) {
    var Vue = require('lib_cmd/vue-cmd');

    Vue.component('table-content-d', {
        props: {
            mydata: [],
            datalist: []
        },
        data:function (){
          return {href:'',type:''}
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
                                                        <td v-if="datalist.product&&item.provider"  class="text-center"><a class="btn-link product_name" @click="getModalMsg($event)"  data-toggle="modal" :data-providerId="item.providerId"   data-target="#modal-details"> {{ item.provider }} <div class="hover_table"> 查看资质</div>\
                                                         </a></td>\
                                                        <td v-if="item.provider"   class="text-center">{{ item.provider }}</td>\
                                                        <td v-if="datalist.product"  class="text-center"><a class="btn-link product_name" @click="getModalMsg($event)"  data-toggle="modal" :data-productId="item.productId"   data-target="#modal-details">{{ item.product }} <div class="hover_table"> 查看资质</div>\
                                                         </a></td>\
                                                        <td v-if="!datalist.product"  class="text-center">{{ item.product }}</td>\
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
        methods: {
           showMsg:function (event){
                       event.target.bclick=!event.target.bclick   
                       if(event.target.bclick){ 
                         console.log($(event.target))
                         $(event.target).siblings('span').css('overflow','inherit')
                         $(event.target).html('收起')
                        /*  备注弹框  */
                        }else {
                           $(event.target).siblings('span').css('overflow','hidden')
                           $(event.target).html('详情')
                        }
                   },

            getModalMsg:function (event){

                  var _id=$.query.get('id');
                  var view=$.query.get('view')
                  var _name=$(event.target).text().trim().split(/\s+/g)[0]

                  console.log(_name,$(event.target).text().split(/\s+/g))
                  var that=this;
                      

                     if($(event.target).attr('data-productId')){
                        view='product'
                        this.href='/api/app/company/by/product';
                        this.type='product'

                     }else if($(event.target).attr('data-providerId')){
                       this.href='/api/app/company/by/provider'; 
                       view='provider'
                        this.type='provider'
                     }

                  $.get('/organize/details?view='+view+'&id='+_id+'&name='+_name+'&api=true').then(function (data){
                      data.data.content.name=_name;
                      data.data.href=that.href;
                      data.data.type=that.type;
                      that.$dispatch('send-modal-msg',data)

                  })
            }  


        }

    })






})                                 