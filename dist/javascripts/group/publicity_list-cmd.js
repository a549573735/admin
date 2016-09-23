define('', [
    'lib_cmd/vue-cmd',
    '/js_cmd/components/paging',
    '/js_cmd/components/tables/com_tables',
    '/js_cmd/components/select',
    '/js_cmd/components/admin_select'
], function (require, exports, module) {
    var Vue = require('lib_cmd/vue-cmd');
    require('/js_cmd/components/paging');
    require('/js_cmd/components/tables/com_tables');
    var select = require('/js_cmd/components/select');
    require('/js_cmd/components/admin_select');
    new Vue({
        el: '#app',
        data: {
            dataList: {
                title: [
                    '\u4F01\u4E1A\u540D\u79F0',
                    '\u5E74\u62A5\u72B6\u6001',
                    '\u64CD\u4F5C\u5458',
                    '\u5907\u6CE8'
                ],
                content: function () {
                    var dataList = null;
                    $.ajax({
                        url: '/api/publicity/list',
                        dataType: 'json',
                        async: false,
                        type: 'GET',
                        success: function (data) {
                            console.log(data);
                            if (data.success) {
                                dataList = data.content;
                            } else {
                                alert(data.errMessage);
                            }
                        },
                        error: function (err) {
                        }
                    });
                    return dataList;
                }(),
                style: [
                    '25%',
                    '100px',
                    '15%',
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
            },
            companySelect: function () {
                var id = $.query.get('id');
                var select = null;
                $.ajax({
                    url: '/company/select?id=' + id,
                    dataType: 'json',
                    async: false,
                    type: 'GET',
                    success: function (data) {
                        select = data.dataSelect.content.content;
                    },
                    error: function (err) {
                    }
                });
                console.log(select, 111);
                return select;
            }()
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
                $.get('/api/publicity/list', form).then(function (data) {
                    console.log(JSON.stringify(data.content));
                    that.dataList.content = data.content;
                });
            },
            addPublicity: function () {
                var form = {
                    publicity: $('.val-publicity').val(),
                    notes: $('.notes-publicity').val(),
                    company: $('#publicity-select').val()
                };
                $.post('/add/publicity', form).then(function (data) {
                    if (data.success) {
                        alert('\u6DFB\u52A0\u6210\u529F');
                    } else {
                        alert('\u6DFB\u52A0\u5931\u8D25');
                    }
                });
            }
        },
        events: {
            'send-page': function (page) {
                this.page = page - 1;
                var that = this;
                this.getContent();
            },
            'send-select-admin': function (id) {
                var that = this;
            }
        }
    });
});