define(function (require, exports, module) {
    var Vue = require('lib_cmd/vue-cmd');

     Vue.component('v-select', {
                props: ['selectdata'],
                data:function (){
                    return { k:1 ,state:false}
                },
                template: 	'<label class="col-md-1 o-pd-r v-label" for="val-skill">市场所：</label>\
	                         <div class="col-md-2 o-pd">\
	                                 <select class="form-control" id="val-skill" name="val-skill" @change="selectChange($event)">\
	                                     <option value="0">请选择</option>\
	                                     <option v-for="item in selectdata" :value="item.value">{{item.text}}</option>\
	                                 </select>\
	                         </div>\
	                          <label class="col-md-1 o-pd-r v-label text-center" for="val-skill2">园区：</label>\
	                                 <div class="col-md-2 o-pd" >\
	                                   <select class="form-control" id="val-skill" name="val-skill" @change="sendVal($event)">\
	                                         <option value="0">请选择</option>\
	                                         <option v-if="state" v-for="item in selectdata[k-1].son" :value="item.value">{{item.text}}</option>\
	                                   </select>\
	                          </div>',
                methods:{

                    selectChange:function (event){

                       if($(event.target).val()=='0'){
                           this.k=1;
                           this.state=false;
                       }else {
                       	   this.state=true;
                           this.k=$(event.target).val()
                       }
                    },
                    sendVal:function (event){
                          var data=$(event.target).val()
                          console.log(data)
                          this.$dispatch('send-select',data)
                    }
                }
     })


      new Vue({

                el: '#app',
                data: function () {
                    return {data: [{value: 1, text: 'css',son:[{value:'11',text:'11111'},{value:'111',text:'111111'}]}, {value: 2, text: 'js',son:[{value:'22',text:'2222'},{value:'222',text:'2222222'}]}, {value: 3, text: 'node',son:[{value:'333',text:'33333'},{value:'33333',text:'3333333333'}]}]}
                },
                methods: {}
      })




})