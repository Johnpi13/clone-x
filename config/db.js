const { MongoClient } = require("mongodb");

const getDBInstance = async() => {
    const client = new MongoClient(process.env.DB_CONNECTION_STRING);
    try {
        const database = client.db("clone-x");
        console.log("connected correctly");

        return database;
    } finally {
        await client.close();
    }
}

module.exports = {
    getDBInstance,
};
