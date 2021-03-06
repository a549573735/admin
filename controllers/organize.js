var path = require('path');
var fs = require('fs');
var api_services = require('../models/api_services');
var Services = require('../utils/tool');
var tools = new Services();


exports.organize_company = function (req, res, next) {

    var form = req.body || {};
    form.page = req.body.page || 0;
    form.size = 15;

    switch (req.session.user.content.type) {
        case  'MARKET':
            form.market = req.session.user.content.belongId;
            break;
        case  'PARK':
            form.park = req.session.user.content.belongId;
            break;
    }

    if (req.query.id && req.query.query) {
        form.park = req.query.id;
    }

    api_services.commonRequest('api/app/company/list', 'POST', form,req).then(function (data) {
        var dataContent = null;
        var page = '0'
        if (data.success) {
            data.content.page = Math.ceil(data.content.total / data.content.size);
            dataContent = data.content.content
            page = data.content.page
        }

        var datalist = {
            href: '/organize/details?view=company&id=',
            title: ['企业名称', '企业地址', '所属', '联系人', '联系方式', '经营范围', "操作"],
            content: dataContent,
            style: ['20%', 'auto', '120px', '100px', '100px', '20%', '80px'],
            details: [{_id: '1', msg: '该公司的销售及供应商'}, {_id: '2', msg: '该公司的销售及供应商'}],
            overflow: false,
            page: page

        }
        console.log(data)

        res.render('pages/organize_company', {data: datalist});

    }).catch(function (err) {

        console.log(err)

    })
}


exports.api_organize_company_list = function (req, res, next) {

    var form = req.body || {};
    form.page = req.body.page || 0;
    form.size = 15;

    if (form.park == '0') {
        delete form.park;
    }
    if (form.market == '0') {
        delete form.market;
    }


    api_services.commonRequest('api/app/company/list', 'POST', form,req).then(function (data) {

        var dataContent = null;
        var page = '0'
        if (data.success) {
            data.content.page = Math.ceil(data.content.total / data.content.size);
            dataContent = data.content.content
            page = data.content.page
        }

        var datalist = {
            href: '/organize/details?view=company&id=',
            title: ['企业名称', '企业地址', '所属', '联系人', '联系方式', '经营范围', "操作"],
            content: dataContent || null,
            style: ['20%', 'auto', '120px', '100px', '100px', '20%', '80px'],
            details: [{_id: '1', msg: '该公司的销售及供应商'}, {_id: '2', msg: '该公司的销售及供应商'}],
            overflow: false,
            page: page

        }


        res.json(datalist);
    })
}


exports.organize_market = function (req, res, next) {

    var form = {
        page: req.query.page || 0,
        size: 15
    }

    api_services.commonRequest('api/app/market/all', 'GET', null,req).then(function (data) {

        data.content.page = Math.ceil(data.content.total / data.content.size);
        var datalist = {
            href: '/organize/park?id=',
            title: ['市场所名称', '市场所地址', '联系人', '联系方式', '操作'],
            content: data.content,
            style: ['25%', 'auto', '100px', '15%'],
            details: [{_id: '1', msg: '该公司的销售及供应商'}, {_id: '2', msg: '该公司的销售及供应商'}],
            overflow: false,
            overflow_btn: true

        }
        console.log(data)

        res.render('pages/organize_market', {data: datalist});

    })

}


exports.organize_park_id = function (req, res, next) {

    var id = req.query.id || req.session.user.content.belongId;

    api_services.commonRequest('api/app/market/all', 'GET', null,req).then(function (dataSelect) {
        dataSelect.content.page = Math.ceil(dataSelect.content.total / dataSelect.content.size);
        console.log(dataSelect)

        res.render('pages/organize_park', {select: dataSelect.content});

    }).catch(function (data) {

        console.log(data)
    })

}


exports.api_organize_park_list = function (req, res, next) {

    var id = req.query.id || req.session.user.content.belongId;
    var parkName = encodeURI(req.query.parkname) || '';


    var form = {
        page: req.body.page || req.query.page || 0,
        size: 15
    }
    console.log(form)
    if (id == 'ROOT') {
        id = 'all';
    }


    api_services.commonRequest('api/app/park/' + id + '/' + parkName, 'POST', form,req).then(function (dataSelect) {

        dataSelect.content.page = Math.ceil(dataSelect.content.total / dataSelect.content.size);
        console.log(dataSelect.content)
        res.json(dataSelect)

    }).catch(function (data) {
        console.log(data)
        res.json(data)
    })


}


