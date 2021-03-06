define(function (require, exports, module) {
    var Vue = require('lib_cmd/vue-cmd');

    Vue.component('v-radio-select', {
        props: ['role', 'showselect'],
        data: function () {
            return {
                k: 1, state: false, radio: '',
                selectdata: function () {
                    var that = this;
                    var select = null;
                    $.ajax({
                        url: '/market/brief',    //请求的url地址
                        dataType: "json",   //返回格式为json
                        async: false, //请求是否异步，默认为异步，这也是ajax重要特性
                        type: "GET",   //请求方式
                        success: function (data) {
                            //请求成功时处理

                            select = data.content;

                        },
                        error: function (err) {
                            //请求出错处理
                            alert(err.msg);
                        }
                    });
                    return select
                }(), selectsubset: function () {
                    var that = this;
                    var select = [];

                    var role = JSON.parse($('#user_role').val())
                       console.log(role.id) 
                    if (role.type == 'MARKET') {
                        $.ajax({
                            url: '/park/briefall/' + role.belongId,  //请求的url地址
                            dataType: "json",   //返回格式为json
                            async: false, //请求是否异步，默认为异步，这也是ajax重要特性
                            type: "GET",   //请求方式
                            success: function (data) {
                                //请求成功时处理
                                if (data.success) {

                                    select = data.content;
                                } else {
                                    alert(data.errMessage)
                                }

                            },
                            error: function (err) {
                                //请求出错处理
                                alert(err.msg);
                            }
                        });
                        console.log(select)
                    }
                     console.log(select)
                    return select
                }(),
            }
        },
        template: '<div class="form-horizontal clearfix" >\
                        <div class=" clearfix">\
                                <div class="col-md-12">\
                                    <div class="col-md-6" v-if="role.type!=\'PARK\'">\
                                        <label   class="col-md-2 v-label o-pd" for="radio-1" v-if="!showselect&&role.type==\'DISTRICT\'"  >\
                                            <input class="radio-m" id="radio-1" @click="sendRadio($event)" value="DISTRICT" name="user"   type="radio"><span></span>奉贤区局</label>\
                                        <label class="col-md-2 o-pd v-label-m" for="radio-2" >\
                                            <input class="radio-m" name="user" @click="sendRadio($event)" value="MARKET" id="radio-2" type="radio"><span></span>市场所</label>\
                                        <div class="col-md-8 o-pd-l" v-if="showselect"  >\
                                            <select class="form-control" name="val-skill" v-if="role.type==\'DISTRICT\'"  @change="selectChange($event)">\
                                                  <option value="0">请选择</option>\
                                                  <option v-for="item in selectdata" :value="item.id">{{item.name}}</option>\
                                            </select>\
                                        </div>\
                                   </div>\
                                   <div class="col-md-6">\
                                        <label class="col-md-4 o-pd v-label-s" for="radio-3" >\
                                            <input class="radio-m" name="user" @click="sendRadio($event)" value="PARK"    type="radio" id="radio-3"><span></span>园区</label>\
                                        <div class="col-md-8 o-pd-l"  v-if="showselect">\
                                            <select class="form-control" name="val-skill" @change="sendVal($event)">\
                                                     <option value="0">请选择</option>\
                                                     <option v-for="item in selectsubset" :value="item.id">{{item.name}}</option>\
                                            </select>\
                                        </div>\
                                    </div>\
                                </div>\
                            </div>\
                        </div>\
                  </div>',
        methods: {

            selectChange: function (event) {

                if ($(event.target).val() == '0') {
                    this.k = 1;
                    this.state = false;
                    this.$dispatch('send-select', '')
                } else {
                    this.state = true;
                    this.k = $(event.target).val()
                    var that = this;

                    $.ajax({
                        url: '/park/briefall/' + that.k,    //请求的url地址
                        dataType: "json",   //返回格式为json
                        async: false, //请求是否异步，默认为异步，这也是ajax重要特性
                        type: "GET",   //请求方式
                        success: function (data) {
                            //请求成功时处理
                            console.log(JSON.stringify(data.content))
                            that.selectsubset = data.content;
                        },
                        error: function (err) {
                            //请求出错处理
                            alert(err.msg);
                        }
                    });
                    console.log(this.k)

                    this.$dispatch('send-select', this.k)


                }
            },
            sendVal: function (event) {
                var data = $(event.target).val()
                if (data == '0') {
                    this.$dispatch('send-select', '')
                } else {
                    this.$dispatch('send-select', data)
                }

            },

            sendRadio: function (event) {
                this.radio = $(event.target).val()


                this.$dispatch('send-radio', this.radio)
            },
            getSelect: function () {


            },

        }
    })


    Vue.component('v-radio-content', {
        props: ['datacheckbox'],
        data: function () {
            return {k: 1, state: false ,permissionIds:function (){
            	       var data={
            	       	  name:$.query.get('name'),
            	       	

            	       }    
            	       return  data
            }() }
        },
        template: '<div class="row v-table">\
                    <div class="col-md-12 o-m-t">\
                        <div class="block">\
                            <div class="col-md-6  o-add-l">\
                                <div class="col-md-12 o-pd" >\
                                    <div class="col-md-3 o-pd  v-righ">角色名：</div>\
                                    <div class="col-md-9 o-pd ">\
                                        <input type="text"  class="form-control per_name" :value="permissionIds.name" ></div>\
                                    </div>\
                                <div class="col-md-12 o-m-t o-pd">\
                                    <div class="col-md-3 o-pd  v-righ">权限：</div>\
                                    <div class="col-md-9 o-pd v-left rolt-user-checked">\
                                        <label v-for="item in datacheckbox" class="col-md-6 o-pd css-input css-checkbox css-checkbox-primary"><input type="checkbox" :data-id="item.id"    :code="item.code"   ><span></span>{{item.name}}</label>\
                                    </div>\
                                </div>\
                                <div class="col-md-12 o-m-t o-pd">\
                                    <div class="col-md-3 o-pd o-m-t"></div>\
                                    <div class="col-md-9 o-pd ">\
                                        <div class="v-t-b ">\
                                          <button class=" btn btn-md btn-primary btn-block " @click="sendCode()" type="submit">确定</button>\
                                        </div>\
                                    </div>\
                                    </div>\
                                </div>\
                            </div>\
                        </div>\
                    </div>\
                </div>',
        methods: {
            sendCode: function () {


                var id = [];
                var code=[]

                $('.rolt-user-checked').find('input[type=checkbox]').each(function (index, val) {

                    if ($(val).prop('checked')) {

                        id.push($(val).attr('data-id'))
                         code.push($(val).attr('code'))   
                    }
                })

                this.$dispatch('send-code', {id:id,code:code})


            },
            getCheck:function (){

          

            }
        }
    })

//:checked="item.id==permissionIds.permissionIds[$index]" 

});