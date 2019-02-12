"use strict";

const Ticket = require('../models/ticket.model');
const Uploader = require('../utilities/uploader.utility');
const TicketsFilter = require('../utilities/tickestFilter.utility');
const csvtojson = require('csvtojson');
const HTTPStatus = require('http-status');

const uploader = new Uploader('csvfile', '/tmp', 'text/csv', 1024 * 1024 * 5);

exports.upload = uploader.upload;

exports.saveTicketsFromCsvFile = async (req, res, next) => {
  try {
    const fileInfo = req.file;
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

    Ticket.insertMany(unrepeatedTickets).then((DBResults) => {
      res.status(HTTPStatus.CREATED).json({
        message: "Archivo csv subido.",
        affectedRows: DBResults.affectedRows,
      });
    });
  } catch (error) {
    res.status(HTTPStatus.INTERNAL_SERVER_ERROR).send(error);
  }
};