exports.architecture = function (req, res, next) {


    api_services.commonRequest('api/app/organize/architecture', 'GET', null,req).then(function (dataSelect) {

        console.log(dataSelect)
        var parkall = 0;
        var companyall = 0;
        var marketLeng = 0;
        dataSelect.content.forEach(function (item) {
            parkall += item.parkCount;
            companyall += item.companyCount
        })
        if (dataSelect.content.length >= 4) {
            marketLeng = 4;
        } else {
            marketLeng = dataSelect.content.length
        }

        res.render('pages/architecture', {
            data: dataSelect,
            parkAll: parkall,
            companyAll: companyall,
            marketLeng: marketLeng
        });


    }).catch(function (data) {

        console.log(data)
    })
}


exports.details = function (req, res, next) {

    var id = req.query.id || req.session.user.content.companyId;
    var user = req.session.user.content
    req.session.user.content.lastInspectTime = ""
    var isImgsreg=/\.jpg$|\.jpeg$|\.png$/i;
    var data = {
        data: {
            title: [],
            content: null,
            style: [],
            details: false,
            overflow: false,
        },
        btnlist: [
            {
                href: "/organize/details?view=company&id=" + id + "&market=" + user.marketId + "&park=" + user.parkId + "&belongId=" + user.belongId,
                title: '企业信息',
                active: false
            },
            {
                href: "/organize/details?view=purchase&id=" + id + "&market=" + user.marketId + "&park=" + user.parkId + "&belongId=" + user.belongId,
                title: '采购信息',
                active: false
            },
            {
                href: "/organize/details?view=sale&id=" + id + "&market=" + user.marketId + "&park=" + user.parkId + "&belongId=" + user.belongId,
                title: '销售信息',
                active: false
            },
            {
                href: "/organize/details?view=invoice&id=" + id + "&market=" + user.marketId + "&park=" + user.parkId + "&belongId=" + user.belongId + id,
                title: '发票信息',
                active: false
            },
            {
                href: "/organize/details?view=stock&id=" + id + "&market=" + user.marketId + "&park=" + user.parkId + "&belongId=" + user.belongId,
                title: '库存信息',
                active: false
            },
            {
                href: "/organize/details?view=customer&id=" + id + "&market=" + user.marketId + "&park=" + user.parkId + "&belongId=" + user.belongId + id,
                title: '客户资质',
                active: false
            },
            /*{
                href: "/organize/details?view=producer&id=" + id + "&market=" + user.marketId + "&park=" + user.parkId + "&belongId=" + user.belongId + id,
                title: '生产商资质',
                active: false
            },*/
            {
                href: "/organize/details?view=provider&id=" + id + "&market=" + user.marketId + "&park=" + user.parkId + "&belongId=" + user.belongId,
                title: '供应商资质',
                active: false
            },
            {
                href: "/organize/details?view=product&id=" + id + "&market=" + user.marketId + "&park=" + user.parkId + "&belongId=" + user.belongId,
                title: '产品资质',
                active: false
            }
        ],
        company: false,
        type: 'search',
        pagelist: 1,
        companyName: '',
        searchName: '',
    }
    var form = {
        page: req.query.page || req.body.page || 0,
        size: 15,
        name: req.query.name || req.body.name || ''
    }
    //encodeURIComponent

    var date = new Date();
    form.from = req.query.from || req.body.from || tools.setForm().from;
    form.to = req.query.to || req.body.to || tools.setForm().to;


    switch (req.query.view) {
        case 'company':
            data.company = true;
            data.btnlist[0].active = true;
            api_services.commonRequest('api/app/company/' + id + '/detail', 'GET', null,req).then(function (dataSelect) {
                console.log(dataSelect) 
                if( dataSelect.content.certificateFiles!=null){
                             dataSelect.content.certificateFiles=dataSelect.content.certificateFiles.split(/,/g);
                             dataSelect.content.isImg=[]
                              dataSelect.content.certificateFiles.forEach(function (files){
                                 files=files.replace(/(^\s+)|(\s+$)/g,"")
                                 if(isImgsreg.test(files)){
                                            dataSelect.content.isImg.push(true)
                                         }else {
                                            dataSelect.content.isImg.push(false)
                                   }
                               })
                }
            

                req.session.user.content.companyName = dataSelect.content.name;

                data.data.content = dataSelect.content;
                
                // 控制 权限 公司不加关联
                if (req.query.api == 'true') {
                    res.json(data);
                } else {
                    res.render('pages/details', data);
                }
            }).catch(function (data) {
                console.log(data)
            })
            //同时请求该公司最近一次网络检查时间
            api_services.commonRequest('api/app/inspect/latest/' + user.belongId + '/' + id, "POST", null,req).then(function (dataSelect) {
                // lastInspectTime = dataSelect.content;
                req.session.user.content.lastInspectTime = dataSelect.content;
            }).catch(function (data) {
                 console.log(data)
            })
            break;

               //库存 
         case 'stock':

            data.btnlist[4].active = true;
            data.type = 'date';
          
            api_services.commonRequest('api/app/company/' + id + '/warehouse/list', 'POST', form,req).then(function (dataSelect) {
                console.log(dataSelect)
                if(dataSelect.content){
                        data.pagelist=dataSelect.content.page = Math.ceil(dataSelect.content.total / dataSelect.content.size);
                }
              
                tools.Interface_company({
                        title: ['产品批号', '产品有效期 ','生产日期',  '货品或产品名称', '仓库', '实存数量'],
                        style: ['15%', '15%', '15%', '20%', '10%', '10%']
                    },
                    data.data,
                    dataSelect
                )
                data.data.product = req.session.user.content.type != "COMPANY" ? true : false   // 控制 权限 公司不加关联

                data.data.content.content.forEach(function (item) {
                    for (var name in item) {
                        item[name] += ' '
                    }
                })

                data.searchName = "生产日期";
                if (req.query.api == 'true') {
                    res.json(data);
                } else {
                    res.render('pages/details', data);
                }
            }).catch(function (data) {
                console.log(data)
            })
            break;    


        case 'purchase':

            data.btnlist[1].active = true;
            data.type = 'date';

            api_services.commonRequest('api/app/company/' + id + '/purchase/list', 'POST', form,req).then(function (dataSelect) {
                data.pagelist=dataSelect.content.page = Math.ceil(dataSelect.content.total / dataSelect.content.size);
                console.log(dataSelect.content)
                tools.Interface_company({
                        title: ['采购订单号', '采购日期', '供应商', '经办人', '采购随行单', '总价(元)','备注'],
                        style: ['20%', '20%', '10%', '10%', 'auto','10%', '10%']
                    },
                    data.data,
                    dataSelect
                )
                data.data.product = req.session.user.content.type != "COMPANY" ? true : false   // 控制 权限 公司不加关联

               data.data.content.content.forEach(function (item) {
                    for (var name in item) {
                             item[name] += ' '
                        if(name=='purchaseBill'&&item[name]!=null){
                             item.isImg=[];
                             if(typeof item[name] =='string'){
                                 item[name]=item[name].split(',');
                                  item[name].forEach(function (files){
                                         files=files.replace(/(^\s+)|(\s+$)/g,"")
                                         if(isImgsreg.test(files)){
                                            item.isImg.push(true)
                                         }else {
                                            item.isImg.push(false)
                                         }
                                })
                             }
                        }
                    }
                })
                data.searchName = "采购日期";
                if (req.query.api == 'true') {
                    res.json(data);
                } else {
                    res.render('pages/details', data);
                }
            }).catch(function (data) {
                console.log(data)
            })
            break;
        case 'sale':
            data.btnlist[2].active = true;
            data.type = 'date';
            api_services.commonRequest('api/app/company/' + id + '/sale/list', 'POST', form,req).then(function (dataSelect) {
                data.pagelist=dataSelect.content.page = Math.ceil(dataSelect.content.total / dataSelect.content.size);
                console.log(dataSelect.content)
                tools.Interface_company({
                        title: ['订货单号', '销售日期', '客户企业', '销售代表', '总价(元)','备注'],
                        style: ['20%', '20%', 'auto','10%','10%', '10%']
                    },
                    data.data,
                    dataSelect
                )
                data.data.content.content.forEach(function (item) {
                    for (var name in item) {
                        item[name] += ' '
                    }
                })
                data.searchName = "销售日期";

                data.data.product = req.session.user.content.type != "COMPANY" ? true : false   // 控制 权限 公司不加关联

                if (req.query.api == 'true') {
                    res.json(data);
                } else {
                    res.render('pages/details', data);
                }
            }).catch(function (data) {
                console.log(data)
            })
            break;
        case 'invoice':
            data.btnlist[3].active = true;
            data.type = 'date';
            api_services.commonRequest('api/app/company/' + id + '/invoice/list', 'POST', form,req).then(function (dataSelect) {
                data.pagelist=dataSelect.content.page = Math.ceil(dataSelect.content.total / dataSelect.content.size);
                tools.Interface_company({
                        title: ['发票单号', '开票日期', '发票类别', '客户', '税号', '开票金额', '经办人', '发票单', '备注'],
                        style: ['15%', '10%', '10%', '10%', '15%', '10%', '10%', '10%', '10%']
                    },
                    data.data,
                    dataSelect
                )

               data.data.content.content.forEach(function (item) {
                    for (var name in item) {
                             item[name] += ' '
                        if(name=='invoiceFile'&&item[name]!=null){
                             item.isImg=[];
                             if(typeof item[name] =='string'){
                                 item[name]=item[name].split(',');
                                  item[name].forEach(function (files){
                                         files=files.replace(/(^\s+)|(\s+$)/g,"")
                                         if(isImgsreg.test(files)){
                                            item.isImg.push(true)
                                         }else {
                                            item.isImg.push(false)
                                         }
                                })
                             }
                        }
                    }
                })
                data.searchName = "开票日期";
                data.data.product = req.session.user.content.type != "COMPANY" ? true : false   // 控制 权限 公司不加关联
                if (req.query.api == 'true') {
                    res.json(data);
                } else {
                    res.render('pages/details', data);
                }
            }).catch(function (data) {
                console.log(data)
            })
            break;
        case 'customer':
            data.btnlist[5].active = true;
            data.type = 'search';

            api_services.commonRequest('api/app/company/' + id + '/customer/aptitude/list', 'POST', form,req).then(function (dataSelect) {
                data.pagelist=dataSelect.content.page = Math.ceil(dataSelect.content.total / dataSelect.content.size);
                console.log(dataSelect.content)
                tools.Interface_company({
                        title: ['客户名称', '客户地址', '联系方式', '经营许可证', '许可证文件','经营范围', '许可证截止日期'],
                        style: ['10%', '15%', '10%', '15%','15%', 'auto', '20%']
                    },
                    data.data,
                    dataSelect
                )
                data.data.product = req.session.user.content.type != "COMPANY" ? true : false   // 控制 权限 公司不加关联
              
                data.data.content.content.forEach(function (item) {
                    for (var name in item) {
                             item[name] += ' '
                        if(name=='certificateFiles'&&item[name]!=null){
                             item.isImg=[];
                             if(typeof item[name] =='string'){
                                 item[name]=item[name].split(',');
                                  item[name].forEach(function (files){
                                         files=files.replace(/(^\s+)|(\s+$)/g,"")
                                         if(isImgsreg.test(files)){
                                            item.isImg.push(true)
                                         }else {
                                            item.isImg.push(false)
                                         }
                                })
                             }
                        }
                    }
                })
                console.log( data.data.content.content)

                data.searchName = "客户名称";
                data.data.type = "provider"

                if (req.query.api == 'true') {
                    res.json(data);
                } else {
                    res.render('pages/details', data);
                }
            }).catch(function (data) {
                console.log(data)
            })
            break;
        /*case 'producer':
            data.btnlist[6].active = true;
            data.type = 'search';
            api_services.commonRequest('api/app/company/' + id + '/producer/aptitude/list', 'POST', form,req).then(function (dataSelect) {
                dataSelect.content.page = Math.ceil(dataSelect.content.total / dataSelect.content.size);
                console.log(dataSelect.content)
                tools.Interface_company({
                        title: ['生产商名称', '生产商地址', '联系方式', '生产商许可证', '经营范围', '许可证截止日期'],
                        style: ['15%', '15%', '10%', '20%', 'auto', '20%']
                    },
                    data.data,
                    dataSelect
                )
                data.data.product = req.session.user.content.type != "COMPANY" ? true : false   // 控制 权限 公司不加关联

                data.data.content.content.forEach(function (item) {
                    for (var name in item) {
                        
                        item[name] += ' '
                    }
                })
                data.searchName = "生产商名称";
                data.data.type = "provider"

                if (req.query.api == 'true') {
                    res.json(data);
                } else {
                    res.render('pages/details', data);
                }
            }).catch(function (data) {
                console.log(data)
            })
            break;*/
        case 'provider':
            data.btnlist[6].active = true;
            data.type = 'search';
            api_services.commonRequest('api/app/company/' + id + '/provider/aptitude/list', 'POST', form,req).then(function (dataSelect) {

                if (dataSelect.success) {
                    data.pagelist=dataSelect.content.page = Math.ceil(dataSelect.content.total / dataSelect.content.size);
                }
                
                console.log(dataSelect.content)
                tools.Interface_company({
                        title: ['供应商名称', '供应商地址', '联系方式', '经营许可证','许可证文件', '经营范围', '许可证截止日期'],
                        style: ['15%', '15%', '10%', '15%','15%', 'auto', '20%']
                    },
                    data.data,
                    dataSelect
                )

              data.data.content.content.forEach(function (item) {
                    for (var name in item) {
                        item[name] += ' '
                        item.isImg=[];
                        if(name=='certificateFiles'&&item[name]!=null){
                             if(typeof item[name] =='string'){
                                 item[name]=item[name].split(',');
                                 item[name].forEach(function (files){
                                 files=files.replace(/(^\s+)|(\s+$)/g,"")
                                 if(isImgsreg.test(files)){
                                            item.isImg.push(true)
                                         }else {
                                            item.isImg.push(false)
                                  }
                                })
                             }
                        }
                    }
                })
              console.log( data.data.content.content)


                data.data.product = req.session.user.content.type != "COMPANY" ? true : false   // 控制 权限 公司不加关联

                // 给关联 设置路由
                data.data.type = "provider";
                data.searchName = "供应商名称";
                if (req.query.api == 'true') {
                    res.json(data);
                } else {
                    res.render('pages/details', data);
                }
            }).catch(function (data) {
                console.log(data)
            })
            break;
        case 'product':
            data.btnlist[7].active = true;
            data.type = 'search';

            api_services.commonRequest('api/app/company/' + id + '/product/aptitude/list', 'POST', form,req).then(function (dataSelect) {
                data.pagelist=dataSelect.content.page = Math.ceil(dataSelect.content.total / dataSelect.content.size);
             
                tools.Interface_company({
                        title: ['产品名称', '产品计量单位', '产品规格', '经营范围', '产品注册证号','注册号文件', '注册证有效期'],
                        style: ['15%', '15%', '15%', '10%', '15%','10%','20%']
                    },
                    data.data,
                    dataSelect
                )
               data.data.content.content.forEach(function (item) {
                           for (var name in item) {
                                item[name] += ' '
                           }
                             item.isImg=[];
               }) 

                   
               data.data.content.content.forEach(function (item) {
                    for (var name in item) {
                        if(name=='certificate'){
                            item.certificates=item['certificate'];
                            delete item['certificate']
                        }    
                        if(name=='registerFiles'&&item[name]!=null){
                             if(typeof item[name] =='string'){
                                 item[name]=item[name].split(',');
                                 item['registerFiles'].forEach(function (files){
                                     files=files.replace(/(^\s+)|(\s+$)/g,"")
                                     if(isImgsreg.test(files)){
                                            item.isImg.push(true)
                                       }else {
                                            item.isImg.push(false)
                                      }
                                })
                             }
                        }
                    }
                })
                   console.log(data.data.content.content)
            
            

                data.data.product = req.session.user.content.type != "COMPANY" ? true : false   // 控制 权限 公司不加关联

                data.data.type = "product"
                data.searchName = "产品名称";
                if (req.query.api == 'true') {
                       res.json(data);
                } else {
                    res.render('pages/details', data);
                }
            }).catch(function (data) {
                console.log(data)
            })
            break;
    }
}


