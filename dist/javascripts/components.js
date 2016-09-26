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
define('', [], function (require, exports, module) {
});
define('', ['lib_cmd/vue-cmd'], function (require, exports, module) {
    var Vue = require('lib_cmd/vue-cmd');
    Vue.component('table-btns', {
        props: ['btnlist'],
        template: '<ul class="nav nav-tabs nav-justified " id="v-nav-tab">                                        <li v-for="item in btnlist" v-bind:class="{ \'active\':item.active } ">                                            <a :href="item.href"> {{item.title}}</a>                                        </li>                           </ul>',
        methods: {}
    });
    seajs.use('js_cmd/group/marketList-cmd');
});
define('', ['lib_cmd/vue-cmd'], function (require, exports, module) {
    var Vue = require('lib_cmd/vue-cmd');
    Vue.component('table-content-d', {
        props: {
            mydata: [],
            datalist: []
        },
        data: function () {
            return {
                href: '',
                type: ''
            };
        },
        template: '<div class="tab-pane">                                <div class="row v-table">                                    <div class="col-md-12">                                        <div class="block">                                            <table class="table  table-hover table-borderless">                                                  <thead>                                                  <tr class="v-table-tr">                                                        <th class="text-center " v-for="item in datalist.title" v-bind:style="{ width: datalist.style[$index] }">{{item}}</th>                                                  </tr>                                                  </thead>                                                  <tbody class="v-tabs-check">                                                     <tr v-for="item in datalist.content.content">                                                        <td v-if="item.invoiceNo" class="text-center">{{ item.invoiceNo }}</td>                                                        <td v-if="item.invoiceDate" class="text-center">{{ item.invoiceDate }}</td>                                                        <td v-if="item.invoiceType" class="text-center">{{ item.invoiceType }}</td>                                                        <td v-if="item.orderNo" class="text-center">{{ item.orderNo }}</td>                                                        <td v-if="item.orderDate"  class="text-center">{{ item.orderDate}}</td>                                                        <td v-if="item.customer"  class="text-center">{{ item.customer }}</td>                                                        <td v-if="item.taxNo"  class="text-center">{{ item.taxNo }}</td>                                                        <td v-if="item.amount"  class="text-center">{{ item.amount }}</td>                                                        <td v-if="item.receiver"  class="text-center">{{ item.receiver }}</td>                                                        <td v-if="datalist.product&&item.provider"  class="text-center"><a class="btn-link product_name" @click="getModalMsg($event)"  data-toggle="modal" :data-providerId="item.providerId"   data-target="#modal-details"> {{ item.provider }} <div class="hover_table"> \u67E5\u770B\u8D44\u8D28</div>                                                         </a></td>                                                        <td v-if="!datalist.product"   class="text-center">{{ item.provider }}</td>                                                        <td v-if="item.product"  class="text-center"><a class="btn-link product_name" @click="getModalMsg($event)"  data-toggle="modal" :data-productId="item.productId"   data-target="#modal-details">{{ item.product }} <div class="hover_table"> \u67E5\u770B\u8D44\u8D28</div>                                                         </a></td>                                                        <td v-if="!datalist.product"  class="text-center">{{ item.product }}</td>                                                        <td v-if="item.operator"  class="text-center">{{ item.operator }}</td>                                                        <td v-if="item.invoiceFile"  class="text-center"><a  @click="showImg($event)"  data-toggle="modal"   data-target="#modal-fromphoto" :data-src="item.invoiceFile"  >\u5355\u636E</a></td>                                                        <td v-if="item.purchaseBill"  class="text-center"><a  @click="showImg($event)"  data-toggle="modal"   data-target="#modal-fromphoto" :data-src="item.purchaseBill"  >\u5355\u636E</a> </td>                                                        <td v-if="item.salesRep"  class="text-center">{{ item.salesRep }}</td>                                                        <td v-if="item.notes"  class="text-center">{{ item.notes }}</td>                                                    </tr>                                                  </tbody>                                              </table>                                        </div>                                    </div>                                </div>                  </div>',
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
            getModalMsg: function (event) {
                var _id = $.query.get('id');
                var view = $.query.get('view');
                var _name = $(event.target).text().trim().split(/\s+/g)[0];
                console.log(_name, $(event.target).text().split(/\s+/g));
                var that = this;
                if ($(event.target).attr('data-productId')) {
                    view = 'product';
                    this.href = '/api/app/company/by/product';
                    this.type = 'product';
                } else if ($(event.target).attr('data-providerId')) {
                    this.href = '/api/app/company/by/provider';
                    view = 'provider';
                    this.type = 'provider';
                }
                $.get('/organize/details?view=' + view + '&id=' + _id + '&name=' + _name + '&api=true').then(function (data) {
                    data.data.content.name = _name;
                    data.data.href = that.href;
                    data.data.type = that.type;
                    that.$dispatch('send-modal-msg', data);
                });
            },
            showImg: function (event) {
                var src = $(event.target).attr('data-src');
                var img = src.split(',')[0];
                $('#v-com-img').attr('src', 'http://' + img);
            }
        }
    });
});
define('', [
    'lib_cmd/vue-cmd',
    '/js_cmd/components/tables/com_tables'
], function (require, exports, module) {
    var Vue = require('lib_cmd/vue-cmd');
    require('/js_cmd/components/tables/com_tables');
    Vue.component('table-content-s', {
        props: {
            mydata: [],
            datalist: []
        },
        data: function () {
            return {
                href: '',
                type: function () {
                    return $.query.get('view');
                }()
            };
        },
        template: '<div class="tab-pane">                                <div class="row v-table">                                    <div class="col-md-12">                                         <div class="block">                                             <table class="table  table-hover table-borderless">                                                  <thead>                                                  <tr class="v-table-tr">                                                        <th class="text-center " v-for="item in datalist.title" v-bind:style="{ width: datalist.style[$index] }">{{item}}</th>                                                  </tr>                                                  </thead>                                                  <tbody class="v-tabs-check">                                                     <tr v-for="item in datalist.content.content">                                                        <td v-if="datalist.product&&!!item.producerId"  class="text-center"><a class="btn-link product_name" @click="getModalMsg($event)" :data-producerId="item.producerId"  data-toggle="modal"   data-target="#modal-details"> {{ item.name }} <div class="hover_table"> \u67E5\u770B\u8D44\u8D28</div>                                                         </a></td>                                                        <td v-if="type==\'provider\'&&datalist.product" class="text-center"><a class="btn-link product_name" @click="getModalMsg($event)" :data-producerId="item.producerId"  data-toggle="modal"   data-target="#modal-details"> {{ item.name }} <div class="hover_table"> \u67E5\u770B\u8D44\u8D28</div>                                                         </a></td>                                                        <td v-if="type==\'customer\'&&datalist.product" class="text-center">{{ item.name }}</td>                                                        <td v-if="type==\'producer\'&&datalist.product" class="text-center">{{ item.name }}</td>                                                        <td v-if="!datalist.product" class="text-center">{{ item.name }}</td>                                                        <td v-if="item.address" class="text-center">{{ item.address }}</td>                                                        <td v-if="item.specification" class="text-center">{{ item.specification }}</td>                                                        <td v-if="item.registerNo" class="text-center">{{ item.registerNo }}</td>                                                        <td v-if="item.phone" class="text-center">{{ item.phone }}</td>                                                        <td v-if="item.certificate" class="text-center">{{ item.certificate }}</td>                                                        <td v-if="item.businesses" class="text-center"><span class="bus-msg">{{ item.businesses }} </span><a href="javascript:;"" @click="showMsg($event) " class="btn-link">\u8BE6\u60C5</a></td>                                                        <td v-if="item.registerNo" class="text-center"><span class="bus-msg">{{ item.registerNo }}</td>                                                        <td v-if="item.expireDate" class="text-center">{{ item.expireDate }}</td>                                                    </tr>                                                  </tbody>                                              </table>                                        </div>                                    </div>                  </div></div>',
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
            getModalMsg: function (event) {
                var _id = $.query.get('id');
                var view = $.query.get('view');
                var _name = $(event.target).text().split(/\s+/g)[1];
                var that = this;
                console.log($(event.target).attr('data-producerId'));
                if ($(event.target).attr('data-producerId')) {
                    view = 'product';
                    this.type = 'product';
                    this.href = '/api/app/company/by/product';
                } else if ($(event.target).attr('data-customerId')) {
                    this.href = '/api/app/company/by/provider';
                    view = 'provider';
                    this.type = 'provider';
                } else {
                    this.href = '/api/app/company/by/provider';
                    view = 'provider';
                    this.type = 'provider';
                }
                $.get('/organize/details?view=' + view + '&id=' + _id + '&name=' + _name + '&api=true').then(function (data) {
                    data.data.content.name = _name;
                    data.data.href = that.href;
                    data.data.type = that.type;
                    that.$dispatch('send-modal-msg', data);
                });
            }
        }
    });
});
define('', ['lib_cmd/vue-cmd'], function (require, exports, module) {
    var Vue = require('lib_cmd/vue-cmd');
    Vue.component('handle-table-list', {
        props: ['datalist'],
        template: '<table class="table  table-hover table-borderless">                      <thead>                      <tr class="v-table-tr">                            <th class="text-center " v-for="item in datalist.title" v-bind:style="{ width: datalist.style[$index] }">{{item}}</th>                      </tr>                      </thead>                      <tbody class="v-tabs-check">                        <tr v-for="item in datalist.content" v-cloak>                            <td  class="text-center">{{ item.name }}</td>                            <td  class="text-center">{{ item.address }}</td>                            <td  class="text-center">{{ item.username }}</td>                            <td  class="text-center">{{ item.mail }}</td>                            <td  class="text-center">{{ item.contact }}</td>                            <td  class="text-center">{{ item.phone }}</td>                            <td v-if="datalist.btns" class="text-center"><div class="bei-zhu"><a  :data-admin="item.admin"   :data-id="item.id" :data-parentId="item.parentId" :data-phone="item.phone" data-type="modify" :data-contact="item.contact" :data-mail="item.mail" :data-username="item.username" :data-name="item.name" :data-address="item.address" class="btn  btn-primary " data-toggle="modal" data-target="#modal-addParty" @click="handleData($event)" > \u4FEE\u6539</a></div><div class="bei-zhu"><a  @click="resetPassword($event)"  :data-id="item.id" :data-admin="item.admin" class="btn  btn-primary "> \u91CD\u7F6E</a></div></td>                            <td v-if="datalist.overflow" class="text-center">{{ datalist.details[$index].msg}}<a href="javascript:;" class="btn-link">\u8BE6\u60C5</a></td>                            <td v-if="datalist.overflow_btn" class="text-center"><a :href="datalist.href+item.id"  class="btn  btn-primary "> \u8BE6\u60C5</a></td>                        </tr>                      </tbody>                  </table>',
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
            },
            resetPassword: function (event) {
                var id = $(event.target).attr('data-admin');
                $.post('/reset/user/password', { id: id }).then(function (data) {
                    if (data.success) {
                        alert('\u5BC6\u7801\u91CD\u7F6E\u6210\u529F\uFF0C\u65B0\u5BC6\u7801\u4F1A\u53D1\u9001\u8BE5\u8D26\u6237\u7684\u90AE\u7BB1');
                    } else {
                        alert(data.msg);
                    }
                    console.log(data);
                });
            }
        }
    });
});
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
define('', [
    'lib_cmd/vue-cmd',
    '/js_cmd/components/tables/check_tables'
], function (require, exports, module) {
    var Vue = require('lib_cmd/vue-cmd');
    require('/js_cmd/components/tables/check_tables');
    new Vue({
        'el': '#check-table',
        data: {
            data: {
                href: '/organize/company/',
                title: [
                    '',
                    '\u4F01\u4E1A\u540D\u79F0',
                    '\u68C0\u67E5\u72B6\u6001',
                    '\u68C0\u67E5\u5458',
                    '\u68C0\u67E5\u65E5\u671F',
                    '\u5907\u6CE8'
                ],
                content: [
                    [
                        '\u4E0A\u6D77\u533B\u5FB7\u533B\u7597\u8BBE\u5907\u6709\u9650\u516C\u53F8',
                        'true',
                        '\u738B\u5148\u751F',
                        '2016-06-29',
                        'xxxxxx'
                    ],
                    [
                        '\u4E0A\u6D77\u533B\u5FB7\u533B\u7597\u8BBE\u5907\u6709\u9650\u516C\u53F8',
                        'true',
                        '\u6731\u738B\u6770',
                        '2016-06-29',
                        'xxxxxx'
                    ]
                ],
                style: [
                    '5%',
                    'auto',
                    '100px',
                    '100px',
                    '20%'
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
                ]
            }
        }
    });
});
define('', ['lib_cmd/vue-cmd'], function (require, exports, module) {
    var Vue = require('lib_cmd/vue-cmd');
    Vue.component('com-table-list', {
        props: ['datalist'],
        computed: {
            'newData': function () {
                if (this.datalist.content != null) {
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
                } else {
                    return false;
                }
            }
        },
        template: '<table class="table  table-hover table-borderless">                      <thead>                      <tr class="v-table-tr">                            <th class="text-center " v-for="item in datalist.title" v-bind:style="{ width: datalist.style[$index] }">{{item}}</th>                      </tr>                      </thead>                      <tbody class="v-tabs-check">                         <tr v-if="newData" v-for="item in newData">                            <td v-if="item.target" class="text-center">{{ item.target  }}</td>                            <td v-if="item.company" class="text-center">{{ item.company==null?\'null\':item.company   }}</td>                            <td v-if="item.publicity" class="text-center">{{ item.publicity }}</td>                            <td v-if="item.status" class="text-center">{{item.status}}</td>                            <td v-if="item.readFlag" class="text-center">{{ item.readFlag==\'false\'?\'\u672A\u8BFB\':\'\u5DF2\u8BFB\' }}</td>                            <td v-if="item.suggestion" class="text-center">{{ item.suggestion }}</td>                            <td v-if="item.user" class="text-center">{{ item.user }}</td>                            <td v-if="item.inspectDate " class="text-center">{{ item.inspectDate }}</td>                            <td v-if="item.readDate" class="text-center">{{ item.readDate===\'null\'?\'null\':item.readDate}}</td>                            <td v-if="item.notes " class="text-center">{{ item.notes }}</td>                        </tr>                      </tbody>                  </table>',
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
define('', [
    'lib_cmd/vue-cmd',
    '/js_cmd/components/tables/com_tables'
], function (require, exports, module) {
    var Vue = require('lib_cmd/vue-cmd');
    require('/js_cmd/components/tables/com_tables');
    new Vue({
        'el': '#c-table-checkbox',
        data: {
            data: {
                title: [
                    '\u4F01\u4E1A\u540D\u79F0',
                    '\u68C0\u67E5\u72B6\u6001',
                    '\u68C0\u67E5\u5458',
                    '\u68C0\u67E5\u65E5\u671F',
                    '\u5907\u6CE8'
                ],
                content: [
                    [
                        '\u4E0A\u6D77\u533B\u5FB7\u533B\u7597\u8BBE\u5907\u6709\u9650\u516C\u53F8',
                        'true',
                        '\u738B\u5148\u751F',
                        '2016-06-29'
                    ],
                    [
                        '\u4E0A\u6D77\u533B\u5FB7\u533B\u7597\u8BBE\u5907\u6709\u9650\u516C\u53F8',
                        'true',
                        '\u6731\u738B\u6770',
                        '2016-06-29'
                    ]
                ],
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
                overfull: false
            }
        }
    });
});
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
define('', [], function (require, exports, module) {
});
define('', ['lib_cmd/vue-cmd'], function (require, exports, module) {
    var Vue = require('lib_cmd/vue-cmd');
    Vue.component('com-table-list', {
        props: ['datalist'],
        computed: {
            'newData': function () {
                if (this.datalist.content != null) {
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
                    return this.datalist.content.content;
                } else {
                    return false;
                }
            }
        },
        template: '<table class="table  table-hover table-borderless">                      <thead>                      <tr class="v-table-tr">                            <th class="text-center " v-for="item in datalist.title" v-bind:style="{ width: datalist.style[$index] }">{{item}}</th>                      </tr>                      </thead>                      <tbody class="v-tabs-check">                         <tr v-if="newData" v-for="item in newData">                            <td  class="text-center">{{ item.target }}</td>                            <td  class="text-center">{{ item.status }}</td>                            <td  class="text-center">{{ item.interviewDate }}</td>                            <td  class="text-center">{{ item.period }}</td>                            <td  class="text-center">{{ item.agreeDate }}</td>                            <td  class="text-center">{{ item.user }}</td>                            <td  class="text-center">{{ item.notes }}</td>                        </tr>                      </tbody>                  </table>',
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
define('', [
    'lib_cmd/vue-cmd',
    '/js_cmd/components/message/msg-content',
    '/js_cmd/components/message/msg-list'
], function (require, exports, module) {
    var Vue = require('lib_cmd/vue-cmd');
    require('/js_cmd/components/message/msg-content');
    require('/js_cmd/components/message/msg-list');
    var message = new Vue({
        'el': '#v-msg',
        data: function () {
            return {
                msglist: function () {
                    var msgList = null;
                    var top = [
                        '\u884C\u653F\u5EFA\u8BAE',
                        '\u884C\u653F\u7EA6\u8C08',
                        '\u7F51\u7EDC\u68C0\u67E5',
                        '\u9884\u7EA6'
                    ];
                    $.ajax({
                        url: '/user/messages/list',
                        dataType: 'json',
                        async: false,
                        type: 'GET',
                        success: function (data) {
                            console.log(data);
                            if (data.success) {
                                msgList = data;
                            } else {
                                alert(data.errMessage);
                            }
                        },
                        error: function (err) {
                            alert(err);
                        }
                    });
                    msgList.content.content.forEach(function (item) {
                        switch (item.type) {
                        case 'INTERVIEW':
                            item.title = top[1];
                            item.class = 'interview-msg';
                            break;
                        case 'INSPECT':
                            item.title = top[2];
                            item.class = 'inspect-msg';
                            break;
                        case 'APPOINTMENT':
                            item.title = top[3];
                            item.class = 'appointment-msg';
                            break;
                        case 'SUGGESTION':
                            item.title = top[0];
                            item.class = 'suggestion-msg';
                            break;
                        }
                        item.message = JSON.parse(item.message);
                    });
                    return msgList;
                }(),
                message: {
                    title: '',
                    content: '',
                    id: '',
                    date: '',
                    company: '',
                    type: ''
                }
            };
        },
        template: '          <div class="modal-body o-pd-t" id="v-msg">\t\t\t\t\t<v-msg-list :datalist="msglist" ></v-msg-list>\t\t          <v-msg-content :datanow="message"></v-msg-content>              </div>         ',
        events: {
            'send-msg': function (msg) {
                this.message = msg;
            }
        }
    });
});
define('', ['lib_cmd/vue-cmd'], function (require, exports, module) {
    var Vue = require('lib_cmd/vue-cmd');
    Vue.component('v-msg-content', {
        props: ['datanow'],
        data: function () {
            return {};
        },
        template: ' <div v-if="datanow.show" class="row v-table-msg-c">                      <div class="col-md-12 col-lg-12 clearfix">                           <h5 class="text-left">{{datanow.title}}</h5>                          <div class="col-md-8 col-md-offset-1 v-msg-box">                               <p class="v-msg-content">                                  {{datanow.content}}                               </p>                          </div>                          <div class="col-md-12  ">                               <p class="v-msg-f pull-right col-md-2">                                   {{datanow.company}}<br>                                   {{datanow.date}}                               </p>                          </div>                      </div>                      <div class="col-lg-12  col-md-12 v-msg-f-btn">                        <template v-if="datanow.type==\'INTERVIEW\'||datanow.type==\'SUGGESTION\'">                          <div class="col-md-2"  >                            <button type="button"  @click="Confirm($event)" :data-id="datanow.id" :data-msg-id="datanow.msg_id" :data-type="datanow.type" status="CONFIRMED"  class="btn btn-primary btn-block">\u540C\u610F</button>                          </div>                          <div class="col-md-2">                            <button type="button"  @click="Confirm($event)" :data-id="datanow.id"  :data-msg-id="datanow.msg_id"  :data-type="datanow.type" status="NEGOTIATION"  class="btn btn-primary  btn-block">\u534F\u5546</button>                          </div>                        </template>                      </div>                       <div class="col-lg-12  col-md-12 v-msg-f-btn text-center">                        <p class="confirm-msg" style="padding-top:50px;font-size:16px;"> </p>                       </div>                </div>        ',
        methods: {
            readyMsg: function (event) {
                var id = $(event.target).attr('data-id');
                var that = this;
                console.log(that.datanow.isRead);
                if (that.datanow.isRead == 'false') {
                    $.get('/api/read/message?id=' + id).then(function (data) {
                        if (data.success) {
                            $('.confirm-msg').html('\u63D0\u4EA4\u6210\u529F');
                            that.datanow.isRead = 'true';
                        } else {
                            $('.confirm-msg').html('\u63D0\u4EA4\u5931\u8D25');
                        }
                    });
                } else {
                    alert('\u5DF2\u9605\u8BFB');
                }
            },
            Confirm: function (event) {
                var type = $(event.target).attr('data-type');
                var form = {
                    status: $(event.target).attr('status'),
                    id: $(event.target).attr('data-msg-id')
                };
                if (type == 'INTERVIEW') {
                    var href = '/api/interview/confirm';
                } else if (type == 'SUGGESTION') {
                    var href = '/api/interview/confirm';
                }
                if (type) {
                    $.post(href, form).then(function (data) {
                        if (data.success) {
                            $('.confirm-msg').html('\u63D0\u4EA4\u6210\u529F');
                        } else {
                            $('.confirm-msg').html('\u63D0\u4EA4\u5931\u8D25');
                        }
                    });
                }
            }
        }
    });
});
define('', [
    'lib_cmd/vue-cmd',
    '/js_cmd/components/message/msg-paging'
], function (require, exports, module) {
    var Vue = require('lib_cmd/vue-cmd');
    require('/js_cmd/components/message/msg-paging');
    Vue.component('v-msg-list', {
        data: function () {
            return {
                type: '',
                top: [
                    '\u884C\u653F\u5EFA\u8BAE',
                    '\u884C\u653F\u7EA6\u8C08',
                    '\u7F51\u7EDC\u68C0\u67E5',
                    '\u9884\u7EA6'
                ],
                messgaeList: ''
            };
        },
        template: '<div class="row v-table-msg" >                     <div class="col-md-12">                           <div class="block">                                <table class="table table-hover">                                    <thead>                                    <tr>                                        <th class="text-center" style="width: 50px;"></th>                                        <th class="text-left" >\u5934\u6761</th>                                        <th class="text-left" style="width: 30%">\u6765\u6E90</th>                                        <th class="text-center"  style="width: 15%;">\u65E5\u671F</th>                                    </tr>                                    </thead>                                    <tbody>                                    <tr v-for="item in datalist.content.content" >                                        <td class="text-center"><span class="v-core"></span></td>                                        <td class="text-left v-cont"  :class="!item.isRead?item.class:\'\'" >[{{item.title}}] <a href="javascript:;" :data-isRead="item.isRead+\'\'"  @click="notify($event)" :data-type="item.type"  :data-msg-id="item.message.id"   :data-id="item.id"   > {{item.message.user}}</a></td>                                        <td class="text-left " ><span class="v-msg-content-n">{{item.message.suggestion||item.message.suggestion}}</span> <span class="v-msg-content-r">{{item.message.from}}</span></td>                                        <td class="text-center">                                            {{item.createDate}}                                        </td>                                    </tr>                                    </tbody>                                </table>                            <div>                            <msg-pages :pagelist="datalist.content.page||1"></msg-pages> {{aaa}}                     <div>                <div>',
        props: ['datalist'],
        methods: {
            notify: function (event) {
                $('.confirm-msg').html('');
                var msg = {
                    title: $(event.target).html(),
                    content: $(event.target).parent().next().find('.v-msg-content-n').html(),
                    date: $(event.target).parent().next().next().html(),
                    company: $(event.target).parent().next().find('.v-msg-content-r').html(),
                    id: $(event.target).attr('data-id'),
                    type: $(event.target).attr('data-type'),
                    msg_id: $(event.target).attr('data-msg-id'),
                    show: true,
                    isRead: $(event.target).attr('data-isRead')
                };
                var that = this;
                if (msg.isRead == 'false') {
                    $.get('/api/read/message?id=' + msg.id).then(function (data) {
                        if (data.success) {
                            msg.isRead = 'true';
                            $(event.target).attr('data-isRead', true).parent().attr('class', 'text-left v-cont');
                        } else {
                        }
                    });
                }
                this.$dispatch('send-msg', msg);
            }
        },
        events: {
            'send-page-msg': function (page) {
                var that = this;
                $.get('/user/messages/list', { page: page - 1 }).then(function (data) {
                    data.content.content.forEach(function (item) {
                        switch (item.type) {
                        case 'INTERVIEW':
                            item.title = that.top[1];
                            item.class = 'interview-msg';
                            break;
                        case 'INSPECT':
                            item.title = that.top[2];
                            item.class = 'inspect-msg';
                            break;
                        case 'APPOINTMENT':
                            item.title = that.top[3];
                            item.class = 'appointment-msg';
                            break;
                        case 'SUGGESTION':
                            item.title = that.top[0];
                            item.class = 'suggestion-msg';
                            break;
                        }
                        item.message = JSON.parse(item.message);
                    });
                    that.datalist = data;
                });
            }
        }
    });
});
define('', ['lib_cmd/vue-cmd'], function (require, exports, module) {
    var Vue = require('lib_cmd/vue-cmd');
    Vue.component('msg-pages', {
        props: ['pagelist'],
        data: function () {
            return { now: 1 };
        },
        template: '<div class="yema">                                <div class="yema_befor"><a href="javascript:;" class="btn btn-link"  @click="getMsgPrevious($event)" >\u4E0A\u4E00\u9875</a>  \u7B2C</div>                                <nav>                                    <ul class="pagination pagination-sm">                                        <li>                                            <a href="javascript:void(0)"><i class="fa fa-angle-double-right"></i></a>                                        </li>                                        <li v-for="item in pagelist" :class="{\'active\':($index+1)==now}" >                                            <a href="javascript:void(0)" @click="getMsgPage($event)">{{$index+1}}</a>                                        </li>                                        <li>                                            <a href="javascript:void(0)"><i class="fa fa-angle-double-right"></i></a>                                        </li>                                    </ul>                                </nav>                                <div class="yema_end"> \u9875<a href="javascript:;" class="btn btn-link" @click="getMsgNext($event)"  >\u4E0B\u4E00\u9875</a> <a href="javascript:;" @click="getMsgPage($event)"  class="btn btn-link">\u5C3E\u9875</a></div>               </div> ',
        methods: {
            getMsgPage: function (event) {
                if ($(event.target).html() == '\u5C3E\u9875') {
                    this.now = this.pagelist;
                } else {
                    this.now = $(event.target).html();
                }
                this.$dispatch('send-page-msg', this.now);
            },
            getMsgPrevious: function (event) {
                if (this.now == 1) {
                    return false;
                } else {
                    this.now--;
                    this.$dispatch('send-page-msg', this.now);
                }
            },
            getMsgNext: function () {
                if (this.now >= this.pagelist) {
                    return false;
                } else {
                    this.now++;
                    this.$dispatch('send-page-msg', this.now);
                }
            }
        }
    });
});