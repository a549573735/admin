define(function (require, exports, module) {
    var Vue = require('lib_cmd/vue-cmd');
  

    Vue.component('check-table-list', {

        props: ['datalist'],
        template:'<table class="table  table-hover table-borderless o-m-t">\
                      <thead>\
                      <tr class="v-table-tr">\
                            <th class="text-center " v-for="item in datalist.title" v-bind:style="{ width: datalist.style[$index] }">{{item}}</th>\
                      </tr>\
                      </thead>\
                      <tbody class="v-tabs-check">\
                        <tr v-for="item in datalist.content.content">\
                            <td v-if="!datalist.checked" class="text-center"><label v-if="datalist.overfull" class="css-input css-checkbox css-checkbox-primary">\
                                            <input type="checkbox" name="row_3" :data-type="datalist.type" :value="item.id"><span></span>\
                                           </label>\
                            </td>\
                            <td  class="text-center">{{ item.name }}</td>\
                            <td v-if="datalist.btns" class="text-center">{{ item.username }}</td>\
                            <td  class="text-center">{{ item.address }}</td>\
                            <td  class="text-center">{{ item.contact }}</td>\
                            <td v-if="datalist.btns" class="text-center">{{ item.mail }}</td>\
                            <td  class="text-center">{{ item.phone }}</td>\
                            <td  v-if="datalist.btns"  class="text-center"><div class="bei-zhu"><a  class="btn  btn-primary "> 修改</a></div><div class="bei-zhu"><a  class="btn  btn-primary "> 重置</a></div></td>\
                            <td  v-if="datalist.overfull_btn"   class="text-center"><a :href="datalist.href+item.id"   class="btn  btn-primary v-btn-w"> 详情</a></td>\
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

