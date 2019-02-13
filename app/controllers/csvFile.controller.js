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
    const filesInfo = req.files;
    const DBTickets = await Ticket.findAll();
    const ticketsFilter = new TicketsFilter();

    for (let fileInfo of Object.values(filesInfo)) {
      const csvConverter = csvtojson({
        noheader: true,
      });

      const jsonFileContent = await csvConverter.fromFile(fileInfo.path);
      if (!jsonFileContent.length) {
        res.status(HTTPStatus.BAD_REQUEST).json({
          message: `El archivo ${fileInfo.originalname} no contiene datos.`,
        });
        return;
      }
      ticketsFilter.filterUnrepeatedTickets(jsonFileContent, DBTickets);
    }

    if (ticketsFilter.ticketsToSave.length) {
      const DBResults = await Ticket.insertMany(ticketsFilter.ticketsToSave);
      res.status(HTTPStatus.CREATED).json({
        message: `Archivo${filesInfo.length > 1 ? 's': ''} csv subido${filesInfo.length > 1 ? 's': ''}.`,
        affectedRows: DBResults.affectedRows,
      });
    } else {
      res.status(HTTPStatus.OK).json({
        message: `Archivo${filesInfo.length > 1 ? 's': ''} csv subido${filesInfo.length > 1 ? 's': ''}.`,
        affectedRows: 0,
      });
    }
  } catch (error) {
    res.status(HTTPStatus.INTERNAL_SERVER_ERROR).send(error);
  }
};