//关联接口

exports.api_byProduct = function (req, res, next) {

   console.log(req.body.name)
    var name = encodeURI(req.body.name);

   console.log(name) 

    var form = {
        page: req.body.page || 0,
        size: 15
    }
    //POST /api/app/company/by/product/{name}
    console.log(form)
    api_services.commonRequest('api/app/company/by/product/' + name, 'POST', form,req).then(function (dataSelect) {
        console.log(dataSelect)
        if (dataSelect.success) {
            dataSelect.content.page = Math.ceil(dataSelect.content.total / dataSelect.content.size);
        }
        res.json(dataSelect)
    }).catch(function (data) {
        console.log(data)
        res.json(data)
    })
}


exports.api_byProvider = function (req, res, next) {


    var name = encodeURI(req.body.name);


    var form = {
        page: req.body.page || 0,
        size: 15
    }
    if(form.page<=0){
        form.page=0;
    }
    //POST /api/app/company/by/provider/{name}
    console.log(name)

    api_services.commonRequest('api/app/company/by/provider/' + name, 'POST', form,req).then(function (dataSelect) {
        console.log(dataSelect)
        if(dataSelect.success){
        dataSelect.content.page = Math.ceil(dataSelect.content.total / dataSelect.content.size);
        }
        res.json(dataSelect)


    }).catch(function (data) {

        console.log(data)
        res.json(data)

    })


}


