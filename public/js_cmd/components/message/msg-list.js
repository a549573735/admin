define(function (require, exports, module) {
    var Vue = require('lib_cmd/vue-cmd');
    require('/js_cmd/components/message/msg-paging')
    Vue.component('v-msg-list', {
        data:function (){
            return { type:'',top:['行政建议','行政约谈','网络检查','预约'],messgaeList:''}
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
                                    <tr v-for="item in datalist.content.content" >\
                                        <td class="text-center"><span class="v-core"></span></td>\
                                        <td class="text-left v-cont"   @click="notify($event)" :data-isRead="item.isRead+\'\'" :data-type="item.type"  :data-period="item.message.period" :data-titleName="item.title"  :data-msg-id="item.message.id"   :data-id="item.id"    :class="!item.isRead?item.class:\'\'" >[{{item.title}}] <a href="javascript:;" > {{item.message.user}}</a></td>\
                                        <td class="text-left " ><span class="v-msg-content-n">{{item.message.suggestion||item.message.notes}}</span> <span class="v-msg-content-r">{{item.message.from}}</span></td>\
                                        <td class="text-center v-msg-date">\
                                            {{item.createDate}}\
                                        </td>\
                                    </tr>\
                                    </tbody>\
                                </table>\
                            <div>\
                            <msg-pages :pagelist="datalist.content.page||1"></msg-pages>\
                     <div>\
                <div>'        
        ,
    props: ['datalist'],
   
    methods:{     
        
          notify: function (event) {
             $('.confirm-msg').html('')
             var msg={
                title:$(event.target).find('a').html(),
                content:$(event.target).parent().find('.v-msg-content-n').html(),
                date:$(event.target).parent().find('.v-msg-date').html(),
                company:$(event.target).parent().find('.v-msg-content-r').html(),
                id:$(event.target).attr('data-id'),
                type:$(event.target).attr('data-type'),
                msg_id:$(event.target).attr('data-msg-id'),
                show:true,
                isRead:$(event.target).attr('data-isRead'),
                period:$(event.target).attr('data-period'),
                titleName:$(event.target).attr('data-titleName')
            }

              var that=this;
                 
              if(msg.isRead=='false'){  
                  $.get('/api/read/message?id='+msg.id).then(function (data){
                        if(data.success){
                      
                          msg.isRead='true'
                          $(event.target).attr('data-isRead',true).parent().attr('class','text-left v-cont')
                        }else {
                          
                        }
                   })
                } 

               this.$dispatch('send-msg', msg)         
            }
    },
    events:{
        'send-page-msg':function (page){

               var that=this;

               $.get('/user/messages/list',{page:page-1}).then(function (data){

                        
                            data.content.content.forEach(function (item){  
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

                        that.datalist=data;

               })
        }
    }
    });
});

