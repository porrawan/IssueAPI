"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var mongodb_1 = require("mongodb");
var router = express_1.Router();
var mongodb;
router.get('/', function (req, res) {
    mongodb.collection("user").find().toArray().then(function (data) {
        res.json(data);
    });
});
router.get('/findById/:id', function (req, res) {
    var id = new mongodb_1.ObjectID(req.params.id);
    mongodb.collection("user").findOne({ _id: id }).then(function (data) {
        res.json(data);
    });
});
router.post('/', function (req, res) {
    var data = req.body;
    mongodb.collection("user").insertOne(data).then(function (data) {
        res.json(data);
    });
});
router.delete('/:id', function (req, res) {
    var id = new mongodb_1.ObjectID(req.params.id);
    mongodb.collection("user").deleteOne({ _id: id }).then(function (data) {
        res.json(data);
    });
});
router.put('/:id', function (req, res) {
    var id = new mongodb_1.ObjectID(req.params.id);
    var data = req.body;
    mongodb.collection("user").updateOne({ _id: id }, data).then(function (data) {
        res.json(data);
    });
});
router.post('/search', function (req, res) {
    var ret = {
        rows: [],
        total: 0
    };
    var data = req.body;
    mongodb.collection("user").find({
        userName: new RegExp("" + data.searchText)
    }).skip(data.numPage * data.rowPerPage)
        .limit(data.rowPerPage)
        .toArray().then(function (rows) {
        ret.rows = rows;
        mongodb.collection("user").find({
            userName: new RegExp("" + data.searchText)
        }).count().then(function (data) {
            ret.total = data;
            res.json(ret);
        });
    });
});
mongodb_1.MongoClient.connect("mongodb://localhost:27017/issuedb", function (err, db) {
    if (err) {
        console.log(err);
    }
    else {
        mongodb = db;
    }
});
exports.UserController = router;
//# sourceMappingURL=D:/Document/Train/project/IssueAPI/Controllers/user.js.map