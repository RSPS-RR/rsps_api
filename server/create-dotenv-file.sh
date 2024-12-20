#!/bin/bash

# read -p "message" var
read -p "Enter Database Name >> " name
read -p "Enter scheme name (postgres) >> " scheme
read -p "Enter Username (postgres) >> " username
read -p "Enter Password >> " password
read -p "Enter server address >> " serverAddress
read -p "Enter Port >> " serverPort 


tee .env <<<"
DATABASE_NAME=$name
DATABASE_SCHEME=$scheme
DATABASE_USERNAME=$username
DATABASE_PASSWORD=$password
DATABASE_ADDRESS=$serverAddress
DATABASE_PORT=$serverPort
"
echo 'DB_URI=${DATABASE_SCHEME}://${DATABASE_USERNAME}:${DATABASE_PASSWORD}@${DATABASE_ADDRESS}:${DATABASE_PORT}/${DATABASE_NAME}' >> .env