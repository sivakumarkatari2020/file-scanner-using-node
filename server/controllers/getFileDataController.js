'use strict';

const eventData = require('../data/events');

const getFileData = async (req,res,next) => {
    try {
        const getFileData = await eventData.getFileData();
        res.send(getFileData);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    getFileData
}