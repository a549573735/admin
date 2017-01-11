define(function (require, exports, module) {
    var Vue = require('lib_cmd/vue-cmd');

    Vue.component('v-pages', {
        props: ['pagelist'],
        data: function () {
            return {now: 1,intNum:11}
        },
        computed:{
            'setpage':function (){
                if(this.pagelist>this.intNum){
                    return {num:this.intNum,carry:true,allnum:this.pagelist}
                }else {
                    return {num:this.pagelist,carry:false}
                }
            }
        },
        template: '<div class="yema-warp clearfix"><div class="yema">\
                                <div class="yema_befor"><a href="javascript:;" class="btn btn-link"  @click="getPrevious($event)" >上一页</a>  第</div>\
                                <nav class="yema_nav">\
                                    <ul class="pagination pagination-sm yema_ul">\
                                        <li v-for="item in pagelist" :class="{\'active\':($index+1)==now}"  v-bind:style="{ display: $index>=intNum?\'none\':\'block\'  }" >\
                                            <a href="javascript:void(0)" @click="getPage($event)">{{$index+1}}</a>\
                                        </li>\
                                        <li v-if="setpage.carry">\
                                            ...\
                                        </li>\
                                    </ul>\
                                </nav>\
                                <div class="yema_end"> 页<a href="javascript:;" class="btn btn-link" @click="getNext($event)"  >下一页</a> <a href="javascript:;" @click="getPage($event)"  class="btn btn-link">尾页</a></div>\
               </div></div> ',
        methods: {

            getPage: function (event) {
                var that=this;
                if ($(event.target).html() == '尾页') {
                    this.now = this.pagelist;
                } else {
                    this.now = $(event.target).html()
                }
                      // $('.yema_ul').find('li').each(function (index,item){
                      //          if(that.now-5>1){
                      //               if(index<that.now-5){
                      //                   $(item).css('display','none')
                      //               }
                      //          }else {
                      //               if(index<that.now){
                      //                   $(item).css('display','block')
                      //               }

                      //          }
                      //          if(that.now+5< that.setpage.allnum){
                      //                  if(index>that.now+5){
                      //                     $(item).css('display','none')
                      //                  }
                      //                  if(){

                      //                  }
                      //          }
                      // })  
               
                this.$dispatch('send-page', this.now)
            },
            getPrevious: function (event) {
                if (this.now == 1) {
                    return false;
                } else {
                    this.now--;
                    this.$dispatch('send-page', this.now)
                }
            },
            getNext: function () {

                if (this.now >= this.pagelist) {
                    return false;
                } else {
                    this.now++;
                    this.$dispatch('send-page', this.now)
                }
            }
        }
    });
});

