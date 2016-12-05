var path = require('path');
var fs = require('fs');
var api_services = require('../models/api_services');
var config = require('../utils/config')
var permission = require('../utils/premission')
var md5 = require('md5');
var Promise = require('bluebird');



exports.login = function (req, res, next) {

    res.render('pages/login', {});

};


/*  用户登录 */
exports.loginUp = function (req, res, next) {

    var data = req.body;
    data.password = md5(data.password)

    var str = 'username=' + data.username + '&password=' + data.password;

    api_services.loginUp('api/app/user/verify', 'POST', str,req).then(function (data) {
       
        // data=JSON.parse(data);
        if (data.body.success) {
            //console.log(data)
            // config.saveUserMsg(str);
            
            req.session.user = data.body
            console.log(req.session.user)
            req.session.user.lastSessionId=data.headers.latesttoken;
            req.session.user.userMsg = str
            config.headers['User-Token'] = data.body.content.id;
            res.json({msg: '登录成功', state: true, type: req.session.user.content.type, data: req.session.user.content})

        } else {
            //
            res.json({msg: '用户名密码错误', state: false})
        }

    }).catch(function (err) {

        console.log(err)

    })

}


/* 用户登出*/
exports.signOut = function (req, res, next) {

    delete req.session.user;

    res.redirect('/')

}


/* 判断用户是否登录 */
exports.signRequired = function (req, res, next) {

    var user = req.session.user;

    if (!user) {
        res.redirect('/')
    }
    next()

}
// POST /api/app/user/verify

exports.userVerify = function (req, res, next) {

    var str = req.session.user.userMsg;

    api_services.loginUp('api/app/user/verify', 'POST', str,req).then(function (data) {
        if (data.body.success) {
            req.session.user.content.messageCount = data.body.content.messageCount
        }
        console.log(data)
        res.json(data.body)
    }).catch(function (err) {
        console.log(err)
    })

}


/*获取用户列表*/

exports.user_edit_list = function (req, res, next) {

    //user/edit/list
    var belongId = req.body.belongId || req.session.user.content.belongId;


    api_services.commonRequest('api/app/role/' + belongId + '/list', "GET", null,req).then(function (data) {

        if (data.content.page) {
            data.content.page = Math.ceil(data.content.total / data.content.size);
        }
        res.render('pages/user_edit_list', data);

    }).catch(function (err) {

        console.log(err)

        res.render('pages/user_edit_list', {msg: '用户权限列表服务器错误', state: false});


    })


}


exports.api_user_edit_list = function (req, res, next) {

    var _id = req.query.id || req.session.user.content.belongId

    var page = req.query.page

    var data = {
        "page": page || 0,
        "size": 15
    }


    api_services.commonRequest('api/app/user/' + _id + '/list', "POST", data,req).then(function (data) {

        data.content.page = Math.ceil(data.content.total / data.content.size);
        console.log(data.content)
        res.json(data)

    }).catch(function (err) {

        console.log(err)
        res.json({msg: '用户列表服务器错误', state: false})

    })

}


/* 获取用户权限列表*/

exports.user_add = function (req, res, next) {

    var type = req.body.type || "DISTRICT";


    res.render('pages/user_add');

}


/* 权限列表 用户权限列表*/

exports.user_add_list = function (req, res, next) {

    var type = req.body.type || "DISTRICT";

    api_services.commonRequest('api/app/role/permission/' + type + '/list', "GET", null,req).then(function (data) {

        data.content.page = Math.ceil(data.content.total / data.content.size);
        res.json(data);


    }).catch(function (err) {

        console.log(err)
        res.json({msg: '用户权限列表服务器错误', state: false})

    })
}


exports.user_role = function (req, res, next) {

    res.render('pages/user_role_list');


}


/* 权限列表 用户权限列表*/

exports.user_admin_add = function (req, res, next) {

    var belongId = req.body.belongId || req.session.user.content.belongId;


    api_services.commonRequest('api/app/role/' + belongId + '/list', "GET", null,req).then(function (data) {
        if (data.content.page) {
            data.content.page = Math.ceil(data.content.total / data.content.size);
        }
        res.render('pages/user_admin_add', data);

    }).catch(function (err) {

        console.log(err)

        res.render('pages/user_admin_add', {msg: '用户权限列表服务器错误', state: false});


    })

}


exports.api_admin_role = function (req, res, next) {

    var type = req.body.type || "DISTRICT";

    api_services.commonRequest('api/app/role/' + type + '/list', "GET", null,req).then(function (data) {

        data.content.page = Math.ceil(data.content.total / data.content.size);
        res.json(data);

    }).catch(function (err) {

        console.log(err)


    })


}


/* 添加用户 */

exports.Post_add_user = function (req, res, next) {

    var form = req.body;
    // console.log(form)
    // form.belongId=form.type!='DISTRICT'?req.session.user.content.id:form.belongId
    form.belongId = req.session.user.content.belongId
   

    api_services.commonRequest('api/app/user/add', "POST", form,req).then(function (data) {

        //data.content.page=Math.ceil(data.content.total/data.content.size);
        res.json(data)

    }).catch(function (err) {
        console.log(err)
        // res.json({msg:'服务器用户添加错误',state:false})

    })


}


exports.delete_user = function (req, res, next) {

    var arr = []

    var data = req.body['user[]'];
    if (typeof data == 'string') {
        arr.push(data)
    } else {
        arr = data
    }

    api_services.commonRequest('api/app/user/delete', "DELETE", arr,req).then(function (data) {

        //data.content.page=Math.ceil(data.content.total/data.content.size);
        console.log(data)
        res.json(data)

    }).catch(function (err) {

        res.json({msg: '服务器用户添加错误', state: false})

    })

}


