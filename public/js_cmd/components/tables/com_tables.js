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
                            <td v-if="item.target" class="text-center">{{ item.target }}</td>\
                            <td v-if="item.company" class="text-center">{{ item.company }}</td>\
                            <td v-if="item.publicity" class="text-center">{{ item.publicity }}</td>\
                            <td v-if="item.status" class="text-center">{{ item.status==\'PASS\'?\'合格\':\'不合格\' }}</td>\
                            <td v-if="item.readFlag" class="text-center">{{ item.readFlag==\'false\'?\'未读\':\'已读\' }}</td>\
                            <td v-if="item.suggestion" class="text-center">{{ item.suggestion }}</td>\
                            <td v-if="item.user" class="text-center">{{ item.user }}</td>\
                            <td v-if="item.inspectDate " class="text-center">{{ item.inspectDate }}</td>\
                            <td v-if="item.readDate" class="text-center">{{ item.readDate===\'null\'?\'null\':item.readDate}}</td>\
                            <td v-if="item.notes " class="text-center">{{ item.notes }}</td>\
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

