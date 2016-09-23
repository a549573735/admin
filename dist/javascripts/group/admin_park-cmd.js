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
                href: '',
                title: [
                    '\u56ED\u533A\u540D\u79F0',
                    '\u7528\u6237\u540D',
                    '\u90AE\u7BB1',
                    '\u8054\u7CFB\u4EBA',
                    '\u56ED\u533A\u5730\u5740',
                    '\u8054\u7CFB\u65B9\u5F0F',
                    '\u64CD\u4F5C'
                ],
                content: function () {
                    var arr = window.location.search.split('?')[1] ? window.location.search.split('?')[1].split(/&?[a-z]+=/gi) : '';
                    var form = {
                        id: 'all',
                        page: arr[2] || 0,
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
                            console.log(data);
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
                    '15%',
                    '10%',
                    'auto',
                    '10%',
                    '120px',
                    '120px',
                    '18%'
                ],
                type: 'PARK',
                btns: true,
                checked: true
            }
        },
        methods: {
            getParkList: function () {
                var that = this;
                var form = {
                    parkname: $('.select-parkname').val() || '',
                    id: $('#select_park').val()
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
                var form = {
                    id: 'all',
                    page: page - 1,
                    parkname: ''
                };
                var that = this;
                $.ajax({
                    url: '/api/organize/park/list',
                    dataType: 'json',
                    async: false,
                    data: form,
                    type: 'GET',
                    success: function (data) {
                        if (data.success) {
                            that.tableList.content = data.content;
                            console.log(JSON.stringify(data.content));
                        } else {
                            alert(data.errMessage);
                        }
                    },
                    error: function (err) {
                        alert(err.msg);
                    }
                });
            }
        }
    });
});