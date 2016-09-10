define(function (require, exports, module) {
	require('/js_cmd/components/tables/handle_vue');
    

    var Vue = require('lib_cmd/vue-cmd');
    require('/js_cmd/components/paging')
    require('/js_cmd/components/tables/handle_tables')
    
	new Vue( {
	    	'el':'#handle-table',
		   data:   {
			   // data:{
			   // 	   href:'/organize/park/',
				  //  title:['企业名称','检查状态','检查员','检查日期','备注'],
				  //  content:[
					 //   ['上海医德医疗设备有限公司','true','王先生','2016-06-29'],
					 //   ['上海医德医疗设备有限公司','true','朱王杰','2016-06-29']
				  //  ],
				  //  style:['25%','100px','100px','15%','auto'],
				  //  details:[{_id:'1',msg:'该公司的销售及供应商'},{_id:'2',msg:'该公司的销售及供应商'}],
				  //  overflow:true

			   // }
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