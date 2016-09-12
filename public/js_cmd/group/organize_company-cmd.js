define(function (require, exports, module) {

    var Vue = require('lib_cmd/vue-cmd');
    require('/js_cmd/components/select');
    require('/js_cmd/components/paging')
    require('/js_cmd/components/tables/handle_tables_company')

    new Vue( {
	      'el':'#handle-table',
		   data:   {
		   	    

			   
		   },
		   methods:{

		   		searchData:function (){
		   				$('#company-list').submit();

		   		}


		   }
	})

});