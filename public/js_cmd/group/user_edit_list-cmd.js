define(function (require, exports, module) {
       var Vue = require('/lib_cmd/vue-cmd');

	    require('/js_cmd/components/paging');
 			require('/js_cmd/components/radio');

       new Vue({

                el: '#app',
                   data:{  },
                  
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