define('', [
    '/lib_cmd/vue-cmd',
    '/js_cmd/components/paging',
    '/js_cmd/components/user_radio'
], function (require, exports, module) {
    var Vue = require('/lib_cmd/vue-cmd');
    require('/js_cmd/components/paging');
    require('/js_cmd/components/user_radio');
    new Vue({
        el: '#app',
        data: {
            put_id: '',
            listData: function () {
                var list = [];
                $.ajax({
                    url: '/api/user/edit/list',
                    dataType: 'json',
                    async: false,
                    type: 'GET',
                    success: function (data) {
                        console.log(JSON.stringify(data));
                        if (data.success) {
                            list = data.content;
                        } else {
                            alert(data.errMessage);
                        }
                    }
                });
                return list;
            }(),
            id: '',
            roleSelect: function () {
                return JSON.parse($('#role_select').val());
            }()
        },
        methods: {
            deleteUser: function () {
                var userArr = [];
                $('.user-checked').find('input').each(function (index, val) {
                    if ($(val).prop('checked')) {
                        userArr.push($(val).val());
                    }
                });
                $.ajax({
                    url: '/delete/user',
                    dataType: 'json',
                    async: false,
                    data: { user: userArr },
                    type: 'POST',
                    success: function (data) {
                        if (data.success) {
                            alert('\u5220\u9664\u6210\u529F');
                            window.location.reload();
                        } else {
                            alert('\u5220\u9664\u5931\u8D25');
                        }
                    },
                    error: function (err) {
                        alert(err.msg);
                    }
                });
            },
            getMsg: function (event) {
                var tr = $(event.target).closest('tr');
                var id = $(event.target).attr('data-id');
                var belongId = $(event.target).attr('data-belongId');
                var type = $(event.target).attr('data-type');
                $('.model-displayName').val(tr.find('.displayName').html());
                $('.model-username').val(tr.find('.username').html());
                $('.model-phone').val(tr.find('.phone').html());
                $('.model-mail').val(tr.find('.mail').html());
                $('.model-id').val(id);
                $('.model-belongId').val(belongId);
                $('.model-type').val(type);
            },
            putUser: function () {
                var that = this;
                $('.model-put-btn').on('click', function () {
                    var from = {
                        displayName: $('.model-displayName').val(),
                        username: $('.model-username').val(),
                        phone: $('.model-phone').val(),
                        mail: $('.model-mail').val(),
                        password: $('.model-password').val(),
                        id: $('.model-id').val(),
                        belongId: $('.model-belongId').val(),
                        type: $('.model-type').val(),
                        roleId: $('#select-role-id').val(),
                        roleName: $('#select-role-id').find('option:selected').text()
                    };
                    $.ajax({
                        url: '/put/user',
                        dataType: 'json',
                        async: true,
                        data: from,
                        type: 'POST',
                        success: function (data) {
                            if (data.success) {
                                alert('\u4FEE\u6539\u6210\u529F');
                                window.location.reload();
                            } else {
                                alert(data.errMessage);
                            }
                        },
                        error: function (err) {
                            console.log(err);
                        }
                    });
                });
            }(),
            restPassword: function (event) {
                var id = $(event.target).attr('data-id');
                console.log(id);
                $.post('/reset/user/password', { id: id }).then(function (data) {
                    if (data.success) {
                        alert('\u91CD\u7F6E\u6210\u529F\uFF0C\u5BC6\u7801\u5C06\u4F1A\u53D1\u5165\u586B\u5199\u7684\u90AE\u7BB1\u4E2D');
                    } else {
                        alert(data.errMessage);
                    }
                });
            }
        },
        events: {
            'send-radio': function (msg) {
                var that = this;
            },
            'send-select': function (id) {
                var that = this;
                this.id = id;
                $.get('/api/user/edit/list?page=' + this.page + '&id=' + this.id).then(function (data) {
                    that.listData = data.content;
                });
            },
            'send-page': function (page) {
                this.page = page - 1;
                var that = this;
                $.get('/api/user/edit/list?page=' + this.listData.page + '&id=' + this.id).then(function (data) {
                    that.listData = data.content;
                });
            }
        }
    });
});