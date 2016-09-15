define(function (require, exports, module) {
    var Vue = require('lib_cmd/vue-cmd');
    require('/js_cmd/components/message/msg-content')
    require('/js_cmd/components/message/msg-list')
   
    
    var message=new Vue({
         'el':'#v-msg',
         data:function (){
         	return {
         	     msglist:function (){
                   var msgList=null
                   $.ajax({
                            url: '/user/messages/list',    //请求的url地址
                            dataType: "json",   //返回格式为json
                            async: false, //请求是否异步，默认为异步，这也是ajax重要特性
                            type: "GET",   //请求方式
                            success: function(data) {
                                //请求成功时处理
                          console.log(data)
                                if(data.success){
                               
                                  msgList=data.content.content
                              }else {
                                  alert(data.errMessage)
                              }
                            },
                            error: function(err) {
                                //请求出错处理
                                 alert(err);
                            }
                          })
                      return  msgList  
               }(),
         	   message:{
         	     	      title:'',
                      content:'',
                      id:'',
                      date:'',
                      company:'',
                      type:'',
         	   }
         	}
         },
         template:'\
          <div class="modal-body o-pd-t" id="v-msg">\
					<v-msg-list :datalist="msglist" ></v-msg-list>		\
					<v-msg-content :datanow="message"></v-msg-content>		\
          </div>\
         ',
         events: {
		    'send-msg': function (msg) {
		      // 事件回调内的 `this` 自动绑定到注册它的实例上
		      this.message=msg

		    
		    }
		  }


    });




});

