import { Router, Request, Response } from 'express';
import { MongoClient, ObjectID } from 'mongodb';

const router: Router = Router();
var mongodb;



router.get('/', (req: Request, res: Response) => {
    mongodb.collection("user").find().toArray().then((data) => {
        res.json(data);
    });

});
router.get('/findById/:id', (req: Request, res: Response) => {
    let id = new ObjectID(req.params.id);
    mongodb.collection("user").findOne({ _id: id }).then((data) => {
        res.json(data);
    });
});
router.post('/', (req: Request, res: Response) => {
    let data = req.body;
    mongodb.collection("user").insertOne(data).then((data) => {
        res.json(data);
    });
});
router.delete('/:id',(req:Request,res:Response)=>{
   let id = new ObjectID(req.params.id);
    mongodb.collection("user").deleteOne({ _id: id }).then((data) => {
        res.json(data);
    });
});
router.put('/:id', (req: Request, res: Response) => {
    let id = new ObjectID(req.params.id);
    let data = req.body;
    mongodb.collection("user").updateOne({ _id: id }, data).then((data) => {
        res.json(data);
    });
});
router.post('/search', (req: Request, res: Response) => {
    let ret = {
        rows: [],
        total: 0
    };
    let data = req.body;
    mongodb.collection("user").find(
        { 
            userName: new RegExp(`${data.searchText}`)
        }
    ).skip(data.numPage * data.rowPerPage)
        .limit(data.rowPerPage)
        .toArray().then((rows) => {
            ret.rows = rows;
            mongodb.collection("user").find(
                {
                    userName: new RegExp(`${data.searchText}`)
                }
            ).count().then((data) => {
                ret.total = data;
                res.json(ret);
            })
});
});

MongoClient.connect("mongodb://localhost:27017/issuedb", (err, db) => {

    if (err) {
        console.log(err);
    } else {
        mongodb = db;
    }


});

export const UserController: Router = router;