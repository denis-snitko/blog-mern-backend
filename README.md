
node - v16.17.1

Должен быть установлен Docker

### 1. Прописываем env-переменные в .env

### 2. Поднимаем Mongo DB в Docker
``` 
docker-compose up -d
```

### 3. Настройка mongo-entrypoint необходимый для создания БД и пользователей при первом запуске

- Пример sh-файла, если нам нужен ROOT-пользователь
```
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
```

- Пример файла без ROOT-пользователя
```
#!/bin/bash

mongosh <<EOF

use $MONGO_DB_NAME
db.createUser({
	user: "$MONGO_DB_USERNAME",
	pwd: "$MONGO_DB_PASSWORD",
	roles: [ { role: "readWrite", db: "$MONGO_DB_NAME" } ],
})
EOF

```


### 3. Установка зависимостей
#### Backend
```
npm install
```
#### Frontend
```
cd client && npm install
```


### 4. Запуск приложения для разработки
#### Backend
```
npm run dev
```
#### Frontend
```
cd client && npm run start
```