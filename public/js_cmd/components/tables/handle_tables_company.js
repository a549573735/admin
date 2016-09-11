define(function (require, exports, module) {
    var Vue = require('lib_cmd/vue-cmd');
    
  
//    {
// address (string): 企业地址 ,
// belongMarket (string): 所属市场所 ,
// belongPark (string): 所属园区 ,
// businesses (string): 经营范围 ,
// certificate (string): 经营许可证 ,
// contact (string): 联系人 ,
// expireDate (string): 许可证有效期 ,
// id (string, optional),
// name (string): 企业名称 ,
// phone (string): 联系方式
// }

    Vue.component('handle-table-list', {

        props: ['datalist'],
        template:'<table class="table  table-hover table-borderless">\
                      <thead>\
                      <tr class="v-table-tr">\
                            <th class="text-center " v-for="item in datalist.title" v-bind:style="{ width: datalist.style[$index] }">{{item}}</th>\
                      </tr>\
                      </thead>\
                      <tbody class="v-tabs-check">\
                        <tr v-for="item in datalist.content" v-cloak>\
                            <td  class="text-center">{{ item.name }}</td>\
                            <td  class="text-center">{{ item.address }}</td>\
                            <td  class="text-center">{{ item.belongMarket }}</td>\
                            <td  class="text-center">{{ item.contact }}</td>\
                            <td  class="text-center">{{ item.phone }}</td>\
                            <td  class="text-center">{{ item.businesses }}</td>\
                            <td v-if="datalist.overflow" class="text-center" :expiredate="item.expireDate" :certificate="item.certificate" ><a href="javascript:;" class="btn-link">详情</a></td>\
                            <td  class="text-center"><a :href="datalist.href+item.id"  class="btn  btn-primary "> 详情</a></td>\
                        </tr>\
                      </tbody>\
                  </table>', 

        methods:{
            
             sub:function (event){
                     
             
                  /*  备注弹框  */
            
             }

        }          
      }
    )
});

