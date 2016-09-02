define(function (require, exports, module) {
    var Vue = require('lib_cmd/vue-cmd');
 
    require('/js_cmd/components/companytable/tabs_content_s')
    require('/js_cmd/components/companytable/tabs_content_d')
    require('/js_cmd/components/companytable/tabs_btn')

   
    
    var message=new Vue({
         'el':'#tables',
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
         }
      
    });

   seajs.use("js_cmd/group/marketList-cmd");

}) 
    