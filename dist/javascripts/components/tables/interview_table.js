define('', ['lib_cmd/vue-cmd'], function (require, exports, module) {
    var Vue = require('lib_cmd/vue-cmd');
    Vue.component('com-table-list', {
        props: ['datalist'],
        computed: {
            'newData': function () {
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
                    switch (item.period) {
                    case 3:
                        item.period = '\u4E09\u5929\u5185';
                        break;
                    case 7:
                        item.period = '\u4E03\u5929\u5185';
                        break;
                    case 10:
                        item.period = '\u5341\u5929\u5185';
                        break;
                    }
                });
                return this.datalist;
            }
        },
        template: '<table class="table  table-hover table-borderless">                      <thead>                      <tr class="v-table-tr">                            <th class="text-center " v-for="item in datalist.title" v-bind:style="{ width: datalist.style[$index] }">{{item}}</th>                      </tr>                      </thead>                      <tbody class="v-tabs-check">                         <tr v-for="item in newData.content.content">                            <td  class="text-center">{{ item.target }}</td>                            <td  class="text-center">{{ item.status }}</td>                            <td  class="text-center">{{ item.interviewDate }}</td>                            <td  class="text-center">{{ item.period }}</td>                            <td  class="text-center">{{ item.agreeDate }}</td>                            <td  class="text-center">{{ item.user }}</td>                            <td  class="text-center">{{ item.notes }}</td>                        </tr>                      </tbody>                  </table>',
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