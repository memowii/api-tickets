"use strict";

const Ticket = require('../models/ticket.model');
const Uploader = require('../utilities/uploader.utility');
const TicketsFilter = require('../utilities/tickestFilter.utility');
const csvtojson = require('csvtojson');
const HTTPStatus = require('http-status');

const uploader = new Uploader('csvfile', '/tmp', 'text/csv', 1024 * 1024 * 5);

exports.upload = uploader.getUploaderType(false, 5);

exports.saveTicketsFromCsvFile = async (req, res, next) => {
  try {
    const filesInfo = req.files;
    let affectedRows = 0;

    for (let fileInfo of Object.values(filesInfo)) {
      const csvConverter = csvtojson({
        noheader: true,
      });

      const jsonFileContent = await csvConverter.fromFile(fileInfo.path);
      if (!jsonFileContent.length) {
        res.status(HTTPStatus.BAD_REQUEST).json({
          message: "El archivo csv no contiene datos.",
        });
        return;
      }

      const DBTickets = await Ticket.findAll();
      const ticketsFilter = new TicketsFilter(jsonFileContent, DBTickets);
      const unrepeatedTickets = ticketsFilter.getUnrepeatedTickets();

      if (unrepeatedTickets.length) {
        const DBResults = await Ticket.insertMany(unrepeatedTickets);
        affectedRows += DBResults.affectedRows;
      }
    }

    res.status(HTTPStatus.CREATED).json({
      message: `Archivo${filesInfo.length > 1 ? 's': ''} csv subido${filesInfo.length > 1 ? 's': ''}.`,
      affectedRows: affectedRows,
    });
  } catch (error) {
    res.status(HTTPStatus.INTERNAL_SERVER_ERROR).send(error);
  }
};
