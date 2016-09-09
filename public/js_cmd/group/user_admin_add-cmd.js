define(function (require, exports, module) {
       var Vue = require('/lib_cmd/vue-cmd');
	  
 			require('/js_cmd/components/radio');

       new Vue({

                el: '#app',
                   data:{    form:{type:'DISTRICT',_id:'' } ,
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
                         subForm:function (event){
                               var form={
                                
                                    type:this.form.type,
                                    belongId:this.form._id||'',
                                    username:$('.username').val(),
                                    roleId:$('.val-user-id').val(),
                                    mail:$('.email').val(),
                                    password:$('.password ').val(),
                                    displayName:$('.displayName').val(),
                                    phone:$('.phone').val()

                               }
                               $.post('/user/admin/add',form).then(function (data){
                                      
                                      if(data.success==false||data.state==false){
                                        alert(data.msg)
                                      }else {
                                         window.location.href='/user/edit/list';
                                      }
                               })
                         }
                     },
                      events:{
                            'send-radio': function (msg) {
                                // 事件回调内的 `this` 自动绑定到注册它的实例上
                                 var that=this;
                                 this.form.type=msg
                           
                             },
                             'send-select':function (id){
                                 
                                  this.form._id=id

                             }


                      }
         })




});