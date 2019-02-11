"use strict";

const Ticket = require('../models/ticket.model');
const Uploader = require('../utilities/uploader.utility');
const csvtojson = require('csvtojson');
const HTTPStatus = require('http-status');

const uploader = new Uploader('csvfile', '/tmp', 'text/csv', 1024 * 1024 * 5);

exports.upload = uploader.upload;

function isStringAlpha(string) {
  return /^[a-zA-Z]+$/.test(string);
}

exports.saveTicketsFromCsvFile = (req, res, next) => {
  const fileInfo = req.file;

  const csvConverter = csvtojson({
    noheader: true,
  });

  csvConverter.fromFile(fileInfo.path).then(jsonContentFile => {
    if (!jsonContentFile.length) {
      res.status(HTTPStatus.BAD_REQUEST).json({
        message: "El archivo csv no contiene datos.",
      });
      return;
    }

    let rowIndx = 0;
    const ticketsToSave = [];

    if (isStringAlpha(jsonContentFile[0].field1)) {
      rowIndx = 1;
    }

    for (rowIndx; rowIndx < jsonContentFile.length; rowIndx++) {
      let newTicket = [
        jsonContentFile[rowIndx].field1,
        false
      ];

      if (!ticketsToSave.find(ticket => ticket[0] === newTicket[0])) {
        ticketsToSave.push(newTicket);
      }
    }

    Ticket.findAll((err, result) => {
      if (err) {
        console.log(err);
        return;
      }

      const DBTickets = result;
      const unrepeatedTickets = ticketsToSave.filter((ticketToSave) => {
        return !DBTickets.find((DBTicket) => {
          return ticketToSave[0] === DBTicket.consecutivo;
        });
      });

      Ticket.insertMany(unrepeatedTickets, ((err, result) => {
        if (err) {
          res.status(HTTPStatus.INTERNAL_SERVER_ERROR).send(err);
        } else {
          res.status(HTTPStatus.CREATED).json({
            message: "Archivo csv subido.",
            affectedRows: result.affectedRows,
          });
        }
      }));
    });
  });
};
