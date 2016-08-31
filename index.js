'use strict';
const express = require('express');
const path = require('path');
const consolidate = require('consolidate');   // Consolidate.js 能将 Node 中所有流行的模板引擎映射为这种约定，这样就可以和 Express 无缝衔接
const config = require('./utils/config');     // config配置
const bodyParser = require('body-parser');    // 用于解析客户端请求的body中的内容

const group = require("./routes/group");
const app = express();

app.engine('ejs', consolidate.ejs);           // 对某一个扩展名进行解析
app.set('views', __dirname + 'views');       // 路径
app.set('view engine', 'ejs');               // html引擎（指定引擎扩展名省略）

app.use(express.static(path.join(__dirname, 'public')));    // 设置静态文件夹

app.use(function(req, res, next) {
   res.locals.config = {
       version: '20160521'
   };
   next();
});

app.use(group);

app.listen(config.port);


