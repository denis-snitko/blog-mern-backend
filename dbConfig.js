const DB_USER = process.env.MONGO_DB_USERNAME;
const DB_PASS = process.env.MONGO_DB_PASSWORD;

const dbConfig = {
	user: DB_USER,
	pass: DB_PASS,
	useNewUrlParser: true,
	useUnifiedTopology: true,
};

export default dbConfig;
