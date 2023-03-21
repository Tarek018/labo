import HyperExpress from 'hyper-express';
const Router = new HyperExpress.Router();
import Pouchdb from 'pouchdb';
import PouchDB_Find from 'pouchdb-find';
Pouchdb.plugin(PouchDB_Find);
import jwt from "jsonwebtoken";
import { verifyToken } from '../midellware/auth';


Router.post('/login',async ( req, res ) => {
    req.body=await req.json()
    console.log(req.body);
    
    const db = new Pouchdb('http://admin:admin@127.0.0.1:5984/labo');
     let agent=await db.find({
         selector: {
            user: req.body.user,
            password:req.body.pass,
            dataType:"agent"
         }
       });
    
      if(agent.docs == ''){
         console.log(req.body);
         res.status(400).json({ message: 'User does not exist.' })
      }else{
        console.log(agent.docs);
         const token = jwt.sign({ userId: agent._id}, "12345");
         res.status(200).json({ auth: true, token: token, type: "admin" });
    }
});

Router.post('/verifybyid',async (req, res) => {
    req.body = await req.json();
    console.log(req.body);
    const db = await new Pouchdb('http://admin:admin@127.0.0.1:5984/labo');
    let userexist=await db.find({
        selector:{
            ID:req.body
        }
    });
    console.log(userexist.docs);
    

    if(userexist.docs == ''){
        console.log(req.body);
        res.status(400).json({ message: "Not Allowed" })
     }else{
       console.log(userexist.docs);
       res.status(200).json({ message: "Allowed" });
   }


    
});

Router.post('/validateqrcode',async (req, res) => {
    req.body = await req.json();
    const db = await new Pouchdb('http://admin:admin@127.0.0.1:5984/labo');

    console.log(req.body);
    let userexist=await db.find({
        selector:{
            ID:req.body
        }
    });
    if(userexist.docs == ''){
        console.log(req.body);
        res.status(400).json({ message: "Not Allowed" })
     }else{
       console.log(userexist.docs);
       res.status(200).json({ message: "Allowed" });
   }

    
})


module.exports=Router;