define(function (require, exports, module) {
    var Vue = require('lib_cmd/vue-cmd');
    

    Vue.component('table-btns',{  
                 props:['btnlist'],
                 template:'<ul class="nav nav-tabs nav-justified " id="v-nav-tab">\
                                        <li v-for="item in btnlist" v-bind:class="{ \'active\':item.active } ">\
                                            <a :href="item.href"> {{item.title}}</a>\
                                        </li>\
                           </ul>',
                methods:{
               }         
      
    })        


   
})                             