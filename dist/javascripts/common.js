
seajs.use('/lib/bootstrap.min.js')

seajs.use('/lib/bootstrap-datepicker.zh-CN.js')
function getStyle(obj,attr){
    		if (obj.currentStyle) {
                return obj.currentStyle[attr];
            } else {
                return document.defaultView.getComputedStyle(obj, null)[attr];
            }
		}
		function json2css(json){
			function itemFormat(item){
				var c=item.indexOf('_');
				if(c>0){
					// like font_size
					if(c<item.length-1){
						item=item.split('_').join('-');
						return item;
					}
				}else{
					//like fontSize  code:65-90
					var chars=[];
					for(var i=0;i<item.length;i++){
						chars.push(item.charAt(i));
					}
					for(var i=1;i<chars.length-1;i++){
						if(chars[i].charCodeAt(0)>=65&&chars[i].charCodeAt(0)<=90){
							chars[i]='-'+chars[i].toLowerCase();
						}
					}
					return chars.join('');
				}				
			}
			var str=[];
			for(var item in json){
				var _item=item;
				item=itemFormat(item);
				str.push(item+':'+json[_item]);
			}
			return str.join(';');
		}
		
		var codes={
			setNumRange:function(min,max){
				var r=0;
				if(!isNaN(min)&&!isNaN(max)){
					var min=Math.round(min);
					var max=Math.round(max);
					r=max-min;
					return Math.floor(Math.random()*(r+1))+min;
				}
			},
			getColor:function(){
				var r=Math.floor(Math.random()*256*256*256).toString(16);
				while(r.length<6){
					r='0'+r;
				}
				return '#'+r;
				// var r=Math.floor(Math.random()*256);
				// var g=Math.floor(Math.random()*256);
				// var b=Math.floor(Math.random()*256);
				// return 'rgb('+r+','+g+','+b+')';

			},
			getChar:function(){
				var chars='abcdefghijklmnopqrstuvwxyz';
				var i=Math.floor(Math.random()*26);
				return chars.charAt(i);
			},
			getNum:function(){
				return Math.floor(Math.random()*10);
			},
			getNumRange:function(min,max){
				return this.setNumRange(min,max);
			}
		}
		
		var codeRender={
			renderBG:function(obj){
				var bg=codes.getColor();
				//obj.style.backgroundColor=bg;
			},
			renderLayout:function(obj,len){
				var codeHeight=obj.offsetHeight;
				var objWidth=obj.offsetWidth;
			
				if(getStyle(obj,'borderLeftWidth')!=""){
					codeHeight=codeHeight-2;
					objWidth=objWidth-2;
				}
				var codeWidth=Math.floor(objWidth/len);
				var cssJson={
					width:codeWidth+'px',
					lineHeight:codeHeight+'px',
					float:'left',
					textAlign:'center'
				}
				for(var i=0;i<len;i++){
					var codeLay=document.createElement('div');

					codeLay.style.cssText=json2css(cssJson);
					obj.appendChild(codeLay);
				}
			},
			getCodes:function(){
				var code='';
				if(codes.getNumRange(0,1)){
					code=codes.getChar();
					if(codes.getNumRange(0,1)){
						code=code.toUpperCase();
					}
				}else{
					code=codes.getNum();
				}
				return code;
			},
			renderCode:function(code){
				var colors=codes.getColor();
				var fs=codes.getNumRange(20,28)+'px';
				var skewDeg=codes.getNumRange(-60,60)+'deg';
				var codeCssJson={
					color:colors,
					font_size:fs,
					'-webkit-transform':'skew('+skewDeg+')',
					'-moz-transform':'skew('+skewDeg+')',
					'-ms-transform':'skew('+skewDeg+')',
					'-o-transform':'skew('+skewDeg+')'
				}
				if(codes.getNumRange(0,1)){
					codeCssJson.fontWeight='bold';
				}
				code.style.cssText+=json2css(codeCssJson);
			}
		}

		function CheckCode(j){
			this.obj=j.obj;
			this.codesLen=j.codesLen||4;
		}
		CheckCode.prototype.renderCode=function(){
			codeRender.renderBG(this.obj);
			codeRender.renderLayout(this.obj,this.codesLen);

			var code=this.obj.getElementsByTagName('div');
			for(var i=0;i<code.length;i++){
				code[i].innerHTML=codeRender.getCodes();
				codeRender.renderCode(code[i]);
			}
		}
		CheckCode.prototype.render=function(){
			this.renderCode();
		}
		CheckCode.prototype.refresh=function(){
			this.obj.innerHTML='';
			this.renderCode();
		}
		CheckCode.prototype.getCodes=function(){
			var codestr='';
			var code=this.obj.getElementsByTagName('div');
			for(var i=0;i<code.length;i++){
				codestr+=code[i].innerHTML;
			}
			return codestr;
		}



