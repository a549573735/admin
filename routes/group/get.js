var router = require("./router"),
    group_ctr = require('../../controllers/group');

var Index=require('../../controllers/index')
var Region=require('../../controllers/regional')
var User=require('../../controllers/user')
var Company=require('../../controllers/company');

 

	router.get('/group/market_list', function(req, res, next) {
	    res.render('group/market_list', {
	        title: '首页',
	        pageName: '平台页',
	        data:'11'
	    });
	});

	
	
	router.get('/', Index.index);                  	    //公共模块   企业详情

 	router.get('/common', Index.common);               //公共模块

	router.get('/company', Company.qiyejinru);				 //企业进入

	router.get('/company/market',Company.company_market);			//单位管理 市场所



	router.get('/company/yq', Company.dwgl_yq);             //单位管理 园区




  	router.get('/login', User.login);		            //登陆页面

	router.get('/user/edit', User.jsgl_bjgly);			 //角色管理 编辑

	router.get('/admin/user/add', User.jsgl_zjyh);			 //角色管理 增加 

  	router.get('/user/list', User.yhlb_bjyh);   //用户编辑列表

	router.get('/user/add', User.yhlb_zjyh);   //用户添加





	router.get('/region/qy', Region.qjjr_qy); 			//区局进入 企业

	router.get('/region/yq', Region.qjjr_yq); 	        //企业进入园区

	router.get('/region/qyjy', Region.qjjr_qyjy);             //区局进入 企业建议
	 
    router.get('/region/scs', Region.qjjr_scs);         //   区局进入 市车所 
	 
	router.get('/region', Region.qujujinru);					  //区局进入




	router.get('/annal/list', Index.nbgs_lb);			 //年报公示列表

	router.get('/inspect/list', Index.inspect);                 //网络检查列表

	router.get('/suggestion/list', Index.suggestion);   //行政建议列表

	router.get('/interview/list', Index.interview);    //行政约谈列表


    

	router.get('/park', Index.yqjr_qy); 				 // 园区进入

	router.get('/park/annual', Index.yqnb_gslb);      // 园区年报 公示列表

	router.get('/order/list', Index.yyjc_lb);         //预约列表

	module.exports = router


