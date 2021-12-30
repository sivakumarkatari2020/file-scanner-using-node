'use strict';

const eventData = require('../data/events');

const saveFileData = async (values) => {
    try {
        const saveFileData = await eventData.saveFileData(values);
        return saveFileData;
    } catch (error) {
        //res.status(400).send(error.message);
        return {status:200,msg:'File Saving Error'};
    }
}

module.exports = {
    saveFileData
}