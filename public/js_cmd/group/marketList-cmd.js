define(function (require, exports, module) {
    var navTabs=$('#v-nav-tab');
    var contentTabs=$('.v-tab-content');

    navTabs.on('click','li',function (){

        $(this).addClass('active').siblings().removeClass('active');
        contentTabs.children().removeClass('active').eq($(this).index()).addClass('active')

    })

    uiHelperTableToolsCheckable();
});



