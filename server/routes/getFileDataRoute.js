'use strict';

const express = require('express');
const getData = require('../controllers/getFileDataController');
const router = express.Router();

const {getFileData} = getData;

router.get('/getFileData',getFileData);

module.exports = {
    routes: router
}