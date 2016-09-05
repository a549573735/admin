define(function (require, exports, module) {
       


        $('.big_bj').height($(window).height());
       

        
    $.get('/login_img').then(function (data){
        
        console.log(data)

    })


});