exports.api_appkey = function (req, res, next) {

    var id = req.session.user.content.id;

    api_services.commonRequest('/api/app/company/' + id + '/appKey', 'POST', null,req).then(function (dataSelect) {
        console.log(dataSelect)

        res.json(dataSelect)

    }).catch(function (data) {

        console.log(data)
        res.json(data)

    })
}

exports.api_secret = function (req, res, next) {

    var id = req.session.user.content.id;

    api_services.commonRequest('/api/app/company/' + id + '/secret/generate', 'POST', null,req).then(function (dataSelect) {
        console.log(dataSelect)

        res.json(dataSelect)

    }).catch(function (data) {

        console.log(data)
        res.json(data)

    })
}

// POST /api/app/company/{id}/appKey
// POST /api/app/company/{id}/secret/generate


exports.api_add_organize = function (req, res, next) {

    var form = req.body;


    api_services.commonRequest('api/app/organize/add', 'POST', form,req).then(function (data) {
        console.log(data)
       
        res.json(data)

    }).catch(function (data) {

        console.log(data)
        res.json(data)

    })

}


exports.api_add_company = function (req, res, next) {
    var form = req.body;
    api_services.commonRequest('api/app/company/add', 'POST', form,req).then(function (data) {
        console.log(data)
        res.json(data)
    }).catch(function (data) {
        console.log(data)
        res.json(data)
    })
}


