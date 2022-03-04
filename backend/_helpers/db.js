const config = require('../config/db.json');
const mysql = require('mysql2/promise');
const { Sequelize } = require('sequelize');

module.exports = db = {};

initialize();

async function initialize() {
    // create db if it doesn't already exist
    const { host, port, user, password, database } = config.database;
    const connection = await mysql.createConnection({ host, port, user, password });
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);

    // connect to db
    const sequelize = new Sequelize(`mysql://${user}:${password}@${host}/${database}`);

    // init models and add them to the exported db object
    db.Videos = require('../model/videosModel')(sequelize);

    // sync all models with database
    await sequelize.sync();
}