define(function (require, exports, module) {


	    var Vue = require('lib_cmd/vue-cmd');

	    require("/js_cmd/components/paging");
	    require('/js_cmd/components/companytable/tabs_content_s')
	    require('/js_cmd/components/companytable/tabs_content_d')
	    require('/js_cmd/components/companytable/tabs_btn')

	    new Vue({
	         'el':'#app',
	         data:{

	         	modalMsg:{title:[],content:{content:[{}]}},

	         	modalList:[],
	         	page:'',
	         	href:'',
	         	name:'',
	         	type:'',

	         },
	         methods:{

	         	  setDate:function (){
	         	  
	         	  	 $('input[name=view]').val($.query.get('view'));
	         	  	 $('input[name=id]').val($.query.get('id'));
	         	  }(),
	         	  getDate:function (){
 						 $('#date-form').submit()
	         	  },
	         	  getName:function (){

	         	  	  $('#search-form').submit()
	         	  },
	         	  getRelation:function (event,href){

 					 var name=$(event.target).attr('data-name');
 					 var that=this;	
 					 this.href=href;
 					 this.name=name;
 					 console.log(href)
	 
 					 $.post(href,{name:name,page:this.page}).then(function (data){

 					 		console.log(JSON.stringify(data))
 					 		if(data.success){
 					 			that.page=data.content.page
								that.modalList=data.content;
								that.modalList.title=['公司名称','公司地址','联系方式','经营许可证','经营范围','许可证截止日期']
								that.modalList.style=['10%','15%','10%','20%','auto','20%']

 					 		}else {
 					 			alert(data.errMessage)
 					 		}
 					 })
	         	  		
	         	  },
	         	   showMsg:function (event){
                       event.target.bclick=!event.target.bclick   
                       if(event.target.bclick){ 
                         console.log($(event.target))
                         $(event.target).siblings('span').css('overflow','inherit')
                         $(event.target).html('收起')
                        /*  备注弹框  */
                        }else {
                           $(event.target).siblings('span').css('overflow','hidden')
                           $(event.target).html('详情')
                        }
                   },
                   appointment:function (){

                   	    Common.sendMessage('.interview-btn-all','#tables-all',null,'#select-interview-all','/api/interview/msg','.v-modal-min-all','#v-msg');

                   }()

	         },
	         events:{
	         	"send-modal-msg":function (data){
	         	
	         		var reg=/id$/i
	         		this.href=data.data.href
	  				this.type=data.data.type
	          
	         		if(data.data.content.content.length<=0)return 
	         		var keys=Object.keys(data.data.content.content[0]);
	         		
	         		console.log(keys)
	         		for(var i=0;i<keys.length;i++){
	         			if(reg.test(keys[i])){
	         				keys.splice(i,1)
	         			}
	         		}
	         		data.data.content.keys=keys;

	         		if(this.type=='product'){

	         			data.data.content.title=['产品名称','经营范围','规格','产品注册号','产品计量单位','过期时间']
	         		
	         		}else{

	         			data.data.content.title=['供应商名称','地址','电话号码','产品注册号','过期时间','经营范围']
	         			
	         		}
	         		
	         		this.modalMsg=data.data;
	         		console.log(this.modalMsg.content.content[0].name)
	         	},
	         	"send-page":function (data){

	         			this.page=data-1
	         			var that=this;

	         			 $.post(this.href,{name:this.name,page:this.page}).then(function (data){

 					 		console.log(JSON.stringify(data))
 					 		if(data.success){
 					 			that.page=data.content.page
								that.modalList=data.content;
								that.modalList.title=['公司名称','公司地址','联系方式','经营许可证','经营范围','许可证截止日期']
								that.modalList.style=['10%','15%','10%','20%','auto','20%']

 					 		}else {
 					 			alert(data.errMessage)
 					 		}
 					   })
	         	}
	         }
	    });


	  
 })
   