/**
 * Created by lixiang on 16/8/26.
 */
   // 





    function Common(obj){
        
          this.obj=$(obj)   //下拉;
          this.uiInit = {
                // Set variables
                $lHtml              : jQuery('html'),
                $lBody              : jQuery('body'),
                $lhead              : jQuery('#c-header'),
                $lMain              : jQuery('#c-content'),
                $lFooter            : jQuery('#c-footer'),
                $lUMessage          : jQuery('#u-message'),
                $lUserBtn           : jQuery('#u-btn'),
                $lDate              : jQuery('.input-daterange').add('.js-datepicker'),
                $lMinModal          : jQuery('.v-modal-min'),
                $lMinBtn            : jQuery('.v-min-toggle'),
                $lNav               : jQuery('.c-list'),
                $appKeyBtn          : jQuery('#appkey-btn'),
                $againSecret        : jQuery('#again_secret'),

          };
          this.regIphone=/^1\d{10}$/i;
          this.regEmail=/^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/;

          this.listDown();
          this.contentHeight();
          this.userMessage();
          this.inputDate();
          this.minModal();
          this.setNavActive();
          this.sendMessage('.suggestion-btn','#tables','#val-suggestion',null,'/api/suggestion/msg',null,'.v-modal-min','.v-msg','.park-belongId_s');    //建议
          this.sendMessage('.interview-btn','#tables','#val-interview','#select-interview','/api/interview/msg',null,'.v-modal-min','.v-msg','.park-belongId_iv');    //约谈
          this.sendMessage('.appointment-btn','#tables','#val-appointment',null,'/api/appointment/msg','#date-appointment','.v-modal-min','.v-msg','.park-belongId_ap');    // 预约
          this.sendMessage('.inspect-qualified-btn','#tables','#val-qualified',null,'/api/inspect/qualified/msg',null,'.v-modal-min','.v-msg','.park-belongId_it');  //不合格  
          this.sendMessage('.inspect-qualified-btn2','#tables',null,null,'/api/inspect/qualified/msg',null,null,null,null);   //合格

          this.getAppkey();  //获取appkey
          this.againSecret();
          this.addParty();

          this.setPassword('.model-password-btn');//修改密码

          this.EmptyInput(['#modal-addParty','#modal-addCompany'])  //清空弹框内容
         
          this.uiInit.$lMinBtn.attr('bclick',false)

          this.setFormDate();

    }

    Common.prototype.listDown=function (obj){
        this.obj.on('click',function (){
            
            if(  !$(this).next().hasClass('open')){
                $(this).find('i').attr('class','icon-caret-down')
                $(this).next().addClass('open')

            }else {

                $(this).find('i').attr('class','icon-caret-right')
                $(this).next().removeClass('open')
            }
        })
    };

    Common.prototype.contentHeight=function (){

        var $hWindow     = jQuery(window).height();
        var $hHeader     = this.uiInit.$lhead.outerHeight();
        var $hFooter     = this.uiInit.$lFooter.outerHeight();
        var $hMain       = this.uiInit.$lMain.outerHeight();

        if($hMain+$hHeader+$hFooter<$hWindow){
            var $lh=$hWindow-$hFooter-$hHeader;
            this.uiInit.$lMain.css({'min-height':$lh-50,'margin-bottom':'50px'});
        }

            this.uiInit.$lMain.css({'margin-bottom':'50px'});
            this.uiInit.$lFooter.css('visibility','inherit');

    }

    Common.prototype.userMessage=function () {

        var time=null;
        var time2=null;

        this.uiInit.$lUserBtn.hover(function (){
                 var that=this;
                 clearTimeout(time2)
                 $.get('/user/verify').then(function (data){
                            console.log(data)
                            data.content.messageCount=data.content.messageCount<0?'0':data.content.messageCount
                                 $('.sm_dian').html(data.content.messageCount)
                                  $(that).next().show()
                })     
 
         },function (){
                var that=this;
               clearTimeout(time)
               time=setTimeout(function (){
                      $(that).next().hide()
                },1000)
                 
         })

         $('#tongzhi').hover(function (){
                clearTimeout(time)
                $(this).show()
         },function (){
               var that=this;
               clearTimeout(time2)
                time2=setTimeout(function (){
                      $(that).hide()
                },1000)
         })



    }

     Common.prototype.inputDate=function () {
          var that=this;
          this.uiInit.$lDate.datepicker({
              language: 'zh-CN',
              weekStart: 1,
              autoclose: true,
              todayHighlight: true,
              format: 'yyyy-mm-dd',   //yyyy-mm-dd
              // endDate:that.setForm().to ,
              // startDate:that.setForm().from

          })
          $('input[name=from]').datepicker("setDate",that.setForm().from)
          $('input[name=to]').datepicker("setDate",that.setForm().to)

    }
    
    Common.prototype.minModal=function () {

         this.uiInit.$lMinBtn.on('click',function (){ 
          var that=this;
            $(this).parent().siblings('.v-item-btn').children('.v-modal-min').hide()
            $(this).parent().siblings('.v-item-btn').children('.v-min-toggle').attr('bclick',false)
            $(this).closest('.v-item-btn').find('.v-msg').hide()
            $(this).closest('.v-item-btn').find('textarea').val('')


            if($(this).attr('bclick')=='false'){
          
               $(this).next().show().animate({opacity:'1'})
                $(that).attr('bclick',true)
            }else {
              
               $(this).next().animate({opacity:'0'},function (){
                    $(this).hide()
                    $(that).attr('bclick',false)
               })
            }
         })

    }


    Common.prototype.setNavActive=function () {
       
         var href=window.location.pathname;
         var query=window.location.search;
         
         var view= $.query.get('view')

         if(href=='/user/admin/add'){
             href="/user/edit/list"
         }else if(view){          //reg.test(href)
             href="/organize/company"

         }else if(href=='/user/add'){
             href="/user/role/list"
         }

           this.uiInit.$lNav.find('li a').each(function (index,val){
                 
                 if($(val).attr('href').split('?')[0]==href){
                     $(val).addClass('active');
                      if($(val).parent()[0].tagName!=='LI'){
                          $(val).parent().parent().prev().find('i').attr('class','icon-caret-down')
                           $(val).parent().parent().addClass('open')
                      }
                 }


           })
    }


  Common.prototype.sendMessage=function (obj,table,textarea,select,href,date,parent,success,checked) {
      var self=this;
        $(obj).on('click',function(){
             
              var id=$.query.get('id')
              var type="COMPANY"
              var targetList=[];
            
              $(table).find('input[type=checkbox]:checked').each(function (index,val){
                    targetList.push($(val).val())
              })
              

              var _type=$(table).find('input[type=checkbox]:checked').attr('data-type')
              var form={
                  suggestion:$(textarea).val(),
                  target:targetList.length>0?targetList:id,
                  type:_type?_type:type,
                  period:$(select).val(),
                  inspectDate:$(date).val(),
                  notes:$(textarea).val(),
                  status:$(this).attr('data-status'),
                  ccPark:$(checked).prop('checked')?true:false,
              }

              
              var that=this
              var reg=/park/i;  
              var winHref=window.location.pathname
              if(targetList.length==0&& reg.test(winHref) ){ 
                  alert('请选择园区') 
                  return false
              }
           
           

             $.post(href,form).then(function (data){

                    if(data.success){

                       $(that).closest(parent).find(success).html('提交成功').show()
                        $(that).closest('.v-modal-min').hide().prev().attr('bclick','false');
                        alert('提交成功')


                    }else {
                       $(that).closest(parent).find(success).html(data.errMessage).show()
                        alert('提交失败'+data.errMessage)
                    }
             })
        })
  }


