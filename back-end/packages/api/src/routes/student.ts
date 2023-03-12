import HyperExpress from 'hyper-express';
const Router = new HyperExpress.Router();
import Pouchdb from 'pouchdb';
import PouchDB_Find from 'pouchdb-find';
Pouchdb.plugin(PouchDB_Find);
import jwt from "jsonwebtoken";




Router.post('/login',async(req,res)=>{

    const db = new Pouchdb('http://admin:admin@127.0.0.1:5984/labo');
    req.body=await req.json();
    let student=await db.find({
        selector: {
            matricule: {
                $eq :req.body
          }
        }
      });
    
      if(student.docs == ''){
        console.log(req.body);
        res.status(400).json({ message: 'User does not exist.' })
      }else{
        const token = jwt.sign({ userId: student._id}, "12345");
      res.status(200).json({ auth: true, token: token, type: "student" });
      }
})

module.exports=Router;