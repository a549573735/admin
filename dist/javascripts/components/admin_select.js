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