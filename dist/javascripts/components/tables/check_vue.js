define('', [
    'lib_cmd/vue-cmd',
    '/js_cmd/components/tables/check_tables'
], function (require, exports, module) {
    var Vue = require('lib_cmd/vue-cmd');
    require('/js_cmd/components/tables/check_tables');
    new Vue({
        'el': '#check-table',
        data: {
            data: {
                href: '/organize/company/',
                title: [
                    '',
                    '\u4F01\u4E1A\u540D\u79F0',
                    '\u68C0\u67E5\u72B6\u6001',
                    '\u68C0\u67E5\u5458',
                    '\u68C0\u67E5\u65E5\u671F',
                    '\u5907\u6CE8'
                ],
                content: [
                    [
                        '\u4E0A\u6D77\u533B\u5FB7\u533B\u7597\u8BBE\u5907\u6709\u9650\u516C\u53F8',
                        'true',
                        '\u738B\u5148\u751F',
                        '2016-06-29',
                        'xxxxxx'
                    ],
                    [
                        '\u4E0A\u6D77\u533B\u5FB7\u533B\u7597\u8BBE\u5907\u6709\u9650\u516C\u53F8',
                        'true',
                        '\u6731\u738B\u6770',
                        '2016-06-29',
                        'xxxxxx'
                    ]
                ],
                style: [
                    '5%',
                    'auto',
                    '100px',
                    '100px',
                    '20%'
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
                ]
            }
        }
    });
});