define(function (require, exports, module) {
    var Vue = require('lib_cmd/vue-cmd');
    

    Vue.component('com-table-list', {

        props: ['datalist'],

        computed:{

            "newData":function (){
                  this.datalist.content.content.forEach(function (item){

                        switch (item.status){
                            case  'WAITING':
                              item.status="等待"
                            break;
                            case  'CONFIRMED':
                              item.status="确认"
                            break;
                            case  'NEGOTIATION':
                              item.status="协商"
                            break;
                            case  'PASS':
                              item.status="合格"
                            break;
                            case  'FAIL':
                              item.status="不合格"
                            break;
                        }

                       switch (item.period){
                          case  3:
                            item.period="三天内"
                          break;
                          case  7:
                            item.period="七天内"
                          break;
                          case  10:
                            item.period="十天内"
                          break;
                    
                      }

                  })
                  return   this.datalist
            }

        },
        
        template:'<table class="table  table-hover table-borderless">\
                      <thead>\
                      <tr class="v-table-tr">\
                            <th class="text-center " v-for="item in datalist.title" v-bind:style="{ width: datalist.style[$index] }">{{item}}</th>\
                      </tr>\
                      </thead>\
                      <tbody class="v-tabs-check">\
                         <tr v-for="item in newData.content.content">\
                            <td  class="text-center">{{ item.target }}</td>\
                            <td  class="text-center">{{ item.status }}</td>\
                            <td  class="text-center">{{ item.interviewDate }}</td>\
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

