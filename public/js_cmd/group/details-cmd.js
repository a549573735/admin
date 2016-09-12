define(function (require, exports, module) {


	    var Vue = require('lib_cmd/vue-cmd');

	    require("/js_cmd/components/paging");
	    require('/js_cmd/components/companytable/tabs_content_s')
	    require('/js_cmd/components/companytable/tabs_content_d')
	    require('/js_cmd/components/companytable/tabs_btn')

	    new Vue({
	         'el':'#app',

	         methods:{

	         	  setDate:function (){
	         	  
	         	  	 $('input[name=view]').val($.query.get('view'));
	         	  	 $('input[name=id]').val($.query.get('id'));
	         	  }(),
	         	  getDate:function (){
 						 $('#date-form').submit()
	         	  },
	         	  getName:function (){

	         	  	  $('#search-form').submit()
	         	  }


	         }
	    });
 })
   