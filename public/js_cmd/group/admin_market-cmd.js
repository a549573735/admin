define(function (require, exports, module) {
	require('/js_cmd/components/tables/handle_vue');
    
    var Vue = require('lib_cmd/vue-cmd');
    require('/js_cmd/components/paging')
    require('/js_cmd/components/tables/admin_handle_tables')
    
	new Vue( {
	    	'el':'#admin-market',
		   data:   {

		   },
		   events:{

		   	  'send-page':function (page){

                      this.page=page-1
                      var that=this;

                }
		   }
	    	

	})

});