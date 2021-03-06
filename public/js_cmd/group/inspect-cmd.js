define(function (require, exports, module) {
	 var Vue = require('lib_cmd/vue-cmd');
	 require('/js_cmd/components/paging')
	 require('/js_cmd/components/tables/com_tables')
	 var select = require('/js_cmd/components/select');
      new Vue({
                el: '#inspect',
                data: {
                    dataList:{
                           title:['企业名称','检查状态','检查员','检查时间','备注'],
                           content:function (){
                                     
                              var dataList=null;
                                 $.ajax({
                                    url: '/api/inspect/list',    //请求的url地址
                                    dataType: "json",   //返回格式为json
                                    async: false, //请求是否异步，默认为异步，这也是ajax重要特性
                                    type: "GET",   //请求方式
                                    success: function(data) {
                                        //请求成功时处理                          
                                        if(data.success){
                                            dataList=data.content
                                        }else {
                                        }
                                    },
                                    error: function(err) {
                                        //请求出错处理
                                         //alert(err.msg);
                                    }
                                });
                                if( dataList!=null){ 
                                   dataList.content.forEach(function (item){

                                        if(item.target==null)item.target="";
                                          item.target+='  '
                                        

                                   })
                                 }    
                             
                                 return dataList     
                            }(),
                           style:['23%','100px','100px','20%','auto'],
                           details:[{_id:'1',msg:'该公司的销售及供应商'},{_id:'2',msg:'该公司的销售及供应商'}],
                           overfull:false,
                           selectsubset:[],
                   

                    }
                   
                  
                },
                methods: {

                     getContent:function (page){
                          var that=this;
                          var form= {
                              "page":page||0,
                              "size":15,
                              "type":$('#selectType').val(),
                              "market":$('#select_market').val(),
                              "company":$('input[name=companyName]').val(),
                              "park":$('#select_park').val(),
                              "from":$('input[name=from]').val(),
                              "to":$('input[name=to]').val()
                              }

                                
                          $.get('/api/inspect/list',form).then(function (data){

                                
                                data.content.content.forEach(function (item){

                                      for (var name in item )
					                            if(item[name]==null)item[name]="";
                                        item[name]+='  '
                                                                            
                                })   

                                that.dataList.content=data.content

                          })   
                   }


                },
                events:{

                    'send-page':function (page){

                      this.page=page-1
                      var that=this;

                      this.getContent(page-1)


                      }
                  
                }
      })

     

});
