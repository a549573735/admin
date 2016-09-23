define(function (require, exports, module) {
     var Vue = require('lib_cmd/vue-cmd');
     require('/js_cmd/components/paging')
     require('/js_cmd/components/tables/interview_table')
     var select = require('/js_cmd/components/select');
      new Vue({
                el: '#app',
                data: {

                    dataList:{
                           title:['企业名称','约谈状态','发送时间','时间类别','接受日期','约谈员','备注'],
                           content:function (){
                                     
                              var dataList=null;
                                 $.ajax({
                                    url: '/api/interview/list',    //请求的url地址
                                    dataType: "json",   //返回格式为json
                                    async: false, //请求是否异步，默认为异步，这也是ajax重要特性
                                    type: "POST",   //请求方式
                                    success: function(data) {
                                        //请求成功时处理
                                     console.log(data)
                                        if(data.success){
                                       
                                            dataList=data.content
                                        }else {
                                              console.log(data.errMessage)
                                        }
                                    },
                                    error: function(err) {
                                         //请求出错处理
                                         //alert(err.msg);
                                    }

                                });
                                 return dataList     
                            }(),
                           style:['20%','110px','110px','110px','110px','80px','auto'],
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
                              "company":$('input[name=company]').val(),
                              "park":$('#select_park').val(),
                              "from":$('input[name=from]').val(),
                              "to":$('input[name=to]').val()
                              }

                    
                          $.post('/api/interview/list',form).then(function (data){

                              that.dataList.content=data.content

                          })   

                   }


                },
                events:{

                    'send-page':function (page){

                      this.page=page-1

                      var that=this;

                      this.getContent( this.page )

                      // $.get('/api/user/edit/list?page='+this.page+'&id='+this.id).then(function (data){

                      //       that.listData=data.content;

                      // })

                      }
                      
                  
                }
      })

     

});