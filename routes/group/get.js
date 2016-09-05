var router = require("./router");

var Index=require('../../controllers/index')
var Organize=require('../../controllers/organize')
var User=require('../../controllers/user')
var Company=require('../../controllers/company');
var Park=require('../../controllers/park');



 

	router.get('/', Index.index);                  		     	    //公共模块   企业详情

 	router.get('/common', Index.common);             				 //公共模块

	router.get('/company', Company.company);						 //企业进入

	router.get('/company/market',Company.company_market);			//单位管理 市场所

	router.get('/company/park', Company.company_park);             //单位管理 园区 列表
    
 


  	router.get('/login', User.login);		             //登陆页面

  	router.get('/login_img', User.login_img);	

	router.get('/user/edit', User.user_edit);			 //角色管理 编辑
  
	router.get('/user/admin/add', User.user_admin_add);		 //角色管理 增加 

  	router.get('/user/edit/list', User.user_edit_list);       //用户编辑列表

	router.get('/user/add', User.user_add);   			 //用户添加




	router.get('/organize/company', Organize.organize_company); 			//区局进入 企业
    
    router.get('/organize/company/:id', Organize.organize_company); 

	router.get('/organize/park', Organize.organize_park); 	        //企业进入园区
	
    router.get('/organize/market', Organize.organize_market);         //   区局进入 市车所 

    router.get('/organize/park/:id', Organize.organize_park);       // 详情 to 园区
	 
    router.get('/organize/architecture',Organize.architecture)     //组织架构

    router.get('/organize/details/:id',Organize.details)     //企业详情
    
  
    



	router.get('/publicity/list', Index.publicity);			 //年报公示列表

	router.get('/inspect/list', Index.inspect);                 //网络检查列表

	router.get('/suggestion/list', Index.suggestion);   //行政建议列表

	router.get('/interview/list', Index.interview);    //行政约谈列表

	router.get('/appointment/list', Index.appointment);         //预约列表

 

	router.get('/park', Park.park_index); 				  // 园区进入

	router.get('/park/publicity', Park.park_publicity);          // 园区年报 公示列表






	module.exports = router


