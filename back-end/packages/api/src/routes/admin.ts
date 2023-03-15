import HyperExpress from 'hyper-express';
const Router = new HyperExpress.Router();
import Pouchdb from 'pouchdb';
import PouchDB_Find from 'pouchdb-find';
Pouchdb.plugin(PouchDB_Find);
import jwt from "jsonwebtoken";
import { verifyAdminToken, verifyToken } from '../midellware/auth';


Router.post('/login',async ( req, res ) => {
    req.body=await req.json()
    console.log(req.body);
    
    const db = new Pouchdb('http://theveste:team12@194.5.159.202:3201/theveste_12');
     let admin=await db.find({
         selector: {
            user: req.body.user,
            pass:req.body.pass,
            dataType:"admin"
         }
       });
    
      if(admin.docs == ''){
         console.log(req.body);
         res.status(400).json({ message: 'User does not exist.' })
      }else{
        console.log(admin.docs);
         const token = jwt.sign({ userId: admin._id}, "12345");
         res.status(200).json({ auth: true, token: token, type: "admin" });
    }
})

Router.post('/sava-data' ,async(req, res) => {
    const db = new Pouchdb('http://theveste:team12@194.5.159.202:3201/theveste_12');
    req.body=await req.json();
    db.post(req.body);
    res.status(200);
})

module.exports=Router;