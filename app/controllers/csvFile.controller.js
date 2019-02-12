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

exports.saveTicketsFromCsvFile = async (req, res, next) => {
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

  let rowIndx = 0;
  const ticketsToSave = [];

  if (isStringAlpha(jsonFileContent[0].field1)) {
    rowIndx = 1;
  }

  for (rowIndx; rowIndx < jsonFileContent.length; rowIndx++) {
    let newTicket = [
      jsonFileContent[rowIndx].field1,
      false
    ];

    if (!ticketsToSave.find(ticket => ticket[0] === newTicket[0])) {
      ticketsToSave.push(newTicket);
    }
  }

  const DBTickets = await Ticket.findAll();
  const unrepeatedTickets = ticketsToSave.filter((ticketToSave) => {
    return !DBTickets.find((DBTicket) => {
      return ticketToSave[0] === DBTicket.consecutivo;
    });
  });

  Ticket.insertMany(unrepeatedTickets).then((DBResults) => {
    res.status(HTTPStatus.CREATED).json({
      message: "Archivo csv subido.",
      affectedRows: DBResults.affectedRows,
    });
  }, () => {
    res.status(HTTPStatus.INTERNAL_SERVER_ERROR).send(err);
  });
  /*csvConverter.fromFile(fileInfo.path).then(jsonContentFile => {

    Ticket.findAll((err, result) => {
      if (err) {
        console.log(err);
        return;
      }

      Ticket.insertMany(unrepeatedTickets, ((err, result) => {
        if (err) {

        } else {

        }
      }));
    });
  });*/
};
