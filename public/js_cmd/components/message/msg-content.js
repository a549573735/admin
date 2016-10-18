define(function (require, exports, module) {
    var Vue = require('lib_cmd/vue-cmd');

    Vue.component('v-msg-content', {
        props: ['datanow'],
        data: function () {
            return {}
        },
        computed:{
            'msgContent':function (){

                  if(this.datanow.type=='INTERVIEW'){
                      if(this.datanow.period){
                        this.datanow.period=this.datanow.period.replace(/^\s+|\s+$/g,'').toString()
                      }
                      switch(this.datanow.period){
                            case '3':
                            this.datanow.title='请贵司于三天内接受我单位'+this.datanow.titleName;
                            break;
                            case '7':
                             this.datanow.title='请贵司于七天内接受我单位'+this.datanow.titleName;
                            break;
                            case '10':
                             this.datanow.title='请贵司于十天内接受我单位'+this.datanow.titleName;
                            break;
                      }
                 }
                 if(this.datanow.type=='APPOINTMENT'){
                      this.datanow.title='请贵司于'+this.datanow.inspectDate+'接受我单位'+this.datanow.titleName;

                 } 

                 console.log( JSON.stringify(this.datanow))
                  return   this.datanow
                 

            }
        },
        template: '<div v-if="datanow.show" class="row v-table-msg-c">\
                              <div class="col-md-12 col-lg-12 clearfix">\
                                   <h5 class="text-left">{{msgContent.target}}:</h5>\
                                   <h5 class="text-left">{{msgContent.title}}</h5>\
                                  <div class="col-md-8 col-md-offset-1 v-msg-box">\
                                       <p class="v-msg-content">\
                                          {{msgContent.content}}\
                                       </p>\
                                  </div>\
                                  <div class="col-md-12  ">\
                                       <p class="v-msg-f pull-right col-md-3 text-center">\
                                           {{msgContent.company}}<br>\
                                           {{msgContent.date}}\
                                       </p>\
                                  </div>\
                              </div>\
                              <div class="col-lg-12  col-md-12 v-msg-f-btn">\
                                <template v-if="datanow.type==\'INTERVIEW\'||datanow.type==\'APPOINTMENT\'">\
                                  <div class="col-md-2"  >\
                                    <button type="button"  @click="Confirm($event)" :data-id="msgContent.id" :data-msg-id="msgContent.msg_id" :data-type="msgContent.type" status="CONFIRMED"  class="btn btn-primary btn-block">同意</button>\
                                  </div>\
                                  <div class="col-md-2">\
                                    <button type="button"  @click="Confirm($event)" :data-id="msgContent.id"  :data-msg-id="msgContent.msg_id"  :data-type="msgContent.type" status="NEGOTIATION"  class="btn btn-primary  btn-block">协商</button>\
                                  </div>\
                                  <p class="col-md-2 confirm-msg" style="padding-top:7px;font-size:16px;"> </p>\
                                </template>\
                              </div>\
                               <div class="col-lg-12  col-md-12 v-msg-f-btn text-center">\
                               </div>\
                        </div>\
                ',
        methods: {

            readyMsg: function (event) {

                var id = $(event.target).attr('data-id');
                var that = this;
                console.log(that.datanow.isRead)
                if (that.datanow.isRead == 'false') {
                    $.get('/api/read/message?id=' + id).then(function (data) {
                        if (data.success) {
                            $('.confirm-msg').html('提交成功')
                            that.datanow.isRead = 'true'
                        } else {
                            $('.confirm-msg').html('提交失败')
                        }
                    })
                } else {

                    alert('已阅读')
                }

            },
            Confirm: function (event) {

                var type = $(event.target).attr('data-type');

                var form = {
                    status: $(event.target).attr('status'),
                    id: $(event.target).attr('data-msg-id')
                }

                if (type == 'INTERVIEW') {
                    var href = "/api/interview/confirm"

                } else if (type == 'APPOINTMENT') {
                    var href = "/api/appointment/confirm"
                }

                if (type) {

                    $.post(href, form).then(function (data) {

                        if (data.success) {

                            $('.confirm-msg').html('提交成功')

                        } else {
                            $('.confirm-msg').html('提交失败')
                        }
                    })

                }

            }


        }
    });
});

// v-if="datanow.type==\'\'"