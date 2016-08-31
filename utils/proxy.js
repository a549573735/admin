"use strict";
var http = require("http"),
	https = require("https"),
	Buffer = require('buffer').Buffer,		// 一个用于更好的操作二进制数据的类
	querystring = require('querystring'),	// 模块用于实现URL参数字符串与参数对象的互相转换
	logger = require("../utils/logger"),
	TIMEOUT = {1:6000, 2:2000, 3:111000, 4:200, 5:0}; // 超时的等级 根据APILEVEL 判断

function Proxy(args){
	var self = this;
	self.data = {};
	self.params = null;
	self.opt = {};
	self.http = ('http' === args.protocol) ? https: http;
	self.type = args.type || 'JSON';
	self.APILEVEL = args.APILEVEL || 1;

	if (args.data && (args.data instanceof Object)) {
		for (var k in args.data) {
			if (args.data[k] !== undefined) {
				self.data[k] = args.data[k];
			}
		}
	}
	// 兼容java服务器无法解析JSON全字符串化的参数
	if (args.keyValue) {
		self.params = querystring.stringify(self.data);
	} else if ('string' === typeof args.data) {
		self.data = {params: args.data};
		self.params = new Buffer(args.data);
	} else {
		self.params = new Buffer(JSON.stringify(self.data));
	}

	// opt
	self.opt = {
		method: args.method || 'GET',
		host: args.host || config.api.host,
		port: args.port || config.api.port,
		path: args.path,
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			'Service-Info': 'Nodejs-Proxy-Eric.wu',
			'Content-Length': self.params.length
		}
	};

	if (args.contentType == 'application/json;charset=UTF-8') {
		self.opt.headers['Content-Type'] = args.contentType;
	}

	if (args.Apiclient == 'vd-pc') {
		self.opt.headers['Apiclient'] = args.Apiclient;
	}
}

Proxy.prototype = {
	constructor: Proxy,
	invoke: function(fn) {
		var self = this, body = '';
		self.startTime = self.endTime = new Date().getTime();
		self.timer = setTimeout(function() {
			self.req.emit('timeout');  // 向self.req发送事件对象timeout
		}, TIMEOUT[self.APILEVEL]);

		self.req = self.http.request(self.opt, function(req) {
			res
				.on('data', function(d) {
					body += d;
				})
				.on('end', function(e) {
					clearTimeout(self.timer);
					fn.apply(null, self.resolveBody(body));
					self.takeLog(body, 'proxy');
				})
				.on('close', function(e) {
					clearTimeout(self.timer);
					fn({code: 2000, message: 'closed'}, null);
					self.takeLog(e, 'error');
				})
				.on('abort', function(e) {
					fn({code: 2000, message: 'timeout or cancel'}, null);
					self.takeLog(e, 'error');
				})
		})
		.on('error', function(e) {
			clearTimeout(self.timer);
			fn(e, {status: 1000});
			self.takeLog(e, 'error');
		})
		.on('timeout', function() {
			if (self.req.res) {
				self.req.res.emit('abort');
			}
			self.req.abort();
		});
	},
	resolveBody: function(body) {
		var self = this;
		if ('JSON' === self.type) {
			try {
				body = JSON.parse(body);
			} catch(e) {
				self.takeLog(e, 'error');
				body = {'code': '500000', 'message': '系统累了,请刷新页面重试, API错误的数据格式。', 'data': []};
				// logJSONparseError.call(self, arguments[0]);
			} finally {
				return [null, body];
			}
		} else {
			return [null, body];
		}
	},
	takeLog: function(body, type) {
		var self = this,
			takeTimes = (self.endTime = new Date().getTime(), self.endTime - self.startTime),
			logs = ['[--PROXY--]' + (self.opt.host + ':' + self.opt.port + self.opt.path) + '  TAKE TIMES(ms):' + takeTimes];
			logs.push(JSON.stringify(self.data));
			logs.push(body);
			logger[type](logs.join('\r\n'));
		return self;
	}
};

function logJSONparseError(body) {
	var self = this;
	var data = {
		data: self.data,
		opt: self.opt,
		res: body
	};
	var args = {
		data: data,
		host: '10.173.226.120',
		port: '8080',
		path: '/b.php?filename=jsonparseerror&logs=',
		method: 'GET'
	};
	if ((args.host == self.opt.host) || /^\/wm/.test(self.opt.path)) {
		return;
	}
	module.exports.invoke(args, function() {
		//
	})
}

module.exports = {
	invoke: function(args, fn) {
		return new Proxy(args).invoke(fn);
	}
};