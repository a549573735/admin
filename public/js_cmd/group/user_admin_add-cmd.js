define(function (require, exports, module) {
       var Vue = require('/lib_cmd/vue-cmd');
	  
 			require('/js_cmd/components/radio');

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
                                 
                             },


                      }
            })


});