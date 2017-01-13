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
                    return {num:this.intNum,carry:true,allnum:this.pagelist,preCarry:false}
                }else {
                    return {num:this.pagelist,carry:true,allnum:this.pagelist,preCarry:false}
                }
            }
        },
        template: '<div class="yema-warp clearfix"><div class="yema">\
                                <div class="yema_befor"><a href="javascript:;" class="btn btn-link"  @click="getPrevious($event)" >上一页</a>  第</div>\
                                <nav class="yema_nav">\
                                    <ul class="pagination pagination-sm yema_ul">\
                                        <li  class="more2 hide">\
                                            ...\
                                        </li>\
                                        <li v-for="item in setpage.allnum" :class="{\'active\':($index+1)==now}"  v-bind:style="{ display: $index>=intNum?\'none\':\'block\'  }" >\
                                            <a href="javascript:void(0)" @click="getPage($event)">{{$index+1}}</a>\
                                        </li>\
                                        <li  class="more"  v-bind:style="{ display:setpage.carry?\'none\':\'block\'}">\
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
                
                  this.getCompute();
                  
                  this.$dispatch('send-page', this.now)
            },
            getPrevious: function (event) {

                if (this.now == 1) {
                    return false;
                } else {
                    this.now--;
                    this.$dispatch('send-page', this.now)
                }
                  this.getCompute(); 
            },
            getNext: function () {
                
                if (this.now >= this.pagelist) {
                    return false;
                } else {
                    this.now++;
                    this.$dispatch('send-page', this.now)
                }
                 this.getCompute(); 
            },
            getCompute:function (){
                     var that=this;
                        var ali=$('.yema_ul').find('li');
                        var arr=[];
                        var iNow=parseInt(this.now)
                    if(iNow+5<that.setpage.allnum){
                        for(var i=iNow;i<iNow+5;i++){
                            arr.push(ali.eq(i));
                        }
                        $('.more').removeClass('hide');

                    }else {
                        for(var i=iNow;i<parseInt(that.setpage.allnum)+1;i++){
                            arr.push(ali.eq(i));
                        }
                           $('.more').addClass('hide');
                    }
                    if(iNow-5>0){
                        for(var i=iNow;i>iNow-5;i--){
                            arr.push(ali.eq(i));
                        }
                         $('.more2').removeClass('hide');
                    }else {
                         for(var i=1;i<iNow;i++){
                             arr.push(ali.eq(i));
                         }
                         $('.more2').addClass('hide');
                    }  
                     ali.not('.more').not('.more2').css('display','none');
                
                       arr.forEach(function (item){
                            $(item).css('display','block');
                       })
                 }
        }
    });



});

