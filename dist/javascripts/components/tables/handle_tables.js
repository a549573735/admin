define('', ['lib_cmd/vue-cmd'], function (require, exports, module) {
    var Vue = require('lib_cmd/vue-cmd');
    Vue.component('handle-table-list', {
        props: ['datalist'],
        template: '<table class="table  table-hover table-borderless">                      <thead>                      <tr class="v-table-tr">                            <th class="text-center " v-for="item in datalist.title" v-bind:style="{ width: datalist.style[$index] }">{{item}}</th>                      </tr>                      </thead>                      <tbody class="v-tabs-check">                        <tr v-for="item in datalist.content" v-cloak>                            <td  class="text-center">{{ item.name }}</td>                            <td  class="text-center">{{ item.address }}</td>                            <td  class="text-center">{{ item.contact }}</td>                            <td  class="text-center">{{ item.phone }}</td>                            <td v-if="datalist.btns" class="text-center"><div class="bei-zhu"><a  class="btn  btn-primary "> \u4FEE\u6539</a></div><div class="bei-zhu"><a  class="btn  btn-primary "> \u91CD\u7F6E</a></div></td>                            <td v-if="datalist.overflow" class="text-center">{{ datalist.details[$index].msg}}<a href="javascript:;" class="btn-link">\u8BE6\u60C5</a></td>                            <td v-if="datalist.overflow_btn" class="text-center"><a :href="datalist.href+item.id"  class="btn  btn-primary "> \u8BE6\u60C5</a></td>                        </tr>                      </tbody>                  </table>',
        methods: {
            sub: function (event) {
            }
        }
    });
});