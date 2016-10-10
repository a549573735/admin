
var Promise=require('bluebird');
var request=Promise.promisify(require('request'));
var config=require('../utils/config')
var Services=require('../utils/tool');
var tools=new Services();


var api_services=require('../models/api_services');



exports.home=function(req,res,next){
     
      res.redirect('/login');
     
}


exports.publicity = function(req, res, next) {
   
    var id=req.session.user.content.id;

    var form={
         page:0,
         size:50
    }

    switch(req.session.user.content.type){
          case 'MARKET':
          form.market=req.session.user.content.id;
          break;
          case 'PARK':
          form.park=req.session.user.content.id;
          break;
    }


    api_services.commonRequest('api/app/company/list/new','POST',form).then(function (dataSelect){
            
             console.log(dataSelect)
             //dataSelect.content.page=Math.ceil(dataSelect.content.total/dataSelect.content.size); 
             res.render('pages/publicity',{dataSelect:dataSelect});

        
    }).catch(function (data){
              console.log(data)

              res.render('pages/publicity',{dataSelect:dataSelect});
    })


}



exports.companySelect = function(req, res, next) {
   
    var id=req.query.id

    var form={
         page:0,
         size:50,
         park:id,
    }

    api_services.commonRequest('api/app/company/list/new','POST',form).then(function (dataSelect){
            
             console.log(dataSelect)
             //dataSelect.content.page=Math.ceil(dataSelect.content.total/dataSelect.content.size); 
             res.json({dataSelect:dataSelect});

        
    }).catch(function (data){
              console.log(data)

            
    })


}




exports.api_publicity=function (req,res,next){
     var date=new Date()
     var time=tools.setForm()
     var form= {
              "page":req.query.page||'0',
              "size":15,
              "type":req.query.type||"COMPANY",
              "market":req.query.market==0?'':req.query.market ||'',
              "company":req.query.company ||'',
              "park":req.query.park==0?'':req.query.park||'',
              "from":req.query.from||req.body.from||time.from,
               "to":req.query.to||req.body.to||time.to,
               "belongId":req.session.user.belongId
              }
      
       if(form.market==''){
          delete form.market
       }      
       if(form.park==''){
          delete form.park
       }    
    
    api_services.commonRequest('api/app/publicity/list','POST',form).then(function (dataSelect){
             //dataSelect.content.page=Math.ceil(dataSelect.content.total/dataSelect.content.size); 
             console.log(dataSelect)
             res.json(dataSelect)

    }).catch(function (data){
             console.log(data)
             res.json(data)
    })

}


exports.add_publicity=function (req,res,next){

      var form=req.body;

        form.user=req.session.user.content.id;

        api_services.commonRequest('api/app/publicity/add','POST',form).then(function (dataSelect){
             //dataSelect.content.page=Math.ceil(dataSelect.content.total/dataSelect.content.size); 
             console.log(dataSelect)
             res.json(dataSelect)

    }).catch(function (data){
             console.log(data)
             res.json(data)
    })


}





exports.api_publicity_msg=function (req,res,next){

       var form=req.body;
       form.targets=[];   
       form.user=req.session.user.content.id;
       var data=req.body['target[]']||req.body.target;
        if(typeof data =='string'){
          form.targets.push(data)
        }else {
          form.targets=data
        }
    

        api_services.commonRequest('api/app/publicity/add','POST',form).then(function (dataSelect){
                 dataSelect.content.page=Math.ceil(dataSelect.content.total/dataSelect.content.size); 
                 console.log(dataSelect)
                 res.json(dataSelect)

        }).catch(function (data){
                 console.log(data)
                 res.json(data)
        })

}







//POST /api/app/inspect/list

exports.inspect = function(req, res, next) {            //网络

   res.render('pages/inspect');

}

exports.api_inspect=function (req,res,next){
     var date=new Date()
     var time=tools.setForm()
     var form= {
              "page":req.query.page||0,
              "size":15,
              "type":req.query.type||"COMPANY",
              "market":req.query.market==0?'':req.query.market||'',
              "company":req.query.company||'',
              "park":req.query.park==0?'':req.query.park||'',
              "from":req.query.from||req.body.from||time.from,
              "to":req.query.to||req.body.to||time.to,
              "belongId":req.session.user.content.belongId
              }
       if(form.market==''){
          delete form.market
       }      
       if(form.park==''){
          delete form.park
       }       
 


    api_services.commonRequest('api/app/inspect/list','POST',form).then(function (dataSelect){
             dataSelect.content.page=Math.ceil(dataSelect.content.total/dataSelect.content.size); 
             console.log(dataSelect.content)
             res.json(dataSelect)

    }).catch(function (data){
             console.log(data)
             res.json(data)
    })


}







exports.suggestion = function(req, res, next) {        //行政建议列表

   res.render('pages/suggestion');

}




exports.api_suggestion=function (req,res,next){
     var date=new Date()
     var time=tools.setForm()
     var form= {
              "page":req.query.page||0,
              "size":15,
              "type":req.query.type||'COMPANY',
              "market":req.query.market==0?'':req.query.market||'',
              "company":req.query.company||'',
              "park":req.query.park==0?'':req.query.park||'',
              "from":req.query.from||req.body.from||time.from,
               "to":req.query.to||req.body.to||time.to,
              "belongId":req.session.user.content.belongId
              }
       if(form.market==''){
          delete form.market
       }      
       if(form.park==''){
          delete form.park
       }            

    api_services.commonRequest('api/app/suggestion/list','POST',form).then(function (dataSelect){
             dataSelect.content.page=Math.ceil(dataSelect.content.total/dataSelect.content.size); 
             console.log(dataSelect.content)
             res.json(dataSelect)

    }).catch(function (data){
             console.log(data)
             res.json(data)
    })


}




