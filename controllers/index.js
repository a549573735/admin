
var Promise=require('bluebird');
var request=Promise.promisify(require('request'));
var config=require('../utils/config')
var Services=require('../utils/tool');
var tools=new Services();


var api_services=require('../models/api_services');



exports.home=function(req,res,next){
     
     if(req.session.user){
     
          res.redirect('/organize/architecture');
     
     }else {
          res.redirect('/login');
     }
     
}



exports.publicity = function(req, res, next) {

   res.render('pages/publicity');

}


exports.api_publicity=function (req,res,next){
     var date=new Date()
     var time=tools.setForm()
     var form= {
              "page":req.query.page||0,
              "size":15,
              "type":req.query.type||req.session.user.content.type,
              "market":req.query.park||req.session.user.content.id,
              "company":req.query.company||'',
              "park":req.query.park||req.session.user.content.id,
              "from":req.query.from||req.body.from||time.from,
              "to":req.query.from||req.body.from||time.to
              }

    api_services.commonRequest('api/app/appointment/list','POST',form).then(function (dataSelect){
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
              "type":req.query.type||req.session.user.content.type,
              "market":req.query.park||req.session.user.content.id,
              "company":req.query.company||'',
              "park":req.query.park||req.session.user.content.id,
              "from":req.query.from||req.body.from||time.from,
              "to":req.query.from||req.body.from||time.to
              }

    api_services.commonRequest('api/app/inspect/list','POST',form).then(function (dataSelect){
             console.log(dataSelect)
             res.json(dataSelect)

    }).catch(function (data){
             console.log(data)
             res.json(data)
    })


}



exports.suggestion = function(req, res, next) {        //行政建议列表

   res.render('pages/suggestion', { title: 'Express',data:'123123' });

}



exports.api_suggestion=function (req,res,next){
     var date=new Date()
     var time=tools.setForm()
     var form= {
              "page":req.query.page||0,
              "size":15,
              "type":req.query.type||req.session.user.content.type,
              "market":req.query.park||req.session.user.content.id,
              "company":req.query.company||'',
              "park":req.query.park||req.session.user.content.id,
              "from":req.query.from||req.body.from||time.from,
              "to":req.query.from||req.body.from||time.to
              }

    api_services.commonRequest('api/app/appointment/list','POST',form).then(function (dataSelect){
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
              "page":req.query.page||0,
              "size":15,
              "type":req.query.type||req.session.user.content.type,
              "market":req.query.park||req.session.user.content.id,
              "company":req.query.company||'',
              "park":req.query.park||req.session.user.content.id,
              "from":req.query.from||req.body.from||time.from,
              "to":req.query.from||req.body.from||time.to
              }

    api_services.commonRequest('api/app/appointment/list','POST',form).then(function (dataSelect){
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
              "type":req.query.type||req.session.user.content.type,
              "market":req.query.park||req.session.user.content.id,
              "company":req.query.company||'',
              "park":req.query.park||req.session.user.content.id,
              "from":req.query.from||req.body.from||time.from,
              "to":req.query.from||req.body.from||time.to
              }

    api_services.commonRequest('api/app/appointment/list','POST',form).then(function (dataSelect){
             console.log(dataSelect)
             res.json(dataSelect)

    }).catch(function (data){
             console.log(data)
             res.json(data)
    })


}


