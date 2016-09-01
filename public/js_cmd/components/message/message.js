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
                      title:'111111111',
                      content:'aaaaaaaaaaaaaaaaaaa',
                      _id:'1',
                      date:'2016-9-1',
                      company:'XXX公司'
         	     },
         	     {
                      title:'2222222222222',
                      content:'bbbbbbbbbbbbbbbbbbb',
                      _id:'2',
                      date:'2016-9-1',
                      company:'XXX公司'
         	     },
         	     {
                      title:'3333333333333',
                      content:'ccccccccccccccccccc',
                      _id:'3',
                      date:'2016-9-1',
                      company:'日'
         	     }
         	     ],
         	   message:{
         	     	  title:'444444444444444444',
                      content:'dddddddddddddddddddd',
                      _id:'1',
                      date:'2016-9-1',
                      company:'日'
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

