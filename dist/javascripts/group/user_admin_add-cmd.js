define('', [
    '/lib_cmd/vue-cmd',
    '/js_cmd/components/user_radio'
], function (require, exports, module) {
    var Vue = require('/lib_cmd/vue-cmd');
    require('/js_cmd/components/user_radio');
    new Vue({
        el: '#app',
        data: {
            form: {
                type: '',
                _id: ''
            },
            radio_val: '',
            checkboxDate: function () {
                var dataCheck = null;
                var that = this;
                $.ajax({
                    url: '/user/add/list',
                    dataType: 'json',
                    async: false,
                    data: { 'type': JSON.parse($('#user_role').val()).type },
                    type: 'POST',
                    success: function (data) {
                        dataCheck = data.content;
                    },
                    error: function (err) {
                        alert(err.msg);
                    }
                });
                return dataCheck;
            }(),
            roleSelect: function () {
                return JSON.parse($('#role_select').val());
            }()
        },
        methods: {
            subForm: function (event) {
                var form = {
                    type: this.form.type || JSON.parse($('#user_role').val()).type,
                    belongId: this.form._id || '',
                    username: $('.username').val(),
                    roleId: $('.val-user-id').val(),
                    mail: $('.email').val(),
                    password: $('.password ').val(),
                    displayName: $('.displayName').val(),
                    phone: $('.phone').val(),
                    roleName: $('.val-user-id').find('option:selected').text()
                };
                var checkEmpty = Common.checkEmpty($('#app').find('input'));
                var checkEmail = Common.checkEmail($('.email'));
                if (checkEmpty.state == 'false') {
                    alert(checkEmpty.message);
                    return false;
                }
                if (checkEmail.state == 'false') {
                    alert(checkEmail.message);
                    return false;
                }
                console.log(form);
                $.post('/user/admin/add', form).then(function (data) {
                    if (data.success == false || data.state == false) {
                        alert(data.msg);
                    } else {
                        window.location.href = '/user/edit/list';
                    }
                });
            },
            getSelect: function () {
            }
        },
        events: {
            'send-radio': function (msg) {
                var that = this;
                this.form.type = msg;
                $.post('/api/admin/role/list', { type: this.form.type }).then(function (data) {
                    if (data.success) {
                        that.roleSelect = data.content;
                    } else {
                        alert(data.errMessage);
                    }
                });
            },
            'send-select': function (id) {
                this.form._id = id;
            }
        }
    });
});