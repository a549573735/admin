define('', [
    '/lib_cmd/vue-cmd',
    '/js_cmd/components/radio'
], function (require, exports, module) {
    var Vue = require('/lib_cmd/vue-cmd');
    require('/js_cmd/components/radio');
    new Vue({
        el: '#app',
        data: {
            radio_val: '',
            checkboxDate: function () {
                var dataCheck = null;
                var that = this;
                $.ajax({
                    url: '/user/add/list',
                    dataType: 'json',
                    async: false,
                    data: { 'type': this.radio_val || JSON.parse($('#user_role').val()).type },
                    type: 'POST',
                    success: function (data) {
                        dataCheck = data.content;
                    },
                    error: function (err) {
                        alert(err.msg);
                    }
                });
                return dataCheck;
            }()
        },
        methods: {},
        events: {
            'send-radio': function (msg) {
                var that = this;
                that.radio_val = msg;
                $.post('/user/add/list', { type: this.radio_val }).then(function (data) {
                    that.checkboxDate = data.content;
                });
            },
            'send-code': function (id) {
                var form = {
                    name: $('.per_name').val(),
                    permissionIds: id,
                    type: this.radio_val || JSON.parse($('#user_role').val()).type,
                    id: $.query.get('id') || '',
                    belongId: $.query.get('belongId')
                };
                var type = $.query.get('type') || '';
                if (type == 'modify') {
                    console.log(form);
                    $.post('/api/user/role/modify', form).then(function (data) {
                        console.log(data);
                        if (data.success) {
                            alert('\u4FEE\u6539\u6210\u529F');
                            window.location.href = '/user/role/list';
                        } else {
                            alert(data.errMessage);
                        }
                    });
                } else {
                    $.post('/user/add/role', form).then(function (data) {
                        console.log(data);
                        if (data.success) {
                            alert('\u6DFB\u52A0\u6210\u529F');
                            window.location.href = '/user/role/list';
                        } else {
                            alert(data.errMessage);
                        }
                    });
                }
            }
        }
    });
});