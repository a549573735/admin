define(function (require, exports, module) {
	 var Vue = require('lib_cmd/vue-cmd');
	 require('/js_cmd/components/paging')
	 require('/js_cmd/components/tables/com_tables')
	 var select = require('/js_cmd/components/select');
      new Vue({
                el: '#app',
                data: {

// InspectEntity {
// id (string, optional),
// notes (string, optional): 备注 ,
// status (string): 状态 = ['PASS', 'FAIL'],
// target (string): 企业 ,
// user (string): 检查员
// }


                    dataList:{
                           title:['企业名称','检查状态','检查员','检查日期','备注'],
                           content:function (){
                                     
                              var dataList=null;
                                 $.ajax({
                                    url: '/api/inspect/list',    //请求的url地址
                                    dataType: "json",   //返回格式为json
                                    async: false, //请求是否异步，默认为异步，这也是ajax重要特性
                                    type: "GET",   //请求方式
                                    success: function(data) {
                                        //请求成功时处理
                                  console.log(data)
                                        if(data.success){
                                       
                                            dataList=data.content
                                        }else {
                                              alert(data.errMessage)
                                        }
                                    },
                                    error: function(err) {
                                        //请求出错处理
                                         alert(err.msg);
                                    }

                                });
                                 return dataList     
                            }(),
                           style:['25%','100px','100px','15%','auto'],
                           details:[{_id:'1',msg:'该公司的销售及供应商'},{_id:'2',msg:'该公司的销售及供应商'}],
                           overfull:false,
                           selectsubset:[],
                    }
                   
                  
                },
                methods: {},
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

       // data:{

                   // title:['企业名称','检查状态','检查员','检查日期','备注'],
                   // content:[
                   //     ['上海医德医疗设备有限公司','true','王先生','2016-06-29'],
                   //     ['上海医德医疗设备有限公司','true','朱王杰','2016-06-29']
                   // ],
                   // style:['25%','100px','100px','15%','auto'],
                   // details:[{_id:'1',msg:'该公司的销售及供应商'},{_id:'2',msg:'该公司的销售及供应商'}],
                   // overfull:false

       //  }

});