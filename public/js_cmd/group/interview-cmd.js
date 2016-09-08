define(function (require, exports, module) {
	var Vue = require('lib_cmd/vue-cmd');
	require('/js_cmd/components/paging')
	var wrapTable = require('/js_cmd/components/tables/com_vue');
	var select = require('/js_cmd/components/select');


	 new Vue({
                el: '#app',
                data: {
                    dataSelect:function (){
                       
                    }(),
                    selectsubset:[],
                },
                methods: {},
                events:{
                  
                }
      })
});