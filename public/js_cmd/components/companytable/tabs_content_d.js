define(function (require, exports, module) {
    var Vue = require('lib_cmd/vue-cmd');
    Vue.component('table-content-d', {
        props: {
            mydata: [],
            datalist: []
        },
        data: function () {
            return {href: '', type: ''}
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
                                                        <td v-if="datalist.product&&item.invoiceNo" class="text-center" style=""><a class="btn-link product_name" @click="getModalInvoice($event)"  data-toggle="modal" :data-id="item.id" :data-type="item.type"  data-target="#modal-invoice"> {{ item.invoiceNo }} \
                                                         </a></td>\
                                                        <td v-if="!datalist.product&&item.invoiceNo" class="text-center">{{ item.invoiceNo }}</td>\
                                                        <td v-if="item.batchNo" class="text-center">{{ item.batchNo }}</td>\
                                                        <td v-if="item.expireDate" class="text-center">{{ item.expireDate }}</td>\
                                                        <td v-if="item.productDate" class="text-center">{{ item.productDate }}</td>\
                                                        <td v-if="item.productName" class="text-center">{{ item.productName }}</td>\
                                                        <td v-if="item.warehouse" class="text-center">{{ item.warehouse }}</td>\
                                                        <td v-if="item.quantity" class="text-center">{{ item.quantity }}</td>\
                                                        <td v-if="item.invoiceDate" class="text-center">{{ item.invoiceDate }}</td>\
                                                        <td v-if="item.invoiceType" class="text-center">{{ item.invoiceType }}</td>\
                                                        <td v-if="item.orderNo" class="text-center"><a class="btn-link"  data-toggle="modal" :data-id="item.id"  @click="getPurchaseSale($event)"  data-target="#modal-purchase-sale" >{{ item.orderNo }}</a></td>\
                                                        <td v-if="item.orderDate"  class="text-center">{{ item.orderDate}}</td>\
                                                        <td v-if="item.customer"  class="text-center">{{ item.customer }}</td>\
                                                        <td v-if="item.taxNo"  class="text-center">{{ item.taxNo }}</td>\
                                                        <td v-if="item.amount"  class="text-center">{{ item.amount }}</td>\
                                                        <td v-if="item.receiver"  class="text-center">{{ item.receiver }}</td>\
                                                        <td v-if="datalist.product && item.provider"  class="text-center"><a class="btn-link product_name" @click="getModalMsg($event)"  data-toggle="modal" :data-providerId="item.providerId"   data-target="#modal-details"> {{ item.provider }}\
                                                         </a></td>\
                                                        <td v-if="!datalist.product&&item.provider "  class="text-center">{{ item.provider }}</td>\
                                                        <td v-if="item.operator"  class="text-center">{{ item.operator }}</td>\
                                                        <td v-if="item.invoiceFile" class="text-center"><a v-for="(index,files) in item.invoiceFile" v-if="item.isImg[index]"   href="http://{{files}}" target="_blank" >{{files==\'null \'?"":\'查看  \'}}</a> <a v-for="(index,files)  in item.invoiceFile"    v-if="!item.isImg[index]"   href="http://{{files}}" target="_blank" >{{files==\' \'?"":\'下载  \'}}</a> </td>\
                                                        <td v-if="item.purchaseBill" class="text-center"><a v-for="(index,files) in item.purchaseBill" v-if="item.isImg[index]"   href="http://{{files}}" target="_blank" >{{files==\'null \'?"":\'查看  \'}}</a> <a v-for="(index,files)  in item.purchaseBill"    v-if="!item.isImg[index]"   href="http://{{files}}" target="_blank" >{{files==\'null \'?"":\'下载  \'}}</a> </td>\
                                                        <td v-if="item.salesRep"  class="text-center">{{ item.salesRep }}</td>\
                                                        <td v-if="item.totalPrice"  class="text-center">{{ item.totalPrice===\'null \'?\'\':item.totalPrice}}</td>\
                                                        <td v-if="item.notes"  class="text-center"></td>\
                                                        <td v-if="item.unitPrice"  class="text-center">{{ item.unitPrice===\'null \'?\'\':item.unitPrice}}</td>\
                                                    </tr>\
                                                  </tbody>\
                                              </table>\
                                        </div>\
                                    </div>\
                                </div>\
                  </div>',
        methods: {
            showMsg: function (event) {
                event.target.bclick = !event.target.bclick
                if (event.target.bclick) {
                    console.log($(event.target))
                    $(event.target).siblings('span').css({'overflow':'inherit','display':'inline'})
                    $(event.target).html('收起')
                    /*  备注弹框  */
                } else {
                    $(event.target).siblings('span').css({'overflow':'hidden','display':'inline-block'})
                    $(event.target).html('详情')
                }
            },

            getModalMsg: function (event) {
              
                if(event.target.tagName=='DIV')return   

                var _id = $.query.get('id');
                var view = $.query.get('view')
                var _name = $(event.target).text().trim()
                var that = this;
                $('#v-all-check').removeClass('active')

                if ($(event.target).attr('data-productId')) {
                    view = 'product'
                    this.href = '/api/app/company/by/product';
                    this.type = 'product'

                } else if ($(event.target).attr('data-providerId')) {
                    this.href = '/api/app/company/by/provider';
                    view = 'provider'
                    this.type = 'provider'
                }
                console.log('/organize/details?view='+view+'&id='+_id+'&name='+_name+'&api=true')
                $.get('/organize/details?view=' + view + '&id=' + _id + '&name=' + _name + '&api=true').then(function (data) {
                    data.data.content.name = _name;
                    data.data.href = that.href;
                    data.data.type = that.type;
                    that.$dispatch('send-modal-msg', data)
                })

            }, showImg: function (event) {

                var src = $(event.target).attr('data-src');
                var img = src.split(',')[0]
                var reg=/(jpg|jpeg|png)$/g;
                var path=img.split('/')[1];

                if(!reg.test(img)&&path.indexOf('.')!=-1){
                        $(event.target).removeAttr('data-toggle')
                        $(event.target).removeAttr('data-target')
                        $(event.target).attr('href','http://'+img)
                       // $(event.target).attr( 'download','')
                }
          
                $('#v-com-img').attr('src', 'http://' + img)

            },
            getModalInvoice:function (event){

                 var form={
                    id:$(event.target).attr('data-id'),
                    type:$(event.target).attr('data-type')
                 }   
                 var that=this; 
                 $.post('/api/company/invoice',form).then(function (data) {
                      
                      that.$dispatch('send-invoice', data)  
                 })
                 //       
            },getPurchaseSale:function (event){
                    var type= $.query.get('view');
                    var that=this;
                    var form={id:$(event.target).attr('data-id')}
                    var json={
                         style:['15%','15%','15%','25%','20%','10%'],
                         title:['产品批号','生产日期','产品有效期','供货名称','数量','单价(元)'],
                         content:[]
                    };
                    if(type=='sale'){   //销售
                            $.post('/api/company/saleList',form).then(function (data) {
                                  json.content=data.content;
                                  that.$dispatch('send-purchase-sale-list', json)  
                            })
                    }else if(type=='purchase'){
                            $.post('/api/company/purchaseList',form).then(function (data) {
                                  json.content=data.content;
                                  that.$dispatch('send-purchase-sale-list', json)  
                            })
                    }    
            }
        }
    })
})

                                                        // 关联供货名称

                                                       // <td v-if="datalist.product&&item.product"  class="text-center"><a class="btn-link product_name" @click="getModalMsg($event)"  data-toggle="modal" :data-productId="item.productId"   data-target="#modal-details" >{{ item.product }} \
                                                       //   </a></td>\
                                                       //  <td v-if="!datalist.product&&item.product"  class="text-center">{{ item.product }}</td>\

