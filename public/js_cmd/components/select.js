define(function (require, exports, module) {
    var Vue = require('lib_cmd/vue-cmd');

     Vue.component('v-select', {
                data:function (){
                    return { _id:1 ,state:false,selectdata:function (){
                        var  dataSelect=null;
                           $.ajax({
                                  url: '/market/brief',    //请求的url地址
                                  dataType: "json",   //返回格式为json
                                  async: false, //请求是否异步，默认为异步，这也是ajax重要特性  
                                  type: "GET",   //请求方式
                                  success: function(data) {
                                      //请求成功时处理
                                      dataSelect=data.content;
                                  },
                                  error: function(err) {
                                      //请求出错处理
                                      alert(err.msg);
                                  }
                              });
                         
                          return dataSelect

                    }(),selectsubset:[]}
                },
                template: '<label class="col-md-1 o-pd-r v-label" for="val-skill">市场所：</label>\
	                         <div class="col-md-2 o-pd">\
	                                 <select class="form-control" id="select_market" name="market" @change="selectChange($event)">\
	                                     <option value="0">请选择</option>\
	                                     <option v-for="item in selectdata" :value="item.id">{{item.name}}</option>\
	                                 </select>\
	                         </div>\
	                          <label class="col-md-1 o-pd-r v-label text-center" for="val-skill2">园区：</label>\
	                                 <div class="col-md-2 o-pd" >\
	                                   <select class="form-control" id="select_park"name="park" @change="sendVal($event)">\
	                                         <option value="0">请选择</option>\
                                           <option v-if="state" v-for="item in selectsubset" :value="item.id">{{item.name}}</option>\
	                                   </select>\
	                          </div>',
                methods:{

                    selectChange:function (event){
                       var that=this;
                       if($(event.target).val()=='0'){
                           this._id=1;
                           this.state=false;
                       }else {
                       	   this.state=true;
                           this._id=$(event.target).val();
                        
                            var that=this;
                            console.log(this._id)

                             $.ajax({
                                  url: '/park/briefall/'+that._id,    //请求的url地址
                                  dataType: "json",   //返回格式为json
                                  async: false, //请求是否异步，默认为异步，这也是ajax重要特性  
                                  type: "GET",   //请求方式
                                  success: function(data) {
                                      //请求成功时处理
                                      console.log(JSON.stringify(data.content))
                                       that.selectsubset = data.content;
                                  },
                                  error: function(err) {
                                      //请求出错处理
                                      alert(err.msg);
                                  }
                              });
                            
                       }
                    },
                    sendVal:function (event){
                        
                          var data=$(event.target).val()

                          console.log(data)
                          this.$dispatch('send-select',data)
                    }
                }
     })

      // return {data: [{value: 1, text: 'css',son:[{value:'11',text:'11111'},{value:'111',text:'111111'}]}, {value: 2, text: 'js',son:[{value:'22',text:'2222'},{value:'222',text:'2222222'}]}, {value: 3, text: 'node',son:[{value:'333',text:'33333'},{value:'33333',text:'3333333333'}]}]}
     

})