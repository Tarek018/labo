import HyperExpress from 'hyper-express';
const webserver = new HyperExpress.Server();

var cors = require('cors')
webserver.use(cors())

// Create GET route to serve 'Hello World'
webserver.get('/', (request, response) => {
    response.send('Hello World');
})
const usersRoute=require('./routes/student');


webserver.use('/student',usersRoute);


// Activate webserver by calling .listen(port, callback);
webserver.listen(8080)
.then((socket) => console.log('Webserver started on port 8080'))
.catch((error) => console.log('Failed to start webserver on port 80'));