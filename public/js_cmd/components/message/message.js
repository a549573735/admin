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
                   var top=['行政建议','行政约谈','网络检查','预约检查']
                   $.ajax({
                            url: '/user/messages/list',    //请求的url地址
                            dataType: "json",   //返回格式为json
                            async: false, //请求是否异步，默认为异步，这也是ajax重要特性
                            type: "GET",   //请求方式
                            success: function(data) {
                                //请求成功时处理
                                if(data.success){
                               
                                  msgList=data
                              }else {
                                  alert(data.errMessage)
                              }
                            },
                            error: function(err) {
                                //请求出错处理
                                 alert(err);
                            }
                          })

                        msgList.content.content.forEach(function (item){  
                           switch(item.type){
                              case 'INTERVIEW':
                              item.title=top[1]
                              item.class="interview-msg"
                              break;
                              case 'INSPECT':
                              item.title=top[2]
                              item.class="inspect-msg"
                              break;
                              case 'APPOINTMENT':
                              item.title=top[3]
                              item.class="appointment-msg"
                              break;
                              case 'SUGGESTION':
                              item.title=top[0]
                              item.class="suggestion-msg"
                              break;
                           }
                           item.message=JSON.parse(item.message)
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
          <v-msg-content :datanow="message"></v-msg-content>    \
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

