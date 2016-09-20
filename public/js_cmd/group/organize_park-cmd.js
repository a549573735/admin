define(function (require, exports, module) {
	require('/js_cmd/components/paging')
	var Vue = require('lib_cmd/vue-cmd');
    require('/js_cmd/components/tables/check_tables')
	
	new Vue( {
	    	'el':'#check-table',
		   data:   {
			   tableList:{
			   	   href:'/organize/company?id=',
				   title:['','园区名称','园区地址','联系人','联系方式','操作'],
				   content:function (){
				   	    
				   	    var id=$.query.get('id');
				   	    var page=$.query.get('page');
				   	    var  form={
				 				  	id:id||'all',
				 				  	page:page||0,
				 				  	parkname:'',
				 				}	
				 		var datalist=null;
		                     $.ajax({
		                        url: '/api/organize/park/list',    //请求的url地址
		                        dataType: "json",   //返回格式为json
		                        async: false, //请求是否异步，默认为异步，这也是ajax重要特性
		                        data:form,
		                        type: "GET",   //请求方式
		                        success: function(data) {
		                            //请求成功时处理
		                        console.log(data)
		                            if(data.success){
		                           
				                          datalist=data.content
			                        }else {
			                        	  alert(data.errMessage)
			                        }
		                        },
		                        error: function(err) {
		                            //请求出错处理
		                             alert(err.msg);
		                        }

		                    });
		                return datalist
				   }(),
				   style:['5%','20%','auto','120px','120px','100px'],
				   type:"PARK",
				   overfull:true,
				   overfull_btn:true,

				  
			   }

		   },
		   methods:{
		   	  getParkList:function (){
   			
		   	  	        var that=this;

		   	  	   	    var form={
		 				   	   parkname:$('.select-parkname').val()||'',
		 				   	   id: $('#select_park').val()||$.query.get('id')
		 				 };

		 				this.tableList.content=this.getData(form)

						
				  // console.log(this.tableList)
 				  
		   	  },getData:function (form){
		   	     	var datalist=null;
                     $.ajax({
                        url: '/api/organize/park/list',    //请求的url地址
                        dataType: "json",   //返回格式为json
                        async: false, //请求是否异步，默认为异步，这也是ajax重要特性
                        data:form,
                        type: "GET",   //请求方式
                        success: function(data) {
                            //请求成功时处理
                     
                            if(data.success){
                              console.log(data.content) 
		                        datalist=data.content
	                        }else {
	                        	  alert(data.errMessage)
	                        }
                        },
                        error: function(err) {
                            //请求出错处理
                             alert(err.msg);
                        }

                    });
                     return datalist

		   	  }	 

		   },events:{
		   	 'send-page':function (page){
		   	 		
		   	 		this.tableList.content.page=page;
		   	 		 var that=this;

		   	  	   	    var form={
		 				   	   parkname:$('.select-parkname').val()||'',
		 				   	   id: $('#select_park').val()==0?($.query.get('id')||'all'):$('#select_park').val(),
		 				   	   page:page-1
		 				};


		 			this.tableList.content=this.getData(form)


		   	 }
		   }  	

	})

});