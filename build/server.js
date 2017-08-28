"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
var company_1 = require("./Controllers/company");
var user_1 = require("./Controllers/user");
// Create a new express application instance
var app = express();
//The port the express app will listen on
var port = process.env.PORT || '3000';
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use('/company', company_1.CompanyController);
app.use('/user', user_1.UserController);
app.listen(port, function () {
    //Success callback
    console.log("Listening at http://localhost:" + port + "/");
});
/*
var mongodb;
app.get('/hello', (req: Request, res: Response) => {
    mongodb.collection("company").find().toArray().then((data) => {
        res.json(data);
    });
    */
// Greet the given name
//  res.send(`Hello word`);
//});
//Serve the application at ther given port
/*
MongoClient.connect("mongodb://localhost:27017/issuedb", (err, db) => {

    if (err) {
        console.log(err);
    } else {
        mongodb = db;
    }


});
*/ 
//# sourceMappingURL=D:/Document/Train/project/IssueAPI/server.js.map