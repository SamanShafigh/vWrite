var yaml = require('yamljs');
var math = require('mathjs');
var DTW = require('dtw');
var splitter = require('../splitter');

var config = yaml.load('config.yml');
var training = config.training;
var dtw = new DTW();

exports.getDistanceMatrix = function (data) {
    var distanceMatrix = [];
    for (var i = 0; i < data.length; i++) {
        var from = data[i];
        var distanceTo = [];
        for (var j = 0; j < data.length; j++) {
            var to = data[j];
            var df = [];
            for (var ii = 0; ii < from.data.length; ii++) {
                var dt = [];
                for (var jj = 0; jj < to.data.length; jj++) {        
                    dt[jj] = [
                        math.round(dtw.compute(
                            splitter.getOneDimension(from.data[ii], 1), 
                            splitter.getOneDimension(to.data[jj], 1)
                            )),
                        math.round(dtw.compute(
                            splitter.getOneDimension(from.data[ii], 8), 
                            splitter.getOneDimension(to.data[jj], 8)
                            ))
                    ];        
                }
                df[ii] = dt;
            }
            distanceTo.push({'alias': to.item.alias, 'value': df});
        }
        
        distanceMatrix.push({'alias': from.item.alias, 'distances': distanceTo});
    }
    
    return distanceMatrix;
}