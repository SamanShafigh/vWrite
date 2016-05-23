var yaml = require('yamljs');
var math = require('mathjs');
var dtwClassifier = require('./dtw');
var config = yaml.load('config.yml');
var knnConfig = config.classifier.knn;


// Vote between candidate
function simpleVote(candidates) {
    var frequency = {};
    var max = 0;
    var result;
    for (var i = 0; i < candidates.length; i++) {
        var candidate = candidates[i].alias;
        frequency[candidate] = (frequency[candidate] || 0) +  1;
        if (frequency[candidate] > max) {
            max = frequency[candidate];
            result = candidate;
        }        
    }
    
    return result;
}

function distanceBasedVote(candidates) {
    var frequency = {};
    var max = 0;
    var result;
    for (var i = 0; i < candidates.length; i++) {
        var candidate = candidates[i].alias;
        var distance = candidates[i].distance;
        frequency[candidate] = (frequency[candidate] || 0) +  (1/math.pow(distance, 2));
        if (frequency[candidate] > max) {
            max = frequency[candidate];
            result = candidate;
        }        
    }
    
    return result;
}


// Get the Kth nearest neighbor
function getKNN(subject, trainingData, numberOfNeighbors) {
    if (numberOfNeighbors === undefined) {
        numberOfNeighbors = knnConfig.numberOfNeighbors;
    }
    var distances = [];
    for (var i = 0; i < trainingData.length; i++) {
        var to = trainingData[i];
        for (var j = 0; j < to.data.length; j++) {
            var distance = dtwClassifier.getEuclideanDistance(subject, to.data[j]);
            distances.push({'alias': to.item.alias, 'distance': distance});
        }
    }
    
    distances.sort(function(a, b){
        return a.distance - b.distance;
    });
    
    var candidates = [];
    for (var i = 0; i < numberOfNeighbors; i++) {
        candidates.push(distances[i]);
    }
    
    return candidates;
}

function crossValidation(trainingData, voter) {
    var correctClassifications = 0;
    var incorrectClassifications = 0;
    for (var i = 0; i < trainingData.length; i++) {
        console.log(trainingData[i].item.alias);
        for (var j = 0; j < trainingData[i].data.length; j++) {
            var subject = trainingData[i].data.shift();

            var candidates = getKNN(subject, trainingData);
            var predictedClass = voter(candidates);
            var actualClass = trainingData[i].item.alias;

            console.log(predictedClass + ' => ' + actualClass);
            console.log('---------------');
            if (predictedClass == actualClass) {
                correctClassifications++;
            } else {
                incorrectClassifications++;
            }

            trainingData[i].data.push(subject);
        }
    }
    
    return math.round((correctClassifications * 100)/(correctClassifications + incorrectClassifications));
}

exports.getKNN = getKNN;
exports.simpleVote = simpleVote;
exports.distanceBasedVote = distanceBasedVote;
exports.crossValidation = crossValidation;
