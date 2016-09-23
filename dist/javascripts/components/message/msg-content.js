define('', ['lib_cmd/vue-cmd'], function (require, exports, module) {
    var Vue = require('lib_cmd/vue-cmd');
    Vue.component('v-msg-content', {
        props: ['datanow'],
        data: function () {
            return {};
        },
        template: ' <div v-if="datanow.show" class="row v-table-msg-c">                      <div class="col-md-12 col-lg-12 clearfix">                           <h5 class="text-left">{{datanow.title}}</h5>                          <div class="col-md-8 col-md-offset-1 v-msg-box">                               <p class="v-msg-content">                                  {{datanow.content}}                               </p>                          </div>                          <div class="col-md-12  ">                               <p class="v-msg-f pull-right col-md-2">                                   {{datanow.company}}<br>                                   {{datanow.date}}                               </p>                          </div>                      </div>                      <div class="col-lg-12  col-md-12 v-msg-f-btn">                        <template v-if="datanow.type==\'INTERVIEW\'||datanow.type==\'SUGGESTION\'">                          <div class="col-md-2"  >                            <button type="button"  @click="Confirm($event)" :data-id="datanow.id" :data-msg-id="datanow.msg_id" :data-type="datanow.type" status="CONFIRMED"  class="btn btn-primary btn-block">\u540C\u610F</button>                          </div>                          <div class="col-md-2">                            <button type="button"  @click="Confirm($event)" :data-id="datanow.id"  :data-msg-id="datanow.msg_id"  :data-type="datanow.type" status="NEGOTIATION"  class="btn btn-primary  btn-block">\u534F\u5546</button>                          </div>                        </template>                      </div>                       <div class="col-lg-12  col-md-12 v-msg-f-btn text-center">                        <p class="confirm-msg" style="padding-top:50px;font-size:16px;"> </p>                       </div>                </div>        ',
        methods: {
            readyMsg: function (event) {
                var id = $(event.target).attr('data-id');
                var that = this;
                console.log(that.datanow.isRead);
                if (that.datanow.isRead == 'false') {
                    $.get('/api/read/message?id=' + id).then(function (data) {
                        if (data.success) {
                            $('.confirm-msg').html('\u63D0\u4EA4\u6210\u529F');
                            that.datanow.isRead = 'true';
                        } else {
                            $('.confirm-msg').html('\u63D0\u4EA4\u5931\u8D25');
                        }
                    });
                } else {
                    alert('\u5DF2\u9605\u8BFB');
                }
            },
            Confirm: function (event) {
                var type = $(event.target).attr('data-type');
                var form = {
                    status: $(event.target).attr('status'),
                    id: $(event.target).attr('data-msg-id')
                };
                if (type == 'INTERVIEW') {
                    var href = '/api/interview/confirm';
                } else if (type == 'SUGGESTION') {
                    var href = '/api/interview/confirm';
                }
                if (type) {
                    $.post(href, form).then(function (data) {
                        if (data.success) {
                            $('.confirm-msg').html('\u63D0\u4EA4\u6210\u529F');
                        } else {
                            $('.confirm-msg').html('\u63D0\u4EA4\u5931\u8D25');
                        }
                    });
                }
            }
        }
    });
});