exports.put_user = function (req, res, next) {

    var data = req.body;

    api_services.commonRequest('api/app/user/modify', "PUT", data,req).then(function (data) {
        console.log(data)
        //data.content.page=Math.ceil(data.content.total/data.content.size);
        res.json(data)

    }).catch(function (err) {

        res.json({msg: '服务器用户更新错误', state: false})

    })

}


/* 修改密码*/
exports.put_user_password = function (req, res, next) {

    var form = req.body
    form.newPassword = md5(form.newPassword);
    form.oldPassword = md5(form.oldPassword);
    form.id = req.session.user.content.id;


    api_services.commonRequest('api/app/user/password/modify', "PUT", form,req).then(function (data) {
        console.log(data)
        var str = req.session.user.userMsg.split(/password=/g)[0];
        str += 'password=' + form.newPassword
        req.session.user.userMsg = str;
        // data.content.page=Math.ceil(data.content.total/data.content.size);
        console.log(req.session.user.userMsg)
        res.json(data)

    }).catch(function (err) {

        res.json({msg: '服务器用户更新错误', state: false})

    })

}


/*重置密码*/
//PUT /api/app/user/{id}/password/reset

exports.reset_user_password = function (req, res, next) {


    var id = req.body.id

    console.log(req.body)

    api_services.commonRequest('api/app/user/' + id + '/password/reset', "PUT", null,req).then(function (data) {
        console.log(data)
        res.json(data)

    }).catch(function (err) {
        console.log(err)
        res.json(err)
    })

}


exports.add_role = function (req, res, next) {

    var data = {
        name: req.body.name,
        permissionIds: [],
        type: req.body.type,
        belongId: req.session.user.content.belongId
    }

    if (typeof req.body['permissionIds[]'] == 'string') {
        data.permissionIds.push(req.body['permissionIds[]'])

    } else {
        data.permissionIds = req.body['permissionIds[]']
    }


    api_services.commonRequest('api/app/role/add', "POST", data,req).then(function (data) {
        console.log(data)
        data.content.page = Math.ceil(data.content.total / data.content.size);
        res.json(data)

    }).catch(function (err) {

        res.json({msg: '服务器用户更新错误', state: false})

    })

}


/*  修改角色权限 */
exports.modify_role = function (req, res, next) {

    var data = {
        name: req.body.name,
        permissionIds: [],
        type: req.body.type,
        id: req.body.id || req.session.user.content.id,
        belongId: req.body.belongId

    }

    if (typeof req.body['permissionIds[]'] == 'string') {
        data.permissionIds.push(req.body['permissionIds[]'])

    } else {

        data.permissionIds = req.body['permissionIds[]']

    }


    api_services.commonRequest('api/app/role/modify', "PUT", data,req).then(function (data) {

        console.log(data)
        res.json(data)

    }).catch(function (err) {

        res.json({msg: '服务器用户更新错误', state: false})

    })


}


exports.user_role_list = function (req, res, next) {

    var belongId = req.body.belongId


    api_services.commonRequest('api/app/role/' + belongId + '/list', "GET", null,req).then(function (data) {

        if (data.content.page) {
            data.content.page = Math.ceil(data.content.total / data.content.size);
        }
        //data.permission=permission
        console.log(data)
        res.json(data);


    }).catch(function (err) {

        console.log(err)
        res.json({msg: '用户权限列表服务器错误', state: false})

    })
}

//DELETE /api/app/role/delete
exports.delete_user_role = function (req, res, next) {

    var arr = []

    console.log(req.body)

    var data = req.body['id[]'];
    if (typeof data == 'string') {
        arr.push(data)
    } else {
        arr = data
    }


    api_services.commonRequest('api/app/role/delete', "DELETE", arr,req).then(function (data) {

        res.json(data)

    }).catch(function (err) {


        res.json({msg: '服务器用户添加错误', state: false})

    })

}


//POST /api/app/user/{id}/messages

exports.get_user_messages = function (req, res, next) {

    var _id = req.session.user.content.id
    var form = {
        page: req.query.page || 0,
        size: 15
    }


    api_services.commonRequest('api/app/user/' + _id + '/messages', "POST", form,req).then(function (data) {
        if (data.success) {
            data.content.page = Math.ceil(data.content.total / data.content.size);
        }

            console.log(data.content)
        res.json(data)

    }).catch(function (err) {


        console.log(err)

    })

}


exports.read_user_messages = function (req, res, next) {


    var id = req.query.id;


    api_services.commonRequest('api/app/user/message/' + id + '/read', "POST", null,req).then(function (data) {

      
        res.json(data)

    }).catch(function (err) {

        res.json(err)

    })

}


// PUT /api/app/code/by/name/{username}

exports.get_user_name = function (req, res, next) {
    var name = req.body.name;
    api_services.loginUp('api/app/code/by/name/' + name, "PUT", null,req).then(function (data) {
        res.json(data.body)
      
    }).catch(function (err) {
        res.json(err)
    })
}


///api/app/user/modify/password/by/code

exports.modify_user_password = function (req, res, next) {

    var form = req.body;
    form.password = md5(form.password)
    console.log(form)
    api_services.loginPassword('api/app/user/modify/password/by/code', "PUT", form,req).then(function (data) {
        console.log(data)
        res.json(data)
    }).catch(function (err) {
        res.json(err)
    })

}










