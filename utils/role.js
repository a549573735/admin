
var nav=require('./rolt_nav');
var _=require('lodash');



module.exports=function (app){



    app.use(function (req,res,next){

       var _user=req.session.user||false

        if(_user){

             if(_user.content.type=="BACKSTAGE"){

                 _user.content.navlist=nav.navData.backStage
            	 
             }else if(_user.content.type=="COMPANY"){

                   _user.content.navlist=null

             }else{
              
               if( _user.content.permissions.length==0)return 

                var dest=[]
               _user.content.permissions.push('manage_level_manage');
          
               nav.navData.subAdmin.forEach(function (item){
 
                   if (_.includes(_user.content.permissions, item.code)){ 

                         dest.push(item)
                   }
               })
               var a={href:'#','parentTitle':'1',title:'组织',list:[]};
               var b=[]

                  dest.forEach(function (item,val){
                      if(item.parentTitle==1){
                           a.list.push(item)
                      }else {
                          b.push(item)
                      }
                  })
                 var c=[a]//
                 var d =c.concat(b)
  
                  if(_user.content.type=="MARKET"){
                       // json.same_level_manage='same_level_manage_PARK'
                      
                        d[0].list.shift();
                  }else  if(_user.content.type=="PARK"){

                        d[0].list=[];
                  }

                  _user.content.navlist=d
              
               }
          }

          var json={publicity:'',suggestion:'',interview:'',appointment:'',network_check:'',same_level_manage:"",company_info:"",publish_notice:""} 

         if(_user ){   
                    if( _user.content.permissions!=null){
                      _user.content.permissions.forEach(function (item){

                              json[item]=item
                            
                      })

                    
                     _user.content.btnPermissions=json;
                }
          }

             //publicity  年报  suggestion  行政建议  interview  行政约谈  appointment 预约检查   network_check 网络检查
       

          app.locals.user=_user
         

       next()

   })



}


