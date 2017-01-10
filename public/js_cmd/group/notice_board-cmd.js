define(function (require, exports, module) {
     var Vue = require('lib_cmd/vue-cmd');
     require('/js_cmd/components/paging')
     require('/js_cmd/components/paging_notice')
     require('/js_cmd/components/tables/noticeBoard_table')
 
      new Vue({
                el: '#noticeBoard',
                data: {

                    dataList:{
                           title:[' ','标题','发布人','发布时间','操作'],
                           content:function (){
                              var dataList=null;
                                    $.ajax({
                                    url: '/api/noticeboard/list',    //请求的url地址
                                    dataType: "json",   //返回格式为json
                                    async: false, //请求是否异步，默认为异步，这也是ajax重要特性
                                    type: "POST",   //请求方式
                                    success: function(data) {
                                        //请求成功时处理
                                        if(data.success){
                                            dataList=data.content
                                        }else {
                                        }
                                    },
                                    error: function(err) {
                                    }
                                });
                      
                                 return dataList     
                            }(),
                           style:['8%','20%','20%','20%','auto'],
                           details:[{_id:'1',msg:'该公司的销售及供应商'},{_id:'2',msg:'该公司的销售及供应商'}],
                           overfull:false,
                           selectsubset:[],
                    },
                    dataNotice:{
                          title:['企业名称','联系人','联系方式','阅读时间'],
                          style:['auto','10%','20%','20%'],
                          content:{page:0,content:[{companyName:'',contact:'',phone:'',readTime:''}]}
                    },
                    details:{title:'',companyCount:'',createDate:'',content:'',createUser:'',readCount:'',attachments:''},
                    booleanRead:null,
                },
                methods: {

                  getContent:function (page){
                          var that=this;
                          var title=$('input[name=noticetitle]').val();

                          var form= {
                              "page":page||0,
                              "size":15,
                              }
                           if(title!=''){
                               form.title=title;
                           }   
                          $.post('/api/noticeboard/list',form).then(function (data){
                              that.dataList.content=data.content
                          })   
                   },
                   getreacDetails:function (event){
                           this._id=$(event.target).attr('data-id');
                           this.booleanRead=$(event.target).attr('data-read');
                           this.dataNotice.content = {page:0,content:[{companyName:'',contact:'',phone:'',readTime:''}]}
                           var form={
                                id:this._id,
                                read:this.booleanRead,
                                page:this.page_notice||0
                           }
                          
                           var that=this;
                           $.post('/notice/isread/list',form).then(function (data){
                                  console.log(data)
                                  if(data.content.content.length>0){
                                      that.dataNotice.content=data.content
                                  }
                           }) 
                   },
                   getPageDetails:function (read,id){
                      
                           var form={
                                id:id,
                                read:read,
                                page:this.page_notice||0
                           }
                          
                           var that=this;
                           $.post('/notice/isread/list',form).then(function (data){
                                  
                                  if(data.content.content.length>0){
                                      that.dataNotice.content=data.content
                                  }
                           }) 
                   },

                   deletelist:function (){
                            var form={
                                  id:[]
                           }
                           var trs=[]
                           $('input[type=checkbox]').each(function (index,item){
                                   if($(item).prop('checked')){
                                        form.id.push($(item).val());
                                        trs.push($(item).closest('tr'))
                                   }
                           })

                            $.post('/notice/deletelist',form).then(function (data){
                                    if(data.success){
                                         $(trs).each(function (index,item){
                                              $(item).remove();
                                         })
                                         $('#modal-deletemore').modal('toggle');
                                    }
                            })
                   },
                   deleteone:function (event){
                           var form={
                                  id:[]
                           }
                           form.id.push($(event.target).attr('data-id'));

                           var tr=$(event.target).attr('trClass');
                              $.post('/notice/deletelist',form).then(function (data){
                                        if(data.success){
                                            $('.'+tr).remove();
                                            $('#modal-deleteDetails').modal('toggle');
                                        }
                              })
          
                   }

                },
                events:{
                      'send-page':function (page){
                        this.page=page-1
                        var that=this;
                        this.getContent( this.page )
                      },
                      'send-details':function (res){
                         this.details=res;
                      },
                      'send-page-notice':function (page){
                          this.page_notice=page-1;
                          var that=this;
                          this.getPageDetails(this.booleanRead,this._id);
                      }
                }
      })


});
