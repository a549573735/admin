define(function (require, exports, module) {
    var Vue = require('lib_cmd/vue-cmd');

     Vue.component('v-select', {
                props:['role'],
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

                    }(),selectsubset:function (){

                        var id=$.query.get('market');
                        var select=[]; 
                        if(id){
                           $.ajax({
                                    url: '/park/briefall/'+id,    //请求的url地址
                                    dataType: "json",   //返回格式为json
                                    async: false, //请求是否异步，默认为异步，这也是ajax重要特性  
                                    type: "GET",   //请求方式
                                    success: function(data) {
                                        //请求成功时处理
                                         select = data.content;
                                    },
                                    error: function(err) {
                                        //请求出错处理
                                        alert(err.msg);
                                    }
                              }); 
                         }
                          return select


                    }(),marketId:function (){
                         return  $.query.get('market')
                    }(),type:'DISTRICT',parkId:function(){
                         return $.query.get('park') 
                    }(),parkType:'PARK'

                  }
                },
                template: '<label class="col-md-1 o-pd-r v-label" for="val-skill">市场所：</label>\
	                         <div class="col-md-2 o-pd">\
	                                 <select class="form-control" id="select_market" :disabled="role.type!= type " name="market" @change="selectChange($event)">\
	                                     <option value="0">请选择</option>\
                                       <option v-for="item in selectdata" :selected="marketId==item.id?true:false" :value="item.id">{{item.name}}</option>\
	                                 </select>\
	                         </div>\
	                          <label class="col-md-1 o-pd-r v-label text-center" for="val-skill2">园区：</label>\
	                                 <div class="col-md-2 o-pd" >\
	                                   <select class="form-control" id="select_park" :disabled="role.type== parkType " name="park"  @change="sendVal($event)">\
	                                         <option value="0">请选择</option>\
                                           <option v-for="item in selectsubset" :selected="parkId==item.id?true:false" :value="item.id">{{item.name}}</option>\
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


})