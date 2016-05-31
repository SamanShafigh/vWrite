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

// Distance penalty voting
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
function getKNN(subject, trainingData, K) {
    if (K === undefined) {
        K = knnConfig.K;
    }
    var distances = [];
    for (var i = 0; i < trainingData.length; i++) {
        var to = trainingData[i];
        for (var j = 0; j < to.instances.length; j++) {
            var distance = dtwClassifier.getEuclideanDistance(
                    subject.data, 
                    to.instances[j].data
                    );
            
            distances.push({'alias': to.item.alias, 'distance': distance});
        }
    }
    
    // Sort the training instances based on their distance with the subject
    distances.sort(function(a, b){
        return a.distance - b.distance;
    });
    
    // Get the K nearest neighbour
    var candidates = [];
    for (var i = 0; i < K; i++) {
        candidates.push(distances[i]);
    }
    
    return candidates;
}

// Perform the cross validation of K-NN classification
function crossValidation(trainingData, voter, K) {
    var characterBasedClassificationResult = {};
    var totalClassificationResult = {
        'correct': 0,  // Total number of correct classifications
        'incorrect': 0 // Total number of incorrect classifications
    };
    if (K === undefined) {
        K = knnConfig.K;
    }    
    
    //console.log('f^: is a predicted class and f: is an ctual class');
    for (var i = 0; i < trainingData.length; i++) {
        var alias = trainingData[i].item.alias;
        characterBasedClassificationResult[alias] = {
            'correct': 0,
            'incorrect': 0
        };
        for (var j = 0; j < trainingData[i].instances.length; j++) {
            // Bring out the training instance (subject) from training set
            var subject = trainingData[i].instances.shift();
            
            // Use K-NN to estimate the classification of this subject
            var candidates = getKNN(subject, trainingData, K);
            var predictedClass = voter(candidates);
            var actualClass = trainingData[i].item.alias;
            //console.log('f^:' + predictedClass + ' f:' + actualClass);
            if (predictedClass === actualClass) {
                totalClassificationResult.correct++;
                characterBasedClassificationResult[alias].correct++;
            } else {
                totalClassificationResult.incorrect++;
                characterBasedClassificationResult[alias].incorrect++;
            }
            // Put training instance used as a subject back to our training set
            trainingData[i].instances.push(subject);
        }
    }
    
    console.log('The classification accuracy of each class "A, B, ... Z" for K[' + K + ']');
    for (var i = 0; i < trainingData.length; i++) {
        var alias = trainingData[i].item.alias;    
        // Print out classification accuracy result of each class 'A, B, ... Z'
        console.log(alias + ': ' + calculateAccuracy(characterBasedClassificationResult[alias]) + ',');
    }
    
    // Return total classification accuracy result
    return calculateAccuracy(totalClassificationResult);
}

// Calculate Accuracy based on the obtained result
function calculateAccuracy(result)
{
    return math.round((result.correct * 100)/(result.correct + result.incorrect));
}

exports.getKNN = getKNN;
exports.simpleVote = simpleVote;
exports.distanceBasedVote = distanceBasedVote;
exports.crossValidation = crossValidation;
