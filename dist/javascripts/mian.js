define('', ['lib_cmd/vue-cmd'], function (require, exports, module) {
    var Vue = require('lib_cmd/vue-cmd');
    Vue.component('v-select-admin', {
        props: [
            'market',
            'park',
            'selectsubset'
        ],
        data: function () {
            return {
                _id: 1,
                state: false,
                selectdata: function () {
                    var dataSelect = null;
                    $.ajax({
                        url: '/market/brief',
                        dataType: 'json',
                        async: false,
                        type: 'GET',
                        success: function (data) {
                            dataSelect = data.content;
                        },
                        error: function (err) {
                            alert(err.msg);
                        }
                    });
                    return dataSelect;
                }()
            };
        },
        template: '<div class="form-group">                                <label class="col-md-3 control-label" >\u96B6\u5C5E\u4E8E\u5E02\u573A\u6240: <span class="text-danger">*</span></label>                                 <div class="col-md-7">                                         <select class="form-control"   id="select_market" name="market" @change="selectChange($event)">                                             <option value="0">\u8BF7\u9009\u62E9</option>                                             <option v-for="item in selectdata" :selected="market==item.id?true:false" :value="item.id">{{item.name}}</option>                                         </select>                                 </div>                               </div>                                <div class="form-group">                                  <label class="col-md-3 control-label" >\u96B6\u5C5E\u4E8E\u56ED\u533A: <span class="text-danger">*</span></label>                                         <div class="col-md-7" >                                           <select class="form-control" id="select_park" name="park" @change="sendVal($event)">                                                 <option value="0">\u8BF7\u9009\u62E9</option>                                                 <option   v-for="item in selectsubset" :selected="park==item.id?true:false" :value="item.id">{{item.name}}</option>                                           </select>                                  </div>                                </div>',
        methods: {
            selectChange: function (event) {
                var that = this;
                if ($(event.target).val() == '0') {
                    this._id = 1;
                    this.state = false;
                } else {
                    this.state = true;
                    this._id = $(event.target).val();
                    var that = this;
                    console.log(this._id);
                    $.ajax({
                        url: '/park/briefall/' + that._id,
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
                }
            },
            sendVal: function (event) {
                var data = $(event.target).val();
                console.log(data);
                this.$dispatch('send-select-admin', data);
            }
        }
    });
});
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
define('', ['lib_cmd/vue-cmd'], function (require, exports, module) {
    var Vue = require('lib_cmd/vue-cmd');
    Vue.component('v-select', {
        props: ['role'],
        data: function () {
            return {
                _id: 1,
                state: false,
                selectdata: function () {
                    var dataSelect = null;
                    $.ajax({
                        url: '/market/brief',
                        dataType: 'json',
                        async: false,
                        type: 'GET',
                        success: function (data) {
                            dataSelect = data.content;
                        },
                        error: function (err) {
                            alert(err.msg);
                        }
                    });
                    return dataSelect;
                }(),
                selectsubset: function () {
                    var id = $.query.get('market');
                    var select = [];
                    if (id) {
                        $.ajax({
                            url: '/park/briefall/' + id,
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
                    }
                    return select;
                }(),
                marketId: function () {
                    return $.query.get('market');
                }(),
                type: 'DISTRICT',
                parkId: function () {
                    return $.query.get('park');
                }(),
                parkType: 'PARK'
            };
        },
        template: '<label class="col-md-1 o-pd-r v-label" for="val-skill">\u5E02\u573A\u6240\uFF1A</label>\t                         <div class="col-md-2 o-pd">\t                                 <select class="form-control" id="select_market" :disabled="role.type!= type" name="market" @change="selectChange($event)">\t                                     <option value="0">\u8BF7\u9009\u62E9</option>                                       <option v-for="item in selectdata" :selected="marketId==item.id?true:false" :value="item.id">{{item.name}}</option>\t                                 </select>\t                         </div>\t                          <label class="col-md-1 o-pd-r v-label text-center" for="val-skill2">\u56ED\u533A\uFF1A</label>\t                                 <div class="col-md-2 o-pd" >\t                                   <select class="form-control" id="select_park" :disabled="role.type== parkType " name="park"  @change="sendVal($event)">\t                                         <option value="0">\u8BF7\u9009\u62E9</option>                                           <option v-for="item in selectsubset" :selected="parkId==item.id?true:false" :value="item.id">{{item.name}}</option>\t                                   </select>\t                          </div>',
        methods: {
            selectChange: function (event) {
                var that = this;
                if ($(event.target).val() == '0') {
                    this._id = 1;
                    this.state = false;
                } else {
                    this.state = true;
                    this._id = $(event.target).val();
                    var that = this;
                    console.log(this._id);
                    $.ajax({
                        url: '/park/briefall/' + that._id,
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
                }
            },
            sendVal: function (event) {
                var data = $(event.target).val();
                console.log(data);
                this.$dispatch('send-select', data);
            }
        }
    });
});
define('', ['lib_cmd/vue-cmd'], function (require, exports, module) {
    var Vue = require('lib_cmd/vue-cmd');
    Vue.component('v-radio-select', {
        props: [
            'role',
            'showselect'
        ],
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
                selectsubset: function () {
                    var that = this;
                    var select = [];
                    var role = JSON.parse($('#user_role').val());
                    console.log(role.id);
                    if (role.type == 'MARKET') {
                        $.ajax({
                            url: '/park/briefall/' + role.belongId,
                            dataType: 'json',
                            async: false,
                            type: 'GET',
                            success: function (data) {
                                if (data.success) {
                                    select = data.content;
                                } else {
                                    alert(data.errMessage);
                                }
                            },
                            error: function (err) {
                                alert(err.msg);
                            }
                        });
                        console.log(select);
                    }
                    console.log(select);
                    return select;
                }()
            };
        },
        template: '<div class="form-horizontal clearfix" >                        <div class=" clearfix">                                <div class="col-md-12">                                    <div class="col-md-6" v-if="role.type!=\'PARK\'">                                        <label   class="col-md-2 v-label o-pd" for="radio-1" v-if="!showselect&&role.type==\'DISTRICT\'"  >                                            <input class="radio-m" id="radio-1" @click="sendRadio($event)" value="DISTRICT" name="user"   type="radio"><span></span>\u5949\u8D24\u533A\u5C40</label>                                        <label class="col-md-2 o-pd v-label-m" for="radio-2" >                                            <input class="radio-m" name="user" @click="sendRadio($event)" value="MARKET" id="radio-2" type="radio"><span></span>\u5E02\u573A\u6240</label>                                        <div class="col-md-8 o-pd-l" v-if="showselect"  >                                            <select class="form-control" name="val-skill" v-if="role.type==\'DISTRICT\'"  @change="selectChange($event)">                                                  <option value="0">\u8BF7\u9009\u62E9</option>                                                  <option v-for="item in selectdata" :value="item.id">{{item.name}}</option>                                            </select>                                        </div>                                   </div>                                   <div class="col-md-6">                                        <label class="col-md-4 o-pd v-label-s" for="radio-3" >                                            <input class="radio-m" name="user" @click="sendRadio($event)" value="PARK"    type="radio" id="radio-3"><span></span>\u56ED\u533A</label>                                        <div class="col-md-8 o-pd-l"  v-if="showselect">                                            <select class="form-control" name="val-skill" @change="sendVal($event)">                                                     <option value="0">\u8BF7\u9009\u62E9</option>                                                     <option v-for="item in selectsubset" :value="item.id">{{item.name}}</option>                                            </select>                                        </div>                                    </div>                                </div>                            </div>                        </div>                  </div>',
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
                state: false,
                permissionIds: function () {
                    var data = { name: $.query.get('name') };
                    return data;
                }()
            };
        },
        template: '<div class="row v-table">                    <div class="col-md-12 o-m-t">                        <div class="block">                            <div class="col-md-6  o-add-l">                                <div class="col-md-12 o-pd" >                                    <div class="col-md-3 o-pd  v-righ">\u89D2\u8272\u540D\uFF1A</div>                                    <div class="col-md-9 o-pd ">                                        <input type="text"  class="form-control per_name" :value="permissionIds.name" ></div>                                    </div>                                <div class="col-md-12 o-m-t o-pd">                                    <div class="col-md-3 o-pd  v-righ">\u6743\u9650\uFF1A</div>                                    <div class="col-md-9 o-pd v-left rolt-user-checked">                                        <label v-for="item in datacheckbox" class="col-md-6 o-pd css-input css-checkbox css-checkbox-primary"><input type="checkbox" :data-id="item.id"    :code="item.code"   ><span></span>{{item.name}}</label>                                    </div>                                </div>                                <div class="col-md-12 o-m-t o-pd">                                    <div class="col-md-3 o-pd o-m-t"></div>                                    <div class="col-md-9 o-pd ">                                        <div class="v-t-b ">                                          <button class=" btn btn-md btn-primary btn-block " @click="sendCode()" type="submit">\u786E\u5B9A</button>                                        </div>                                    </div>                                    </div>                                </div>                            </div>                        </div>                    </div>                </div>',
        methods: {
            sendCode: function () {
                var id = [];
                var code = [];
                $('.rolt-user-checked').find('input[type=checkbox]').each(function (index, val) {
                    if ($(val).prop('checked')) {
                        id.push($(val).attr('data-id'));
                        code.push($(val).attr('code'));
                    }
                });
                this.$dispatch('send-code', {
                    id: id,
                    code: code
                });
            },
            getCheck: function () {
            }
        }
    });
});
define('', [
    'lib_cmd/vue-cmd',
    '/js_cmd/components/select',
    '/js_cmd/components/admin_select',
    '/js_cmd/components/paging',
    '/js_cmd/components/tables/admin_handle_tables_company'
], function (require, exports, module) {
    var Vue = require('lib_cmd/vue-cmd');
    require('/js_cmd/components/select');
    require('/js_cmd/components/admin_select');
    require('/js_cmd/components/paging');
    require('/js_cmd/components/tables/admin_handle_tables_company');
    new Vue({
        'el': '#admin-company',
        data: {
            tablsData: function () {
                var data = JSON.parse($('.data_tabls').val());
                data.detals = true;
                return data;
            }(),
            parkId: '',
            page: 0,
            marketId: '',
            selectsubset: ''
        },
        methods: {
            searchData: function () {
                var that = this;
                var form = {
                    'businesses': $('input[name=businesses]').val(),
                    'company': $('input[name=company]').val(),
                    'customer': $('input[name=customer]').val(),
                    'market': $('#select_market').val(),
                    'page': this.page,
                    'park': $('#select_park').val(),
                    'producer': $('input[name=producer]').val(),
                    'product': $('input[name=product]').val(),
                    'provider': $('input[name=provider]').val(),
                    'size': 15,
                    'id': $('#select_park').val()
                };
                this.parkId = $('#select_park').val();
                $.post('/admin/company', form).then(function (data) {
                    data.detals = true;
                    that.tablsData = data.data;
                    console.log(JSON.stringify(data));
                });
            },
            createCompany: function (event) {
                var form = {
                    address: $('input[name=admin-address]').val(),
                    belongId: this.parkId,
                    businesses: $('input[name=admin-businesses]').val(),
                    certificate: $('input[name=admin-certificate]').val(),
                    expireDate: $('input[name=admin-expireDate]').val(),
                    contact: $('input[name=admin-contact]').val(),
                    name: $('input[name=admin-company]').val(),
                    phone: $('input[name=admin-phone]').val(),
                    username: $('input[name=admin-username]').val(),
                    mail: $('.admin-email').val(),
                    admin: $('.admin-admin').val(),
                    id: $('.admin-id').val()
                };
                var that = this;
                var checked = Common.checkEmpty($('#modal-addCompany').find('input[type=text]'));
                var checkEmail = Common.checkEmail($('.admin-email'));
                if (checked.state == 'false') {
                    alert(checked.message);
                    return false;
                }
                if (checkEmail.state == 'false') {
                    alert(checked.message);
                    return false;
                }
                if ($('.admin-type').val() == 'modify') {
                    $.post('/admin/company/modify', form).then(function (data) {
                        if (data.success) {
                            alert('\u4FEE\u6539\u6210\u529F');
                        } else {
                            console.log(data.errMessage);
                            alert('\u4FEE\u6539\u5931\u8D25');
                        }
                    });
                } else {
                    $.post('/api/company/add', form).then(function (data) {
                        if (data.success) {
                            $('#modal-addCompany').find('input').val('');
                            $('#modal-addCompany').find('select').val('0');
                            alert('\u65B0\u589E\u6210\u529F');
                            Common;
                        } else {
                            console.log(data.errMessage);
                            alert('\u65B0\u589E\u5931\u8D25');
                        }
                    });
                }
            }
        },
        events: {
            'send-select-admin': function (id) {
                this.parkId = id;
            },
            'send-page': function (page) {
                this.tablsData.page = page;
                var that = this;
                var form = {
                    page: page - 1,
                    id: this.parkId,
                    park: this.parkId
                };
                $.post('/admin/company', form).then(function (data) {
                    data.detals = true;
                    that.tablsData = data.data;
                });
            },
            'send-selectId': function (data) {
                this.parkId = data.parkId;
                this.marketId = data.marketId;
                this.selectsubset = data.selectIds;
                console.log(JSON.stringify(this.selectsubset));
            }
        }
    });
});
define('', [
    '/js_cmd/components/tables/handle_vue',
    'lib_cmd/vue-cmd',
    '/js_cmd/components/paging',
    '/js_cmd/components/tables/admin_handle_tables'
], function (require, exports, module) {
    require('/js_cmd/components/tables/handle_vue');
    var Vue = require('lib_cmd/vue-cmd');
    require('/js_cmd/components/paging');
    require('/js_cmd/components/tables/admin_handle_tables');
    new Vue({
        'el': '#admin-market',
        data: {},
        events: {
            'send-page': function (page) {
                this.page = page - 1;
                var that = this;
            }
        }
    });
});
define('', [
    '/js_cmd/components/paging',
    'lib_cmd/vue-cmd',
    '/js_cmd/components/tables/check_tables'
], function (require, exports, module) {
    require('/js_cmd/components/paging');
    var Vue = require('lib_cmd/vue-cmd');
    require('/js_cmd/components/tables/check_tables');
    new Vue({
        'el': '#admin-park',
        data: {
            tableList: {
                href: '',
                title: [
                    '\u56ED\u533A\u540D\u79F0',
                    '\u7528\u6237\u540D',
                    '\u90AE\u7BB1',
                    '\u8054\u7CFB\u4EBA',
                    '\u56ED\u533A\u5730\u5740',
                    '\u8054\u7CFB\u65B9\u5F0F',
                    '\u64CD\u4F5C'
                ],
                content: function () {
                    var arr = window.location.search.split('?')[1] ? window.location.search.split('?')[1].split(/&?[a-z]+=/gi) : '';
                    var form = {
                        id: 'all',
                        page: arr[2] || 0,
                        parkname: ''
                    };
                    var datalist = null;
                    $.ajax({
                        url: '/api/organize/park/list',
                        dataType: 'json',
                        async: false,
                        data: form,
                        type: 'GET',
                        success: function (data) {
                            console.log(data);
                            if (data.success) {
                                datalist = data.content;
                            } else {
                                alert(data.errMessage);
                            }
                        },
                        error: function (err) {
                            alert(err.msg);
                        }
                    });
                    return datalist;
                }(),
                style: [
                    '15%',
                    '10%',
                    'auto',
                    '10%',
                    '120px',
                    '120px',
                    '18%'
                ],
                type: 'PARK',
                btns: true,
                checked: true
            }
        },
        methods: {
            getParkList: function () {
                var that = this;
                var form = {
                    parkname: $('.select-parkname').val() || '',
                    id: $('#select_park').val()
                };
                this.tableList.content = this.getData(form);
            },
            getData: function (form) {
                var datalist = null;
                $.ajax({
                    url: '/api/organize/park/list',
                    dataType: 'json',
                    async: false,
                    data: form,
                    type: 'GET',
                    success: function (data) {
                        if (data.success) {
                            console.log(data.content);
                            datalist = data.content;
                        } else {
                            alert(data.errMessage);
                        }
                    },
                    error: function (err) {
                        alert(err.msg);
                    }
                });
                return datalist;
            }
        },
        events: {
            'send-page': function (page) {
                var form = {
                    id: 'all',
                    page: page - 1,
                    parkname: ''
                };
                var that = this;
                $.ajax({
                    url: '/api/organize/park/list',
                    dataType: 'json',
                    async: false,
                    data: form,
                    type: 'GET',
                    success: function (data) {
                        if (data.success) {
                            that.tableList.content = data.content;
                            console.log(JSON.stringify(data.content));
                        } else {
                            alert(data.errMessage);
                        }
                    },
                    error: function (err) {
                        alert(err.msg);
                    }
                });
            }
        }
    });
});
define('', [
    'lib_cmd/vue-cmd',
    '/js_cmd/components/paging',
    '/js_cmd/components/tables/com_tables',
    '/js_cmd/components/select'
], function (require, exports, module) {
    var Vue = require('lib_cmd/vue-cmd');
    require('/js_cmd/components/paging');
    require('/js_cmd/components/tables/com_tables');
    var select = require('/js_cmd/components/select');
    new Vue({
        el: '#appointment',
        data: {
            dataList: {
                title: [
                    '\u4F01\u4E1A\u540D\u79F0',
                    '\u9884\u7EA6\u72B6\u6001',
                    '\u68C0\u67E5\u5458',
                    '\u68C0\u67E5\u65E5\u671F',
                    '\u5907\u6CE8'
                ],
                content: function () {
                    var dataList = null;
                    $.ajax({
                        url: '/api/appointment/list',
                        dataType: 'json',
                        async: false,
                        type: 'GET',
                        success: function (data) {
                            console.log(JSON.stringify(data));
                            if (data.success) {
                                dataList = data.content;
                            } else {
                                console.log(data.errMessage);
                            }
                        },
                        error: function (err) {
                        }
                    });
                    if (dataList != null) {
                        dataList.content.forEach(function (item) {
                            if (item.target == null) {
                                item.target += '';
                            }
                        });
                    }
                    return dataList;
                }(),
                style: [
                    '25%',
                    '100px',
                    '100px',
                    '15%',
                    'auto'
                ],
                details: [
                    {
                        _id: '1',
                        msg: '\u8BE5\u516C\u53F8\u7684\u9500\u552E\u53CA\u4F9B\u5E94\u5546'
                    },
                    {
                        _id: '2',
                        msg: '\u8BE5\u516C\u53F8\u7684\u9500\u552E\u53CA\u4F9B\u5E94\u5546'
                    }
                ],
                overfull: false,
                selectsubset: []
            }
        },
        methods: {
            getContent: function (page) {
                var that = this;
                var form = {
                    'page': page || 0,
                    'size': 15,
                    'type': $('#selectType').val(),
                    'market': $('#select_market').val(),
                    'company': $('input[name=company]').val(),
                    'park': $('#select_park').val(),
                    'from': $('input[name=from]').val(),
                    'to': $('input[name=to]').val()
                };
                $.get('/api/appointment/list', form).then(function (data) {
                    data.content.content.forEach(function (item) {
                        if (item.target == null) {
                            item.target += '';
                        }
                    });
                    that.dataList.content = data.content;
                });
            }
        },
        events: {
            'send-page': function (page) {
                this.page = page - 1;
                var that = this;
                this.getContent(this.page);
            }
        }
    });
});
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
        'el': '#details',
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
define('', [
    'lib_cmd/vue-cmd',
    '/js_cmd/components/paging',
    '/js_cmd/components/tables/com_tables',
    '/js_cmd/components/select'
], function (require, exports, module) {
    var Vue = require('lib_cmd/vue-cmd');
    require('/js_cmd/components/paging');
    require('/js_cmd/components/tables/com_tables');
    var select = require('/js_cmd/components/select');
    new Vue({
        el: '#inspect',
        data: {
            dataList: {
                title: [
                    '\u4F01\u4E1A\u540D\u79F0',
                    '\u68C0\u67E5\u72B6\u6001',
                    '\u68C0\u67E5\u5458',
                    '\u68C0\u67E5\u65E5\u671F',
                    '\u5907\u6CE8'
                ],
                content: function () {
                    var dataList = null;
                    $.ajax({
                        url: '/api/inspect/list',
                        dataType: 'json',
                        async: false,
                        type: 'GET',
                        success: function (data) {
                            console.log(JSON.stringify(data));
                            if (data.success) {
                                dataList = data.content;
                            } else {
                                console.log(data.errMessage);
                            }
                        },
                        error: function (err) {
                        }
                    });
                    console.log(dataList);
                    if (dataList != null) {
                        dataList.content.forEach(function (item) {
                            if (item.target == null) {
                                item.target += '';
                            }
                        });
                    }
                    return dataList;
                }(),
                style: [
                    '23%',
                    '100px',
                    '100px',
                    '20%',
                    'auto'
                ],
                details: [
                    {
                        _id: '1',
                        msg: '\u8BE5\u516C\u53F8\u7684\u9500\u552E\u53CA\u4F9B\u5E94\u5546'
                    },
                    {
                        _id: '2',
                        msg: '\u8BE5\u516C\u53F8\u7684\u9500\u552E\u53CA\u4F9B\u5E94\u5546'
                    }
                ],
                overfull: false,
                selectsubset: []
            }
        },
        methods: {
            getContent: function (page) {
                var that = this;
                var form = {
                    'page': page || 0,
                    'size': 15,
                    'type': $('#selectType').val(),
                    'market': $('#select_market').val(),
                    'company': $('input[name=company]').val(),
                    'park': $('#select_park').val(),
                    'from': $('input[name=from]').val(),
                    'to': $('input[name=to]').val()
                };
                $.get('/api/inspect/list', form).then(function (data) {
                    console.log(JSON.stringify(data));
                    data.content.content.forEach(function (item) {
                        for (var name in item) {
                            item[name] += '';
                        }
                    });
                    that.dataList.content = data.content;
                });
            }
        },
        events: {
            'send-page': function (page) {
                this.page = page - 1;
                var that = this;
                this.getContent(page - 1);
            }
        }
    });
});
define('', [
    'lib_cmd/vue-cmd',
    '/js_cmd/components/paging',
    '/js_cmd/components/tables/interview_table',
    '/js_cmd/components/select'
], function (require, exports, module) {
    var Vue = require('lib_cmd/vue-cmd');
    require('/js_cmd/components/paging');
    require('/js_cmd/components/tables/interview_table');
    var select = require('/js_cmd/components/select');
    new Vue({
        el: '#interview',
        data: {
            dataList: {
                title: [
                    '\u4F01\u4E1A\u540D\u79F0',
                    '\u7EA6\u8C08\u72B6\u6001',
                    '\u53D1\u9001\u65F6\u95F4',
                    '\u65F6\u95F4\u7C7B\u522B',
                    '\u63A5\u53D7\u65E5\u671F',
                    '\u7EA6\u8C08\u5458',
                    '\u5907\u6CE8'
                ],
                content: function () {
                    var dataList = null;
                    $.ajax({
                        url: '/api/interview/list',
                        dataType: 'json',
                        async: false,
                        type: 'POST',
                        success: function (data) {
                            console.log(data);
                            if (data.success) {
                                dataList = data.content;
                            } else {
                                console.log(data.errMessage);
                            }
                        },
                        error: function (err) {
                        }
                    });
                    return dataList;
                }(),
                style: [
                    '20%',
                    '110px',
                    '110px',
                    '110px',
                    '110px',
                    '80px',
                    'auto'
                ],
                details: [
                    {
                        _id: '1',
                        msg: '\u8BE5\u516C\u53F8\u7684\u9500\u552E\u53CA\u4F9B\u5E94\u5546'
                    },
                    {
                        _id: '2',
                        msg: '\u8BE5\u516C\u53F8\u7684\u9500\u552E\u53CA\u4F9B\u5E94\u5546'
                    }
                ],
                overfull: false,
                selectsubset: []
            }
        },
        methods: {
            getContent: function (page) {
                var that = this;
                var form = {
                    'page': page || 0,
                    'size': 15,
                    'type': $('#selectType').val(),
                    'market': $('#select_market').val(),
                    'company': $('input[name=company]').val(),
                    'park': $('#select_park').val(),
                    'from': $('input[name=from]').val(),
                    'to': $('input[name=to]').val()
                };
                $.post('/api/interview/list', form).then(function (data) {
                    that.dataList.content = data.content;
                });
            }
        },
        events: {
            'send-page': function (page) {
                this.page = page - 1;
                var that = this;
                this.getContent(this.page);
            }
        }
    });
});
define('', [
    '/js_cmd/common/checkCode',
    '/lib/bootstrap-datepicker',
    '/lib/Jquery.Query',
    '/js_cmd/common/common'
], function (require, exports, module) {
    require('/js_cmd/common/checkCode');
    require('/lib/bootstrap-datepicker');
    require('/lib/Jquery.Query');
    require('/js_cmd/common/common');
    var common = new Common();
    var checkCodes = new CheckCode({
        obj: document.getElementById('checkCodeArea'),
        codesLen: 4
    });
    checkCodes.render();
    $('.big_bj').height($(window).height());
    $('#checkCodeArea').on('click', function () {
        checkCodes.refresh();
    });
    $('.rest-pass-btn').on('click', showRest);
    $('.login-pass-btn').on('click', showLogin);
    $('.denglu_btm').on('click', function () {
        var val = $('.denglu_yz').val().toLowerCase();
        var check = checkCodes.getCodes().toLowerCase();
        var data = {
            'username': $('input[name=username]').val(),
            'password': $('input[name=password]').val()
        };
        if (val == check) {
            $.post('/loginUp', data, function (data) {
                console.log(data);
                if (data.state == false) {
                    $('.error').show().html('\u5BC6\u7801\u6216\u7528\u6237\u540D\u9519\u8BEF\u8BF7\u91CD\u65B0\u8F93\u5165');
                    checkCodes.refresh();
                    return false;
                }
                if (data.type == 'COMPANY') {
                    window.location.href = '/organize/details?view=company&id=' + data.data.companyId + '&market=' + data.data.marketId + '&park=' + data.data.parkId + '&belongId=' + data.data.belongId;
                } else if (data.type == 'BACKSTAGE') {
                    window.location.href = '/admin/interface/list';
                } else if (data.type == 'MARKET') {
                    window.location.href = '/organize/park?id=' + data.data.belongId + '&market=' + data.data.marketId + '&park=' + data.data.parkId;
                } else if (data.type == 'PARK') {
                    window.location.href = '/organize/company?id=' + data.data.belongId + '&market=' + data.data.marketId + '&park=' + data.data.parkId;
                } else {
                    window.location.href = '/organize/architecture?id=' + data.data.belongId + '&market=' + data.data.marketId + '&park=' + data.data.parkId;
                }
            }, 'json');
        } else {
            $('.error').show().html('\u9A8C\u8BC1\u7801\u9519\u8BEF\u8BF7\u91CD\u65B0\u8F93\u5165');
            checkCodes.refresh();
            return false;
        }
    });
    $('.getCode').on('click', function () {
        var check = common.checkEmpty($('input[name=restUsername]'));
        if (check.state == 'false') {
            alert(check.message);
            return false;
        }
        common.countdown($(this));
        var username = $('input[name=restUsername]').val();
        $.post('/api/app/code/by/name/', { name: username }).then(function (data) {
            console.log(data.content);
            if (data.success) {
                $('input[name=rest-code]').val(data.content);
            } else {
                alert(data.errMessage);
            }
        });
    });
    $('.rest-btn').on('click', function () {
        var form = {
            codeId: $('input[name=rest-code]').val(),
            code: $('input[name=rest-confirm-code]').val(),
            password: $('input[name=rest-password]').val(),
            username: $('input[name=restUsername]').val()
        };
        var that = this;
        $.post('/api/app/user/modify/password', form).then(function (data) {
            if (data.success) {
                $(that).parent().prev().html('\u4FEE\u6539\u6210\u529F').show();
                showLogin();
            } else {
                $(that).parent().prev().html('\u4FEE\u6539\u5931\u8D25').show();
                console.log(data.errMessage);
            }
        });
    });
    function showRest() {
        $('.loginUp').css({
            'WebkitTransform': 'translateX(700px)',
            opacity: '0'
        });
        $('.loginUp').css({
            'MozTransform': 'translateX(700px)',
            opacity: '0'
        });
        $('.loginUp').css({
            'msTransform': 'translateX(700px)',
            opacity: '0'
        });
        $('.loginUp').css({
            'transform': 'translateX(700px)',
            opacity: '0'
        });
        $('.reset-password').css({
            opacity: '1',
            'WebkitTransform': 'translateX(450px)'
        });
        $('.reset-password').css({
            opacity: '1',
            'MozTransform': 'translateX(450px)'
        });
        $('.reset-password').css({
            opacity: '1',
            'msTransform': 'translateX(450px)'
        });
        $('.reset-password').css({
            opacity: '1',
            'transform': 'translateX(450px)'
        });
    }
    function showLogin() {
        $('.loginUp').css({
            'WebkitTransform': 'translateX(0)',
            opacity: '1'
        });
        $('.loginUp').css({
            'MozTransform': 'translateX(0)',
            opacity: '1'
        });
        $('.loginUp').css({
            'msTransform': 'translateX(0)',
            opacity: '1'
        });
        $('.loginUp').css({
            'transform': 'translateX(0)',
            opacity: '1'
        });
        $('.reset-password').css({
            opacity: '0',
            'WebkitTransform': 'translateX(0px)'
        });
        $('.reset-password').css({
            opacity: '0',
            'MozTransform': 'translateX(0px)'
        });
        $('.reset-password').css({
            opacity: '0',
            'msTransform': 'translateX(0px)'
        });
        $('.reset-password').css({
            opacity: '0',
            'transform': 'translateX(0px)'
        });
    }
});
define('', [
    'lib_cmd/vue-cmd',
    '/js_cmd/components/select',
    '/js_cmd/components/paging',
    '/js_cmd/components/tables/handle_tables_company'
], function (require, exports, module) {
    var Vue = require('lib_cmd/vue-cmd');
    require('/js_cmd/components/select');
    require('/js_cmd/components/paging');
    require('/js_cmd/components/tables/handle_tables_company');
    new Vue({
        'el': '#organize-company',
        data: {
            tablsData: function () {
                return JSON.parse($('.data_tabls').val());
            }()
        },
        methods: {
            searchData: function (page) {
                var that = this;
                var form = {
                    'businesses': $('input[name=businesses]').val(),
                    'company': $('input[name=company]').val(),
                    'customer': $('input[name=customer]').val(),
                    'market': $('#select_market').val(),
                    'page': page || 0,
                    'park': $('#select_park').val(),
                    'producer': $('input[name=producer]').val(),
                    'product': $('input[name=product]').val(),
                    'provider': $('input[name=provider]').val(),
                    'size': 15
                };
                $.post('/api/organize/company/list', form).then(function (data) {
                    that.tablsData = data;
                    console.log(data);
                });
            }
        },
        events: {
            'send-page': function (page) {
                console.log(this.tablsData.page);
                this.tablsData.page = page;
                var that = this;
                var form = { page: page - 1 };
                if ($('#select_market').val() != '0' || $('#select_park').val() != '0') {
                    this.searchData(page - 1);
                } else {
                    $.post('/api/organize/company/list', form).then(function (data) {
                        that.tablsData = data;
                    });
                }
            }
        }
    });
});
define('', [
    '/js_cmd/components/tables/handle_vue',
    'lib_cmd/vue-cmd',
    '/js_cmd/components/paging',
    '/js_cmd/components/tables/handle_tables'
], function (require, exports, module) {
    require('/js_cmd/components/tables/handle_vue');
    var Vue = require('lib_cmd/vue-cmd');
    require('/js_cmd/components/paging');
    require('/js_cmd/components/tables/handle_tables');
    new Vue({
        'el': '#organize-market',
        data: {},
        events: {
            'send-page': function (page) {
                this.page = page - 1;
                var that = this;
            }
        }
    });
});
define('', [
    '/js_cmd/components/paging',
    'lib_cmd/vue-cmd',
    '/js_cmd/components/tables/check_tables'
], function (require, exports, module) {
    require('/js_cmd/components/paging');
    var Vue = require('lib_cmd/vue-cmd');
    require('/js_cmd/components/tables/check_tables');
    new Vue({
        'el': '#organize-park',
        data: {
            tableList: {
                href: '/organize/company?id=',
                title: [
                    '',
                    '\u56ED\u533A\u540D\u79F0',
                    '\u56ED\u533A\u5730\u5740',
                    '\u8054\u7CFB\u4EBA',
                    '\u8054\u7CFB\u65B9\u5F0F',
                    '\u64CD\u4F5C'
                ],
                content: function () {
                    var id = $.query.get('id');
                    var page = $.query.get('page');
                    var form = {
                        id: id || 'all',
                        page: page || 0,
                        parkname: ''
                    };
                    var datalist = null;
                    $.ajax({
                        url: '/api/organize/park/list',
                        dataType: 'json',
                        async: false,
                        data: form,
                        type: 'GET',
                        success: function (data) {
                            console.log(JSON.stringify(data));
                            if (data.success) {
                                datalist = data.content;
                            } else {
                                alert(data.errMessage);
                            }
                        },
                        error: function (err) {
                            alert(err.msg);
                        }
                    });
                    return datalist;
                }(),
                style: [
                    '5%',
                    '20%',
                    'auto',
                    '120px',
                    '120px',
                    '100px'
                ],
                type: 'PARK',
                overfull: true,
                overfull_btn: true
            }
        },
        methods: {
            getParkList: function () {
                var that = this;
                var form = {
                    parkname: $('.select-parkname').val() || '',
                    id: $('#select_park').val() || $.query.get('id')
                };
                this.tableList.content = this.getData(form);
            },
            getData: function (form) {
                var datalist = null;
                $.ajax({
                    url: '/api/organize/park/list',
                    dataType: 'json',
                    async: false,
                    data: form,
                    type: 'GET',
                    success: function (data) {
                        if (data.success) {
                            console.log(data.content);
                            datalist = data.content;
                        } else {
                            alert(data.errMessage);
                        }
                    },
                    error: function (err) {
                        alert(err.msg);
                    }
                });
                return datalist;
            }
        },
        events: {
            'send-page': function (page) {
                this.tableList.content.page = page;
                var that = this;
                var form = {
                    parkname: $('.select-parkname').val() || '',
                    id: $('#select_park').val() == 0 ? $.query.get('id') || 'all' : $('#select_park').val(),
                    page: page - 1
                };
                this.tableList.content = this.getData(form);
            }
        }
    });
});
define('', [
    'lib_cmd/vue-cmd',
    '/js_cmd/components/paging',
    '/js_cmd/components/tables/com_tables',
    '/js_cmd/components/select',
    '/js_cmd/components/admin_select'
], function (require, exports, module) {
    var Vue = require('lib_cmd/vue-cmd');
    require('/js_cmd/components/paging');
    require('/js_cmd/components/tables/com_tables');
    var select = require('/js_cmd/components/select');
    require('/js_cmd/components/admin_select');
    new Vue({
        el: '#publicity',
        data: {
            dataList: {
                title: [
                    '\u4F01\u4E1A\u540D\u79F0',
                    '\u5E74\u62A5\u72B6\u6001',
                    '\u64CD\u4F5C\u5458',
                    '\u5907\u6CE8'
                ],
                content: function () {
                    var dataList = null;
                    $.ajax({
                        url: '/api/publicity/list',
                        dataType: 'json',
                        async: false,
                        type: 'GET',
                        success: function (data) {
                            console.log(data);
                            if (data.success) {
                                dataList = data.content;
                            } else {
                                console.log(data.errMessage);
                            }
                        },
                        error: function (err) {
                        }
                    });
                    return dataList;
                }(),
                style: [
                    '25%',
                    '100px',
                    '15%',
                    'auto'
                ],
                details: [
                    {
                        _id: '1',
                        msg: '\u8BE5\u516C\u53F8\u7684\u9500\u552E\u53CA\u4F9B\u5E94\u5546'
                    },
                    {
                        _id: '2',
                        msg: '\u8BE5\u516C\u53F8\u7684\u9500\u552E\u53CA\u4F9B\u5E94\u5546'
                    }
                ],
                overfull: false,
                selectsubset: []
            },
            companySelect: function () {
                var id = $.query.get('id');
                var select = null;
                $.ajax({
                    url: '/company/select?id=' + id,
                    dataType: 'json',
                    async: false,
                    type: 'GET',
                    success: function (data) {
                        if (data.dataSelect.content != null) {
                            select = data.dataSelect.content.content;
                        }
                    },
                    error: function (err) {
                    }
                });
                console.log(select, 111);
                return select;
            }()
        },
        methods: {
            getContent: function (page) {
                var that = this;
                var form = {
                    'page': page || 0,
                    'size': 15,
                    'type': $('#selectType').val(),
                    'market': $('#select_market').val(),
                    'company': $('input[name=company]').val(),
                    'park': $('#select_park').val(),
                    'from': $('input[name=from]').val(),
                    'to': $('input[name=to]').val()
                };
                $.get('/api/publicity/list', form).then(function (data) {
                    console.log(JSON.stringify(data.content));
                    that.dataList.content = data.content;
                });
            },
            addPublicity: function () {
                var form = {
                    publicity: $('.val-publicity').val(),
                    notes: $('.notes-publicity').val(),
                    company: $('#publicity-select').val()
                };
                $.post('/add/publicity', form).then(function (data) {
                    if (data.success) {
                        alert('\u6DFB\u52A0\u6210\u529F');
                    } else {
                        alert('\u6DFB\u52A0\u5931\u8D25');
                    }
                });
            }
        },
        events: {
            'send-page': function (page) {
                this.page = page - 1;
                var that = this;
                this.getContent();
            },
            'send-select-admin': function (id) {
                var that = this;
            }
        }
    });
});
define('', [
    'lib_cmd/vue-cmd',
    '/js_cmd/components/paging',
    '/js_cmd/components/tables/com_tables',
    '/js_cmd/components/select'
], function (require, exports, module) {
    var Vue = require('lib_cmd/vue-cmd');
    require('/js_cmd/components/paging');
    require('/js_cmd/components/tables/com_tables');
    var select = require('/js_cmd/components/select');
    new Vue({
        el: '#suggestion',
        data: {
            dataList: {
                title: [
                    '\u4F01\u4E1A\u540D\u79F0',
                    '\u5EFA\u8BAE\u72B6\u6001',
                    '\u5EFA\u8BAE\u5185\u5BB9',
                    '\u68C0\u67E5\u5458',
                    '\u68C0\u67E5\u65E5\u671F',
                    '\u5907\u6CE8'
                ],
                content: function () {
                    var dataList = null;
                    $.ajax({
                        url: '/api/suggestion/list',
                        dataType: 'json',
                        async: false,
                        type: 'GET',
                        success: function (data) {
                            if (data.success) {
                                data.content.content.forEach(function (item) {
                                    item.readFlag += '';
                                    if (item.readDate == null) {
                                        item.readDate = 'null';
                                    }
                                });
                                dataList = data.content;
                            } else {
                                console.log(data.errMessage);
                            }
                        },
                        error: function (err) {
                        }
                    });
                    if (dataList != null) {
                        dataList.content.forEach(function (item) {
                            if (item.target == null) {
                                item.target += '';
                            }
                        });
                    }
                    return dataList;
                }(),
                style: [
                    '25%',
                    '100px',
                    'auto',
                    '100px',
                    '15%',
                    '10%'
                ],
                details: [
                    {
                        _id: '1',
                        msg: '\u8BE5\u516C\u53F8\u7684\u9500\u552E\u53CA\u4F9B\u5E94\u5546'
                    },
                    {
                        _id: '2',
                        msg: '\u8BE5\u516C\u53F8\u7684\u9500\u552E\u53CA\u4F9B\u5E94\u5546'
                    }
                ],
                overfull: false,
                selectsubset: []
            }
        },
        methods: {
            getContent: function (page) {
                var that = this;
                var form = {
                    'page': page || 0,
                    'size': 15,
                    'type': $('#selectType').val(),
                    'market': $('#select_market').val(),
                    'company': $('input[name=company]').val(),
                    'park': $('#select_park').val(),
                    'from': $('input[name=from]').val(),
                    'to': $('input[name=to]').val()
                };
                $.get('/api/suggestion/list', form).then(function (data) {
                    data.content.content.forEach(function (item) {
                        for (var name in item) {
                            item[name] += '';
                        }
                    });
                    that.dataList.content = data.content;
                });
            }
        },
        events: {
            'send-page': function (page) {
                this.page = page - 1;
                var that = this;
                this.getContent(this.page);
            }
        }
    });
});
define('', [
    '/lib_cmd/vue-cmd',
    '/js_cmd/components/radio'
], function (require, exports, module) {
    var Vue = require('/lib_cmd/vue-cmd');
    require('/js_cmd/components/radio');
    new Vue({
        el: '#app',
        data: {
            radio_val: '',
            checkboxDate: function () {
                var dataCheck = null;
                var that = this;
                $.ajax({
                    url: '/user/add/list',
                    dataType: 'json',
                    async: false,
                    data: { 'type': this.radio_val || JSON.parse($('#user_role').val()).type },
                    type: 'POST',
                    success: function (data) {
                        dataCheck = data.content;
                    },
                    error: function (err) {
                        alert(err.msg);
                    }
                });
                return dataCheck;
            }()
        },
        methods: {},
        events: {
            'send-radio': function (msg) {
                var that = this;
                that.radio_val = msg;
                $.post('/user/add/list', { type: this.radio_val }).then(function (data) {
                    that.checkboxDate = data.content;
                });
            },
            'send-code': function (id) {
                var form = {
                    name: $('.per_name').val(),
                    permissionIds: id,
                    type: this.radio_val || JSON.parse($('#user_role').val()).type,
                    id: $.query.get('id') || '',
                    belongId: $.query.get('belongId')
                };
                var type = $.query.get('type') || '';
                if (type == 'modify') {
                    console.log(form);
                    $.post('/api/user/role/modify', form).then(function (data) {
                        console.log(data);
                        if (data.success) {
                            alert('\u4FEE\u6539\u6210\u529F');
                            window.location.href = '/user/role/list';
                        } else {
                            alert(data.errMessage);
                        }
                    });
                } else {
                    $.post('/user/add/role', form).then(function (data) {
                        console.log(data);
                        if (data.success) {
                            alert('\u6DFB\u52A0\u6210\u529F');
                            window.location.href = '/user/role/list';
                        } else {
                            alert(data.errMessage);
                        }
                    });
                }
            }
        }
    });
});
define('', [
    '/lib_cmd/vue-cmd',
    '/js_cmd/components/user_radio'
], function (require, exports, module) {
    var Vue = require('/lib_cmd/vue-cmd');
    require('/js_cmd/components/user_radio');
    new Vue({
        el: '#user-admin-add',
        data: {
            form: {
                type: '',
                _id: ''
            },
            radio_val: '',
            checkboxDate: function () {
                var dataCheck = null;
                var that = this;
                $.ajax({
                    url: '/user/add/list',
                    dataType: 'json',
                    async: false,
                    data: { 'type': JSON.parse($('#user_role').val()).type },
                    type: 'POST',
                    success: function (data) {
                        dataCheck = data.content;
                    },
                    error: function (err) {
                        alert(err.msg);
                    }
                });
                return dataCheck;
            }(),
            roleSelect: function () {
                return JSON.parse($('#role_select').val());
            }()
        },
        methods: {
            subForm: function (event) {
                var form = {
                    type: this.form.type || JSON.parse($('#user_role').val()).type,
                    belongId: this.form._id || '',
                    username: $('.username').val(),
                    roleId: $('.val-user-id').val(),
                    mail: $('.email').val(),
                    password: $('.password ').val(),
                    displayName: $('.displayName').val(),
                    phone: $('.phone').val(),
                    roleName: $('.val-user-id').find('option:selected').text()
                };
                var checkEmpty = Common.checkEmpty($('#app').find('input'));
                var checkEmail = Common.checkEmail($('.email'));
                if (checkEmpty.state == 'false') {
                    alert(checkEmpty.message);
                    return false;
                }
                if (checkEmail.state == 'false') {
                    alert(checkEmail.message);
                    return false;
                }
                console.log(form);
                $.post('/user/admin/add', form).then(function (data) {
                    if (data.success == false || data.state == false) {
                        alert(data.msg);
                    } else {
                        window.location.href = '/user/edit/list';
                    }
                });
            },
            getSelect: function () {
            }
        },
        events: {
            'send-radio': function (msg) {
                var that = this;
                this.form.type = msg;
                $.post('/api/admin/role/list', { type: this.form.type }).then(function (data) {
                    if (data.success) {
                        that.roleSelect = data.content;
                    } else {
                        alert(data.errMessage);
                    }
                });
            },
            'send-select': function (id) {
                this.form._id = id;
            }
        }
    });
});
define('', [
    '/lib_cmd/vue-cmd',
    '/js_cmd/components/paging',
    '/js_cmd/components/user_radio'
], function (require, exports, module) {
    var Vue = require('/lib_cmd/vue-cmd');
    require('/js_cmd/components/paging');
    require('/js_cmd/components/user_radio');
    new Vue({
        el: '#user-edit-list',
        data: {
            put_id: '',
            listData: function () {
                var list = [];
                $.ajax({
                    url: '/api/user/edit/list',
                    dataType: 'json',
                    async: false,
                    type: 'GET',
                    success: function (data) {
                        console.log(JSON.stringify(data));
                        if (data.success) {
                            list = data.content;
                        } else {
                            alert(data.errMessage);
                        }
                    }
                });
                return list;
            }(),
            id: '',
            roleSelect: function () {
                return JSON.parse($('#role_select').val());
            }()
        },
        methods: {
            deleteUser: function () {
                var userArr = [];
                $('.user-checked').find('input').each(function (index, val) {
                    if ($(val).prop('checked')) {
                        userArr.push($(val).val());
                    }
                });
                $.ajax({
                    url: '/delete/user',
                    dataType: 'json',
                    async: false,
                    data: { user: userArr },
                    type: 'POST',
                    success: function (data) {
                        if (data.success) {
                            alert('\u5220\u9664\u6210\u529F');
                            window.location.reload();
                        } else {
                            alert('\u5220\u9664\u5931\u8D25');
                        }
                    },
                    error: function (err) {
                        alert(err.msg);
                    }
                });
            },
            getMsg: function (event) {
                var tr = $(event.target).closest('tr');
                var id = $(event.target).attr('data-id');
                var belongId = $(event.target).attr('data-belongId');
                var type = $(event.target).attr('data-type');
                $('.model-displayName').val(tr.find('.displayName').html());
                $('.model-username').val(tr.find('.username').html());
                $('.model-phone').val(tr.find('.phone').html());
                $('.model-mail').val(tr.find('.mail').html());
                $('.model-id').val(id);
                $('.model-belongId').val(belongId);
                $('.model-type').val(type);
            },
            putUser: function () {
                var that = this;
                $('.model-put-btn').on('click', function () {
                    var from = {
                        displayName: $('.model-displayName').val(),
                        username: $('.model-username').val(),
                        phone: $('.model-phone').val(),
                        mail: $('.model-mail').val(),
                        password: $('.model-password').val(),
                        id: $('.model-id').val(),
                        belongId: $('.model-belongId').val(),
                        type: $('.model-type').val(),
                        roleId: $('#select-role-id').val(),
                        roleName: $('#select-role-id').find('option:selected').text()
                    };
                    $.ajax({
                        url: '/put/user',
                        dataType: 'json',
                        async: true,
                        data: from,
                        type: 'POST',
                        success: function (data) {
                            if (data.success) {
                                alert('\u4FEE\u6539\u6210\u529F');
                                window.location.reload();
                            } else {
                                alert(data.errMessage);
                            }
                        },
                        error: function (err) {
                            console.log(err);
                        }
                    });
                });
            }(),
            restPassword: function (event) {
                var id = $(event.target).attr('data-id');
                console.log(id);
                $.post('/reset/user/password', { id: id }).then(function (data) {
                    if (data.success) {
                        alert('\u91CD\u7F6E\u6210\u529F\uFF0C\u5BC6\u7801\u5C06\u4F1A\u53D1\u5165\u586B\u5199\u7684\u90AE\u7BB1\u4E2D');
                    } else {
                        alert(data.errMessage);
                    }
                });
            }
        },
        events: {
            'send-radio': function (msg) {
                var that = this;
            },
            'send-select': function (id) {
                var that = this;
                this.id = id;
                $.get('/api/user/edit/list?page=' + this.page + '&id=' + this.id).then(function (data) {
                    that.listData = data.content;
                });
            },
            'send-page': function (page) {
                this.page = page - 1;
                var that = this;
                $.get('/api/user/edit/list?page=' + this.listData.page + '&id=' + this.id).then(function (data) {
                    that.listData = data.content;
                });
            }
        }
    });
});
define('', [
    '/lib_cmd/vue-cmd',
    '/js_cmd/components/paging',
    '/js_cmd/components/radio',
    '/js_cmd/components/select'
], function (require, exports, module) {
    var Vue = require('/lib_cmd/vue-cmd');
    require('/js_cmd/components/paging');
    require('/js_cmd/components/radio');
    require('/js_cmd/components/select');
    new Vue({
        el: '#user-role-list',
        data: {
            put_id: '',
            type: function () {
                return JSON.parse($('#user_role').val()).type;
            }(),
            listData: function () {
                var list = [];
                $.ajax({
                    url: '/api/user/role/list',
                    dataType: 'json',
                    async: false,
                    data: { belongId: JSON.parse($('#user_role').val()).belongId },
                    type: 'POST',
                    success: function (data) {
                        console.log(JSON.stringify(data));
                        if (data.success) {
                            console.log(data.content);
                            list = data.content;
                        } else {
                            alert(data.errMessage);
                        }
                    }
                });
                return list;
            }(),
            id: '',
            page: ''
        },
        methods: {
            deleteUser: function () {
                var idArr = [];
                $('.user-checked').find('input').each(function (index, val) {
                    if ($(val).prop('checked')) {
                        idArr.push($(val).val());
                    }
                });
                console.log(idArr);
                $.ajax({
                    url: '/app/role/delete',
                    dataType: 'json',
                    async: false,
                    data: { id: idArr },
                    type: 'POST',
                    success: function (data) {
                        if (data.success) {
                            alert('\u5220\u9664\u6210\u529F');
                            window.location.reload();
                        } else {
                            alert(data.errMessage);
                        }
                    },
                    error: function (err) {
                        alert(err.msg);
                    }
                });
            },
            getMsg: function (event) {
            },
            putUser: function () {
            }
        },
        events: {
            'send-radio': function (msg) {
                var that = this;
                this.type = msg;
                $.ajax({
                    url: '/api/user/role/list',
                    dataType: 'json',
                    async: false,
                    data: { type: this.type },
                    type: 'POST',
                    success: function (data) {
                        if (data.success) {
                            that.listData = data.content;
                        } else {
                            alert(data.errMessage);
                        }
                    }
                });
            },
            'send-select': function (id) {
                var that = this;
                this.id = id;
            },
            'send-page': function (page) {
                this.page = page - 1;
                var that = this;
            }
        }
    });
});