Common.prototype.addZero=function (obj){

   return obj=obj>9?obj:'0'+obj;
}


Common.prototype.setForm=function (){
    var date=new Date();

    var from= date.getFullYear()+'-'+this.addZero(date.getMonth())+'-'+this.addZero(date.getDate());
    var to=date.getFullYear()+'-'+this.addZero((date.getMonth()+1))+'-'+this.addZero(date.getDate());
  return { from:from,to:to}
}

Common.prototype.getAppkey=function (){

      this.uiInit.$appKeyBtn.on('click',function (){

       // remarks
          $.get('/api/app/company/appKey').then(function (data){

                  $('.appkey').html(data.content.appKey)

                  $('.secret').html(data.content.secret)

          })

      })


}


Common.prototype.againSecret=function (){
      
      this.uiInit.$againSecret.on('click',function (){

         $.get('/api/app/company/secret/generate').then(function (data){

      
                  $('.secret').html(data.content)

          })

      })

}
 Common.prototype.addParty=function (form){
            
         var self=this;

         $('.admin-add-btn').on('click',function (){

               var form={
                        parentId:$('.select_park').val()=='all'?'':$('.select_park').val(),
                        name:$('.admin-name').val(),
                        phone:$('.admin-phone').val(),
                        contact:$('.admin-contact').val(),
                        address:$('.admin-address').val(),
                        username:$('.admin-username').val(),
                        mail:$('.admin-email').val(),
                        id:$('.admin-id').val(),
                        admin:$('.admin-admin').val(),

                        }

               if(form.parentId==undefined){
                  form.parentId='ROOT'
               }       
      

               var checked=self.checkEmpty($(this).closest('.form_Party').find('input[type=text]'))
                 
               var checkEmail=self.checkEmpty($(this).closest('.form_Party').find('.admin-email'))


               if(checked.state=='false'){
                  alert(checked.message)  
                  return false 
               }
            
               if(checkEmail.state=='false'){
                  alert(checkEmail.message)  
                  return false 
               }


                   if($('.admin-type').val()=='modify'){

                     $.post('/admin/organize/modify',form).then(function (data){

                             if(data.success){
                               $('.admin-contact').val('')
                               $('.admin-phone').val('')
                               $('.admin-address').val('')
                               $('.admin-name').val('')
                               $('.admin-email').val('')
                               $('.admin-username').val(''),
                               $('.admin-admin').val('')
                               $('.admin-id').val('')
                                   alert('修改成功')
                             }else {
                                   alert(data.errMessage)
                             }      
                     })    



                   }else {

                     $.post('/api/organize/add',form).then(function (data){

                             if(data.success){
                               $('.admin-contact').val('')
                               $('.admin-phone').val('')
                               $('.admin-address').val('')
                               $('.admin-name').val('')
                               $('.admin-email').val('')
                               $('.admin-username').val(''),
                               $('.admin-admin').val('')
                               $('.admin-id').val('')
                                   alert('添加成功')
                             }else {
                                   alert(data.errMessage)
                             }      
                     }) 

                   }
                    
                  
          })
                  
}  




