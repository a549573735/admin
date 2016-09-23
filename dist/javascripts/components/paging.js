define('', ['lib_cmd/vue-cmd'], function (require, exports, module) {
    var Vue = require('lib_cmd/vue-cmd');
    Vue.component('v-pages', {
        props: ['pagelist'],
        data: function () {
            return { now: 1 };
        },
        template: '<div class="yema">                                <div class="yema_befor"><a href="javascript:;" class="btn btn-link"  @click="getPrevious($event)" >\u4E0A\u4E00\u9875</a>  \u7B2C</div>                                <nav>                                    <ul class="pagination pagination-sm">                                        <li>                                            <a href="javascript:void(0)"><i class="fa fa-angle-double-right"></i></a>                                        </li>                                        <li v-for="item in pagelist" :class="{\'active\':($index+1)==now}" >                                            <a href="javascript:void(0)" @click="getPage($event)">{{$index+1}}</a>                                        </li>                                        <li>                                            <a href="javascript:void(0)"><i class="fa fa-angle-double-right"></i></a>                                        </li>                                    </ul>                                </nav>                                <div class="yema_end"> \u9875<a href="javascript:;" class="btn btn-link" @click="getNext($event)"  >\u4E0B\u4E00\u9875</a> <a href="javascript:;" @click="getPage($event)"  class="btn btn-link">\u5C3E\u9875</a></div>               </div> ',
        methods: {
            getPage: function (event) {
                if ($(event.target).html() == '\u5C3E\u9875') {
                    this.now = this.pagelist;
                } else {
                    this.now = $(event.target).html();
                }
                this.$dispatch('send-page', this.now);
            },
            getPrevious: function (event) {
                if (this.now == 1) {
                    return false;
                } else {
                    this.now--;
                    this.$dispatch('send-page', this.now);
                }
            },
            getNext: function () {
                if (this.now >= this.pagelist) {
                    return false;
                } else {
                    this.now++;
                    this.$dispatch('send-page', this.now);
                }
            }
        }
    });
});