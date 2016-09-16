define(function (require, exports, module) {
       var Vue = require('/lib_cmd/vue-cmd');

      require('/js_cmd/components/paging');
      require('/js_cmd/components/radio');

       new Vue({
                el: '#app',
                   data:{ put_id:'' ,
                          type:'DISTRICT',
                          listData:function (){
                            var list=[]
                             $.ajax({
                                    url:'/api/user/role/list',    //请求的url地址
                                    dataType: "json",   //返回格式为json
                                    async: false, //请求是否异步，默认为异步，这也是ajax重要特性  //参数值
                                    data:{type:this.type},
                                    type: "POST",   //请求方式
                                    success: function(data) {
                                       
                                       console.log(JSON.stringify(data))
                                       if(data.success){
                                        console.log(data.content)
                                           list=data.content
                                         }else {
                                            alert(data.errMessage)
                                         }
                                    }
                                });
                             return list
                          }(),
                          id:'',
                          page:'',
                         },
                  
                     methods: {
                         deleteUser:function (){
                               var idArr=[]; 
                               $('.user-checked').find('input').each(function (index,val){
                                     if($(val).prop('checked')){
                                        idArr.push($(val).val())                                        
                                     }
                               })

                               console.log(idArr)
                                $.ajax({
                                    url: '/app/role/delete',    //请求的url地址
                                    dataType: "json",   //返回格式为json
                                    async: false, //请求是否异步，默认为异步，这也是ajax重要特性
                                    data: {id: idArr },    //参数值
                                    type: "POST",   //请求方式
                                    success: function(data) {

                                       if(data.success){
                                            alert('删除成功')
                                         window.location.reload()
                                       }else {
                                         alert(data.errMessage)
                                       }
                                    },
                                    error: function(err) {
                                        //请求出错处理
                                        alert(err.msg);
                                    }
                                });
                         },
                         getMsg:function (event){
                              
                              
                         },putUser:function (){
                               
                         },

                     },
                      events:{

                            'send-radio': function (msg) {
                                // 事件回调内的 `this` 自动绑定到注册它的实例上
                                 var that=this;
                                 this.type=msg

                                 $.ajax({
                                  url:'/api/user/role/list',    //请求的url地址
                                  dataType: "json",   //返回格式为json
                                  async: false, //请求是否异步，默认为异步，这也是ajax重要特性  //参数值
                                  data:{type:this.type},
                                  type: "POST",   //请求方式
                                  success: function(data) {
                                      if(data.success){
                                     
                                         that.listData=data.content
                                       }else {
                                          alert(data.errMessage)
                                       }
                                  }
                                });

                             },
                             'send-select': function (id){
                                 var that=this;
                                 this.id=id;
 
                             },
                             'send-page':function (page){
                                  this.page=page-1

                                  var that=this;

                                  // $.get('/api/user/edit/list?page='+this.page+'&id='+this.id).then(function (data){

                                  //       that.listData=data.content;

                                  // })

                             }
                      }
            })


});