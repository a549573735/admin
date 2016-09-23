define('', [
    'lib_cmd/vue-cmd',
    '/js_cmd/components/paging',
    '/js_cmd/components/tables/interview_table',
    '/js_cmd/components/select'
], function (require, exports, module) {
    var Vue = require('lib_cmd/vue-cmd');
    require('/js_cmd/components/paging');
    require('/js_cmd/components/tables/interview_table');
    var select = require('/js_cmd/components/select');
    new Vue({
        el: '#app',
        data: {
            dataList: {
                title: [
                    '\u4F01\u4E1A\u540D\u79F0',
                    '\u7EA6\u8C08\u72B6\u6001',
                    '\u53D1\u9001\u65F6\u95F4',
                    '\u65F6\u95F4\u7C7B\u522B',
                    '\u63A5\u53D7\u65E5\u671F',
                    '\u7EA6\u8C08\u5458',
                    '\u5907\u6CE8'
                ],
                content: function () {
                    var dataList = null;
                    $.ajax({
                        url: '/api/interview/list',
                        dataType: 'json',
                        async: false,
                        type: 'POST',
                        success: function (data) {
                            console.log(data);
                            if (data.success) {
                                dataList = data.content;
                            } else {
                                console.log(data.errMessage);
                            }
                        },
                        error: function (err) {
                        }
                    });
                    return dataList;
                }(),
                style: [
                    '20%',
                    '110px',
                    '110px',
                    '110px',
                    '110px',
                    '80px',
                    'auto'
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
                $.post('/api/interview/list', form).then(function (data) {
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