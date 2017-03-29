var path=require('path');
var User_file=path.join(__dirname,'./str.txt');
var util=require('./utils');


var config = {
    
        internal:{
            host:process.env.server||"http://139.196.152.218/",
            port:"5000",
        },  
        headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "User-Token": '',
        },
        multipartHeaders: {
                "Content-Type": "multipart/form-data",
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


module.exports = config;


