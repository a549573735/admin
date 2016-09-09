define(function (require, exports, module) {
       var Vue = require('/lib_cmd/vue-cmd');
    
      require('/js_cmd/components/radio');

       new Vue({

                el: '#app',
                   data:{      
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
                               
                             },
                             'send-code':function (id){
                              //POST /api/app/role/add
                                 var form={

                                    name:$('.per_name').val(),
                                    permissionIds:id,
                                    type:this.radio_val,
                         

                                 }

                                 $.post('/user/add/role',form).then(function (data){
                                        
                                        console.log(data)
                                        if(data.success){
                                          alert('添加成功')
                                          window.location.reload()
                                        }else {
                                           alert(data.errMessage)
                                        }

                                 })
                             }

                      }
            })


});