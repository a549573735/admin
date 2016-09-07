
var Index=require('../controllers/index')
var Organize=require('../controllers/organize')
var User=require('../controllers/user')
var Company=require('../controllers/company');
var Park=require('../controllers/park');
var request=require('request');
var config=require('../utils/config')




 module.exports=function (app){


	app.get('/',  Index.home);        

 	app.get('/login', User.login);		             //登陆页面

    app.get('/signout',User.signOut)                //登出

    app.post('/loginUp', User.loginUp);               // 用户登录 提交用户名
          		     	 
  



 	app.get('/common', Index.common);            //公共模块   企业详情    	 //公共模块

	app.get('/company',User.signRequired,  Company.company);						 //企业进入

	app.get('/company/market',User.signRequired, Company.company_market);			//单位管理 市场所

	app.get('/company/park',User.signRequired,  Company.company_park);             //单位管理 园区 列表
    
     


	
	app.get('/user/edit',User.signRequired,  User.user_edit);			 //角色管理 编辑
  
	app.get('/user/admin/add',User.signRequired,  User.user_admin_add);		 //角色管理 增加 

  	app.get('/user/edit/list',User.signRequired,  User.user_edit_list);       //用户编辑列表

	app.get('/user/add',User.signRequired,  User.user_add);   			 //用户添加
    
   

	app.post('/user/add/list',User.signRequired, User.user_add_list);   //动态传输 用户权限列表




	app.get('/organize/company',User.signRequired,  Organize.organize_company); 			//区局进入 企业
    
    app.get('/organize/company/:id',User.signRequired,  Organize.organize_company); 

	app.get('/organize/park',User.signRequired,  Organize.organize_park); 	        //企业进入园区
	
    app.get('/organize/market',User.signRequired,  Organize.organize_market);         //   区局进入 市车所 

    app.get('/organize/park/:id',User.signRequired,  Organize.organize_park);       // 详情 to 园区
	 
    app.get('/organize/architecture',User.signRequired, Organize.architecture)     //组织架构

    app.get('/organize/details/:id',User.signRequired, Organize.details)     //企业详情
    
  
    

	app.get('/publicity/list',User.signRequired,  Index.publicity);			 //年报公示列表

	app.get('/inspect/list',User.signRequired,  Index.inspect);                 //网络检查列表

	app.get('/suggestion/list',User.signRequired,  Index.suggestion);   //行政建议列表

	app.get('/interview/list',User.signRequired,  Index.interview);    //行政约谈列表

	app.get('/appointment/list',User.signRequired,  Index.appointment);         //预约列表

 

	app.get('/park', User.signRequired, Park.park_index); 				  // 园区进入

	app.get('/park/publicity',User.signRequired,  Park.park_publicity);          // 园区年报 公示列表


}





