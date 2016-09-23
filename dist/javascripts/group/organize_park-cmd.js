define('', [
    '/js_cmd/components/paging',
    'lib_cmd/vue-cmd',
    '/js_cmd/components/tables/check_tables'
], function (require, exports, module) {
    require('/js_cmd/components/paging');
    var Vue = require('lib_cmd/vue-cmd');
    require('/js_cmd/components/tables/check_tables');
    new Vue({
        'el': '#check-table',
        data: {
            tableList: {
                href: '/organize/company?id=',
                title: [
                    '',
                    '\u56ED\u533A\u540D\u79F0',
                    '\u56ED\u533A\u5730\u5740',
                    '\u8054\u7CFB\u4EBA',
                    '\u8054\u7CFB\u65B9\u5F0F',
                    '\u64CD\u4F5C'
                ],
                content: function () {
                    var id = $.query.get('id');
                    var page = $.query.get('page');
                    var form = {
                        id: id || 'all',
                        page: page || 0,
                        parkname: ''
                    };
                    var datalist = null;
                    $.ajax({
                        url: '/api/organize/park/list',
                        dataType: 'json',
                        async: false,
                        data: form,
                        type: 'GET',
                        success: function (data) {
                            console.log(JSON.stringify(data));
                            if (data.success) {
                                datalist = data.content;
                            } else {
                                alert(data.errMessage);
                            }
                        },
                        error: function (err) {
                            alert(err.msg);
                        }
                    });
                    return datalist;
                }(),
                style: [
                    '5%',
                    '20%',
                    'auto',
                    '120px',
                    '120px',
                    '100px'
                ],
                type: 'PARK',
                overfull: true,
                overfull_btn: true
            }
        },
        methods: {
            getParkList: function () {
                var that = this;
                var form = {
                    parkname: $('.select-parkname').val() || '',
                    id: $('#select_park').val() || $.query.get('id')
                };
                this.tableList.content = this.getData(form);
            },
            getData: function (form) {
                var datalist = null;
                $.ajax({
                    url: '/api/organize/park/list',
                    dataType: 'json',
                    async: false,
                    data: form,
                    type: 'GET',
                    success: function (data) {
                        if (data.success) {
                            console.log(data.content);
                            datalist = data.content;
                        } else {
                            alert(data.errMessage);
                        }
                    },
                    error: function (err) {
                        alert(err.msg);
                    }
                });
                return datalist;
            }
        },
        events: {
            'send-page': function (page) {
                this.tableList.content.page = page;
                var that = this;
                var form = {
                    parkname: $('.select-parkname').val() || '',
                    id: $('#select_park').val() == 0 ? $.query.get('id') || 'all' : $('#select_park').val(),
                    page: page - 1
                };
                this.tableList.content = this.getData(form);
            }
        }
    });
});