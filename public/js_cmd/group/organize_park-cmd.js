define(function (require, exports, module) {
	require('/js_cmd/components/paging')
	var Vue = require('lib_cmd/vue-cmd');
    require('/js_cmd/components/tables/check_tables')
	
	new Vue( {
	    	'el':'#check-table',
		   data:   {
			   tableList:{
			   	   href:'/organize/company/',
				   title:['','园区名称','园区地址','联系人','联系方式','操作'],
				   content:null,
				   style:['5%','20%','auto','120px','120px','100px']

			   }

// 			    {
// address (string): 地址 ,
// contact (string, optional): 联系人 ,
// id (string, optional),
// name (string): 名称 ,
// parentId (string): 所属 ,
// phone (string, optional): 电话
// }
			   
		   },
		   methods:{
		   	  getParkList:function (){

 				   var form={
 				   	   parkname:$('.select-parkname').val(),
 				   	   id: $('#select_park').val()
 				   };
 				   var that=this;

 				   $.ajax({
                        url: '/api/organize/park/list',    //请求的url地址
                        dataType: "json",   //返回格式为json
                        async: false, //请求是否异步，默认为异步，这也是ajax重要特性
                        data: form,    //参数值
                        type: "GET",   //请求方式
                        success: function(data) {
                            //请求成功时处理
                            that.tableList.content=data.content;
                        },
                        error: function(err) {
                            //请求出错处理
                            alert(err.msg);
                        }

                    });
		   	  }	 

		   }  	

	})

});