define(function (require, exports, module) {
    var Vue = require('lib_cmd/vue-cmd')
        // tableCom = require('js_cmd/tableCom');

    var navTabs=$('#v-nav-tab');
    var contentTabs=$('.v-tab-content');

    navTabs.on('click','li',function (){

        $(this).addClass('active').siblings().removeClass('active');
        contentTabs.children().removeClass('active').eq($(this).index()).addClass('active')

    })

    uiHelperTableToolsCheckable();
    require('/js_cmd/components/paging')
    require('/js_cmd/tableCom');
    // new Vue({
    //     el: '#app',
    //     data: {
    //         mydata: [
    //             {title: 'biaoti', state: 'state', name: 'name', date: 'data', message: 'meesageeg'},
    //             {title: 'biaoti2', state: 'state2', name: 'name2', date: 'data', message: 'meesagee23g'},
    //             {title: 'biaoti3', state: 'state3', name: 'name3', date: 'data', message: 'meesageeg32'},
    //             {title: 'biaoti4', state: 'state', name: 'name4', date: 'data', message: 'meesageeg123'}
    //         ]
    //     },
    //     methods: {

    //     }
    // })
});



