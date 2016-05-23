var yaml = require('yamljs');
var math = require('mathjs');
var DTW = require('dtw');
var splitter = require('../splitter');

var config = yaml.load('config.yml');
var classifier = config.classifier.dtw;
var dtw = new DTW();

function getDistanceVector(from, to) {
    var distance = [];
    for (var i = 0; i < classifier.dimensions.length; i++) {
        var value = math.round(dtw.compute(
            splitter.getOneDimension(from, classifier.dimensions[i]), 
            splitter.getOneDimension(to, classifier.dimensions[i])
            ));
    
        distance.push(value);    
    }
    
    return distance;
}

function getEuclideanDistance(from, to) {
    var distanceVactor = getDistanceVector(from, to);
    var sum = 0;
    for (var j = 0; j < distanceVactor.length; j++) {
        sum = sum + math.pow(distanceVactor[j], 2);
    }
    
    return math.round(math.sqrt(math.pow(distanceVactor[0], 2)));
}

function getDistanceMatrix(data) {
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
                    dt[jj] = getDistanceVector(from.data[ii], to.data[jj]);
                }
                df[ii] = dt;
            }
            distanceTo.push({'alias': to.item.alias, 'value': df});
        }
        distanceMatrix.push({'alias': from.item.alias, 'distances': distanceTo});
    }
    
    return distanceMatrix;
}

exports.getDistanceVector = getDistanceVector;
exports.getEuclideanDistance = getEuclideanDistance;
exports.getDistanceMatrix = getDistanceMatrix;