var fs = require('fs');
var csv = require('fast-csv');
var splitter = require('./splitter');

exports.extract = function (item, callback) {
    var stream = fs.createReadStream(item.sample);
    var dataBag = [];
    csv.fromStream(stream)
        .on("data", function(data) {
            dataBag.push(data[1]);
        })
        .on("end", function() {
            dataBag = splitter.split(dataBag);
            callback(dataBag, item);
        });
};