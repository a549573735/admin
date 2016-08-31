define(function (require, exports, module) {
    var Vue = require('lib_cmd/vue-cmd');
    Vue.component('child', {
        //template: '#child-template',
        template: '<div id="child-template">\
        <input v-model="msg">\
        <button @click="notify">Dispatch Event</button>',
        data: function() {
            return {msg: 'hello'}
        },
        methods: {
            notify: function() {
                if (this.msg.trim()) {
                    this.$dispatch('child-msg', this.msg);
                    this.msg = '';
                }
            }
        }
    });
});