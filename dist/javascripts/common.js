function Common(obj) {
    this.obj = $(obj);
    this.uiInit = {
        $lHtml: jQuery('html'),
        $lBody: jQuery('body'),
        $lhead: jQuery('#c-header'),
        $lMain: jQuery('#c-content'),
        $lFooter: jQuery('#c-footer'),
        $lUMessage: jQuery('#u-message'),
        $lUserBtn: jQuery('#u-btn'),
        $lDate: jQuery('.input-daterange').add('.js-datepicker'),
        $lMinModal: jQuery('.v-modal-min'),
        $lMinBtn: jQuery('.v-min-toggle'),
        $lNav: jQuery('.c-list'),
        $appKeyBtn: jQuery('#appkey-btn'),
        $againSecret: jQuery('#again_secret')
    };
    this.regIphone = /^1\d{10}$/i;
    this.regEmail = /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/;
    this.listDown();
    this.contentHeight();
    this.userMessage();
    this.inputDate();
    this.minModal();
    this.setNavActive();
    this.sendMessage('.suggestion-btn', '#tables', '#val-suggestion', null, '/api/suggestion/msg', null, '.v-modal-min', '.v-msg', '.park-belongId_s');
    this.sendMessage('.interview-btn', '#tables', '#val-interview', '#select-interview', '/api/interview/msg', null, '.v-modal-min', '.v-msg', '.park-belongId_iv');
    this.sendMessage('.appointment-btn', '#tables', '#val-appointment', null, '/api/appointment/msg', '#date-appointment', '.v-modal-min', '.v-msg', '.park-belongId_ap');
    this.sendMessage('.inspect-qualified-btn', '#tables', '#val-qualified', null, '/api/inspect/qualified/msg', null, '.v-modal-min', '.v-msg', '.park-belongId_it');
    this.sendMessage('.inspect-qualified-btn2', '#tables', null, null, '/api/inspect/qualified/msg', null, null, null, null);
    this.getAppkey();
    this.againSecret();
    this.addParty();
    this.setPassword('.model-password-btn');
    this.EmptyInput([
        '#modal-addParty',
        '#modal-addCompany'
    ]);
    this.uiInit.$lMinBtn.attr('bclick', false);
    this.setFormDate();
}
Common.prototype.listDown = function (obj) {
    this.obj.on('click', function () {
        if (!$(this).next().hasClass('open')) {
            $(this).find('i').attr('class', 'icon-caret-down');
            $(this).next().addClass('open');
        } else {
            $(this).find('i').attr('class', 'icon-caret-right');
            $(this).next().removeClass('open');
        }
    });
};
Common.prototype.contentHeight = function () {
    var $hWindow = jQuery(window).height();
    var $hHeader = this.uiInit.$lhead.outerHeight();
    var $hFooter = this.uiInit.$lFooter.outerHeight();
    var $hMain = this.uiInit.$lMain.outerHeight();
    if ($hMain + $hHeader + $hFooter < $hWindow) {
        var $lh = $hWindow - $hFooter - $hHeader;
        this.uiInit.$lMain.css({
            'min-height': $lh - 50,
            'margin-bottom': '50px'
        });
    }
    this.uiInit.$lMain.css({ 'margin-bottom': '50px' });
    this.uiInit.$lFooter.css('visibility', 'inherit');
};
Common.prototype.userMessage = function () {
    this.uiInit.$lUserBtn.on('click', function () {
        this.bclick = !this.bclick;
        $.get('/user/verify').then(function (data) {
            console.log(data);
            $('.sm_dian').html(data.content.messageCount);
        });
        if (this.bclick) {
            $(this).next().show();
        } else {
            $(this).next().hide();
        }
    });
};
Common.prototype.inputDate = function () {
    this.uiInit.$lDate.datepicker({
        language: 'zh-CN',
        weekStart: 1,
        autoclose: true,
        todayHighlight: true,
        format: 'yyyy-mm-dd'
    });
};
Common.prototype.minModal = function () {
    this.uiInit.$lMinBtn.on('click', function () {
        var that = this;
        $(this).parent().siblings('.v-item-btn').children('.v-modal-min').hide();
        $(this).parent().siblings('.v-item-btn').children('.v-min-toggle').attr('bclick', false);
        $(this).closest('.v-item-btn').find('.v-msg').hide();
        $(this).closest('.v-item-btn').find('textarea').val('');
        if ($(this).attr('bclick') == 'false') {
            $(this).next().show().animate({ opacity: '1' });
            $(that).attr('bclick', true);
        } else {
            $(this).next().animate({ opacity: '0' }, function () {
                $(this).hide();
                $(that).attr('bclick', false);
            });
        }
    });
};
Common.prototype.setNavActive = function () {
    var href = window.location.pathname;
    var query = window.location.search;
    var view = $.query.get('view');
    if (href == '/user/admin/add') {
        href = '/user/edit/list';
    } else if (view) {
        href = '/organize/company';
    } else if (href == '/user/add') {
        href = '/user/role/list';
    }
    this.uiInit.$lNav.find('li a').each(function (index, val) {
        if ($(val).attr('href').split('?')[0] == href) {
            $(val).addClass('active');
            if ($(val).parent()[0].tagName !== 'LI') {
                $(val).parent().parent().prev().find('i').attr('class', 'icon-caret-down');
                $(val).parent().parent().addClass('open');
            }
        }
    });
};
Common.prototype.sendMessage = function (obj, table, textarea, select, href, date, parent, success, checked) {
    var self = this;
    $(obj).on('click', function () {
        var id = $.query.get('id');
        var type = 'COMPANY';
        var targetList = [];
        $(table).find('input[type=checkbox]:checked').each(function (index, val) {
            targetList.push($(val).val());
        });
        var _type = $(table).find('input[type=checkbox]:checked').attr('data-type');
        var form = {
            suggestion: $(textarea).val(),
            target: targetList.length > 0 ? targetList : id,
            type: _type ? _type : type,
            period: $(select).val(),
            inspectDate: $(date).val(),
            notes: $(textarea).val(),
            status: $(this).attr('data-status'),
            ccPark: $(checked).prop('checked') ? true : false
        };
        var that = this;
        $.post(href, form).then(function (data) {
            if (data.success) {
                $(that).closest(parent).find(success).html('\u63D0\u4EA4\u6210\u529F').show();
                $(that).closest('.v-modal-min').hide().prev().attr('bclick', 'false');
                alert('\u63D0\u4EA4\u6210\u529F');
            } else {
                $(that).closest(parent).find(success).html(data.errMessage).show();
                alert('\u63D0\u4EA4\u5931\u8D25' + data.errMessage);
            }
        });
    });
};
Common.prototype.addZero = function (obj) {
    return obj = obj > 9 ? obj : '0' + obj;
};
Common.prototype.setForm = function () {
    var date = new Date();
    var from = date.getFullYear() + '-' + this.addZero(date.getMonth()) + '-' + this.addZero(date.getDate());
    var to = date.getFullYear() + '-' + this.addZero(date.getMonth() + 1) + '-' + this.addZero(date.getDate());
    return {
        from: from,
        to: to
    };
};
Common.prototype.getAppkey = function () {
    this.uiInit.$appKeyBtn.on('click', function () {
        $.get('/api/app/company/appKey').then(function (data) {
            $('.appkey').html(data.content.appKey);
            $('.secret').html(data.content.secret);
        });
    });
};
Common.prototype.againSecret = function () {
    this.uiInit.$againSecret.on('click', function () {
        $.get('/api/app/company/secret/generate').then(function (data) {
            $('.secret').html(data.content);
        });
    });
};
Common.prototype.addParty = function (form) {
    var self = this;
    $('.admin-add-btn').on('click', function () {
        var form = {
            parentId: $('.select_park').val() == 'all' ? '' : $('.select_park').val(),
            name: $('.admin-name').val(),
            phone: $('.admin-phone').val(),
            contact: $('.admin-contact').val(),
            address: $('.admin-address').val(),
            username: $('.admin-username').val(),
            mail: $('.admin-email').val(),
            id: $('.admin-id').val(),
            admin: $('.admin-admin').val()
        };
        if (form.parentId == undefined) {
            form.parentId = 'ROOT';
        }
        var checked = self.checkEmpty($(this).closest('.form_Party').find('input[type=text]'));
        var checkEmail = self.checkEmpty($(this).closest('.form_Party').find('.admin-email'));
        if (checked.state == 'false') {
            alert(checked.message);
            return false;
        }
        if (checkEmail.state == 'false') {
            alert(checkEmail.message);
            return false;
        }
        if ($('.admin-type').val() == 'modify') {
            $.post('/admin/organize/modify', form).then(function (data) {
                if (data.success) {
                    $('.admin-contact').val('');
                    $('.admin-phone').val('');
                    $('.admin-address').val('');
                    $('.admin-name').val('');
                    $('.admin-email').val('');
                    $('.admin-username').val(''), $('.admin-admin').val('');
                    $('.admin-id').val('');
                    alert('\u4FEE\u6539\u6210\u529F');
                } else {
                    alert(data.errMessage);
                }
            });
        } else {
            $.post('/api/organize/add', form).then(function (data) {
                if (data.success) {
                    $('.admin-contact').val('');
                    $('.admin-phone').val('');
                    $('.admin-address').val('');
                    $('.admin-name').val('');
                    $('.admin-email').val('');
                    $('.admin-username').val(''), $('.admin-admin').val('');
                    $('.admin-id').val('');
                    alert('\u6DFB\u52A0\u6210\u529F');
                } else {
                    alert(data.errMessage);
                }
            });
        }
    });
};
Common.prototype.checkEmpty = function (obj) {
    var count = 0;
    $.each(obj, function (i, val) {
        if ($(val).val() == '') {
            count++;
        }
    });
    if (count != 0) {
        return {
            message: '\u8F93\u5165\u6846\u4E0D\u80FD\u4E3A\u7A7A',
            state: 'false'
        };
    } else {
        return {
            message: '',
            state: 'true'
        };
    }
};
Common.prototype.checkEmail = function (obj) {
    if (!this.regEmail.test(obj.val())) {
        return {
            message: '\u60A8\u8F93\u5165\u7684\u90AE\u7BB1\u6709\u8BEF,\u8BF7\u91CD\u65B0\u8F93\u5165',
            state: 'false'
        };
    } else {
        return {
            message: '',
            state: 'true'
        };
    }
};
Common.prototype.checkIphone = function (obj) {
    if (!this.regIphone.test(obj.val())) {
        return {
            message: '\u60A8\u8F93\u5165\u7684\u624B\u673A\u6709\u8BEF,\u8BF7\u91CD\u65B0\u8F93\u5165',
            state: 'false'
        };
    } else {
        return {
            message: '',
            state: 'true'
        };
    }
};
Common.prototype.countdown = function (obtn) {
    obtn.attr('disabled', 'disabled');
    var _t = 60, _timer = null;
    clearInterval(_timer);
    _timer = setInterval(function () {
        _t--;
        if (_t < 0) {
            clearInterval(_timer);
            obtn.removeAttr('disabled').html('\u91CD\u65B0\u53D1\u9001');
            obtn.css({ cursor: 'pointer' });
            return false;
        }
        if (_t < 10) {
            _t = '0' + _t;
        }
        obtn.html(_t + '\u79D2');
    }, 1000);
};
Common.prototype.setPassword = function (obj) {
    $(obj).on('click', function () {
        var that = this;
        var form = {
            'newPassword': $('#new-password').val(),
            'oldPassword': $('#old-password').val()
        };
        $.post('/put/user/password', form).then(function (data) {
            if (data.success) {
                $(that).parent().next().show().html('\u5BC6\u7801\u4FEE\u6539\u6210\u529F');
                setTimeout(function () {
                    $('#modal-password').modal('toggle');
                    $(that).parent().next().hide();
                }, 1500);
            } else {
                $(that).parent().next().show().html(data.errMessage);
            }
        });
    });
};
Common.prototype.getChecked = function () {
    var permissionIds = [];
    var json = {};
    var name = $.query.get('name');
    var str = $.query.get('permissionIds').toString();
    $('.per_name').val(name);
    if (str.indexOf(',') != -1) {
        permissionIds = $.query.get('permissionIds').split(',');
    } else {
        permissionIds.push(str);
    }
    if (permissionIds != '') {
        permissionIds.forEach(function (item) {
            $('.rolt-user-checked').find('input[type=checkbox]').each(function (index, val) {
                if ($(val).attr('data-id') == item) {
                    $(val).prop('checked', 'checked');
                }
            });
        });
    }
};
Common.prototype.EmptyInput = function (arr) {
    $('.add_admin_userBtn').on('click', function () {
        for (var i = 0; i < arr.length; i++) {
            $(arr[i]).find('input').val('');
        }
    });
};
Common.prototype.setForm = function () {
    var date = new Date();
    var from = date.getFullYear() + '-' + this.addZero(date.getMonth()) + '-' + this.addZero(date.getDate());
    var to = date.getFullYear() + '-' + this.addZero(date.getMonth() + 1) + '-' + this.addZero(date.getDate());
    return {
        from: from,
        to: to
    };
};
Common.prototype.setFormDate = function () {
    $('input[name=from]').attr('placeholder', this.setForm().from);
    $('input[name=to]').attr('placeholder', this.setForm().to);
};
var uiHelperTableToolsCheckable = function () {
    var $table = jQuery('.js-table-checkable');
    var $allCheck = jQuery('#v-all-check');
    jQuery('input:checkbox', $allCheck).click(function () {
        var $checkedStatus = jQuery(this).prop('checked');
        this.bClick = !this.bClick;
        if (this.bClick) {
            jQuery(this).closest('#v-all-check').addClass('active');
        } else {
            jQuery(this).closest('#v-all-check').removeClass('active');
        }
        jQuery('tbody input:checkbox', $table).each(function () {
            var $checkbox = jQuery(this);
            $checkbox.prop('checked', $checkedStatus);
            uiHelperTableToolscheckRow($checkbox, $checkedStatus);
        });
    });
    jQuery('tbody input:checkbox', $table).click(function () {
        var $checkbox = jQuery(this);
        uiHelperTableToolscheckRow($checkbox, $checkbox.prop('checked'));
    });
    jQuery('tbody > tr', $table).click(function (e) {
        if (e.target.type !== 'checkbox' && e.target.type !== 'button' && e.target.tagName.toLowerCase() !== 'a' && !jQuery(e.target).parent('label').length) {
            var $checkbox = jQuery('input:checkbox', this);
            var $checkedStatus = $checkbox.prop('checked');
            console.log(!$checkedStatus);
            $checkbox.prop('checked', !$checkedStatus);
            uiHelperTableToolscheckRow($checkbox, !$checkedStatus);
        }
    });
};
var uiHelperTableToolscheckRow = function ($checkbox, $checkedStatus) {
    if ($checkedStatus) {
        $checkbox.closest('tr').addClass('active');
    } else {
        $checkbox.closest('tr').removeClass('active');
    }
};