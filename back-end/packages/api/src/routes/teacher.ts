import HyperExpress from 'hyper-express';
const Router = new HyperExpress.Router();
import Pouchdb from 'pouchdb';
import PouchDB_Find from 'pouchdb-find';
Pouchdb.plugin(PouchDB_Find);
import jwt from "jsonwebtoken";



Router.post('/:user', async (req , res) =>  {
  let id: string = req.params.user;
  console.log(id);
  
  const db = new Pouchdb('http://theveste:team12@194.5.159.202:3201/theveste_12');
  let matricule = await db.find({
    selector: {
      dataType:"teacher",
      matricule: id,
    }
  });

  let Etud= await db.find({
    selector:{
      dataType:"idStudent",
      teacher:matricule.docs[0].name
    }
  });
  console.log(matricule.docs[0].gr);
  
  if(matricule.docs == ''){
    res.status(400).json({ message: 'User does not exist.' })
  }else{
    res.status(200).json({Etud:Etud.docs,group:matricule.docs[0].gr, message: 'User  exist.' });
  }

  matricule.docs.name
  
  
  
});



module.exports=Router;