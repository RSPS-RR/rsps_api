import { getSecret, secretNames } from "../secrets.js"

const authKey = 'auth'
export const authorize = (req,res,next) => {
    if(!req.headers[authKey]){
        return res.status(403).json({error:'no credentials sent'})
      }
      if(req.headers.auth !== getSecret(secretNames.clientToken)){
        return res.status(403).json({error:'not authorized'})
      }
    next()
}


export const logger = (req,res,next) => {
    console.log('got request from', req.socket.remoteAddress)
    next()
}