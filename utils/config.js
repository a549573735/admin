var path=require('path');
var User_file=path.join(__dirname,'./str.txt');
var util=require('./utils');

var config = {
    
        internal:{
            host:"http://139.196.152.218/",
            port:"8081",
        },
        // dev
        data:{
            // 114.55.38.178    121.43.197.98   112.124.28.82   mapi.dev.vd.cn
            host:"192.168.1.102",
            port:"3005"
        },
        headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "User-Token": '',
        },
        getUserMsg:function (){
                  return util.readFileAsync(User_file,'utf-8');

        },
        saveUserMsg:function (data){
                   data=JSON.stringify(data)
                  return util.writeFileAsync(User_file,data);
        },
    

};




config.port = 5000;
module.exports = config;


