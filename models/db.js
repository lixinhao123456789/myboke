var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";


 //后台分类增加操作
function  catsAdd(catsData,callback){
    MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
        if (err) throw err;
        var dbo = db.db("boke");
        dbo.collection("cats").insertOne(catsData, function(err, res) {
            if (err){
                console.log("分类插入失败");
                callback("-1")
            }else{
                console.log("分类插入成功");
                callback("1")
            }
            db.close();
        });
    });
}

//后台分类查询
function catsQuery(callback){
    var arr = []
    MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
        if (err) throw err;
        var dbo = db.db("boke");
        dbo.collection("cats"). find({}).toArray(function(err, result) { // 返回集合中所有数据
            if (err) throw err;
            arr = result 
            callback(arr)
            db.close();
        });
    });
    
}



//后台分类编辑操作
function  catsUpdata(id,data,callback){
    MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
        if (err) throw err;
            var dbo = db.db("boke");
            var whereStr = {"_id":id};  // 查询条件
            var updateStr = {$set: { "title" : data.title, "sort" : data.sort}};
            dbo.collection("cats").updateOne(whereStr, updateStr, function(err, res) {
                if (err) {
                    console.log("文档分类更新失败");
                    callback("-1")
                }else{
                    console.log("文档分类更新成功");
                    callback("1")
                }
                db.close();
            });
    });
}

//后台分类删除
function catsDelete(id,callback){
    MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
        if (err) throw err;
        var dbo = db.db("boke");
        var whereStr = {"_id":id};  // 查询条件
        dbo.collection("cats").deleteOne(whereStr, function(err, obj) {
            if (err){
                console.log("文档分类删除失败");
                callback("-1")
            }else{
                console.log("文档分类删除成功");
                callback("1")
            }
            db.close();
        });
    });
}

//后台登录验证
function login(callback){
    MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
        if (err) throw err;
        var dbo = db.db("boke");
        dbo.collection("user"). find({}).toArray(function(err, result) { // 返回集合中所有数据
            if (err) throw err;
            // console.log(result);
            callback(result)
            db.close();
        });
    });
}

//把函数暴露出去
exports.catsAdd = catsAdd;
exports.catsUpdata = catsUpdata;
exports.catsQuery = catsQuery;
exports.catsDelete = catsDelete;
exports.login = login;
















