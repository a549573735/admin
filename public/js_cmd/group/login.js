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


});