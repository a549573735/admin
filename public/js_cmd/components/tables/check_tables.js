define(function (require, exports, module) {
    var Vue = require('lib_cmd/vue-cmd');
  

    Vue.component('check-table-list', {

        props: ['datalist'],
        template:'<table class="table  table-hover table-borderless o-m-t">\
                      <thead>\
                      <tr class="v-table-tr">\
                            <th class="text-center " v-for="item in datalist.title" v-bind:style="{ width: datalist.style[$index] }">{{item}}</th>\
                      </tr>\
                      </thead>\
                      <tbody class="v-tabs-check">\
                        <tr v-for="item in datalist.content.content">\
                            <td v-if="!datalist.checked" class="text-center"><label v-if="datalist.overfull" class="css-input css-checkbox css-checkbox-primary">\
                                            <input type="checkbox" name="row_3" :data-type="datalist.type" :value="item.id"><span></span>\
                                           </label>\
                            </td>\
                            <td  class="text-center">{{ item.name }}</td>\
                            <td v-if="datalist.btns" class="text-center">{{ item.username }}</td>\
                            <td v-if="datalist.btns" class="text-center">{{ item.mail }}</td>\
                            <td  class="text-center">{{ item.address }}</td>\
                            <td  class="text-center">{{ item.contact }}</td>\
                            <td  class="text-center">{{ item.phone }}</td>\
                            <td  v-if="datalist.btns"  class="text-center"><div class="bei-zhu"><a  :data-admin="item.admin"   :data-id="item.id" :data-parentId="item.parentId" :data-phone="item.phone" data-type="modify" :data-contact="item.contact" :data-mail="item.mail" :data-username="item.username" :data-name="item.name" :data-address="item.address" class="btn  btn-primary " data-toggle="modal" data-target="#modal-addParty" @click="handleData($event)" > 修改</a></div><div class="bei-zhu"><a  @click="resetPassword($event)"  :data-id="item.id" class="btn  btn-primary "> 重置</a></div></td>\
                            <td  v-if="datalist.overfull_btn"   class="text-center"><a :href="datalist.href+item.id"   class="btn  btn-primary v-btn-w"> 详情</a></td>\
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

                 $('.form_Party').find('.select_park option').each(function (index,val){
                     if($(val).val()==$(event.target).attr('data-parentId')){
                         $(val).attr('selected','selected')
                     }
                 })    

             },
             resetPassword:function (event){  

                  var id=$(event.target).attr('data-id');
                  
                  $.post('/reset/user/password',id).then(function (data){

                        if(data.success){
                          alert('密码重置成功，新密码会发送该账户的邮箱')
                        }else {
                          alert('密码重置失败')
                        }

                  }) 


             }

        }          
      }
    )
});

