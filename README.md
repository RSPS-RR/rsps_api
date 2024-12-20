# How To Use

### First setup SQL server
#### * for hosting SQL server locally see `setup-postgresql.md` for how to
####
### * Run the `create-dotenv-file.sh` script to create the .env file. This will keep the api keys secret

### ```code npm i``` to install the NPM packages
### ```code npm run startServer``` from the server directory(where package.json is located) to start the server
### ```code npm run dev``` to start the server in dev mode which restarts when changes to the code are detected

App Architecure follows the routes/controller pattern. 

### app folder is parent folder
*  `/routes/` folder
    * this will store the routes for the REST api. create a route for each endpoint you want. Usually each SQL table has it's own route 
    ```javascript


    import express from 'express'
    const router = express.Router();
    import  {getAllData, createData, updateData, deleteData, getDataById, getDataByUuid} from '../    controllers/data.js';
    //link the functions to the routes, and export the router to be used in the server.js file
    router
    .get('/:_id', getDataById)
    .get('/uuid/:uuid',  getDataByUuid)
    .get('/',  getAllData)
    .post('/',  createData)
    .delete('/', deleteData)
    .put('/',   updateData)

    export default router

    ```
*  `server.js` file
    * this is where the server goes and singleton objects. This starts the server and links the routes to URL's and registers them with the server
```javascript
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import  pg  from 'pg';
const {  Client } = pg;
import { secretNames, getSecret } from "./secrets.js"
//import routes
import dataRoute from './routes/data.js'
import { authorize } from './middleware/middlewares.js';

const client = new Client({
  connectionString: getSecret(secretNames.dbUri)
});

client.connect();
//express 
const app = express();
const port = getSecret(secretNames.port);
//middleware
app.use(bodyParser.json());
app.use(cors())
app.use(authorize)
//routes
app.use('/api/data', dataRoute);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

export default { app };

```

*  `secrets.js` file
    * use this as a layer for the .env variables
```javascript
import { config } from 'dotenv';
import { expand } from 'dotenv-expand';

expand(config({ path: '../.env' }));

const secrets = {
  dbUri: process.env.DB_URI || '',
  port: process.env.PORT || 5000,
  clientToken: process.env.CLIENT_TOKEN,
  dbName: process.env.DATABASE_NAME,
  password:process.env.DATABASE_PASSWORD,
  username:process.env.DATABASE_USERNAME,
  dbAddress : process.env.DATABASE_ADDRESS
};
export const secretNames = {
  dbUri:'dbUri',
  port:'port',
  clientToken:'clientToken',
  dbName:'dbName',
  password:'password',
  username:'username',
  dbAddress:'dbAddress'
}

export const getSecret = (key) => secrets[key];

```


### Authentication
authentication works by reading the 'auth' key from the headers sent with every request made by a client. the value of the auth header sent by the client must match the clientToken set in the .env file. 

* get request with authentication header, sent to server running on localhost port 5000
  ```bash
  curl remote.server:5000/api/data -H "auth: abc123"
  ```
* post data
  ```bash
  curl -X POST remote.server:5000/api/data -H "auth:abc123" -d '{"name":"hi"}' -H "Content-Type: application/json"
  ```
* delete data
  ```bash
  curl -X DELETE remote.server:5000/api/data -H "auth:abc123" -d '{"id":1}"' -H "Content-Type: application/json"
  ```
  



