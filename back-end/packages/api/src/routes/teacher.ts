import HyperExpress from 'hyper-express';
const Router = new HyperExpress.Router();
import Pouchdb from 'pouchdb';
import PouchDB_Find from 'pouchdb-find';
Pouchdb.plugin(PouchDB_Find);
import jwt from "jsonwebtoken";



Router.post('/:user', async (req , res) =>  {
  let id: string = req.params.user;
  console.log(id);
  
  const db = new Pouchdb('http://admin:admin@127.0.0.1:5984/labo');
  let matricule = await db.find({
    selector: {
      dataType:"teacher",
      matricule: id,

    }
  });

  let Etud=db.find({
    selector:{
      dataType:"idStudent",
      teacher:matricule.docs[0].name
    }
  });
  console.log(Etud.docs);
  
  if(matricule.docs == ''){
    res.status(400).json({Etud:Etud.docs , message: 'User does not exist.' })
  }else{
    res.status(200).json({ message: 'User  exist.' });
  }

  matricule.docs.name
  
  
  
});

Router.get('/getmyetu', async (req ,res) => {

  const db = new Pouchdb('http://admin:admin@127.0.0.1:5984/labo');


});



module.exports=Router;