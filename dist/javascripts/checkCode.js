seajs.use('/lib/bootstrap.min.js');
seajs.use('/lib/bootstrap-datepicker.zh-CN.js');
function getStyle(obj, attr) {
    if (obj.currentStyle) {
        return obj.currentStyle[attr];
    } else {
        return document.defaultView.getComputedStyle(obj, null)[attr];
    }
}
function json2css(json) {
    function itemFormat(item) {
        var c = item.indexOf('_');
        if (c > 0) {
            if (c < item.length - 1) {
                item = item.split('_').join('-');
                return item;
            }
        } else {
            var chars = [];
            for (var i = 0; i < item.length; i++) {
                chars.push(item.charAt(i));
            }
            for (var i = 1; i < chars.length - 1; i++) {
                if (chars[i].charCodeAt(0) >= 65 && chars[i].charCodeAt(0) <= 90) {
                    chars[i] = '-' + chars[i].toLowerCase();
                }
            }
            return chars.join('');
        }
    }
    var str = [];
    for (var item in json) {
        var _item = item;
        item = itemFormat(item);
        str.push(item + ':' + json[_item]);
    }
    return str.join(';');
}
var codes = {
    setNumRange: function (min, max) {
        var r = 0;
        if (!isNaN(min) && !isNaN(max)) {
            var min = Math.round(min);
            var max = Math.round(max);
            r = max - min;
            return Math.floor(Math.random() * (r + 1)) + min;
        }
    },
    getColor: function () {
        var r = Math.floor(Math.random() * 256 * 256 * 256).toString(16);
        while (r.length < 6) {
            r = '0' + r;
        }
        return '#' + r;
    },
    getChar: function () {
        var chars = 'abcdefghijklmnopqrstuvwxyz';
        var i = Math.floor(Math.random() * 26);
        return chars.charAt(i);
    },
    getNum: function () {
        return Math.floor(Math.random() * 10);
    },
    getNumRange: function (min, max) {
        return this.setNumRange(min, max);
    }
};
var codeRender = {
    renderBG: function (obj) {
        var bg = codes.getColor();
    },
    renderLayout: function (obj, len) {
        var codeHeight = obj.offsetHeight;
        var objWidth = obj.offsetWidth;
        if (getStyle(obj, 'borderLeftWidth') != '') {
            codeHeight = codeHeight - 2;
            objWidth = objWidth - 2;
        }
        var codeWidth = Math.floor(objWidth / len);
        var cssJson = {
            width: codeWidth + 'px',
            lineHeight: codeHeight + 'px',
            float: 'left',
            textAlign: 'center'
        };
        for (var i = 0; i < len; i++) {
            var codeLay = document.createElement('div');
            codeLay.style.cssText = json2css(cssJson);
            obj.appendChild(codeLay);
        }
    },
    getCodes: function () {
        var code = '';
        if (codes.getNumRange(0, 1)) {
            code = codes.getChar();
            if (codes.getNumRange(0, 1)) {
                code = code.toUpperCase();
            }
        } else {
            code = codes.getNum();
        }
        return code;
    },
    renderCode: function (code) {
        var colors = codes.getColor();
        var fs = codes.getNumRange(20, 28) + 'px';
        var skewDeg = codes.getNumRange(-60, 60) + 'deg';
        var codeCssJson = {
            color: colors,
            font_size: fs,
            '-webkit-transform': 'skew(' + skewDeg + ')',
            '-moz-transform': 'skew(' + skewDeg + ')',
            '-ms-transform': 'skew(' + skewDeg + ')',
            '-o-transform': 'skew(' + skewDeg + ')'
        };
        if (codes.getNumRange(0, 1)) {
            codeCssJson.fontWeight = 'bold';
        }
        code.style.cssText += json2css(codeCssJson);
    }
};
function CheckCode(j) {
    this.obj = j.obj;
    this.codesLen = j.codesLen || 4;
}
CheckCode.prototype.renderCode = function () {
    codeRender.renderBG(this.obj);
    codeRender.renderLayout(this.obj, this.codesLen);
    var code = this.obj.getElementsByTagName('div');
    for (var i = 0; i < code.length; i++) {
        code[i].innerHTML = codeRender.getCodes();
        codeRender.renderCode(code[i]);
    }
};
CheckCode.prototype.render = function () {
    this.renderCode();
};
CheckCode.prototype.refresh = function () {
    this.obj.innerHTML = '';
    this.renderCode();
};
CheckCode.prototype.getCodes = function () {
    var codestr = '';
    var code = this.obj.getElementsByTagName('div');
    for (var i = 0; i < code.length; i++) {
        codestr += code[i].innerHTML;
    }
    return codestr;
};