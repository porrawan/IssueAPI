import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import { CompanyController } from './Controllers/company';
import { UserController } from './Controllers/user';

// Create a new express application instance
const app: express.Application = express();
//The port the express app will listen on
const port: string = process.env.PORT || '3000';

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


app.use('/company',CompanyController);
app.use('/user',UserController);
app.listen(port, () => {
    //Success callback
    console.log(`Listening at http://localhost:${port}/`);
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