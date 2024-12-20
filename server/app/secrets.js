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
