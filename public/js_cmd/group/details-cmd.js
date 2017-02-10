define(function (require, exports, module) {


	    var Vue = require('lib_cmd/vue-cmd');

	    require("/js_cmd/components/paging");
	    require('/js_cmd/components/companytable/tabs_content_s')
	    require('/js_cmd/components/companytable/tabs_content_d')
	    require('/js_cmd/components/companytable/tabs_invoice')
	    require('/js_cmd/components/companytable/tabs_btn')

	    new Vue({
	         'el':'#details',
	         data:{
	         	modalMsg:{title:[],content:{content:[{}]}},
	         	modalList:[],
	         	page:'0',
	         	href:'',
	         	name:'',
	         	type:'',
	         	invoice:{title:[],style:[],content:[],type:''},
	            purchase_sale_List:{title:[],style:[],content:[],type:''},
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
 				
 					 $.post(href,{name:name,page:'0'}).then(function (data){

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
                         $(event.target).siblings('span').css({'overflow':'inherit','display':'inline'})

                         $(event.target).html('收起')
                        /*  备注弹框  */
                        }else {
						$(event.target).siblings('span').css({'overflow':'hidden','display':'inline-block'})
                           $(event.target).html('详情')
                        }
                   },
                   appointment:function (){
                        
                   	    Common.sendMessage('.interview-btn-all','#tables-all',null,'#select-interview-all','/api/interview/msg','.v-modal-min-all','#v-msg',null,null,'false');

                   }(),
                   getModalMsg:function (event){
                   $('#modal-purchase-sale').modal('toggle');		
                   	 if(event.target.tagName=='DIV')return   
                      var _id=$.query.get('id');
                      var view=$.query.get('view')
                      var _name=$(event.target).text().trim()
                      var that=this;
                      var reg=/id$/i
                     // $('.all-check').removeAttr('checked');
                     $('#v-all-check').removeClass('active')
                     if($(event.target).attr('data-producerId')){
                         view='product'
                         this.type='product'
                         this.href='/api/app/company/by/product';
                     }else  if($(event.target).attr('data-customerId')){
                         this.href='/api/app/company/by/provider'; 
                         view='provider'
                         this.type='provider'
                     }else {
                        this.href='/api/app/company/by/product'; 
                        view='product'
                        this.type='product'
                     }
      
                     $.get('/organize/details?view='+view+'&id='+_id+'&name='+_name+'&api=true').then(function (data){
	                        data.data.content.name=_name;
	                        data.data.href=that.href;
	                        data.data.type=that.type;
	              			//console.log(JSON.stringify(data))
				         		if(data.data.content.content.length<=0)return 
				         		var keys=Object.keys(data.data.content.content[0]);
				         		
				         		for(var i=0;i<keys.length;i++){
				         			if(reg.test(keys[i])){
				         				keys.splice(i,1)
				         			}
				         		}
				         		data.data.content.keys=keys;
				         		if(that.type=='product'){
				         			data.data.content.title=['产品名称','经营范围','规格','产品注册号','产品计量单位','过期时间','生产企业','企业许可证号']
				         		}else{
				         			data.data.content.title=['供应商名称','地址','电话号码','产品注册号','过期时间','经营范围']
				         		}
	                            that.modalMsg=data.data
                        })
                }  
	         },
	         events:{
	         	"send-modal-msg":function (data){
	     
	         		var reg=/id$/i
	         		this.href=data.data.href
	  				this.type=data.data.type
	  				//console.log(data)
	         		if(data.data.content.content.length<=0)return 
	         		var keys=Object.keys(data.data.content.content[0]);
	         		//console.log(keys)
	         		for(var i=0;i<keys.length;i++){
	         			if(reg.test(keys[i])){
	         				keys.splice(i,1)
	         			}
	         		}
	         		data.data.content.keys=keys;
	         		if(this.type=='product'){
	         			data.data.content.title=['产品名称','经营范围','规格','产品注册号','产品计量单位','过期时间','生产企业','企业许可证号']
	         		}else{
	         			data.data.content.title=['供应商名称','地址','电话号码','产品注册号','过期时间','经营范围']
	         		}
	         		// data.data.forEach(function (item,name){
	         		// 		console.log(item)
	         		// })
	         		this.modalMsg=data.data;
	         	},
	         	"send-page":function (data){

	         			this.page=data-1
	         			var that=this;

	         			 $.post(this.href,{name:this.name,page:this.page}).then(function (data){

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
	         	"send-invoice":function (data){
 					 var type=data.type.replace(/^\s+|\s+$/g,"");
 					 if(type=="SALE"){
							this.invoice.title=data.title[0];
							this.invoice.style=data.style[0];
							this.invoice.content=data.data
							this.invoice.type='销售'

 					 }else {
 					 	    this.invoice.title=data.title[1];
							this.invoice.style=data.style[1];
							this.invoice.content=data.data
							this.invoice.type='采购'
						
 					 }
 					 console.log(JSON.stringify(this.invoice))
	         	},
	         	"send-purchase-sale-list":function (data){
	         			this.purchase_sale_List=data;
	         	}
	         }
	    });


	  
 })
   
