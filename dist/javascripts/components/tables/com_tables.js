define('', ['lib_cmd/vue-cmd'], function (require, exports, module) {
    var Vue = require('lib_cmd/vue-cmd');
    Vue.component('com-table-list', {
        props: ['datalist'],
        computed: {
            'newData': function () {
                if (this.datalist != null) {
                    this.datalist.content.content.forEach(function (item) {
                        switch (item.status) {
                        case 'WAITING':
                            item.status = '\u7B49\u5F85';
                            break;
                        case 'CONFIRMED':
                            item.status = '\u786E\u8BA4';
                            break;
                        case 'NEGOTIATION':
                            item.status = '\u534F\u5546';
                            break;
                        case 'PASS':
                            item.status = '\u5408\u683C';
                            break;
                        case 'FAIL':
                            item.status = '\u4E0D\u5408\u683C';
                            break;
                        }
                    });
                    return this.datalist.content.content;
                }
            }
        },
        template: '<table class="table  table-hover table-borderless">                      <thead>                      <tr class="v-table-tr">                            <th class="text-center " v-for="item in datalist.title" v-bind:style="{ width: datalist.style[$index] }">{{item}}</th>                      </tr>                      </thead>                      <tbody class="v-tabs-check">                         <tr v-for="item in newData">                            <td v-if="item.target" class="text-center">{{ item.target  }}</td>                            <td v-if="item.company" class="text-center">{{ item.company==null?\'null\':item.company   }}</td>                            <td v-if="item.publicity" class="text-center">{{ item.publicity }}</td>                            <td v-if="item.status" class="text-center">{{item.status}}</td>                            <td v-if="item.readFlag" class="text-center">{{ item.readFlag==\'false\'?\'\u672A\u8BFB\':\'\u5DF2\u8BFB\' }}</td>                            <td v-if="item.suggestion" class="text-center">{{ item.suggestion }}</td>                            <td v-if="item.user" class="text-center">{{ item.user }}</td>                            <td v-if="item.inspectDate " class="text-center">{{ item.inspectDate }}</td>                            <td v-if="item.readDate" class="text-center">{{ item.readDate===\'null\'?\'null\':item.readDate}}</td>                            <td v-if="item.notes " class="text-center">{{ item.notes }}</td>                        </tr>                      </tbody>                  </table>',
        methods: {
            sub: function (event) {
                var _id = $(event.target).attr('data-id');
                $('#modal-fromtext').on('show.bs.modal', function () {
                    $(this).find('.remarks').html('\u6309\u94AE\u7684 _id ' + _id);
                });
            }
        }
    });
});