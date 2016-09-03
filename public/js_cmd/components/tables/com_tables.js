define(function (require, exports, module) {
    var Vue = require('lib_cmd/vue-cmd');
    
     //null  企业名称   检查状态  检查员   检查日期  备注



  //<com-table-list :datalist="<%= JSON.stringify(data) %>" ></com-table-list>   调用方法
     //数据结构
     //        {
     //                data:{
     //
     //                title:['','企业名称','检查状态','检查员','检查日期','备注'],
     //                content:[
     //                              ['上海医德医疗设备有限公司','true','王先生','2016-06-29'],
     //                              ['上海医德医疗设备有限公司','true','朱王杰','2016-06-29']
     //                         ],
     //                style:['25%','100px','100px','15%','auto'],
     //                details:[{_id:'1',msg:'该公司的销售及供应商'},{_id:'2',msg:'该公司的销售及供应商'}]
     //
     //                         }
     //       }


    Vue.component('com-table-list', {

        props: ['datalist'],
        template:'<table class="table  table-hover table-borderless">\
                      <thead>\
                      <tr class="v-table-tr">\
                            <th class="text-center " v-for="item in datalist.title" v-bind:style="{ width: datalist.style[$index] }">{{item}}</th>\
                      </tr>\
                      </thead>\
                      <tbody class="v-tabs-check">\
                        <tr v-for="itemlist in datalist.content">\
                            <td v-for="item in itemlist" class="text-center">{{ item === "true"?"是":item   }}</td>\
                            <td  class="text-center">{{datalist.details[$index].msg  }}<a  @click="sub($event)" :data-id="datalist.details[$index]._id" data-toggle="modal" data-target="#modal-fromtext"  class="btn-link"> 详情</a></td>\
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

