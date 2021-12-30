'use strict';

const utils = require('../utils');
const config = require('../../config');
const sql = require('mssql');

const saveFileData = async (values) => {
    try{
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('/');
        const saveFileData = await pool.request()
                                .input('id',sql.Int,values.id)
                                .input('f_name',sql.NVarChar(50),values.f_name)
                                .input('contents',sql.VarChar(sql.MAX),values.contents)
                                .input('f_path',sql.NVarChar(sql.MAX),values.f_path)
                                .query(sqlQueries.saveFileData);
        return saveFileData.rowsAffected;
    } catch (error) {
        return error.message;
    }
}

const getFileData = async () => {
    try{
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('/');
        const getFileData = await pool.request()
                                .query(sqlQueries.getFileData);
        return getFileData.recordset;
    } catch (error) {
        return error.message;
    }
}

module.exports = {
    saveFileData,
    getFileData
}