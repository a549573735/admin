define(function (require, exports, module) {
	require('/js_cmd/components/paging')
	var Vue = require('lib_cmd/vue-cmd');
    require('/js_cmd/components/tables/check_tables')
	
	new Vue( {
	    	'el':'#admin-park',
		   data:   {
			   tableList:{
			   	   href:'',
				   title:['园区名称','用户名','邮箱','园区地址','联系人','联系方式','操作'],
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
		                         
		                        }

		                    });
		                     return datalist
				   }(),
				   style:['15%','10%','auto','10%','10%','120px','37%'],
				   type:"PARK",
				   btns:true,
				   checked:true
				  
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
                     
                        }

                    });
                     return datalist
		   	  }
		   	 
		   },events:{
			   	'send-page':function (page){

			   		    var  form={
				 				     page:page-1,
				 				  	 parkname:$('.select-parkname').val()||'',
		 				   	  		 id: $('#select_park').val()||'all'
				 				}	

				 		var that=this;			

		                     $.ajax({
		                        url: '/api/organize/park/list',    //请求的url地址
		                        dataType: "json",   //返回格式为json
		                        async: false, //请求是否异步，默认为异步，这也是ajax重要特性
		                        data:form,
		                        type: "GET",   //请求方式
		                        success: function(data) {
		                            //请求成功时处理
		                  
		                            if(data.success){
		                           		
				                         that.tableList.content=data.content
				                         console.log(JSON.stringify(data.content))
			                        }else {
			                        	  alert(data.errMessage)
			                        }
		                        },
		                        error: function(err) {
		                            //请求出错处理
		                    
		                        }

		                    });

			   	}
		   }  	

	})

});
