define('', [
    '/lib_cmd/vue-cmd',
    '/js_cmd/components/paging',
    '/js_cmd/components/radio',
    '/js_cmd/components/select'
], function (require, exports, module) {
    var Vue = require('/lib_cmd/vue-cmd');
    require('/js_cmd/components/paging');
    require('/js_cmd/components/radio');
    require('/js_cmd/components/select');
    new Vue({
        el: '#app',
        data: {
            put_id: '',
            type: function () {
                return JSON.parse($('#user_role').val()).type;
            }(),
            listData: function () {
                var list = [];
                $.ajax({
                    url: '/api/user/role/list',
                    dataType: 'json',
                    async: false,
                    data: { belongId: JSON.parse($('#user_role').val()).belongId },
                    type: 'POST',
                    success: function (data) {
                        console.log(JSON.stringify(data));
                        if (data.success) {
                            console.log(data.content);
                            list = data.content;
                        } else {
                            alert(data.errMessage);
                        }
                    }
                });
                return list;
            }(),
            id: '',
            page: ''
        },
        methods: {
            deleteUser: function () {
                var idArr = [];
                $('.user-checked').find('input').each(function (index, val) {
                    if ($(val).prop('checked')) {
                        idArr.push($(val).val());
                    }
                });
                console.log(idArr);
                $.ajax({
                    url: '/app/role/delete',
                    dataType: 'json',
                    async: false,
                    data: { id: idArr },
                    type: 'POST',
                    success: function (data) {
                        if (data.success) {
                            alert('\u5220\u9664\u6210\u529F');
                            window.location.reload();
                        } else {
                            alert(data.errMessage);
                        }
                    },
                    error: function (err) {
                        alert(err.msg);
                    }
                });
            },
            getMsg: function (event) {
            },
            putUser: function () {
            }
        },
        events: {
            'send-radio': function (msg) {
                var that = this;
                this.type = msg;
                $.ajax({
                    url: '/api/user/role/list',
                    dataType: 'json',
                    async: false,
                    data: { type: this.type },
                    type: 'POST',
                    success: function (data) {
                        if (data.success) {
                            that.listData = data.content;
                        } else {
                            alert(data.errMessage);
                        }
                    }
                });
            },
            'send-select': function (id) {
                var that = this;
                this.id = id;
            },
            'send-page': function (page) {
                this.page = page - 1;
                var that = this;
            }
        }
    });
});