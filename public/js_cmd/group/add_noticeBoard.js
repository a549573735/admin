define(function (require, exports, module) {
     var Vue = require('lib_cmd/vue-cmd');

 
      new Vue({
                el: '#noticeBoard',
                data: {
                      nowNoticBoard:function (){
                           var noticBoard=[{attachments:'',title:'',content:''}];
                          if(GetQueryString('id')){
                            var _id=GetQueryString('id');
             
                             $.ajax({
                                    url: '/api/noticedetails',    //请求的url地址
                                    dataType: "json",   //返回格式为json
                                    async: false, //请求是否异步，默认为异步，这也是ajax重要特性  
                                    type: "POST",   //请求方式
                                    data:{id:_id},
                                    success: function(data) {
                                        //请求成功时处理
                                        if(data.success){
                                            data.content.content=data.content.content.replace(/<br\s\/>/gi,'\n');
                                            console.log(data.content.content)
                                            noticBoard = data.content;
                                        }
                                    },
                                    error: function(err) {
                                        //请求出错处理
                                        alert(err.msg);
                                    }
                              }); 
                  
                          }
                                     return noticBoard
                      }(),
                },

                methods: {
                    addNoticeBoard:function (event){
                          

                    }
                
                },
                events:{
                   
                }
      })

       function GetQueryString(name) {  
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");  
                var r = window.location.search.substr(1).match(reg);  //获取url中"?"符后的字符串并正则匹配
                var context = "";  
                if (r != null)  
                     context = r[2];  
                reg = null;  
                r = null;  
                return context == null || context == "" || context == "undefined" ? "" : context;  
        }

     

});
