define(function (require, exports, module) {
    var Vue = require('lib_cmd/vue-cmd');
    
     //null  企业名称   检查状态  检查员   检查日期  备注



  //<com-table-list :datalist="<%= JSON.stringify(data) %>" ></com-table-list>   调用方法
     //数据结构
     //        {
     //                data:{
     //                        href:'/company/park/',
		     //                title:['','企业名称','检查状态','检查员','检查日期','备注'],
		     //                content:[
		     //                              ['上海医德医疗设备有限公司','true','王先生','2016-06-29'],
		     //                              ['上海医德医疗设备有限公司','true','朱王杰','2016-06-29']
		     //                         ],
		     //                style:['25%','100px','100px','15%','auto'],
		     //                details:[{_id:'1',msg:'该公司的销售及供应商'},{_id:'2',msg:'该公司的销售及供应商'}]
     //
     //                     }
     //       }


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
                            <td  class="text-center">{{ item.contact }}</td>\
                            <td  class="text-center">{{ item.phone }}</td>\
                            <td v-if="datalist.btns" class="text-center"><div class="bei-zhu"><a  class="btn  btn-primary "> 修改</a></div><div class="bei-zhu"><a  class="btn  btn-primary "> 重置</a></div></td>\
                            <td v-if="datalist.overflow" class="text-center">{{ datalist.details[$index].msg}}<a href="javascript:;" class="btn-link">详情</a></td>\
                            <td v-if="datalist.overflow_btn" class="text-center"><a :href="datalist.href+item.id"  class="btn  btn-primary "> 详情</a></td>\
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

