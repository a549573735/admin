"use strict";

var log4js = require('log4js'),
    cluster = require('cluster'),
    log4js_config = {},
    config= require("./config"),
    filePath = ("production"!== config.env)? "logs/": "/data/log/node/";

if(cluster.isMaster) {
    log4js_config= {
        "appenders": [{
            "type": "clustered",
            "appenders": [
                {
                //     type: "console",
                //     category: "console"
                // },{
                    type: "file",
                    filename: filePath+ "access.log",
                    maxLogSize: 1*1024*1024,
                    backups: 10,
                    category: "normal"
                },{
                    type: "file",
                    filename: filePath+ "proxy.log",
                    maxLogSize: 1*1024*1024,
                    backups: 10,
                    category: "proxy"
                },{
                    type: "file",
                    filename: filePath+ "exception.log",
                    maxLogSize: 1*1024*1024,
                    backups: 10,
                    category: "exception"
                }
            ]
            // ,replaceConsole: true
            // ,levels:{
            //     normal: 'debug',
            //     connect: 'debug'
            // }
        }]
    }

}else{
   log4js_config= {
      "appenders": [{
          "type": "clustered"
      }]
  }

}

log4js.configure(log4js_config);

module.exports= (function(name) {
    var  logger = {},
        accessLog=  log4js.getLogger("normal"),
        exceptionLog=  log4js.getLogger("exception"),
        proxyLog=   log4js.getLogger("proxy");

        accessLog.setLevel(log4js.levels.INFO);
        exceptionLog.setLevel(log4js.levels.INFO);
        proxyLog.setLevel(log4js.levels.INFO);

    function getStackTrace(str) {
        var obj = {};
        Error.captureStackTrace(obj, getStackTrace);
        obj.stack= obj.stack.match(/.{20}:\d+:\d+/);
        if("object"=== typeof str){
            str= JSON.stringify(str);
        }
        if("trace"=== this.type){
            accessLog.trace.call(accessLog, obj.stack+ "\n"+ str);
        }else if("debug"=== this.type){
            accessLog.debug.call(accessLog, obj.stack+ "\n"+ str);
        }else if("info"=== this.type){
            accessLog.info.call(accessLog, obj.stack+ "\n"+ str);
        }else if("warn"=== this.type){
            exceptionLog.warn.call(exceptionLog, obj.stack+ "\n"+ str);
        }else if("error"=== this.type){
            exceptionLog.error.call(exceptionLog, obj.stack+ "\n"+ str);
        }else if("fatal"=== this.type){
            exceptionLog.fatal.call(exceptionLog, obj.stack+ "\n"+ str);
        }else if("proxy"=== this.type){
            proxyLog.info.call(proxyLog, obj.stack+ "\n"+ str);
        }
    }

    logger = {
        trace:  getStackTrace.bind({type:"trace"}),
        debug:  getStackTrace.bind({type:"debug"}),
        info:   getStackTrace.bind({type:"info"}),
        warn:   getStackTrace.bind({type:"warn"}),
        error:  getStackTrace.bind({type:"error"}),
        fatal:  getStackTrace.bind({type:"fatal"}),
        proxy:  getStackTrace.bind({type:"proxy"}),
        useLog: function(name) {
            return log4js.connectLogger(log4js.getLogger("normal"), {level: log4js.levels.DEBUG});
        }
    }
    return logger;
})()