exports.api_suggestion_msg=function (req,res,next){
  
   var form=req.body;
     form.targets=[];   
     form.user=req.session.user.content.id;
     var data=req.body['target[]']||req.body.target;
      if(typeof data =='string'){
        form.targets.push(data)
      }else {
        form.targets=data
      }
    form.belongId=req.session.user.content.belongId;
 

   

    api_services.commonRequest('api/app/suggestion/add','POST',form).then(function (dataSelect){
             //dataSelect.content.page=Math.ceil(dataSelect.content.total/dataSelect.content.size); 
             console.log(dataSelect)
             res.json(dataSelect)

    }).catch(function (data){
             console.log(data)
             res.json(data)
    })

}





exports.interview = function(req, res, next) {        //行政约谈列表

   res.render('pages/interview');

}


exports.api_interview=function (req,res,next){
     var date=new Date()
     var time=tools.setForm()
     var form= {
              "page":req.body.page||0,
              "size":15,
              "type":req.body.type||'COMPANY',
              "market":req.body.market==0?'':req.body.market||'',
              "company":req.body.company||'',
              "park":req.body.park==0?'':req.body.park||'',
              "from":req.body.from||req.body.from||time.from,
               "to":req.body.to||req.body.to||time.to,
              "belongId":req.session.user.content.belongId
              }
      
       if(form.market==''){
          delete form.market
       }      
       if(form.park==''){
          delete form.park
       }    


    api_services.commonRequest('api/app/interview/list','POST',form).then(function (dataSelect){

           if(dataSelect.success){

             dataSelect.content.page=Math.ceil(dataSelect.content.total/dataSelect.content.size); 

           }
             console.log(dataSelect)
             res.json(dataSelect)

    }).catch(function (data){
             console.log(data)
             res.json(data)
    })


}

exports.api_interview_msg=function (req,res,next){

     var form=req.body;
     form.targets=[];   
     form.user=req.session.user.content.id;
     var data=req.body['target[]']||req.body.target;
      if(typeof data =='string'){
        form.targets.push(data)
      }else {
        form.targets=data
      }
     form.belongId=req.session.user.content.belongId;

    api_services.commonRequest('api/app/interview/add','POST',form).then(function (dataSelect){
            /// dataSelect.content.page=Math.ceil(dataSelect.content.total/dataSelect.content.size); 
             console.log(dataSelect)
             res.json(dataSelect)

    }).catch(function (data){
             console.log(data)
             res.json(data)
    })



}






exports.appointment = function(req, res, next) {

   res.render('pages/appointment');

}





exports.api_appointment=function (req,res,next){
     var date=new Date()
     var time=tools.setForm()
     var form= {
              "page":req.query.page||0,
              "size":15,
              "type":req.query.type||'PARK',
              "market":req.query.market==0?'':req.query.market||'',
              "company":req.query.company||'',
              "park":req.query.park==0?'':req.query.park||'',
              "from":req.query.from||req.body.from||time.from,
               "to":req.query.to||req.body.to||time.to,
               "belongId":req.session.user.content.belongId
              }
           if(form.market==''){
             delete form.market
           }
           if(form.park==''){
             delete form.park
           }


    api_services.commonRequest('api/app/appointment/list','POST',form).then(function (dataSelect){
             //dataSelect.content.page=Math.ceil(dataSelect.content.total/dataSelect.content.size); 
             console.log(dataSelect.content)
             res.json(dataSelect)

    }).catch(function (data){
             console.log(data)
             res.json(data)
    })


}




exports.api_appointment_msg=function (req,res,next){


   var form=req.body;
     form.targets=[];   
     form.user=req.session.user.content.id;
     var data=req.body['target[]']||req.body.target;
      if(typeof data =='string'){
        form.targets.push(data)
      }else {
        form.targets=data
      }
 
    form.belongId=req.session.user.content.belongId;
    
    console.log(form)
    api_services.commonRequest('api/app/appointment/add','POST',form).then(function (dataSelect){
             
             console.log(dataSelect)
             res.json(dataSelect)

    }).catch(function (data){
             console.log(data)
             res.json(data)
    })

}


exports.api_inspect_qualified_msg=function (req,res,next){
   var form=req.body;

    form.user=req.session.user.content.id
    // form.target=[]

    form.target=req.body['target[]']||req.body.target;

    form.belongId=req.session.user.content.belongId;



    api_services.commonRequest('api/app/inspect/qualified/'+form.ccPark,'POST',form).then(function (dataSelect){
             //dataSelect.content.page=Math.ceil(dataSelect.content.total/dataSelect.content.size); 
             console.log(dataSelect)
             res.json(dataSelect)

    }).catch(function (data){
             console.log(data)
             res.json(data)
    })

}


exports.put_appointment_messages=function (req,res,next){
      var form=req.body;


       api_services.commonRequest('api/app/appointment/confirm/'+form.id+'/'+form.status,'PUT',null).then(function (dataSelect){
            
             console.log(dataSelect)
       
             
             res.json(dataSelect)

        }).catch(function (data){
                 console.log(data)
                 res.json(data)
        })


}




exports.put_interview_messages=function (req,res,next){
      var form=req.body;

       api_services.commonRequest('api/app/interview/confirm/'+form.id+'/'+form.status,'PUT',null).then(function (dataSelect){
             console.log(dataSelect)
                 res.json(dataSelect)

        }).catch(function (data){
                 console.log(data)
                 res.json(data)
        })


}





// PUT /api/app/appointment/confirm/{id}/{status}

//  PUT /api/app/interview/confirm/{id}/{status}





