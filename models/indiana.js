var proxy = require("../utils/proxy"),
    config = require('../utils/config');

function Indiana(){}
// ��������(����)
Indiana.questionList = function (args, fn) {
    var arg = {};
    arg.applicationName = 'mengdian.yiyuanduobao-service';
    arg.serviceName = '';
    arg.methodName = '';
    // arg.parameterInput = JSON.stringify(args);
    proxy.invoke({
        data: arg,
        protocol: "http",
        host: config.indianaRaider.host,
        port: config.indianaRaider.port,
        path: "/mengdianApp/duobao/question/list",
        method: "POST",
        keyValue: true,
        contentType: "application/json"
    },function (err, result) {
        fn(err, result);
    });
};

// �ֲ���ƻ��ר��(����)
Indiana.bannerGroup = function (args, fn) {
    var arg = {};
    arg.applicationName = 'mengdian.yiyuanduobao-service';
    arg.BaseAppVersion = '4.1.0';
    arg.channel = 'DuoBaoHome';
    proxy.invoke({
        data: arg,
        protocol: "http",
        host: config.indianaRaider.host,
        port: config.indianaRaider.port,
        path: "/mengdianApp/getPageInfo",
        method:"POST",
        //keyValue: true,
        contentType : "application/json"
    }, function (err, result) {
        fn(err, result);
    });
};

// ��Ʒ�����б�
Indiana.getGoodsGroup = function(args, fn){
    var arg = {};
    arg.applicationName = 'mengdian.yiyuanduobao-service';
    arg.serviceName = 'com.weimob.mengdian.yiyuanduobao.service.GoodsExportService';
    arg.methodName = 'getAllGoodsGroup';
    proxy.invoke({
        data: arg,
        protocol: "http",
        host: config.indiana.host,
        port: config.indiana.port,
        path: "/service",
        method: "POST",
        keyValue: true,
        contentType: "application/json"
    }, function (err, result) {
        fn(err, result);
    });
};


module.exports= Indiana;