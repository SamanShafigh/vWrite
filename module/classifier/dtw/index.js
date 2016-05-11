var yaml = require('yamljs');
var DTW = require('dtw');
var splitter = require('../../splitter');

var config = yaml.load('config.yml');
var training = config.training;
var dtw = new DTW();

exports.getDistance = function (data) {
    var distanceMatrix = [];
    for (var i = 0; i < data.length; i++) {
        var from = data[i];
        var distanceTo = [];
        for (var j = 0; j < data.length; j++) {
            var to = data[j];
            var distance = dtw.compute(
                splitter.getOneDimension(from.data[0], 1), 
                splitter.getOneDimension(to.data[0], 1)
                );
            distanceTo.push({'alias': to.item.alias, 'value': distance});
        }
        distanceMatrix.push({'alias': from.item.alias, 'distances': distanceTo});
    }
    
    for (var i = 0; i < distanceMatrix.length; i++) {
        var from = distanceMatrix[i];
        var distances = from.distances;
        console.log(from.alias + ":");
        for (var j = 0; j < distances.length; j++) {
            var distance = distances[j];
            console.log("------" + distance.value);
        }
    }
}