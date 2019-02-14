"use strict";

const Ticket = require('../models/ticket.model');
const Uploader = require('../utilities/uploader.utility');
const TicketsFilter = require('../utilities/tickestFilter.utility');
const csvtojson = require('csvtojson');
const HTTPStatus = require('http-status');

const uploader = new Uploader('csvfile', '/tmp', 'text/csv', 1024 * 1024 * 5);

exports.upload = uploader.getUploader('array', 5);

exports.saveTicketsFromCsvFile = async (req, res, next) => {
  try {
    const uploadedFilesInfo = req.files;
    const DBTickets = await Ticket.findAll();
    const ticketsFilter = new TicketsFilter();

    for (let uploadedFileInfo of Object.values(uploadedFilesInfo)) {
      // For every uploaded file, create a csvConverter, otherwise it will fail with an error of type "stream writable."
      const csvConverter = csvtojson({noheader: true,});
      const jsonFileContent = await csvConverter.fromFile(uploadedFileInfo.path);
      if (!jsonFileContent.length) {
        res.status(HTTPStatus.BAD_REQUEST).json({
          message: `El archivo ${uploadedFileInfo.originalname} no contiene datos.`,
        });
        return;
      }
      ticketsFilter.filterUnrepeatedTickets(jsonFileContent, DBTickets);
    }

    if (ticketsFilter.ticketsToSave.length) {
      const DBResults = await Ticket.insertMany(ticketsFilter.ticketsToSave);
      res.status(HTTPStatus.CREATED).json({
        message: `Archivo${uploadedFilesInfo.length > 1 ? 's': ''} csv subido${uploadedFilesInfo.length > 1 ? 's': ''}.`,
        affectedRows: DBResults.affectedRows,
      });
    } else {
      res.status(HTTPStatus.OK).json({
        message: `Archivo${uploadedFilesInfo.length > 1 ? 's': ''} csv subido${uploadedFilesInfo.length > 1 ? 's': ''}.`,
        affectedRows: 0,
      });
    }
  } catch (error) {
    res.status(HTTPStatus.INTERNAL_SERVER_ERROR).send(error);
  }
};
