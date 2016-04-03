var mysql = require('mysql');
var debug = require('debug')('crawl:save');
var pool = mysql.createPool({
   host:'123.57.143.189',
   user:'root',
    password:'123456',
    database:'crawl'
});
var async = require('async');
//把分类列表存入数据库
exports.category = function(list,callback){
 async.forEach(list,function(item,cb){
    debug('保存分类',JSON.stringify(item));
    pool.query('replace into category(id,name,url) values(?,?,?)',[item.id,item.name,item.url],function(err,result){
        cb();
    });
 },callback);
}

//把文章列表存入数据库
exports.article = function(list,callback){
    async.forEach(list,function(item,cb){
        debug('保存文章',JSON.stringify(item));
        pool.query('replace into article(name,url,cid) values(?,?,?)',[item.name,item.url,item.cid],function(err,result){
            cb();
        });
    },callback);
}
