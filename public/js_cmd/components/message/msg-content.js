define(function (require, exports, module) {
    var Vue = require('lib_cmd/vue-cmd');
    
    Vue.component('v-msg-content', {
    props: ['datanow'],
        data:function (){
            return {  }
        },
        template: ' <div class="row v-table-msg-c">\
                      <div class="col-md-12 col-lg-12 clearfix">\
                           <h5 class="text-left">{{datanow.title}}</h5>\
                          <div class="col-md-8 col-md-offset-1 v-msg-box">\
                               <p class="v-msg-content">\
                                  {{datanow.content}}\
                               </p>\
                          </div>\
                          <div class="col-md-12  ">\
                               <p class="v-msg-f pull-right col-md-2">\
                                   {{datanow.company}}<br>\
                                   {{datanow.date}}\
                               </p>\
                          </div>\
                      </div>\
                      <div class="col-lg-12  col-md-12 v-msg-f-btn">\
                          <div class="col-md-2">\
                            <button type="button"  @click="readyMsg($event)" :data-id="datanow.id"   class="btn btn-primary  btn-block">已读</button>\
                          </div>\
                        <template v-if="datanow.type==\'INTERVIEW\'||datanow.type==\'SUGGESTION\'">\
                          <div class="col-md-2"  >\
                            <button type="button"  @click="Confirm($event)" :data-id="datanow.id" :data-msg-id="datanow.msg_id" :data-type="datanow.type" status="CONFIRMED"  class="btn btn-primary btn-block">同意</button>\
                          </div>\
                          <div class="col-md-2">\
                            <button type="button"  @click="Confirm($event)" :data-id="datanow.id"  :data-msg-id="datanow.msg_id"  :data-type="datanow.type" status="NEGOTIATION"  class="btn btn-primary  btn-block">协商</button>\
                          </div>\
                        </template>\
                      </div>\
                       <div class="col-lg-12  col-md-12 v-msg-f-btn text-center">\
                        <p class="confirm-msg" style="padding-top:50px;font-size:16px;"> </p>\
                       </div>\
                </div>\
        ',

      methods:{     
       
             readyMsg:function (event){

                  var id=$(event.target).attr('data-id');
                  var that=this;


                  $.get('/api/read/message?id='+id).then(function (data){
                        if(data.success){
                          $('.confirm-msg').html('提交成功')
                        }else {
                          $('.confirm-msg').html('提交失败')
                        }
                  })

             },
             Confirm:function(event){  

               var type= $(event.target).attr('data-type');
  
               var form={
                    status:$(event.target).attr('status'),
                    id:$(event.target).attr('data-msg-id')                    
               }

                 if(type=='INTERVIEW'){
                    var href="/api/interview/confirm"

                 }else if(type=='SUGGESTION'){
                    var href="/api/interview/confirm"
                 }

                if(type){

                    $.post(href,form).then(function (data){

                            if(data.success){

                              $('.confirm-msg').html('提交成功')
                            
                            }else {
                              $('.confirm-msg').html('提交失败')
                            }
                    })  

                }

             }
           

      }
    });
});

   // v-if="datanow.type==\'\'"