exports.api_invoice = function (req, res, next) {

    var form = req.body;
    ///api/app/company/by/invoice/{id}/{type}
    var json = {
        title: [['类型', '订货单号', '销售日期', '客户企业', '销售代表'], ['类型', '采购订单号', '采购日期', '供应商', '经办人', '采购随行单']],
        style: [['8%', '20%', 'auto', '20%', , '10%'], ['8%', '20%', '12%', 'auto', '10%', '20%']],
        type: form.type
    }
    var reg=/^\s+|\s+$/g;
    form.id=form.id.replace(reg,'');
    var isImgsreg=/\.jpg$|\.jpeg$|\.png$/ig;
    
    api_services.commonRequest('api/app/company/by/invoice/' + form.id + '/' + form.type, 'POST', null,req).then(function (data) {

              data.content.forEach(function (item) {
                    item.isImg= [];
                        for (var name in item) {
                           if(name!='isImg'){
                             item[name] += ' '
                        }                           
                        if(name=='purchaseBill'&&item[name]!=null){
                             if(typeof item[name] =='string'){
                                 item[name]=item[name].split(',');
                                 item[name].forEach(function (files){
                                 files=files.replace(/(^\s+)|(\s+$)/g,"")
                                      if(isImgsreg.test(files)){
                                            item['isImg'].push(true)
                                       }else {
                                            item['isImg'].push(false)
                                      }
                                })
                             }
                        }
                    }
                })
        json.data = data.content
        res.json(json)

    }).catch(function (data) {
        res.json(data)
    })

}

exports.api_saleList = function (req, res, next) {

        var id=req.body.id;
        api_services.commonRequest('api/app/company/sale/'+id+'/product/list', 'POST', null,req).then(function (data) {

        if(data.content!=null){        
            data.content.forEach(function (item) {
                for (var name in item) {
                    if(item[name]=="null"||item[name]==null)item[name]="";
                    item[name] += ' '
                }
            })
        }
        console.log(data)
        res.json(data)

    }).catch(function (data) {
        res.json(data)
    })

}

exports.api_purchaseList = function (req, res, next) {

        var id=req.body.id;
        api_services.commonRequest('api/app/company/purchase/'+id+'/product/list', 'POST', null,req).then(function (data) {
        if(data.content!=null){            
            data.content.forEach(function (item) {
                for (var name in item) {
                    if(item[name]=="null"||item[name]==null)item[name]="";
                    item[name] += '   '
                }
            })
        }     
        console.log(data)
        res.json(data)

    }).catch(function (data) {
        res.json(data)
    })

}







