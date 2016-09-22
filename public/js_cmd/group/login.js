define(function (require, exports, module) {
       
     require('/js_cmd/checkCode');
     require('/lib/bootstrap-datepicker.js')
     require('/lib/Jquery.Query.js')
     require('/js_cmd/common')

     var common=new Common();

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

	    var check=common.checkEmpty($('input[name=restUsername]'))

      if(check.state=='false'){
        alert(check.message)
        return false
      }
      common.countdown($(this))

	    var username=$('input[name=restUsername]').val();
	 
	    $.post('/api/app/code/by/name/',{name:username}).then(function (data){

	    	   console.log(data.content)
          if(data.success){    
	    		   $('input[name=rest-code]').val(data.content)
          }else {
              alert(data.errMessage)
          } 
	    })

 })



  $('.rest-btn').on('click',function (){

  	  var form={
	  	  	codeId:$('input[name=rest-code]').val(),
	  	  	code:$('input[name=rest-confirm-code]').val(),
	  	  	password:$('input[name=rest-password]').val(),
	  	  	username:$('input[name=restUsername]').val()
  	  }
  	  var that=this;
    
  	  $.post('/api/app/user/modify/password',form).then(function (data){

  	  			if(data.success){
  	  				$(that).parent().prev().html('修改成功').show()
  	  				
  	  			}else {
  	  			    $(that).parent().prev().html('修改失败').show()
  	  				console.log(data.errMessage)
  	  			}
  	  })	

  })

});