define(function (require, exports, module) {

    var Vue = require('lib_cmd/vue-cmd');
    require('/js_cmd/components/select');
    require('/js_cmd/components/paging')
    require('/js_cmd/components/tables/handle_tables_company')

    new Vue( {
	      'el':'#handle-table',
		   data:{
		   	  tablsData: function (){
                    return JSON.parse($('.data_tabls').val())

		   	  }(),
		   },
		   methods:{
		   		searchData:function (){
		   			var that=this;
		   				var form={
							  "businesses": $('input[name=businesses]').val(),
							  "company":  $('input[name=company]').val(),
							  "customer":  $('input[name=customer]').val(),
							  "market":  $('#select_market').val(),
							  "page": 0,
							  "park":  $('#select_park').val(),
							  "producer":  $('input[name=producer]').val(),
							  "product":  $('input[name=product]').val(),
							  "provider":  $('input[name=provider]').val(),
							  "size": 15
							}
			
 					$.post('/api/organize/company/list',form).then(function (data){
						that.tablsData=	data
						console.log(data)
 					})

		   		}
		   }
	})

});