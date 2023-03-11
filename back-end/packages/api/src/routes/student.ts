import HyperExpress from 'hyper-express';
const Router = new HyperExpress.Router();
import Pouchdb from 'pouchdb';
import PouchDB_Find from 'pouchdb-find';
Pouchdb.plugin(PouchDB_Find);



Router.post('/login',async(req,res)=>{

    const db = new Pouchdb('http://admin:admin@127.0.0.1:5984/labo');
    req.body=await req.json();
    let id=await db.find({
        selector: {
            matricule: {
                $eq :req.body.matricule
          }
        }
      });
    
      if(id.docs == ''){
        res.status(400).json({ message: 'User does not exist.' })
      }else{
        res.status(400).json({ message: 'User already exists.' });
      }
      
    
    
    

})

module.exports=Router;