import express from 'express'
const router = express.Router();
import  {getAllData, createData, updateData, deleteData, getDataById, getDataByUuid} from '../controllers/data.js';

router
.get('/:_id', getDataById)
.get('/uuid/:uuid',  getDataByUuid)
.get('/',  getAllData)
.post('/',  createData)
.delete('/', deleteData)
.put('/',   updateData)

export default router