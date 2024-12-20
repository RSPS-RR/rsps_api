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



