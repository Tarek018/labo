import HyperExpress from 'hyper-express';
const Router = new HyperExpress.Router();
import Pouchdb from 'pouchdb';
import PouchDB_Find from 'pouchdb-find';
Pouchdb.plugin(PouchDB_Find);
import jwt from "jsonwebtoken";



Router.post('/:user', async(req, res) => {
  let id: string = req.params.user;
  console.log(id);
  
  const db = new Pouchdb('http://admin:admin@127.0.0.1:5984/labo');
  let matricule = await db.find({
    selector: {
      dataType:"teacher",
      matricule: id,

    }
  });

  
  if(matricule.docs == ''){
    res.status(400).json({ message: 'User does not exist.' })
  }else{
    res.status(200).json({ message: 'User  exist.' });
  }
  
  
})



module.exports=Router;