Common.prototype.checkEmpty=function (obj){
    var count=0;
    $.each(obj,function (i,val){
        if($(val).val()==''){
            count++
        }
    })

    if(count!=0){
        return {message:'输入框不能为空',state:'false'}
    }else {
        return {message:'',state:'true'}
    }
}

Common.prototype.checkEmail=function (obj){

    if(!this.regEmail.test( obj.val())){
        return {message:'您输入的邮箱有误,请重新输入',state:'false'}
    }else{
        return {message:'',state:'true'}
    }

}

Common.prototype.checkIphone=function (obj){

    if(!this.regIphone.test(obj.val())){
        return {message:'您输入的手机有误,请重新输入',state:'false'}
    }else {
        return {message:'',state:'true'}
    }
}



Common.prototype.countdown=function (obtn){
    obtn.attr('disabled','disabled')
    var _t = 60, _timer = null;

    clearInterval(_timer);
    _timer = setInterval(function(){
        _t--;
        if(_t < 0){
            clearInterval(_timer);
            obtn.removeAttr('disabled').html('重新发送');
            obtn.css({cursor:'pointer'})
            return false;
        }
        if(_t < 10){
            _t = '0'+_t;
        }
        obtn.html(_t+'秒');

    },1000);

}




Common.prototype.setPassword=function (obj){

        $(obj).on('click',function (){
        
             var that=this;
             var form={
                  "newPassword": $('#new-password').val(),
                  "oldPassword": $('#old-password').val()
              }
              $.post('/put/user/password',form).then(function (data){

                    if(data.success){
                  
                      $(that).parent().next().show().html('密码修改成功')

                      setTimeout(function (){
                         $('#modal-password').modal('toggle')
                         $(that).parent().next().hide()
                      },1500)
                    }else{

                     $(that).parent().next().show().html(data.errMessage)
                    }
              })
       })

}

