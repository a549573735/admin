
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
                $lNav               : jQuery('.c-list')
          };

          this.listDown();
          this.contentHeight();
          this.userMessage();
          this.inputDate();
          this.minModal();
          this.setNavActive();

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
            format: 'yyyy-mm'   //yyyy-mm-dd

        })

    }
    Common.prototype.minModal=function () {

         this.uiInit.$lMinBtn.on('click',function (){
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
       var reg=/^\/organize\/details\/\w+$/;
     
       if(href=='/user/admin/add'){
           href="/user/edit/list"
       }else if(reg.test(href)){
          
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






