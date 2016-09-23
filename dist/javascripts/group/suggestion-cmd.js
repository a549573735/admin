define('', [
    'lib_cmd/vue-cmd',
    '/js_cmd/components/paging',
    '/js_cmd/components/tables/com_tables',
    '/js_cmd/components/select'
], function (require, exports, module) {
    var Vue = require('lib_cmd/vue-cmd');
    require('/js_cmd/components/paging');
    require('/js_cmd/components/tables/com_tables');
    var select = require('/js_cmd/components/select');
    new Vue({
        el: '#app',
        data: {
            dataList: {
                title: [
                    '\u4F01\u4E1A\u540D\u79F0',
                    '\u5EFA\u8BAE\u72B6\u6001',
                    '\u5EFA\u8BAE\u5185\u5BB9',
                    '\u68C0\u67E5\u5458',
                    '\u68C0\u67E5\u65E5\u671F',
                    '\u5907\u6CE8'
                ],
                content: function () {
                    var dataList = null;
                    $.ajax({
                        url: '/api/suggestion/list',
                        dataType: 'json',
                        async: false,
                        type: 'GET',
                        success: function (data) {
                            if (data.success) {
                                data.content.content.forEach(function (item) {
                                    item.readFlag += '';
                                    if (item.readDate == null) {
                                        item.readDate = 'null';
                                    }
                                });
                                dataList = data.content;
                            } else {
                                alert(data.errMessage);
                            }
                        },
                        error: function (err) {
                        }
                    });
                    dataList.content.forEach(function (item) {
                        for (var name in item) {
                            item[name] += '';
                        }
                    });
                    return dataList;
                }(),
                style: [
                    '25%',
                    '100px',
                    'auto',
                    '100px',
                    '15%',
                    '10%'
                ],
                details: [
                    {
                        _id: '1',
                        msg: '\u8BE5\u516C\u53F8\u7684\u9500\u552E\u53CA\u4F9B\u5E94\u5546'
                    },
                    {
                        _id: '2',
                        msg: '\u8BE5\u516C\u53F8\u7684\u9500\u552E\u53CA\u4F9B\u5E94\u5546'
                    }
                ],
                overfull: false,
                selectsubset: []
            }
        },
        methods: {
            getContent: function (page) {
                var that = this;
                var form = {
                    'page': page || 0,
                    'size': 15,
                    'type': $('#selectType').val(),
                    'market': $('#select_market').val(),
                    'company': $('input[name=company]').val(),
                    'park': $('#select_park').val(),
                    'from': $('input[name=from]').val(),
                    'to': $('input[name=to]').val()
                };
                $.get('/api/suggestion/list', form).then(function (data) {
                    data.content.content.forEach(function (item) {
                        for (var name in item) {
                            item[name] += '';
                        }
                    });
                    that.dataList.content = data.content;
                });
            }
        },
        events: {
            'send-page': function (page) {
                this.page = page - 1;
                var that = this;
                this.getContent(this.page);
            }
        }
    });
});