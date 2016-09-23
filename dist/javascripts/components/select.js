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