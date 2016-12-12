define(function (require, exports, module) {
    var Vue = require('lib_cmd/vue-cmd');
    
     //null  企业名称   检查状态  检查员   检查日期  备注


    Vue.component('handle-table-list', {

        props: ['datalist'],
        template:'<table class="table  table-hover table-borderless">\
                      <thead>\
                      <tr class="v-table-tr">\
                            <th class="text-center " v-for="item in datalist.title" v-bind:style="{ width: datalist.style[$index] }">{{item}}</th>\
                      </tr>\
                      </thead>\
                      <tbody class="v-tabs-check">\
                        <tr v-for="item in datalist.content" v-cloak>\
                            <td  class="text-center">{{ item.name }}</td>\
                            <td  class="text-center">{{ item.address }}</td>\
                            <td  class="text-center">{{ item.username }}</td>\
                            <td  class="text-center">{{ item.mail }}</td>\
                            <td  class="text-center">{{ item.contact }}</td>\
                            <td  class="text-center">{{ item.phone }}</td>\
                            <td v-if="datalist.btns" class="text-center"><div class="bei-zhu"><a  :data-admin="item.admin"   :data-id="item.id" :data-parentId="item.parentId" :data-phone="item.phone" data-type="modify" :data-contact="item.contact" :data-mail="item.mail" :data-username="item.username" :data-name="item.name" :data-address="item.address" class="btn  btn-primary " data-toggle="modal" data-target="#modal-addParty" @click="handleData($event)" > 修改</a></div><div class="bei-zhu"><a  @click="resetPassword($event)"  :data-id="item.id" :data-admin="item.admin" class="btn  btn-primary "> 重置</a></div><div class="bei-zhu"><a  @click="deleteEle($event)"  :data-id="item.id" :data-admin="item.admin" class="btn  btn-primary "> 删除</a></div></td>\
                            <td v-if="datalist.overflow" class="text-center">{{ datalist.details[$index].msg}}<a href="javascript:;" class="btn-link">详情</a></td>\
                            <td v-if="datalist.overflow_btn" class="text-center"><a :href="datalist.href+item.id"  class="btn  btn-primary "> 详情</a></td>\
                        </tr>\
                      </tbody>\
                  </table>', 

        methods:{
            
             sub:function (event){
                     
                    
                  /*  备注弹框  */
            
             },
             handleData:function (event){

                 $('.admin-name').val($(event.target).attr('data-name'));
                 $('.admin-parentId').val($(event.target).attr('data-parentId'));
                 $('.admin-id').val($(event.target).attr('data-id'));
                 $('.admin-email').val($(event.target).attr('data-mail'));
                 $('.admin-address').val($(event.target).attr('data-address'));
                 $('.admin-username').val($(event.target).attr('data-username'));
                 $('.admin-phone').val($(event.target).attr('data-phone'));
                 $('.admin-contact').val($(event.target).attr('data-contact'));
                 $('.admin-type').val($(event.target).attr('data-type'))
                 $('.admin-admin').val($(event.target).attr('data-admin'))
             },
             resetPassword:function (event){  

                  var id=$(event.target).attr('data-admin');
                  

                  $.post('/reset/user/password',{id:id}).then(function (data){

                        if(data.success){

                          alert('密码重置成功，新密码会发送该账户的邮箱')

                        }else {
                         
                          alert(data.msg)
                        }
                        console.log(data)

                  }) 
             },
             deleteEle:function (event){
                   var form={
                       id:$(event.target).attr('data-id')
                    }
                    var tr=$(event.target).closest('tr');
                    $.post('/admin/market/delete',form).then(function (res){
                        if(res.success){
                            tr.remove();
                            alert('删除成功')
                        }else {
                            alert(res.errMessage)
                        }
                    })
             }
        }          
      }
    )
});

