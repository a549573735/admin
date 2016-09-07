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
        }
    

};




config.port = 5000;
module.exports = config;


