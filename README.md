sudo nano /etc/mongod.conf

# MongoDB Configuration File

# Network interfaces
net:
port: 27017
bindIp: 127.0.0.1

# Replica set options
replication:
replSetName: "rs0"

sudo systemctl restart mongod
mongosh
rs.initiate()
rs.status()

# reinstallation
sudo systemctl stop mongod
sudo apt-get purge mongodb-org*

sudo rm -r /var/log/mongodb
sudo rm -r /var/lib/mongodb

sudo apt-get autoremove
sudo apt-get autoclean

wget -qO - https://www.mongodb.org/static/pgp/server-5.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/5.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-5.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org

sudo systemctl start mongod
sudo systemctl enable mongod

sudo systemctl status mongod
mongo / mongosh

Yes, you're absolutely correct that using a configuration library like config can greatly improve how you handle database connection settings by abstracting them out of your code and making your application more flexible and environment agnostic.

Here's how you can use the config library to manage your MongoDB connection string, along with other settings:
Step 1: Update Your Configuration Files

    Modify Configuration Files:
        Add a database connection string to your configuration files in the config directory.

Here’s an example of how you might structure these files:

    default.json

    json

{
"db": {
"host": "localhost",
"port": 27017,
"dbName": "vidly"
}
}

production.json

json

{
"db": {
"host": "prod-db-host",
"port": 27017,
"dbName": "vidly"
}
}

custom-environment-variables.json

json

    {
        "db": {
            "host": "DB_HOST",
            "port": "DB_PORT",
            "dbName": "DB_NAME"
        }
    }

Step 2: Use Config to Load Database Settings

Modify your application to use these settings. Here’s how you can change your MongoDB connection setup:

javascript

import express from "express";
import mongoose from "mongoose";
import config from 'config';
import { customerRouter } from "./api/customer/customer.router.js";
import { genreRouter } from "./api/genre/genre.router.js";
import { movieRouter } from "./api/movie/movie.router.js";
import { rentalRouter } from "./api/rental/rental.router.js";
import { userRouter } from "./api/user/user.router.js";
import { userAuthRouter } from "./api/user/user.userAuth.router.js";

const app = express();

const dbConfig = config.get('db');
const dbURI = `mongodb://${dbConfig.host}:${dbConfig.port}/${dbConfig.dbName}`;

mongoose
.connect(dbURI)
.then(() => console.log("Connected to MongoDB..."))
.catch((err) => console.error("Could not connect to MongoDB...", err.message));

app.use(express.json());
app.use("/api/genres", genreRouter);
app.use("/api/customers", customerRouter);
app.use("/api/movies", movieRouter);
app.use("/api/rentals", rentalRouter);
app.use("/api/users", userRouter);
app.use("/api/userAuth", userAuthRouter);

export { app };

### Step 3: Set Environment Variables for Production
In your production environment, you should set environment variables that correspond to the keys in your custom-environment-variables.json. For example:
export DB_HOST=prod-db-host
export DB_PORT=27017
export DB_NAME=movie-rental

export MOVIE_RENTAL_JWT_PRIVATE_KEY=mySecureKey

### to run app.js from terminal
export MOVIE_RENTAL_JWT_PRIVATE_KEY=mySecureKey
export NODE_CONFIG_DIR=/home/bart/Dropbox/Projects/javascript/movie-rental/config

