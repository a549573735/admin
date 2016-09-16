define(function (require, exports, module) {
     var Vue = require('lib_cmd/vue-cmd');
     require('/js_cmd/components/paging')
     require('/js_cmd/components/tables/com_tables')
     var select = require('/js_cmd/components/select');
      new Vue({
                el: '#app',
                data: {

                    dataList:{
                           title:['企业名称','建议状态','建议内容','检查员','检查日期','备注'],
                           content:function (){
                                     
                              var dataList=null;
                                 $.ajax({
                                    url: '/api/suggestion/list',    //请求的url地址
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
                                         //alert(err.msg);
                                    }

                                });
                                 return dataList     
                            }(),
                           style:['25%','100px','auto','100px','15%','10%'],
                           details:[{_id:'1',msg:'该公司的销售及供应商'},{_id:'2',msg:'该公司的销售及供应商'}],
                           overfull:false,
                           selectsubset:[],

                    }
                   
                  
                },
                methods: {

                   getContent:function (){
                          var that=this;
                          var form= {
                              "page":this.page||0,
                              "size":15,
                              "type":$('#selectType').val(),
                              "market":$('#select_market').val(),
                              "company":$('input[name=company]').val(),
                              "park":$('#select_park').val(),
                              "from":$('input[name=from]').val(),
                              "to":$('input[name=to]').val()
                              }

                          $.get('/api/suggestion/list',form).then(function (data){

                              that.dataList.content=data.content
                          })   
                   } 
                },
                events:{

                    'send-page':function (page){

                      this.page=page-1
                      var that=this;
                      this.getContent()
                      // $.get('/api/user/edit/list?page='+this.page+'&id='+this.id).then(function (data){

                      //       that.listData=data.content;

                      // })

                      }
                  
                }
      })

     

});