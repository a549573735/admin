define('', ['lib_cmd/vue-cmd'], function (require, exports, module) {
    var Vue = require('lib_cmd/vue-cmd');
    Vue.component('v-radio-select', {
        data: function () {
            return {
                k: 1,
                state: false,
                radio: '',
                selectdata: function () {
                    var that = this;
                    var select = null;
                    $.ajax({
                        url: '/market/brief',
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
                    return select;
                }(),
                selectsubset: []
            };
        },
        template: '<div class="form-horizontal clearfix" >                    <div class=" clearfix">                        <div class="col-md-12">                            <div class="form-group" >                                <label class="col-md-2 v-label o-pd" for="radio-1">                                    <input class="radio-m" id="radio-1" @click="sendRadio($event)" value="DISTRICT" name="user" checked="checked"  type="radio"><span></span>\u5949\u8D24\u533A\u5C40\uFF1A</label>                                <label class="col-md-2 o-pd v-label-m" for="radio-2">                                    <input class="radio-m" name="user" @click="sendRadio($event)" value="MARKET" id="radio-2" checked="checked"  type="radio"><span></span>\u5E02\u573A\u6240\uFF1A</label>                                <div class="col-md-3 o-pd-l">                                    <select class="form-control" name="val-skill" @change="selectChange($event)">                                          <option value="0">\u8BF7\u9009\u62E9</option>                                          <option v-for="item in selectdata" :value="item.id">{{item.name}}</option>                                    </select>                                </div>                                <label class="col-md-1 o-pd v-label-s" for="radio-3">                                    <input class="radio-m" name="user" @click="sendRadio($event)" value="PARK" type="radio" checked="checked"  id="radio-3"><span></span>\u56ED\u533A\uFF1A</label>                                <div class="col-md-3 o-pd-l">                                    <select class="form-control" name="val-skill" @change="sendVal($event)">                                             <option value="0">\u8BF7\u9009\u62E9</option>                                             <option v-for="item in selectsubset" :value="item.id">{{item.name}}</option>                                    </select>                                </div>                            </div>                        </div>                    </div>                </div>',
        methods: {
            selectChange: function (event) {
                if ($(event.target).val() == '0') {
                    this.k = 1;
                    this.state = false;
                    this.$dispatch('send-select', '');
                } else {
                    this.state = true;
                    this.k = $(event.target).val();
                    var that = this;
                    $.ajax({
                        url: '/park/briefall/' + that.k,
                        dataType: 'json',
                        async: false,
                        type: 'GET',
                        success: function (data) {
                            console.log(JSON.stringify(data.content));
                            that.selectsubset = data.content;
                        },
                        error: function (err) {
                            alert(err.msg);
                        }
                    });
                    console.log(this.k);
                    this.$dispatch('send-select', this.k);
                }
            },
            sendVal: function (event) {
                var data = $(event.target).val();
                if (data == '0') {
                    this.$dispatch('send-select', '');
                } else {
                    this.$dispatch('send-select', data);
                }
            },
            sendRadio: function (event) {
                this.radio = $(event.target).val();
                this.$dispatch('send-radio', this.radio);
            },
            getSelect: function () {
            }
        }
    });
    Vue.component('v-radio-content', {
        props: ['datacheckbox'],
        data: function () {
            return {
                k: 1,
                state: false
            };
        },
        template: '<div class="row v-table">                    <div class="col-md-12 o-m-t">                        <div class="block">                            <div class="col-md-6  o-add-l">                                <div class="col-md-12 o-pd" >                                    <div class="col-md-3 o-pd  v-righ">\u89D2\u8272\u540D\uFF1A</div>                                    <div class="col-md-9 o-pd ">                                        <input type="text"  class="form-control per_name"></div>                                    </div>                                <div class="col-md-12 o-m-t o-pd">                                    <div class="col-md-3 o-pd  v-righ">\u6743\u9650\uFF1A</div>                                    <div class="col-md-9 o-pd v-left rolt-user-checked">                                        <label v-for="item in datacheckbox" class="col-md-6 o-pd css-input css-checkbox css-checkbox-primary"><input type="checkbox" id="row_3" :data-id="item.id" :code="item.code"  name="row_3"><span></span>{{item.name}}</label>                                    </div>                                </div>                                <div class="col-md-12 o-m-t o-pd">                                    <div class="col-md-3 o-pd o-m-t"></div>                                    <div class="col-md-9 o-pd ">                                        <div class="v-t-b ">                                          <button class=" btn btn-md btn-primary btn-block " @click="sendCode()" type="submit">\u786E\u5B9A</button>                                        </div>                                        <div class="v-t-b " style="margin-left:50px;">                                          <a class=" btn btn-md btn-primary btn-block "  href="/user/role/list">\u53D6\u6D88</a>                                        </div>                                    </div>                                    </div>                                </div>                            </div>                        </div>                    </div>                </div>',
        methods: {
            sendCode: function () {
                var id = [];
                $('.rolt-user-checked').find('input[type=checkbox]').each(function (index, val) {
                    if ($(val).prop('checked')) {
                        id.push($(val).attr('data-id'));
                    }
                });
                this.$dispatch('send-code', id);
            }
        }
    });
});