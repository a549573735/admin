define(function (require, exports, module) {
    var Vue = require('lib_cmd/vue-cmd');
    

    Vue.component('com-table-list', {

        props: ['datalist'],
        
        template:'<table class="table  table-hover table-borderless">\
                      <thead>\
                      <tr class="v-table-tr">\
                            <th class="text-center " v-for="item in datalist.title" v-bind:style="{ width: datalist.style[$index] }">{{item}}</th>\
                      </tr>\
                      </thead>\
                      <tbody class="v-tabs-check">\
                         <tr v-for="item in datalist.content.content">\
                            <td  class="text-center">{{ item.target }}</td>\
                            <td  class="text-center">{{ item.status==\'PASS\'?\'合格\':\'不合格\' }}</td>\
                            <td  class="text-center">{{ item.period }}</td>\
                            <td  class="text-center">{{ item.agreeDate }}</td>\
                            <td  class="text-center">{{ item.user }}</td>\
                            <td  class="text-center">{{ item.notes }}</td>\
                        </tr>\
                      </tbody>\
                  </table>', 

        methods:{
            
             sub:function (event){
                     
                  var _id=$(event.target).attr('data-id')
                  /*  备注弹框  */
                  $('#modal-fromtext').on('show.bs.modal', function () {
                         $(this).find('.remarks').html('按钮的 _id '+_id)
                  })

             }

        }          
      }
    )
});

