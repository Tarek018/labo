import HyperExpress from 'hyper-express';
const webserver = new HyperExpress.Server();
import Pouchdb from 'pouchdb';
import PouchDB_Find from 'pouchdb-find';
Pouchdb.plugin(PouchDB_Find);

var cors = require('cors')
webserver.use(cors())

// Create GET route to serve 'Hello World'
webserver.post('/login', async(request, response) => {

    const db = new Pouchdb('http://admin:admin@127.0.0.1:5984/labo');

    
    

    request.body= await request.json();
    
    let userexist=await db.find({
        selector:{
            ID:{
                $eq:request.body
            }
        }
    });
    console.log(userexist.docs[0].ID);

    if(userexist.docs == ''){
        response.status(400).json({ message: 'User does not exist.' })
      }else{
        response.status(200).json({ id:userexist.docs[0].ID,message: 'User  exist.' });
      }
});
//Routes
const usersRoute=require('./routes/student');
const teacherRoute=require('./routes/teacher');
const adminRoute=require('./routes/admin');
const agentRoute=require('./routes/agent');


webserver.use('/student',usersRoute);
webserver.use('/teacher',teacherRoute);
webserver.use('/admin',adminRoute);
webserver.use('/agent',agentRoute);




// Activate webserver by calling .listen(port, callback);
webserver.listen(8080)
.then((socket) => console.log('Webserver started on port 8080'))
.catch((error) => console.log('Failed to start webserver on port 8080'));