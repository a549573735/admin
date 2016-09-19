define(function (require, exports, module) {
    var Vue = require('lib_cmd/vue-cmd');

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
                            <td  class="text-center">{{ item.username }}</td>\
                            <td  class="text-center">{{ item.address }}</td>\
                            <td  class="text-center">{{ item.contact }}</td>\
                            <td  class="text-center">{{ item.phone }}</td>\
                            <td  class="text-center">{{ item.mail }}</td>\
                            <td v-if="datalist.btns" class="text-center"><div class="bei-zhu"><a  class="btn btn-primary " data-target="#modal-modifyCompany" data-toggle="modal" > 修改</a></div><div class="bei-zhu"><a  class="btn  btn-primary "> 重置</a></div></td>\
                        </tr>\
                      </tbody>\
                  </table>', 

        methods:{
            
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
             }

        }          
      }
    )
});

