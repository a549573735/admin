define('', [
    'lib_cmd/vue-cmd',
    '/js_cmd/components/message/msg-content',
    '/js_cmd/components/message/msg-list'
], function (require, exports, module) {
    var Vue = require('lib_cmd/vue-cmd');
    require('/js_cmd/components/message/msg-content');
    require('/js_cmd/components/message/msg-list');
    var message = new Vue({
        'el': '#v-msg',
        data: function () {
            return {
                msglist: function () {
                    var msgList = null;
                    var top = [
                        '\u884C\u653F\u5EFA\u8BAE',
                        '\u884C\u653F\u7EA6\u8C08',
                        '\u7F51\u7EDC\u68C0\u67E5',
                        '\u9884\u7EA6'
                    ];
                    $.ajax({
                        url: '/user/messages/list',
                        dataType: 'json',
                        async: false,
                        type: 'GET',
                        success: function (data) {
                            console.log(data);
                            if (data.success) {
                                msgList = data;
                            } else {
                                alert(data.errMessage);
                            }
                        },
                        error: function (err) {
                            alert(err);
                        }
                    });
                    msgList.content.content.forEach(function (item) {
                        switch (item.type) {
                        case 'INTERVIEW':
                            item.title = top[1];
                            item.class = 'interview-msg';
                            break;
                        case 'INSPECT':
                            item.title = top[2];
                            item.class = 'inspect-msg';
                            break;
                        case 'APPOINTMENT':
                            item.title = top[3];
                            item.class = 'appointment-msg';
                            break;
                        case 'SUGGESTION':
                            item.title = top[0];
                            item.class = 'suggestion-msg';
                            break;
                        }
                        item.message = JSON.parse(item.message);
                    });
                    return msgList;
                }(),
                message: {
                    title: '',
                    content: '',
                    id: '',
                    date: '',
                    company: '',
                    type: ''
                }
            };
        },
        template: '          <div class="modal-body o-pd-t" id="v-msg">\t\t\t\t\t<v-msg-list :datalist="msglist" ></v-msg-list>\t\t          <v-msg-content :datanow="message"></v-msg-content>              </div>         ',
        events: {
            'send-msg': function (msg) {
                this.message = msg;
            }
        }
    });
});