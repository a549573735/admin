define(function (require, exports, module) {
    var Vue = require('lib_cmd/vue-cmd');
    Vue.component('v-radio-select', {
        props: ['selectdata','radiodata'],
        data: function () {
            return {k: 1, state: false,radio:''}
        },
        template: '<div class="form-horizontal clearfix" >\
                    <div class=" clearfix">\
                        <div class="col-md-12">\
                            <div class="form-group" >\
                                <label class="col-md-2 v-label o-pd" for="radio-1">\
                                    <input class="radio-m" id="radio-1" @click="sendRadio($event)" value="DISTRICT" name="user" checked="checked" type="radio"><span></span>奉贤区局：</label>\
                                <label class="col-md-2 o-pd v-label-m" for="radio-2">\
                                    <input class="radio-m" name="user" @click="sendRadio($event)" value="MARKET" id="radio-2" type="radio"><span></span>市场所：</label>\
                                <div class="col-md-3 o-pd-l">\
                                    <select class="form-control" name="val-skill" @change="selectChange($event)">\
                                     <option value="0">请选择</option>\
                                         <option v-for="item in selectdata" :value="item.value">{{item.text}}</option>\
                                    </select>\
                                </div>\
                                <label class="col-md-1 o-pd v-label-s" for="radio-3">\
                                    <input class="radio-m" name="user" @click="sendRadio($event)" value="PARK" type="radio" id="radio-3"><span></span>园区：</label>\
                                <div class="col-md-3 o-pd-l">\
                                    <select class="form-control" name="val-skill" @change="sendVal($event)">\
                                             <option value="0">请选择</option>\
                                             <option v-if="state" v-for="item in selectdata[k-1].son" :value="item.value">{{item.text}}</option>\
                                    </select>\
                                </div>\
                            </div>\
                        </div>\
                    </div>\
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
            },

            sendRadio:function (event){
                   this.radio=$(event.target).val()

                   this.$dispatch('send-radio',this.radio)
            }

        }
    })


    Vue.component('v-radio-content', {
        props: ['datacheckbox'],
        data: function () {
            return {k: 1, state: false}
        },
        template: '<div class="row v-table">\
                    <div class="col-md-12 o-m-t">\
                        <div class="block">\
                            <div class="col-md-6  o-add-l">\
                                <div class="col-md-12 o-pd" >\
                                    <div class="col-md-3 o-pd  v-righ">角色名：</div>\
                                    <div class="col-md-9 o-pd ">\
                                        <input type="text" class="form-control"></div>\
                                    </div>\
                                <div class="col-md-12 o-m-t o-pd">\
                                    <div class="col-md-3 o-pd  v-righ">权限：</div>\
                                    <div class="col-md-9 o-pd v-left">\
                                        <label v-for="item in datacheckbox" class="col-md-6 o-pd css-input css-checkbox css-checkbox-primary"><input type="checkbox" id="row_3" :data-id="item.id" :code="item.code"  name="row_3"><span></span>{{item.name}}</label>\
                                    </div>\
                                </div>\
                                <div class="col-md-12 o-m-t o-pd">\
                                    <div class="col-md-3 o-pd o-m-t"></div>\
                                    <div class="col-md-9 o-pd ">\
                                        <div class="v-t-b ">\
                                          <button class=" btn btn-md btn-primary btn-block  " type="submit">确定</button>\
                                        </div>\
                                    </div>\
                                    </div>\
                                </div>\
                            </div>\
                        </div>\
                    </div>\
                </div>'
    })


      new Vue({

                el: '#app',
                   data:{        data: [{value: 1, text: 'css',son:[{value:'11',text:'11111'},{value:'111',text:'111111'}]}, {value: 2, text: 'js',son:[{value:'22',text:'2222'},{value:'222',text:'2222222'}]}, {value: 3, text: 'node',son:[{value:'333',text:'33333'},{value:'33333',text:'3333333333'}]}],
                                 radio_val:'DISTRICT',
                                 checkboxDate:function (){
                                             var dataCheck=null; 
                                             var that=this;
                                             $.ajax({
                                                      url: '/user/add/list',    //请求的url地址
                                                      dataType: "json",   //返回格式为json
                                                      async: false, //请求是否异步，默认为异步，这也是ajax重要特性
                                                      data: { "type": that.radio_val },    //参数值
                                                      type: "POST",   //请求方式
                                                      success: function(data) {
                                                          //请求成功时处理
                                                          dataCheck=data.content;
                                                      },
                                                      error: function(err) {
                                                          //请求出错处理
                                                          alert(err.msg);
                                                      }
                                                  });
                                             return dataCheck
                                  }(),
                      },
                  
                     methods: {

                     },
                      events:{
                            'send-radio': function (msg) {
                                // 事件回调内的 `this` 自动绑定到注册它的实例上
                                 var that=this;
                                 that.radio_val=msg;
                                 $.post('/user/add/list',{type:this.radio_val}).then(function (data){
                                      that.checkboxDate=data.content
                                 })
                               
                             }

                      }
            })
});