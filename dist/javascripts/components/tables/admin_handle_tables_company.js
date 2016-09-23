define('', ['lib_cmd/vue-cmd'], function (require, exports, module) {
    var Vue = require('lib_cmd/vue-cmd');
    Vue.component('handle-table-list', {
        props: ['datalist'],
        template: '<table class="table  table-hover table-borderless">                      <thead>                      <tr class="v-table-tr">                            <th class="text-center " v-for="item in datalist.title" v-bind:style="{ width: datalist.style[$index] }">{{item}}</th>                      </tr>                      </thead>                      <tbody class="v-tabs-check">                        <tr v-for="item in datalist.content" v-cloak>                            <td  class="text-center">{{ item.name }}</td>                            <td  class="text-center">{{ item.username }}</td>                            <td  class="text-center">{{ item.mail }}</td>                            <td  class="text-center">{{ item.contact }}</td>                            <td  class="text-center">{{ item.phone }}</td>                            <td v-if="datalist.btns" class="text-center"><div class="bei-zhu"><a  :data-admin="item.admin" :data-marketId="item.marketId"  :data-parkId="item.parkId"    :data-id="item.id" :data-parentId="item.parentId" :data-phone="item.phone" data-type="modify" :data-contact="item.contact" :data-mail="item.mail" :data-username="item.username" :data-name="item.name" :data-address="item.address" class="btn  btn-primary " data-toggle="modal" data-target="#modal-addCompany" @click="handleData($event)" > \u4FEE\u6539</a></div><div class="bei-zhu"><a  @click="resetPassword($event)"  :data-id="item.id" :data-admin="item.admin" class="btn  btn-primary "> \u91CD\u7F6E</a></div></td>                        </tr>                      </tbody>                  </table>',
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
            },
            handleData: function (event) {
                $('.admin-name').val($(event.target).attr('data-name'));
                $('.admin-parentId').val($(event.target).attr('data-parentId'));
                $('.admin-id').val($(event.target).attr('data-id'));
                $('.admin-email').val($(event.target).attr('data-mail'));
                $('.admin-address').val($(event.target).attr('data-address'));
                $('.admin-username').val($(event.target).attr('data-username'));
                $('.admin-phone').val($(event.target).attr('data-phone'));
                $('.admin-contact').val($(event.target).attr('data-contact'));
                $('.admin-type').val($(event.target).attr('data-type'));
                $('.admin-admin').val($(event.target).attr('data-admin'));
                var parkId = $(event.target).attr('data-parkId');
                var marketId = $(event.target).attr('data-marketId');
                var select = [];
                $.ajax({
                    url: '/park/briefall/' + marketId,
                    dataType: 'json',
                    async: false,
                    type: 'GET',
                    success: function (data) {
                        select = data.content;
                    },
                    error: function (err) {
                        alert(err.msg);
                    }
                });
                this.$dispatch('send-selectId', {
                    marketId: marketId,
                    parkId: parkId,
                    selectIds: select
                });
            },
            resetPassword: function (event) {
                var id = $(event.target).attr('data-admin');
                $.post('/reset/user/password', { id: id }).then(function (data) {
                    if (data.success) {
                        alert('\u5BC6\u7801\u91CD\u7F6E\u6210\u529F\uFF0C\u65B0\u5BC6\u7801\u4F1A\u53D1\u9001\u8BE5\u8D26\u6237\u7684\u90AE\u7BB1');
                    } else {
                        alert(data.msg);
                    }
                });
            }
        }
    });
});