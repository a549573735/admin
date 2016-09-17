define(function (require, exports, module) {
	require('/js_cmd/components/paging')
	var Vue = require('lib_cmd/vue-cmd');
    require('/js_cmd/components/tables/check_tables')
	
	new Vue( {
	    	'el':'#check-table',
		   data:   {
			   tableList:{
			   	   href:'',
				   title:['No.','园区名称','园区地址','联系人','联系方式','操作'],
				   content:function (){
				   	    var  arr =window.location.search.split('?')[1]?window.location.search.split('?')[1].split(/&?[a-z]+=/ig):'';
				   	    var  form={
				 				  	id:'all',
				 				  	page:arr[2]||0,
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
				  

				  
			   }

		   },
		   methods:{
		   	  getParkList:function (){
   			
		   	  	        var that=this;

		   	  	   	    var form={
		 				   	   parkname:$('.select-parkname').val()||'',
		 				   	   id: $('#select_park').val()
		 				   };

		 				this.tableList.content=this.getData(form)

 				  
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
		   	 

		   }  	

	})

});