define(function (require, exports, module) {
    

  
    // <com-table-list :datalist="<%= JSON.stringify(data) %>" ></com-table-list>   调用方法
  
  // { data:{

//      title:['企业名称','检查状态','检查员','检查日期','备注'],
//      content:[
//                   ['上海医德医疗设备有限公司','true','王先生','2016-06-29','该公司的销售及供应商<a href="javascript:;" @click="sub($event)"  data-id="1"  class="btn btn-link"> 详情</a>'],
//                   ['上海医德医疗设备有限公司','true','朱王杰','2016-06-29','该公司的销售及供应商<a href="javascript:;" @click="sub($event)" data-id="2"  class="btn btn-link"> 详情</a>']

//              ]
                    
//              },
//      style:['25%','100px','100px','15%','auto']             
     //  }  数据结构

    var Vue = require('lib_cmd/vue-cmd');
    require('/js_cmd/components/tables/check_tables')
	
	new Vue( {
	    	'el':'#check-table',
		   data:   {
			   data:{
			   	   href:'/organize/company/',
				   title:['','企业名称','检查状态','检查员','检查日期','备注'],
				   content:[
					   ['上海医德医疗设备有限公司','true','王先生','2016-06-29','xxxxxx'],
					   ['上海医德医疗设备有限公司','true','朱王杰','2016-06-29','xxxxxx']
				   ],
				   style:['5%','auto','100px','100px','20%'],
				   details:[{_id:'1',msg:'该公司的销售及供应商'},{_id:'2',msg:'该公司的销售及供应商'}]

			   }
		   }
	    	

	})

});