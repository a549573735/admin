define(function (require, exports, module) {
       var Vue = require('/lib_cmd/vue-cmd');
    
      require('/js_cmd/components/radio');



       new Vue({

                el: '#app',
                    data:{      
                               radio_val:'',
                               checkboxDate:function (){
                                           var dataCheck=null; 
                                           var that=this;
                                           $.ajax({
                                                    url: '/user/add/list',    //请求的url地址
                                                    dataType: "json",   //返回格式为json
                                                    async: false, //请求是否异步，默认为异步，这也是ajax重要特性
                                                    data: { "type":this.radio_val||JSON.parse($('#user_role').val()).type },    //参数值
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
                                    type:this.radio_val||JSON.parse($('#user_role').val()).type,
                                    id:$.query.get('id')||'',
                                    belongId:$.query.get('belongId')
                                 }


                                 var type=$.query.get('type')||''
                              

                                 if(type=='modify'){
                                     console.log(form)

                                    $.post('/api/user/role/modify',form).then(function (data){
                                            
                                            console.log(data)
                                            if(data.success){
                                              alert('修改成功')
                                              window.location.href='/user/role/list';
                                            }else {
                                               alert(data.errMessage)
                                            }

                                     })

                                 }else {

                                    $.post('/user/add/role',form).then(function (data){
                                            
                                            console.log(data)
                                            if(data.success){
                                              alert('添加成功')
                                              window.location.href='/user/role/list';
                                            }else {
                                               alert(data.errMessage)
                                            }

                                    })
                                 }
                             }

                      }
            })


});