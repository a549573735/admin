define(function (require, exports, module) {
    var Vue = require('lib_cmd/vue-cmd');
    require('/js_cmd/components/message/msg-content')
    require('/js_cmd/components/message/msg-list')
   
    
     
    var message=new Vue({
         'el':'#v-msg',
         data:function (){
         	return {
         	     msglist:[
         	     {
                      title:'邹兴平是个禽兽1',
                      content:'赶紧死去把组建写完 不然抽的你妈都不认得',
                      _id:'1',
                      date:'2016-9-1',
                      company:'狗日的'
         	     },
         	     {
                      title:'邹兴平是个禽兽2',
                      content:'赶紧死去把组建写完 不然抽的你妈都不认得',
                      _id:'2',
                      date:'2016-9-1',
                      company:'狗日的'
         	     },
         	     {
                      title:'邹兴平是个禽兽3',
                      content:'赶紧死去把组建写完 不然抽的你妈都不认得',
                      _id:'3',
                      date:'2016-9-1',
                      company:'狗日的'
         	     }
         	     ],
         	   message:{
         	     	  title:'邹兴平是个禽兽1',
                      content:'赶紧死去把组建写完 不然抽的你妈都不认得',
                      _id:'1',
                      date:'2016-9-1',
                      company:'狗日的'

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

		      console.log(msg)

		    }
		  }


    });




});

