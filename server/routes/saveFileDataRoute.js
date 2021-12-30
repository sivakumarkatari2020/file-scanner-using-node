'use strict';

const express = require('express');
const getData = require('../controllers/saveFileDataController');
const router = express.Router();

const {saveFileData} = getData;

router.post('/saveFileData',saveFileData);

module.exports = {
    routes: router
}