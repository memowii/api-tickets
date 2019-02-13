"use strict";

const multer = require('multer');

function Uploader(name, destination, filters, fileSize) {
  this.name = name;
  this.destination = destination;
  this.filters = filters;
  this.fileSize = fileSize;
  const _this = this;

  this.storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, _this.destination);
    },
    filename: function (req, file, cb) {
      cb(null, new Date().toISOString() + file.originalname);
    }
  });

  this.fileFilter = (req, file, cb) => {
    if (file.mimetype === _this.filters) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };

  this.getUploader = (uploaderType, maxCount) => {
    if (uploaderType === 'single') {
      return multer({
        storage: _this.storage,
        limits: {
          fileSize: _this.fileSize
        },
        fileFilter: _this.fileFilter
      }).single(_this.name);
    }

    if (uploaderType === 'array') {
      return multer({
        storage: _this.storage,
        limits: {
          fileSize: _this.fileSize
        },
        fileFilter: _this.fileFilter
      }).array(_this.name, maxCount);
    }
  };
}

module.exports = Uploader;
