define(function (require, exports, module) {
    var Vue = require('lib_cmd/vue-cmd');
    



    Vue.component('com-table-list', {

        props: ['datalist','notice'],

        template:'<table class="table  table-hover table-borderless">\
                      <thead>\
                      <tr class="v-table-tr">\
                            <th class="text-center " v-for="item in datalist.title" v-bind:style="{ width: datalist.style[$index] }">{{item}}</th>\
                      </tr>\
                      </thead>\
                      <tbody class="v-tabs-check">\
                         <tr v-if="datalist" v-for="item in datalist.content.content" :class="\'id-\'+$index">\
                            <td  class="text-center">\
                              <label class="css-input css-checkbox css-checkbox-primary"><input type="checkbox"  :value="item.id"><span></span></label>\
                            </td>\
                            <td  v-if="item.title" class="text-center"><a   data-toggle="modal"   data-target="#modal-noticeDetails" @click="getDetails($event)"  :data-id="item.id" >{{ item.title }}</a></td>\
                            <td  v-if="item.createUser" class="text-center">{{ item.createUser }}</td>\
                            <td  v-if="item.createDate" class="text-center">{{ item.createDate }}</td>\
                            <td  v-if="notice==\'publish_notice\'" class="text-center"><div class="bei-zhu" style="float: inherit; display:inline-block"><a  :href="\'/add/noticeboard?id=\'+item.id+\'&status=modify\'" :data-id="item.id"    class="btn  btn-primary "  > 编辑</a></div><div class="bei-zhu" style="float: inherit; display:inline-block"><a   :data-id="item.id" @click="getDetails($event)"  data-toggle="modal" data-target="#modal-noticeDetails"  class="btn  btn-primary "> 详情</a></div><div class="bei-zhu" style="float: inherit; display:inline-block"><a   :data-id="item.id"  class="btn  btn-primary " @click="showmodal($event)"  > 删除</a></div></td>\
                        </tr>\
                      </tbody>\
                  </table>', 
        methods:{
             getDetails:function (event){
                   var that=this;   
                   var _id =$(event.target).attr('data-id');
                   $.post('/api/noticedetails',{id:_id}).then(function (res){
                        
                        if(res.success){
                            that.$dispatch('send-details', res.content)
                        }
                   }) 
             },
              showmodal:function (event){
                        var form={
                          id:[]
                        }
                        form.id.push($(event.target).attr('data-id'));
                        $('#modal-deleteDetails').modal('toggle');
                        var trClass=$(event.target).closest('tr').attr('class');
                        $('#delete-notice').attr({'trClass':trClass,'data-id':form.id })
                        
             
              }
        }          
      }
    )
});