Common.prototype.getChecked=function (){

       var  permissionIds=[]
       var  json={

       }
       
       var name=$.query.get('name');
       var str=$.query.get('permissionIds').toString();

       $('.per_name').val(name)
       if(str.indexOf(',')!=-1){

            permissionIds=$.query.get('permissionIds').split(',');

       }else {
            permissionIds.push(str)
       }
       
       if(permissionIds!='')  {

            permissionIds.forEach(function (item){

                 $('.rolt-user-checked').find('input[type=checkbox]').each(function (index,val){

                   if($(val).attr('data-id')==item){
                      $(val).prop('checked','checked')
                   }

                 })

            })
       }
}


Common.prototype.EmptyInput=function (arr){
    
    
   $('.add_admin_userBtn').on('click',function (){

       for(var i=0;i<arr.length;i++){
          
          $(arr[i]).find('input').val('')

       }

   })


}



Common.prototype.setForm=function (){
    var date=new Date();

    var from= date.getFullYear()+'-'+this.addZero(date.getMonth())+'-'+this.addZero(date.getDate());
    var to=date.getFullYear()+'-'+this.addZero((date.getMonth()+1))+'-'+this.addZero(date.getDate());
  return { from:from,to:to}

}



Common.prototype.setFormDate=function(){

        $('input[name=from]').attr('placeholder',this.setForm().from)
        $('input[name=to]').attr('placeholder',this.setForm().to)

}



//checkbox  uiHelperTableToolsCheckable();


var uiHelperTableToolsCheckable = function() {
    var $table = jQuery('.js-table-checkable');
    var $allCheck=jQuery('#v-all-check');

    jQuery('input:checkbox', $allCheck).click(function() {
        var $checkedStatus = jQuery(this).prop('checked');

        this.bClick=!this.bClick
        if(this.bClick){
            jQuery(this).closest('#v-all-check').addClass('active');
        }else {
            jQuery(this).closest('#v-all-check').removeClass('active');
        }

        jQuery('tbody input:checkbox', $table).each(function() {

            var $checkbox = jQuery(this);
            $checkbox.prop('checked', $checkedStatus);
            uiHelperTableToolscheckRow($checkbox, $checkedStatus);
        });
    });


    jQuery('tbody input:checkbox', $table).click(function() {
        var $checkbox = jQuery(this);


        uiHelperTableToolscheckRow($checkbox, $checkbox.prop('checked'));
    });


    jQuery('tbody > tr', $table).click(function(e) {
        if (e.target.type !== 'checkbox'
            && e.target.type !== 'button'
            && e.target.tagName.toLowerCase() !== 'a'
            && !jQuery(e.target).parent('label').length) {
            var $checkbox       = jQuery('input:checkbox', this);
            var $checkedStatus  = $checkbox.prop('checked');
            console.log(!$checkedStatus)
            $checkbox.prop('checked', ! $checkedStatus);
            uiHelperTableToolscheckRow($checkbox, ! $checkedStatus);
        }
    });
};

var uiHelperTableToolscheckRow = function($checkbox, $checkedStatus) {
    
    if ($checkedStatus) {
        $checkbox
            .closest('tr')
            .addClass('active');
    } else {
        $checkbox
            .closest('tr')
            .removeClass('active');
    }
};













