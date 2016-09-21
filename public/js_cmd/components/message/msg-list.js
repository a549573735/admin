define(function (require, exports, module) {
    var Vue = require('lib_cmd/vue-cmd');

    Vue.component('v-msg-list', {
        data:function (){
            return { type:'',top:['行政建议','行政约谈','网络检查','预约']}
        },

        template:'<div class="row v-table-msg" >\
                     <div class="col-md-12">\
                           <div class="block">\
                                <table class="table table-hover">\
                                    <thead>\
                                    <tr>\
                                        <th class="text-center" style="width: 50px;"></th>\
                                        <th class="text-left" >头条</th>\
                                        <th class="text-left" style="width: 30%">来源</th>\
                                        <th class="text-center"  style="width: 15%;">日期</th>\
                                    </tr>\
                                    </thead>\
                                    <tbody>\
                                    <tr v-for="item in messgaeList" >\
                                        <td class="text-center"><span class="v-core"></span></td>\
                                        <td class="text-left v-cont"  :class="!item.isRead?item.class:\'\'" >[{{item.title}}] <a href="javascript:;" :data-isRead="item.isRead+\'\'"  @click="notify($event)" :data-type="item.type"  :data-msg-id="item.message.id"   :data-id="item.id"   > {{item.message.user}}</a></td>\
                                        <td class="text-left " ><span class="v-msg-content-n">{{item.message.suggestion||item.message.suggestion}}</span> <span class="v-msg-content-r">{{item.message.from}}</span></td>\
                                        <td class="text-center">\
                                            {{item.createDate}}\
                                        </td>\
                                    </tr>\
                                    </tbody>\
                                </table>\
                            <div>\
                     <div>\
                <div>'        
        ,
    props: ['datalist'],

    computed:{

        messgaeList:function (){
          
            var that=this;
            this.datalist.forEach(function (item){  
                 switch(item.type){
                    case 'INTERVIEW':
                    item.title=that.top[1]
                    item.class="interview-msg"
                    break;
                    case 'INSPECT':
                    item.title=that.top[2]
                    item.class="inspect-msg"
                    break;
                    case 'APPOINTMENT':
                    item.title=that.top[3]
                    item.class="appointment-msg"
                    break;
                    case 'SUGGESTION':
                    item.title=that.top[0]
                    item.class="suggestion-msg"
                    break;
                 }
                 item.message=JSON.parse(item.message)
            })
            
            return this.datalist
        }

    },
   
    methods:{     
        
          notify: function (event) {
             $('.confirm-msg').html('')
             var msg={
                title:$(event.target).html(),
                content:$(event.target).parent().next().find('.v-msg-content-n').html(),
                date:$(event.target).parent().next().next().html(),
                company:$(event.target).parent().next().find('.v-msg-content-r').html(),
                id:$(event.target).attr('data-id'),
                type:$(event.target).attr('data-type'),
                msg_id:$(event.target).attr('data-msg-id'),
                show:true,
                isRead:$(event.target).attr('data-isRead')
             }

                this.$dispatch('send-msg', msg)         
            }

    }
    });
});

