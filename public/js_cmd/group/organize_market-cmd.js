define(function (require, exports, module) {
	require('/js_cmd/components/tables/handle_vue');
    

    var Vue = require('lib_cmd/vue-cmd');
    require('/js_cmd/components/paging')
    require('/js_cmd/components/tables/handle_tables')
    
	new Vue( {
	    	'el':'#handle-table',
		   data:   {

		   },
		   events:{

		   	  'send-page':function (page){

                      this.page=page-1
                      var that=this;
                      	
                      // $.get('/api/user/edit/list?page='+this.page+'&id='+this.id).then(function (data){

                      //       that.listData=data.content;

                      // })

                }
		   }
	    	

	})

});