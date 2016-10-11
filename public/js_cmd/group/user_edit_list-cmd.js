define(function (require, exports, module) {
       var Vue = require('/lib_cmd/vue-cmd');

	    require('/js_cmd/components/paging');
 			require('/js_cmd/components/user_radio');
     

       new Vue({
                el: '#user-edit-list',
                   data:{ put_id:'' ,
                          listData:function (){
                            var list=[]
                             $.ajax({
                                    url:'/api/user/edit/list',    //请求的url地址
                                    dataType: "json",   //返回格式为json
                                    async: false, //请求是否异步，默认为异步，这也是ajax重要特性  //参数值
                                    type: "GET",   //请求方式
                                    success: function(data) {
                                       
                           
                                       if(data.success){
                                           list=data.content
                                         }else {
                                            alert(data.errMessage)
                                         }
                                    }
                                });
                             return list
                          }(),
                          id:'',
                          roleSelect:function (){
                                  return   JSON.parse($('#role_select').val())
                           }(),
                          nowRole:'', 
                         
                          
                         },
                  
                     methods: {
                         deleteUser:function (){
                               var userArr=[]; 
                               $('.user-checked').find('input').each(function (index,val){
                                     if($(val).prop('checked')){
                                        userArr.push($(val).val())                                        
                                     }
                               })
                                $.ajax({
                                    url: '/delete/user',    //请求的url地址
                                    dataType: "json",   //返回格式为json
                                    async: false, //请求是否异步，默认为异步，这也是ajax重要特性
                                    data: {user: userArr },    //参数值
                                    type: "POST",   //请求方式
                                    success: function(data) {
                                       //console.log(data)
                                      if(data.success){
                                        alert('删除成功')
                                       window.location.reload()
                                      }else{
                                        alert('删除失败')
                                      }

                                    },
                                    error: function(err) {
                                        //请求出错处理
                                        alert(err.msg);
                                    }
                                });
                         },
                         getMsg:function (event){
                               // model-put-btn
                               var tr=$(event.target).closest('tr');
                               var id=$(event.target).attr('data-id');
                              
                               var belongId=$(event.target).attr('data-belongId');
                               var type=$(event.target).attr('data-type')
 
                               $('.model-displayName').val(tr.find('.displayName').html())
                               $('.model-username').val(tr.find('.username').html())
                               $('.model-phone').val(tr.find('.phone').html())
                               $('.model-mail').val(tr.find('.mail').html())
                               $('.model-id').val(id);
                             
                               $('.model-belongId').val(belongId);
                               $('.model-type').val(type);
                               this.nowRole=$(event.target).attr('data-roleId');
                              
                         },putUser:function (){
                                var that=this;

                                $('.model-put-btn').on('click',function (){

                                    var from={
                                          displayName:$('.model-displayName').val(),
                                          username:$('.model-username').val(),
                                          phone:$('.model-phone').val(),
                                          mail:$('.model-mail').val(),
                                          password:$('.model-password').val(),
                                          id:$('.model-id').val(),
                                          belongId:$('.model-belongId').val(),
                                          type:$('.model-type').val(),
                                          roleId:$('#select-role-id').val(),
                                          roleName:$('#select-role-id').find("option:selected").text()
                                    }
                                    if($('#select-role-id').val()==''){
                                       alert('角色不能为空');
                                         false 
                                    }
                                
                                   $.ajax({
                                        url: '/put/user',    //请求的url地址
                                        dataType: "json",   //返回格式为json
                                        async: true, //请求是否异步，默认为异步，这也是ajax重要特性
                                        data: from,    //参数值
                                        type: "POST",   //请求方式
                                        success: function(data) {
                                           
                                           if(data.success){
                                            alert('修改成功') 
                                           // $('#modal-fromuser').modal('toggle')
                                            window.location.reload()
                                          }else {

                                              alert(data.errMessage)
                                          }
                                          
                                        },
                                        error: function(err) {
                                            //请求出错处理
                                            console.log(err)
                                        }
                                    });
                                })
                         }(),
                         restPassword:function (event){
                                  var id=$(event.target).attr('data-id'); 
                                   console.log(id) 
                                  $.post('/reset/user/password',{id:id}).then(function (data){
                                        if(data.success){
                                          alert('重置成功，密码将会发入填写的邮箱中')
                                        }else{
                                          alert(data.errMessage)
                                        }

                                  })
                         }

                     },
                      events:{

                            'send-radio': function (msg) {
                                // 事件回调内的 `this` 自动绑定到注册它的实例上
                                 var that=this;
                             },
                             'send-select': function (id){
                                 var that=this;
                                 this.id=id;
 
                                 $.get('/api/user/edit/list?page='+this.page+'&id='+this.id).then(function (data){

                                        that.listData=data.content;

                                  }) 
                             },
                             'send-page':function (page){
                                  this.page=page-1

                                  var that=this;

                                  $.get('/api/user/edit/list?page='+this.listData.page+'&id='+this.id).then(function (data){

                                        that.listData=data.content;

                                  })

                             }
                      }
            })


});