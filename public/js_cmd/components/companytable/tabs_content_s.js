define(function (require, exports, module) {
    var Vue = require('lib_cmd/vue-cmd');
    require('/js_cmd/components/tables/com_tables')


    Vue.component('table-content-s', {
        props: {
            mydata: [],
            datalist: []
        },
        data:function (){
          return {href:'',type:function (){
                  return  $.query.get('view')
          }()}
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
                                                        <td v-if="datalist.product&&!!item.producerId"  class="text-center"><a class="btn-link product_name" @click="getModalMsg($event)" :data-producerId="item.producerId"  data-toggle="modal"   data-target="#modal-details"> {{ item.name }} \
                                                         </a></td>\
                                                        <td v-if="type==\'provider\'&&datalist.product" class="text-center"><a class="btn-link product_name" @click="getModalMsg($event)" :data-producerId="item.producerId"  data-toggle="modal"   data-target="#modal-details"> {{ item.name }} \
                                                         </a></td>\
                                                        <td v-if="type==\'customer\'&&datalist.product" class="text-center">{{ item.name }}</td>\
                                                        <td v-if="type==\'producer\'&&datalist.product" class="text-center">{{ item.name }}</td>\
                                                        <td v-if="!datalist.product" class="text-center">{{ item.name }}</td>\
                                                        <td v-if="item.address" class="text-center">{{ item.address }}</td>\
                                                        <td v-if="item.measurement" class="text-center">{{ item.measurement }}</td>\
                                                        <td v-if="item.specification" class="text-center">{{ item.specification }}</td>\
                                                        <td v-if="item.phone" class="text-center">{{ item.phone }}</td>\
                                                        <td v-if="item.certificate" class="text-center">{{ item.certificate }}</td>\
                                                        <td v-if="item.businesses" class="text-center"><span class="bus-msg">{{ item.businesses }} </span><a href="javascript:;"" @click="showMsg($event) " class="btn-link">详情</a></td>\
                                                        <td v-if="item.registerNo" class="text-center"><span class="bus-msg">{{ item.registerNo }}</td>\
                                                        <td v-if="item.expireDate" class="text-center">{{ item.expireDate }}</td>\
                                                    </tr>\
                                                  </tbody>\
                                              </table>\
                                        </div>\
                                    </div>\
                  </div></div>'
        , methods: {
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
                      var _name=$(event.target).text().split(/\s+/g)[1]
                      var that=this;
                    
                     console.log($(event.target).attr('data-producerId'))
                     if($(event.target).attr('data-producerId')){
                       view='product'
                       this.type='product'
                        this.href='/api/app/company/by/product';
                     }else  if($(event.target).attr('data-customerId')){
                      this.href='/api/app/company/by/provider'; 
                       view='provider'
                      this.type='provider'
                     }else {

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


















