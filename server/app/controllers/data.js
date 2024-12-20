import  { getSecret, secretNames } from '../secrets.js'
import pg from 'pg'
const { Client } = pg;
const getAllData = async(req,res) => {
    try{
      // sql query to get saved data
    const result = await querySql('SELECT * FROM data')
        res.status(200).json(result)
      }catch (e){
        res.status(401).json({ errors: [
          {
            title: 'Error',
            detail: 'error',
            errorMessage: e.message,
          },
        ],})
      }

}
const getDataById = async(req,res) => {
  
      // sql query

}
const getDataByUuid = async(req,res) => {
      // sql query
  
}
const getDataByKey = async(req,res) => {

}

const querySql = async (queryString) => {
  const client = new Client({
    connectionString: getSecret(secretNames.dbUri)
  });

  try {
    await client.connect();
    const res = await client.query(queryString);
    return res.rows;
  } catch (err) {
    console.error('Error executing query', err.stack);
    throw err;
  } finally {
    await client.end();
  }
};

const createData = async(req,res) => {
    const data = req.body
    console.log("data is ", data)
    try {
      if (Array.isArray(data)) {
        try{
      // sql query

        }catch(e){
          console.log(data, e)
        }
      }
      else {
        const { name  } = data
      querySql(`INSERT INTO data (name) VALUES ('${name}')`)

      }
      res
        .status(201)
        .json({
          title: 'Created New Data',
          detail: 'Successfully create new Data entry',
          json: JSON.stringify(data)
        });
    } catch (err) {
      console.log(err)
      res.status(400).json({
        errors: [
          {
            title: 'Registration Error',
            detail: 'Something went wrong during new data entry process.',
            errorMessage: err.message,
            data: data,
          },
        ]
      });
    }
   
}
const updateData = async (req, res) => {
  try {
    if (Array.isArray(req.body)) {
      // sql query

    }
    else {
      console.log(req.body)
      // sql query


    }
    res.status(201).json({ message: 'success', })
  } catch (e) {
    console.log(e)
    res.status(400).json({ error: e })
  }

};

const deleteData = async (req, res) => {
  try {
    querySql(`DELETE FROM data WHERE id = ${req.body.id}`)
    res.status(201).json({ message: 'success' })
  } catch (e) {
    res.status(400).json({ error: e })
  }
};
export {getAllData, createData, updateData, deleteData,getDataById, getDataByUuid}