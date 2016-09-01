define(function (require, exports, module) {
    var Vue = require('lib_cmd/vue-cmd');
    
    Vue.component('v-msg-content', {
    props: ['datanow'],
        template: ' <div class="row v-table-msg-c">\
                      <div class="col-md-12 col-lg-12 clearfix">\
                           <h5 class="text-left">{{datanow.title}}</h5>\
                          <div class="col-md-8 col-md-offset-1 v-msg-box">\
                               <p class="v-msg-content">\
                                  {{datanow.content}}\
                               </p>\
                          </div>\
                          <div class="col-md-12  ">\
                               <p class="v-msg-f pull-right col-md-2">\
                                   {{datanow.company}}<br>\
                                   {{datanow.date}}\
                               </p>\
                          </div>\
                      </div>\
                      <div class="col-lg-12  col-md-12 v-msg-f-btn">\
                          <button type="button" @click="" :data-id="datanow._id"  class="btn btn-primary btn-sm v-t-b">已读</button>\
                      </div>\
                </div>\
        ',
   
   
      methods:{     
       
             readyMsg:function (){


             }
      }
    });
});

