define('', ['lib_cmd/vue-cmd'], function (require, exports, module) {
    var Vue = require('lib_cmd/vue-cmd');
    Vue.component('check-table-list', {
        props: ['datalist'],
        data: function () {
            return {
                marketId: function () {
                    return $.query.get('market');
                }()
            };
        },
        template: '<table class="table  table-hover table-borderless o-m-t">                      <thead>                      <tr class="v-table-tr">                            <th class="text-center " v-for="item in datalist.title" v-bind:style="{ width: datalist.style[$index] }">{{item}}</th>                      </tr>                      </thead>                      <tbody class="v-tabs-check">                        <tr v-for="item in datalist.content.content">                            <td v-if="!datalist.checked" class="text-center"><label v-if="datalist.overfull" class="css-input css-checkbox css-checkbox-primary">                                            <input type="checkbox" name="row_3" :data-type="datalist.type" :value="item.id"><span></span>                                           </label>                            </td>                            <td  class="text-center">{{ item.name }}</td>                            <td v-if="datalist.btns" class="text-center">{{ item.username }}</td>                            <td v-if="datalist.btns" class="text-center">{{ item.mail }}</td>                            <td  class="text-center">{{ item.address }}</td>                            <td  class="text-center">{{ item.contact }}</td>                            <td  class="text-center">{{ item.phone }}</td>                            <td  v-if="datalist.btns"  class="text-center"><div class="bei-zhu"><a  :data-admin="item.admin"   :data-id="item.id" :data-parentId="item.parentId" :data-phone="item.phone" data-type="modify" :data-contact="item.contact" :data-mail="item.mail" :data-username="item.username" :data-name="item.name" :data-address="item.address" class="btn  btn-primary " data-toggle="modal" data-target="#modal-addParty" @click="handleData($event)" > \u4FEE\u6539</a></div><div class="bei-zhu"><a  @click="resetPassword($event)"  :data-id="item.id" :data-admin="item.admin" class="btn  btn-primary "> \u91CD\u7F6E</a></div></td>                            <td  v-if="datalist.overfull_btn"   class="text-center"><a :href="datalist.href+item.id+\'&query=true&market=\'+marketId "   class="btn  btn-primary v-btn-w"> \u8BE6\u60C5</a></td>                        </tr>                      </tbody>                  </table>',
        methods: {
            sub: function (event) {
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
                $('.form_Party').find('.select_park option').each(function (index, val) {
                    if ($(val).val() == $(event.target).attr('data-parentId')) {
                        $(val).attr('selected', 'selected');
                    }
                });
            },
            resetPassword: function (event) {
                var id = $(event.target).attr('data-admin');
                $.post('/reset/user/password', { id: id }).then(function (data) {
                    if (data.success) {
                        alert('\u5BC6\u7801\u91CD\u7F6E\u6210\u529F\uFF0C\u65B0\u5BC6\u7801\u4F1A\u53D1\u9001\u8BE5\u8D26\u6237\u7684\u90AE\u7BB1');
                    } else {
                        alert('\u5BC6\u7801\u91CD\u7F6E\u5931\u8D25');
                    }
                });
            }
        }
    });
});