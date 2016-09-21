
var Index=require('../controllers/index')
var Organize=require('../controllers/organize')
var User=require('../controllers/user')
var Admin=require('../controllers/admin');
var Park=require('../controllers/park');
var Market=require('../controllers/market');
var request=require('request');
var config=require('../utils/config')



 module.exports=function (app){

	//app.get('/common', Index.common);            //公共模块   企业详情    	 //公共模块
	
	app.get('/',  Index.home);        

 	app.get('/login', User.login);		             //登陆页面

    app.get('/signout',User.signOut)                //登出

    app.post('/loginUp', User.loginUp);               // 用户登录 提交用户名
          		     	 
 

	app.get('/admin/interface/list', User.signRequired,  Admin.interface);						 //后台进入

	app.get('/admin/market', User.signRequired,Admin.admin_market);			//单位管理 后台 市场所

	app.get('/admin/park', User.signRequired,  Admin.admin_park);             //单位管理  后台 园区 列表
    
    app.post('/admin/company', User.signRequired,  Admin.admin_company);             //单位管理  后台 园区 列表
  
     
    app.post('/admin/organize/modify',User.signRequired,  Admin.admin_modify_organize)  //修改园区和市场
	
    app.post('/admin/company/modify',User.signRequired,  Admin.admin_modify_company)  //修改公司



    app.get('/user/verify',User.signRequired, User.userVerify); 



	app.get('/user/role/list',User.signRequired,  User.user_role);			 //角色管理 编辑
    
    app.post('/api/user/role/list',User.signRequired,  User.user_role_list)

  
	app.get('/user/admin/add',User.signRequired,  User.user_admin_add);		 //角色管理 增加 

  	app.get('/user/edit/list',User.signRequired,  User.user_edit_list);       //用户编辑列表页面

	app.get('/api/user/edit/list',User.signRequired,  User.api_user_edit_list);  //用户编辑列表
  
	app.get('/user/add',User.signRequired,  User.user_add);   			 //用户添加
    
    //app.get('/user/modify',User.signRequired,  User.user_modify);     

    app.post('/app/role/delete',User.signRequired,  User.delete_user_role)

    app.post('/api/admin/role/list',User.signRequired,User.api_admin_role)    

	app.post('/user/add/list',User.signRequired, User.user_add_list);   //动态传输 用户权限列表

    app.post('/user/admin/add',User.signRequired, User.Post_add_user);   //添加用户个人信息

    

    app.post('/delete/user',User.signRequired, User.delete_user);   //添加用户个人信息

    app.post('/put/user',User.signRequired, User.put_user);   //修改用户个人信息

    app.post('/put/user/password',User.signRequired, User.put_user_password);   //修改用户密码

    app.post('/reset/user/password',User.signRequired, User.reset_user_password);   //重置密码


    app.post('/user/add/role',User.signRequired, User.add_role);      //增加 角色 权限

    app.post('/api/user/role/modify',User.signRequired,User.modify_role);  //修改 角色 权限




    app.get('/user/messages/list',User.signRequired, User.get_user_messages);   //获取用户消息列表


    app.post('/api/app/code/by/name/',User.signRequired, User.get_user_name)









 


    app.get('/organize/market',User.signRequired,  Organize.organize_market);         //   区局进入 市车所 
    
    app.get('/organize/architecture',User.signRequired, Organize.architecture)     //组织架构

    app.get('/organize/details',User.signRequired, Organize.details)     //企业详情
    

    app.get('/organize/park',User.signRequired,  Organize.organize_park_id);         //企业进入园区     // 详情 to 园区
    
    app.get('/api/organize/park/list',User.signRequired, Organize.api_organize_park_list)  
    		

    app.get('/organize/company',User.signRequired,  Organize.organize_company); //区局进入 企业
    
    app.post('/api/organize/company/list',User.signRequired, Organize.api_organize_company_list)  

  

    app.get('/company/select',User.signRequired, Index.companySelect)

	app.get('/publicity/list',User.signRequired,  Index.publicity);			 //年报公示列表
    
    app.post('/add/publicity',User.signRequired,  Index.add_publicity);          //增加年报公示

	app.get('/api/publicity/list',User.signRequired,  Index.api_publicity);			 //年报公示列表


	app.get('/inspect/list',User.signRequired,  Index.inspect);                 //网络检查列表

	app.get('/api/inspect/list',User.signRequired,  Index.api_inspect);  //




	app.get('/suggestion/list',User.signRequired,  Index.suggestion);   //行政建议列表

	app.get('/api/suggestion/list',User.signRequired,  Index.api_suggestion);   //行政建议列表

	app.post('/api/suggestion/msg',User.signRequired,  Index.api_suggestion_msg);   //行政建议


	app.get('/interview/list',User.signRequired,  Index.interview);    //行政约谈列表

	app.post('/api/interview/list',User.signRequired,  Index.api_interview);    //行政约谈列表

    app.post('/api/interview/msg',User.signRequired, Index.api_interview_msg);    //行政约谈列表



	app.get('/appointment/list',User.signRequired,  Index.appointment);         //预约列表

	app.get('/api/appointment/list',User.signRequired,  Index.api_appointment);  //

    app.post('/api/appointment/msg',User.signRequired,  Index.api_appointment_msg);   //预约列表


   


    app.post('/api/inspect/qualified/msg',User.signRequired,  Index.api_inspect_qualified_msg);   //预约列表





    app.post('/api/appointment/confirm',User.signRequired, Index.put_appointment_messages)     //回复预约 

    app.post('/api/interview/confirm',User.signRequired, Index.put_interview_messages)         //回复约谈 

    app.get('/api/read/message',User.signRequired, User.read_user_messages)                    //回复 已读

   




    app.get('/park/all/:id', User.signRequired, Park.parkAll); 	

    app.get('/park/briefall/:id', User.signRequired, Park.parkBriefAll); 	

	app.get('/market/all',User.signRequired,Market.marketAll) ;         // 所有市场所信息

	app.get('/market/brief',User.signRequired,Market.marketBriefAll)       //所有市场所 简介 用作调 select 

     





    app.post('/api/app/company/by/product',User.signRequired,Organize.api_byProduct)       //关联接口 产品

	app.post('/api/app/company/by/provider',User.signRequired,Organize.api_byProvider)       //关联接口 供应商

    app.get('/api/app/company/appKey',User.signRequired,Organize.api_appkey)       //获取appKEY

    app.get('/api/app/company/secret/generate',User.signRequired,Organize.api_secret)       //获取appKEY





    app.post('/api/organize/add',User.signRequired,Organize.api_add_organize)       //获取appKEY 

    app.post('/api/company/add',User.signRequired, Organize.api_add_company)       //获取appKEY 

}





