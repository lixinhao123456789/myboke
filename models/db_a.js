var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";


//插入一条文章
function  articleAdd(articledata,callback){
    MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
        if (err) throw err;
        var dbo = db.db("boke");
        var myobj = { "category_id": articledata.category_id, "subject": articledata.subject, "summary": articledata.summary, "content": articledata.content, "date":articledata.date,"submit": articledata.submit};
        dbo.collection("posts").insertOne(myobj, function(err, res) {
            if (err){
                console.log("文章插入失败");
                callback("-1")
            }else{
                console.log("文章插入成功");
                callback("1")
            }
            db.close();
        });
    });
}

//查询文章列表
function postsQuery(callback) {
    MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
        if (err) throw err;
        var dbo = db.db("boke");
        dbo.collection("posts"). find({}).toArray(function(err, result) { // 返回集合中所有数据
            if (err) throw err;
            // console.log(result);
            callback(result);
            db.close();
        });
    });
}

//文章删除
function postsDelete(id,callback) {
    MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
        if (err) throw err;
        var dbo = db.db("boke");
        var whereStr = {"_id":id};  // 查询条件
        dbo.collection("posts").deleteOne(whereStr, function(err, obj) {
            if (err) {
                console.log("文章删除失败");
                callback("-1")
            }else{
                console.log("文章删除成功");
                callback("1")
            }
            db.close();
        });
    });
}


exports.articleAdd = articleAdd;
exports.postsQuery = postsQuery;
exports.postsDelete = postsDelete;


