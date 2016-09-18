
/**
 * Created by lixiang on 16/8/26.
 */


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
          this.sendMessage('.suggestion-btn','#tables','#val-suggestion',null,'/api/suggestion/msg',null,'.v-modal-min','.v-msg');    //建议
          this.sendMessage('.interview-btn','#tables','#val-interview','#select-interview','/api/interview/msg',null,'.v-modal-min','.v-msg');    //约谈
          this.sendMessage('.appointment-btn','#tables','#val-appointment',null,'/api/appointment/msg','#date-appointment','.v-modal-min','.v-msg');    // 预约

          this.sendMessage('.inspect-qualified-btn','#tables','#val-qualified',null,'/api/inspect/qualified/msg',null,'.v-modal-min','.v-msg');  //不合格  
          this.sendMessage('.inspect-qualified-btn2','#tables',null,null,'/api/inspect/qualified/msg',null,null,null); 

          this.getAppkey();  //获取appkey
          this.againSecret();
          this.addParty();

          this.setPassword('.model-password-btn');//修改密码
         

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
        var $hMain     = this.uiInit.$lMain.outerHeight();

        if($hMain+$hHeader+$hFooter<$hWindow){
            var $lh=$hWindow-$hFooter-$hHeader;
            this.uiInit.$lMain.css({'min-height':$lh-50,'margin-bottom':'50px'});
        }

            this.uiInit.$lMain.css({'margin-bottom':'50px'});
            this.uiInit.$lFooter.css('visibility','inherit');

    }

    Common.prototype.userMessage=function () {

        this.uiInit.$lUserBtn.on('click',function (){

            this.bclick= !this.bclick;

           if(this.bclick){
               $(this).next().show()
           }else {
               $(this).next().hide()
           }

        })
    }

    Common.prototype.inputDate=function () {

        this.uiInit.$lDate.datepicker({
            language: 'zh-CN',
            weekStart: 1,
            autoclose: true,
            todayHighlight: true,
            format: 'yyyy-mm-dd'   //yyyy-mm-dd

        })

    }
    Common.prototype.minModal=function () {

         this.uiInit.$lMinBtn.on('click',function (){
            $(this).closest('.v-item-btn').find('.v-msg').hide()
            $(this).closest('.v-item-btn').find('textarea').val('')
             this.bclick=!this.bclick;
            if(this.bclick){
             
              $(this).next().show().animate({opacity:'1'})

            }else {

               $(this).next().animate({opacity:'0'},function (){
                    $(this).hide()
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
         }

           this.uiInit.$lNav.find('li a').each(function (index,val){
                
                 if($(val).attr('href')==href){
                     $(val).addClass('active');
                      if($(val).parent()[0].tagName!=='LI'){
                          $(val).parent().parent().prev().find('i').attr('class','icon-caret-down')
                           $(val).parent().parent().addClass('open')
                      }
                 }


           })
    }


  Common.prototype.sendMessage=function (obj,table,textarea,select,href,date,parent,success) {
      var self=this;
        $(obj).on('click',function(){
             
              var id=$.query.get('id')
              var type="COMPANY"
              var targetList=[];
            
              $(table).find('input[type=checkbox]:checked').each(function (index,val){
                    targetList.push($(val).val())
              })
              console.log(targetList)

              var _type=$(table).find('input[type=checkbox]:checked').attr('data-type')
              var form={
                  suggestion:$(textarea).val(),
                  target:targetList.length>0?targetList:id,
                  type:_type?_type:type,
                  period:$(select).val(),
                  inspectDate:$(date).val(),
                  notes:$(textarea).val(),
                  status:$(this).attr('data-status')
                 
              }
              console.log(form)
              var that=this

             $.post(href,form).then(function (data){

                    if(data.success){
                       $(that).closest(parent).find(success).html('提交成功').show()
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
 Common.prototype.addParty=function (){
            
         
         $('.admin-add-btn').on('click',function (){

                var form={
                        parentId:$('.select_park').val()||"ROOT",
                        name:$('.admin-name').val(),
                        phone:$('.admin-phone').val(),
                        contact:$('.admin-concat').val(),
                        address:$('.admin-address').val()
                   }

                   $.post('/api/organize/add',form).then(function (data){

                             if(data.success){
                               $('.admin-concat').val('')
                               $('.admin-phone').val('')
                               $('.admin-address').val('')
                               $('.admin-name').val('')
                                   alert('添加成功')
                             }else {
                                   alert('添加失败')
                               }      
                   }) 
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


    var  permissionIds=$.query.get('permissionIds').split(',');
    
    $('.rolt-user-checked').find('input[type=checkbox]').each(function (index,val){

          permissionIds.forEach(function (item){

               if($(val).attr('data-id')==item){
                  $(val).prop('checked','checked')
               }

          })

    })

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













