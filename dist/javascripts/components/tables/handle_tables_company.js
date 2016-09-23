define('', ['lib_cmd/vue-cmd'], function (require, exports, module) {
    var Vue = require('lib_cmd/vue-cmd');
    Vue.component('handle-table-list', {
        props: ['datalist'],
        template: '<table class="table  table-hover table-borderless">                      <thead>                      <tr class="v-table-tr">                            <th class="text-center " v-for="item in datalist.title" v-bind:style="{ width: datalist.style[$index] }">{{item}}</th>                      </tr>                      </thead>                      <tbody class="v-tabs-check">                        <tr v-for="item in datalist.content" v-cloak>                            <td  class="text-center">{{ item.name }}</td>                            <td  class="text-center">{{ item.address }}</td>                            <td  class="text-center">{{ item.belongMarket }}</td>                            <td  class="text-center">{{ item.contact }}</td>                            <td  class="text-center">{{ item.phone }}</td>                            <td  class="text-center"><span class="bus-msg">{{ item.businesses }} </span><a href="javascript:;"" @click="showMsg($event) " class="btn-link">\u8BE6\u60C5</a></td>                            <td v-if="datalist.btns" class="text-center"><div class="bei-zhu"><a  class="btn  btn-primary "> \u4FEE\u6539</a></div><div class="bei-zhu"><a  class="btn  btn-primary "> \u91CD\u7F6E</a></div></td>                            <td v-if="datalist.overflow" class="text-center" :expiredate="item.expireDate" :certificate="item.certificate" ><a href="javascript:;"  class="btn-link">\u8BE6\u60C5</a></td>                            <td v-if="!datalist.detals" class="text-center"><a :href="datalist.href+item.id"  class="btn  btn-primary "> \u8BE6\u60C5</a></td>                        </tr>                      </tbody>                  </table>',
        methods: {
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
            }
        }
    });
});