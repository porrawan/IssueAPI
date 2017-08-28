"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var mongodb_1 = require("mongodb");
var router = express_1.Router();
var mongodb;
router.get('/', function (req, res) {
    mongodb.collection("company").find().toArray().then(function (data) {
        res.json(data);
    });
});
router.get('/findById/:id', function (req, res) {
    var id = new mongodb_1.ObjectID(req.params.id);
    mongodb.collection("company").findOne({ _id: id }).then(function (data) {
        res.json(data);
    });
});
router.post('/', function (req, res) {
    var data = req.body;
    mongodb.collection("company").insertOne(data).then(function (data) {
        res.json(data);
    });
});
router.delete('/:id', function (req, res) {
    var id = new mongodb_1.ObjectID(req.params.id);
    mongodb.collection("company").deleteOne({ _id: id }).then(function (data) {
        res.json(data);
    });
    /*
    let id = req.params.id;
    mongodb.collection("company").deleteOne({compCode : id}).then((data) =>{
        res.json(data);
    });
    */
});
router.put('/:id', function (req, res) {
    var id = new mongodb_1.ObjectID(req.params.id);
    var data = req.body;
    mongodb.collection("company").updateOne({ _id: id }, data).then(function (data) {
        res.json(data);
    });
});
router.post('/search', function (req, res) {
    var ret = {
        rows: [],
        total: 0
    };
    var data = req.body;
    mongodb.collection("company").find({
        // compName : new RegExp(data.searchText)
        compName: new RegExp("" + data.searchText)
        //compName : new RegExp(`^${data.searchText}`)
    }).skip(data.numPage * data.rowPerPage)
        .limit(data.rowPerPage)
        .toArray().then(function (rows) {
        ret.rows = rows;
        /*
          mongodb.collection("company").count()
          .then((data) => {
             ret.total = data
              res.json(ret);
          })
          */
        mongodb.collection("company").find({
            compName: new RegExp("" + data.searchText)
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
exports.CompanyController = router;
//# sourceMappingURL=D:/Document/Train/project/IssueAPI/Controllers/company.js.map