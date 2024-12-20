create lightsail instance on amazon lightsail. debian 12, OS ONLY 
forward the ipv4 port for postgres

install postgresql
enable postgres 'sudo systemctl enable postgresql'

configure postgresql 
    configure listening address to only the API server's IP
            /etc/postgresql/*/main/postgresql.conf
    configure IDENT authentication
            /etc/postgresql/*/main/pg_ident.conf
                # TYPE  DATABASE        USER            ADDRESS                 METHOD
                host    all             all             192.168.1.0/24          password
    configure pg_hba.conf - use the ip address of the api server
    # Allow all users to connect to the 'data' database from a specific IP address
    host    data            all             192.168.1.100/32        md5


set database password for postgres user (not the account password but the sqlserver password for postgres user)
    switch to postgres user  'sudo -i -u postgres'
    run postgres console 'psql'
    set password '\password postgres'
    create a new database 'CREATE DATABASE data;` >> Note semicolon is essential
    switch to database '\c data'
    create table 

    CREATE TABLE data (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
    );

    run \q to quit

the server connection string is 
postgres://postgres:${DATABASE_PASSWORD}@${IP_ADDRESS}:5432/${DATABASE_NAME}

