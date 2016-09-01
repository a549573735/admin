var router = require("./router"),
    group_ctr = require('../../controllers/group');

var c_index=require('../../controllers/admin')
 

	router.get('/group/market_list', function(req, res, next) {
	    res.render('group/market_list', {
	        title: '首页',
	        pageName: '平台页'
	    });
	});

	router.get('/data', c_index.data);  
	
	router.get('/common', c_index.index);       	    //公共模块   企业详情

	router.get('/zxp',c_index.zxp);

	router.get('/company/scs',c_index.dwgl_scs);			//单位管理 市场所

	router.get('/company/yq', c_index.dwgl_yq);             //单位管理 园区

	router.get('/admin/edit', c_index.jsgl_bjgly);			 //角色管理 编辑

	router.get('/admin/add', c_index.jsgl_zjyh);			 //角色管理 增加 

	router.get('/login', c_index.login);					 //登陆页面

	router.get('/annal/list', c_index.nbgs_lb);			 //年报公示列表

	router.get('/company', c_index.qiyejinru);				 //企业进入

	router.get('/region/qy', c_index.qjjr_qy); 			//区局进入 企业

	router.get('/region/qyjy', c_index.qjjr_qyjy);             //区局进入 企业建议
	
	router.get('/region', c_index.qijujinru);					  //区局进入

	router.get('/network/list', c_index.wljc_lb);                 //网络检查列表

	router.get('/administration/suggest/list', c_index.xzjy_lb);   //行政建议列表

	router.get('/administration/talks/list', c_index.xzyt_lb);    //行政约谈列表

	router.get('/admin/user/list', c_index.yhlb_bjyh);   //用户编辑列表

	router.get('/admin/user/add', c_index.yhlb_zjyh);   //用户添加
 
	router.get('/park', c_index.yqjr_qy); 				 // 园区进入

	router.get('/park/annual', c_index.yqnb_gslb);      // 园区年报 公示列表

	router.get('/order/list', c_index.yyjc_lb);         //预约列表




module.exports = router;