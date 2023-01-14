#!/bin/bash

mongosh <<EOF
use admin
db.createUser({
	user: "$MONGO_DB_ROOT_USERNAME",
	pwd: "$MONGO_DB_ROOT_PASSWORD",
	roles: [ { role: "root", db: "admin" } ],
})

use $MONGO_DB_NAME
db.createUser({
	user: "$MONGO_DB_USERNAME",
	pwd: "$MONGO_DB_PASSWORD",
	roles: [ { role: "readWrite", db: "$MONGO_DB_NAME" } ],
})
EOF
