define(function (require, exports, module) {
    var Vue = require('lib_cmd/vue-cmd');

    Vue.component('v-msg-list', {

        template:'<div class="row v-table-msg " >\
                     <div class="col-md-12">\
                           <div class="block">\
                                <table class="table table-hover">\
                                    <thead>\
                                    <tr>\
                                        <th class="text-center" style="width: 50px;"></th>\
                                        <th class="text-left" >头条</th>\
                                        <th class="text-left" style="width: 30%"></th>\
                                        <th class="text-center"  style="width: 15%;">日期</th>\
                                    </tr>\
                                    </thead>\
                                    <tbody>\
                                    <tr v-for="item in datalist" >\
                                        <td class="text-center"><span class="v-core"></span></td>\
                                        <td class="text-left v-cont" ><a href="javascript:;" :data-id="item._id"  @click="notify($event)">{{item.title}}</a></td>\
                                        <td class="text-left " ><span class="v-msg-content-n">{{item.content}}</span><span class="v-msg-company-n">{{item.company}}</span></td>\
                                        <td class="text-center">\
                                            {{item.date}}\
                                        </td>\
                                    </tr>\
                                    </tbody>\
                                </table>\
                            <div>\
                     <div>\
                <div>'        
        ,
    props: ['datalist'],
   
    methods:{     
        
          notify: function (event) {
             
             var msg={
                title:$(event.target).html(),
                content:$(event.target).parent().next().find('.v-msg-content-n').html(),
                date:$(event.target).parent().next().next().html(),
                company:$(event.target).parent().next().find('.v-msg-company-n').html(),
                _id:$(event.target).attr('data-id')
             }

                this.$dispatch('send-msg', msg)         
            }

    }
    });
});

