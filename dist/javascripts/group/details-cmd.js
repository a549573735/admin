define('', [
    'lib_cmd/vue-cmd',
    '/js_cmd/components/paging',
    '/js_cmd/components/companytable/tabs_content_s',
    '/js_cmd/components/companytable/tabs_content_d',
    '/js_cmd/components/companytable/tabs_btn'
], function (require, exports, module) {
    var Vue = require('lib_cmd/vue-cmd');
    require('/js_cmd/components/paging');
    require('/js_cmd/components/companytable/tabs_content_s');
    require('/js_cmd/components/companytable/tabs_content_d');
    require('/js_cmd/components/companytable/tabs_btn');
    new Vue({
        'el': '#app',
        data: {
            modalMsg: {
                title: [],
                content: { content: [{}] }
            },
            modalList: [],
            page: '',
            href: '',
            name: '',
            type: ''
        },
        methods: {
            setDate: function () {
                $('input[name=view]').val($.query.get('view'));
                $('input[name=id]').val($.query.get('id'));
            }(),
            getDate: function () {
                $('#date-form').submit();
            },
            getName: function () {
                $('#search-form').submit();
            },
            getRelation: function (event, href) {
                var name = $(event.target).attr('data-name');
                var that = this;
                this.href = href;
                this.name = name;
                console.log(href);
                $.post(href, {
                    name: name,
                    page: this.page
                }).then(function (data) {
                    console.log(JSON.stringify(data));
                    if (data.success) {
                        that.page = data.content.page;
                        that.modalList = data.content;
                        that.modalList.title = [
                            '\u516C\u53F8\u540D\u79F0',
                            '\u516C\u53F8\u5730\u5740',
                            '\u8054\u7CFB\u65B9\u5F0F',
                            '\u7ECF\u8425\u8BB8\u53EF\u8BC1',
                            '\u7ECF\u8425\u8303\u56F4',
                            '\u8BB8\u53EF\u8BC1\u622A\u6B62\u65E5\u671F'
                        ];
                        that.modalList.style = [
                            '10%',
                            '15%',
                            '10%',
                            '20%',
                            'auto',
                            '20%'
                        ];
                    } else {
                        alert(data.errMessage);
                    }
                });
            },
            showMsg: function (event) {
                event.target.bclick = !event.target.bclick;
                if (event.target.bclick) {
                    console.log($(event.target));
                    $(event.target).siblings('span').css('overflow', 'inherit');
                    $(event.target).html('\u6536\u8D77');
                } else {
                    $(event.target).siblings('span').css('overflow', 'hidden');
                    $(event.target).html('\u8BE6\u60C5');
                }
            },
            appointment: function () {
                Common.sendMessage('.interview-btn-all', '#tables-all', null, '#select-interview-all', '/api/interview/msg', '.v-modal-min-all', '#v-msg');
            }()
        },
        events: {
            'send-modal-msg': function (data) {
                var reg = /id$/i;
                this.href = data.data.href;
                this.type = data.data.type;
                if (data.data.content.content.length <= 0)
                    return;
                var keys = Object.keys(data.data.content.content[0]);
                console.log(keys);
                for (var i = 0; i < keys.length; i++) {
                    if (reg.test(keys[i])) {
                        keys.splice(i, 1);
                    }
                }
                data.data.content.keys = keys;
                if (this.type == 'product') {
                    data.data.content.title = [
                        '\u4EA7\u54C1\u540D\u79F0',
                        '\u7ECF\u8425\u8303\u56F4',
                        '\u89C4\u683C',
                        '\u4EA7\u54C1\u6CE8\u518C\u53F7',
                        '\u4EA7\u54C1\u8BA1\u91CF\u5355\u4F4D',
                        '\u8FC7\u671F\u65F6\u95F4'
                    ];
                } else {
                    data.data.content.title = [
                        '\u4F9B\u5E94\u5546\u540D\u79F0',
                        '\u5730\u5740',
                        '\u7535\u8BDD\u53F7\u7801',
                        '\u4EA7\u54C1\u6CE8\u518C\u53F7',
                        '\u8FC7\u671F\u65F6\u95F4',
                        '\u7ECF\u8425\u8303\u56F4'
                    ];
                }
                this.modalMsg = data.data;
                console.log(this.modalMsg.content.content[0].name);
            },
            'send-page': function (data) {
                this.page = data - 1;
                var that = this;
                $.post(this.href, {
                    name: this.name,
                    page: this.page
                }).then(function (data) {
                    console.log(JSON.stringify(data));
                    if (data.success) {
                        that.page = data.content.page;
                        that.modalList = data.content;
                        that.modalList.title = [
                            '\u516C\u53F8\u540D\u79F0',
                            '\u516C\u53F8\u5730\u5740',
                            '\u8054\u7CFB\u65B9\u5F0F',
                            '\u7ECF\u8425\u8BB8\u53EF\u8BC1',
                            '\u7ECF\u8425\u8303\u56F4',
                            '\u8BB8\u53EF\u8BC1\u622A\u6B62\u65E5\u671F'
                        ];
                        that.modalList.style = [
                            '10%',
                            '15%',
                            '10%',
                            '20%',
                            'auto',
                            '20%'
                        ];
                    } else {
                        alert(data.errMessage);
                    }
                });
            }
        }
    });
});