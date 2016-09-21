define(function (require, exports, module) {
       
     require('/js_cmd/checkCode');

     var checkCodes=new CheckCode({

           obj:document.getElementById('checkCodeArea'),

           codesLen:4              //该参数可选，默认为4

     });

        checkCodes.render();           //渲染验证码


      $('.big_bj').height($(window).height());
       
      $('#checkCodeArea').on('click',function (){
           
				checkCodes.refresh()
                
      })



    $('.rest-pass-btn').on('click',function (){

        $('.loginUp').css({'WebkitTransform':'translateX(700px)',opacity:'0'})
        $('.loginUp').css({'MozTransform':'translateX(700px)',opacity:'0'})
        $('.loginUp').css({'msTransform':'translateX(700px)',opacity:'0'})
        $('.loginUp').css({'transform':'translateX(700px)',opacity:'0'})

        $('.reset-password').css({opacity:'1','WebkitTransform':'translateX(450px)'})
        $('.reset-password').css({opacity:'1','MozTransform':'translateX(450px)'})
        $('.reset-password').css({opacity:'1','msTransform':'translateX(450px)'})
        $('.reset-password').css({opacity:'1','transform':'translateX(450px)'})

    })

    $('.login-pass-btn').on('click',function (){
        $('.loginUp').css({'WebkitTransform':'translateX(0)',opacity:'1'})
        $('.loginUp').css({'MozTransform':'translateX(0)',opacity:'1'})
        $('.loginUp').css({'msTransform':'translateX(0)',opacity:'1'})
        $('.loginUp').css({'transform':'translateX(0)',opacity:'1'})
        $('.reset-password').css({opacity:'0','WebkitTransform':'translateX(0px)'})
        $('.reset-password').css({opacity:'0','MozTransform':'translateX(0px)'})
        $('.reset-password').css({opacity:'0','msTransform':'translateX(0px)'})
        $('.reset-password').css({opacity:'0','transform':'translateX(0px)'})
    })

 



	  $('.denglu_btm').on('click',function (){

	        var val=$('.denglu_yz').val().toLowerCase()
	        var check=checkCodes.getCodes().toLowerCase();
	        
	        var data={
	        	"username":$('input[name=username]').val(),
	        	"password":$('input[name=password]').val()
	        }
             console.log(check,val)
	        if(val==check){
	        	 $.post('/loginUp',data,function (data){
	                  
	                 console.log(data)   
	                 if(data.state==false){
	                    $('.error').show().html('密码或用户名错误请重新输入')
	                    checkCodes.refresh()
	                    return false;
	                 }
	                 if(data.type=='COMPANY'){ 	
                	     window.location.href='/organize/details?view=company&id='+data.data.companyId+'&market='+data.data.marketId+'&park='+data.data.parkId+'&belongId='+data.data.belongId;
                    
                    }else if(data.type=="BACKSTAGE"){

 						window.location.href='/admin/interface/list';

                    }else if(data.type=="MARKET"){
                    	window.location.href='/organize/park?id='+data.data.belongId+'&market='+data.data.marketId+'&park='+data.data.parkId;
                   
                    }else if(data.type=="PARK"){
                    	window.location.href='/organize/company?id='+data.data.belongId+'&market='+data.data.marketId+'&park='+data.data.parkId;
                    }else {
                    	window.location.href='/organize/architecture?id='+data.data.belongId+'&market='+data.data.marketId+'&park='+data.data.parkId;
                    }
	               
	        	 },'json')
	        	 
	        }else{
	        	$('.error').show().html('验证码错误请重新输入')
	        	checkCodes.refresh()
	        	return false;
	        }
	  })


  
 // /api/app/code/by/name/

 $('.getCode').on('click',function (){


 			


 })







});