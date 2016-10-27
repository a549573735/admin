 var Promise = require('bluebird');
var request = Promise.promisify(require('request'));
var config = require('../utils/config')
var api_services = require('../models/api_services');


exports.interface = function (req, res, next) {

    var form = req.body || {};
    form.page = req.body.page || req.query.page || 0;
    form.size = 15;

    if (req.query.id) {
        form.park = req.query.id
    }


    api_services.commonRequest('api/app/company/list/new', 'POST', form).then(function (data) {

        var content = null;
        if (data.success) {
            data.content.page = Math.ceil(data.content.total / data.content.size);
            content = data.content.content
        }

        var datalist = {
            href: '/organize/details?view=company&id=',
            title: ['企业名称', '用户名', '邮箱', '联系人', '联系方式', "操作"],
            content: content,
            style: ['20%', '10%', 'auto', '80px', '10%', '24%'],
            overflow: false,
            page: data.content.page,
            btns: true,


        }

        res.render('pages/admin', {data: datalist});
    })
}


exports.admin_market = function (req, res, next) {        //单位管理  市场所

    var form = {
        page: req.query.page || 0,
        size: 15
    }

    api_services.commonRequest('api/app/market/all', "GET", null).then(function (data) {

        console.log(data)
        var content = null;
        if (data.success) {

            data.content.page = Math.ceil(data.content.total / data.content.size);

            content = data.content
        }


        var datalist = {
            href: '/organize/park?id=',
            title: ['市场所名称', '市场所地址', '用户名', '邮箱', '联系人', '联系方式', '操作'],
            content: content,
            style: ['15%', '15%', '8%', 'auto', '80px', '5%', '40%'],
            details: [{_id: '1', msg: '该公司的销售及供应商'}, {_id: '2', msg: '该公司的销售及供应商'}],
            overflow: false,
            overflow_btn: false,
            btns: true

        }


        res.render('pages/admin_market', {data: datalist});

    }).catch(function (err) {

        console.log(err)

    })

}


exports.admin_park = function (req, res, next) {


    api_services.commonRequest('api/app/market/brief/all', "GET", null).then(function (data) {

        var content = null;
        if (data.success) {

            data.content.page = Math.ceil(data.content.total / data.content.size);

        }


        res.render('pages/admin_park', {dataSelect: data.content});

    }).catch(function (err) {

        console.log(err)

    })


}


exports.admin_company = function (req, res, next) {

    var form = req.body || {};
    form.page = req.body.page || req.query.page || 0;
    form.size = 15;

    if (req.query.id) {
        form.park = req.query.id || req.body.id;
    }
    form.park = form.park == 0 ? '' : form.park
    form.market = form.market == 0 ? '' : form.market


    api_services.commonRequest('api/app/company/list/new', 'POST', form).then(function (data) {

        console.log(data.content)
        data.content.page = Math.ceil(data.content.total / data.content.size);

        var datalist = {
            href: '/organize/details?view=company&id=',
            title: ['企业名称', '用户名', '邮箱', '联系人', '联系方式', "操作"],
            content: data.content.content,
            style: ['20%', '10%', 'auto', '80px', '10%', '24%'],
            overflow: false,
            page: data.content.page,
            btns: true,
            details: true
        }

        res.json({data: datalist});
    }).catch(function (err) {
        console.log(err)
    })

}


// POST /api/app/organize/modify

exports.admin_modify_organize = function (req, res, next) {        //单位管理  市场所


    var form = req.body


    api_services.commonRequest('api/app/organize/modify', "POST", form).then(function (data) {

        console.log(data.content)

        res.json(data);

    }).catch(function (err) {

        console.log(err)

    })

}


exports.admin_modify_company = function (req, res, next) {        //单位管理  市场所

    var form = req.body

    api_services.commonRequest('api/app/company/modify', "POST", form).then(function (data) {

        console.log(data.content)

        res.json(data);

    }).catch(function (err) {
        console.log(err)
    })
}

exports.admin_delete_company = function (req, res, next) {        //单位管理  市场所

    var form = req.body

    api_services.commonRequest('api/app/company/delete?id='+form.id, "DELETE",null).then(function (data) {
        console.log(data.content)

        res.json(data);

    }).catch(function (err) {
        console.log(err)
    })
}


exports.admin_delete_park = function (req, res, next) {        //单位管理  市场所

    var form = req.body

    api_services.commonRequest('api/app/organize/delete/park?id='+form.id, "DELETE",null).then(function (data) {
        console.log(data)

        res.json(data);

    }).catch(function (err) {
        console.log(err)
    })
}


exports.admin_delete_market = function (req, res, next) {        //单位管理  市场所

    var form = req.body
    api_services.commonRequest('api/app/organize/delete/market?id='+form.id, "DELETE",null).then(function (data) {
        console.log(data)
        res.json(data);

    }).catch(function (err) {
        console.log(err)
    })
}





