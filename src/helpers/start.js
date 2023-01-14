import { connect } from "mongoose";
import dbConfig from "../../dbConfig.js";

const DB_NAME = process.env.MONGO_DB_NAME;
const MONGO_DB_USERNAME = process.env.MONGO_DB_USERNAME;
const MONGO_DB_PASSWORD = process.env.MONGO_DB_PASSWORD;
// const MONGO_DB_LOCAL_PORT = process.env.MONGO_DB_LOCAL_PORT;

// const URL = `mongodb://localhost:${MONGO_DB_LOCAL_PORT}/${DB_NAME}`;
const URL = `mongodb+srv://${MONGO_DB_USERNAME}:${MONGO_DB_PASSWORD}@cluster0.fobbp.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;

const start = async (cb) => {
	try {
		await connect(URL, dbConfig);
		console.log("Connected successfully to DB");

		cb();
	} catch (error) {
		console.log(error);
	}
};

export default start;
