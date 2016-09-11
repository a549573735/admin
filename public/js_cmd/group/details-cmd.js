define(function (require, exports, module) {


	    var Vue = require('lib_cmd/vue-cmd');
	    seajs.use("/js_cmd/components/paging");
	    seajs.use("js_cmd/group/marketList-cmd");


	 
	    require('/js_cmd/components/companytable/tabs_content_s')
	    require('/js_cmd/components/companytable/tabs_content_d')
	    require('/js_cmd/components/companytable/tabs_btn')

	    var message=new Vue({
	         'el':'#app',
	         data:function (){
	           	return {
 
	           	}
	         }
	    });


   seajs.use("js_cmd/group/marketList-cmd");
    
 })
   