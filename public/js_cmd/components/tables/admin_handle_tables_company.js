define(function (require, exports, module) {
    var Vue = require('lib_cmd/vue-cmd');

    Vue.component('handle-table-list', {

        props: ['datalist'],
        template:'<table class="table  table-hover table-borderless">\
                      <thead>\
                      <tr class="v-table-tr">\
                            <th class="text-center " v-for="item in datalist.title" v-bind:style="{ width: datalist.style[$index] }">{{item}}</th>\
                      </tr>\
                      </thead>\
                      <tbody class="v-tabs-check">\
                        <tr v-for="item in datalist.content" :class="\'tr-\'+$index" v-cloak>\
                            <td  class="text-center">{{ item.name }}</td>\
                            <td  class="text-center">{{ item.username }}</td>\
                            <td  class="text-center">{{ item.mail }}</td>\
                            <td  class="text-center">{{ item.contact }}</td>\
                            <td  class="text-center">{{ item.phone }}</td>\
                            <td v-if="datalist.btns" class="text-center"><div class="bei-zhu"><a  :data-admin="item.admin" :data-marketId="item.marketId"  :data-parkId="item.parkId"    :data-id="item.id" :data-parentId="item.parentId" :data-phone="item.phone" data-type="modify" :data-contact="item.contact" :data-mail="item.mail" :data-username="item.username" :data-name="item.name" :data-address="item.address" class="btn  btn-primary " data-toggle="modal" data-target="#modal-addCompany" @click="handleData($event)" > 修改</a></div><div class="bei-zhu"><a  @click="resetPassword($event)"  :data-id="item.id" :data-admin="item.admin" class="btn  btn-primary "> 重置</a></div><div class="bei-zhu"><a  @click="deleteEle($event)"   data-toggle="modal"  data-target="#modal-DeletePrompt"  :data-id="item.id" :data-admin="item.admin" class="btn  btn-primary "> 删除</a></div></td>\
                        </tr>\
                      </tbody>\
                  </table>', 

        methods:{
            
             showMsg:function (event){
                 event.target.bclick=!event.target.bclick   
                 if(event.target.bclick){ 
                   console.log($(event.target))
          
                   $(event.target).siblings('span').css({'overflow':'inherit','display':'inline'})
                   $(event.target).html('收起')
                  /*  备注弹框  */
                  }else {
                    $(event.target).siblings('span').css({'overflow':'hidden','display':'inline-block'})
                     $(event.target).html('详情')
                  }
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
                
                var parkId=$(event.target).attr('data-parkId')
                var marketId=$(event.target).attr('data-marketId')

      
                var select=[]; 
                    
                 $.ajax({
                          url: '/park/briefall/'+marketId,    //请求的url地址
                          dataType: "json",   //返回格式为json
                          async: false, //请求是否异步，默认为异步，这也是ajax重要特性  
                          type: "GET",   //请求方式
                          success: function(data) {
                              //请求成功时处理
                               select = data.content;
                          },
                          error: function(err) {
                              //请求出错处理
                              alert(err.msg);
                          }
                    }); 
              

                this.$dispatch('send-selectId', {marketId:marketId,parkId:parkId,selectIds:select})   
               
             },
             resetPassword:function (event){  

                  var id=$(event.target).attr('data-admin');
                  

                  $.post('/reset/user/password',{id:id}).then(function (data){

                        if(data.success){

                          alert('密码重置成功，新密码会发送该账户的邮箱')

                        }else {
                         
                          alert(data.msg)
                        }

                  }) 
             },
             deleteEle:function (event){
                    var form={
                       id:$(event.target).attr('data-id')
                    }
                    var tr=$(event.target).closest('tr');
                    $('#delete-ground').attr({'data-tr':tr.attr('class'),'data-id':form.id,'data-api':'/admin/company/delete'})
                
             }
        }          
      }
    )
});

