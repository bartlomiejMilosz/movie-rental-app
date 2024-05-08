# Configuring transactions in MongoDB
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

# Reinstallation MongoDB
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

### Step 3: Set Environment Variables for Production
In your production environment, you should set environment variables that correspond to the keys in your custom-environment-variables.json. For example:
export DB_HOST=prod-db-host
export DB_PORT=27017
export DB_NAME=movie-rental

export MOVIE_RENTAL_JWT_PRIVATE_KEY=mySecureKey

### to run app.js from terminal
export MOVIE_RENTAL_JWT_PRIVATE_KEY=mySecureKey
export NODE_CONFIG_DIR=/home/bart/Dropbox/Projects/javascript/movie-rental/config

### github
git remote add origin https://github.com/bartlomiejMilosz/student-enrolment-app.git
git push -u origin main
git pull --rebase origin main
