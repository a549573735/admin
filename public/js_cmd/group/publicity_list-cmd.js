define(function (require, exports, module) {
     var Vue = require('lib_cmd/vue-cmd');
     require('/js_cmd/components/paging')
     require('/js_cmd/components/tables/com_tables')
     var select = require('/js_cmd/components/select');
     require('/js_cmd/components/admin_select');
      new Vue({
                el: '#publicity',
                data: {

                    dataList:{
                           title:['企业名称','年报状态','操作员','备注'],
                           content:function (){
                              var dataList=null;
                                 $.ajax({
                                    url: '/api/publicity/list',    //请求的url地址
                                    dataType: "json",   //返回格式为json
                                    async: false, //请求是否异步，默认为异步，这也是ajax重要特性
                                    type: "GET",   //请求方式
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
                           style:['25%','100px','15%','auto'],
                           details:[{_id:'1',msg:'该公司的销售及供应商'},{_id:'2',msg:'该公司的销售及供应商'}],
                           overfull:false,
                           selectsubset:[],

                    },companySelect:function(){

                        var id=$.query.get('id');
                        var select=null;
                      
                        $.ajax({
                                url:'/company/select?id='+id,    //请求的url地址
                                dataType: "json",   //返回格式为json
                                async: false, //请求是否异步，默认为异步，这也是ajax重要特性
                                type: "GET",   //请求方式
                                success: function(data) {
                                    //请求成功时处理
                                       if(data.dataSelect.content!=null){ 
                                        select=data.dataSelect.content.content
                                       }
                                },
                                error: function(err) {
                                    //请求出错处理
                                     //alert(err.msg);
                                }
                        });

                        console.log(select,111)
                       
                        return  select
                    }()

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

                          $.get('/api/publicity/list',form).then(function (data){
                              console.log(JSON.stringify(data.content))
                              that.dataList.content=data.content
                          })   

                   },
                   addPublicity:function (){

                        var form={
                            publicity:$('.val-publicity').val(),
                            notes:$('.notes-publicity').val(),
                            company:$('#publicity-select').val()
                        }

                        $.post('/add/publicity',form).then(function (data){  

                               if(data.success){
                                 alert('添加成功')
                               }else {
                                 alert('添加失败')
                               }
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

                      },
                      'send-select-admin':function (id){
                         var that=this;

                           
                          
                      }
                  
                }
      })

     

});