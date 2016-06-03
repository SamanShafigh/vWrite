var yaml = require('yamljs');
var math = require('mathjs');
var dtwClassifier = require('./dtw');
var config = yaml.load('config.yml');
var knnConfig = config.classifier.knn;
var numberOfInquiries = 0;

// Vote between candidate
function simpleVote(candidates) {
    var max = 0;
    var classWeight = {};
    var electedClass;

    for (var i = 0; i < candidates.length; i++) {
        var candidate = candidates[i];
        classWeight[candidate.alias] = 
                (classWeight[candidate.alias] || 0) +  1;
        
        if (classWeight[candidate.alias] > max) {
            max = classWeight[candidate.alias];
            electedClass = candidate.alias;
        }        
    }
    
    return electedClass;
}

// Distance penalty voting
function distanceBasedVote(candidates) {
    var max = 0;
    var classWeight = {};
    var electedClass;
    
    for (var i = 0; i < candidates.length; i++) {
        var candidate = candidates[i];
        classWeight[candidate.alias] = 
                (classWeight[candidate.alias] || 0) +  
                (1/math.pow(candidate.distance, 2));
        
        if (classWeight[candidate.alias] > max) {
            max = classWeight[candidate.alias];
            electedClass = candidate.alias;
        }        
    }
    
    return electedClass;
}

// Distance penalty voting + user bias
function userBiasBasedVote(candidates) {
    var max = 0;
    var classWeight = {};
    var electedClass;
    
    for (var i = 0; i < candidates.length; i++) {
        var candidate = candidates[i];
        classWeight[candidate.alias] = 
                (classWeight[candidate.alias] || 0) +  
                (1/math.pow(candidate.distance, 2)) + 
                (candidate.specs.isTraining * knnConfig.uteBias);
        
        if (classWeight[candidate.alias] > max) {
            max = classWeight[candidate.alias];
            electedClass = candidate.alias;
        }        
    }
    
    return electedClass;
}

// Distance penalty voting + reputation bias
function reputationBasedVote(candidates) {
    var max = 0;
    var classWeight = {};
    var electedClass;
    for (var i = 0; i < candidates.length; i++) {
        var candidate = candidates[i];
        classWeight[candidate.alias] = 
                (classWeight[candidate.alias] || 0) +  
                (1/math.pow(candidate.distance, 2)) + 
                (candidate.specs.reputation/numberOfInquiries);
        
        if (classWeight[candidate.alias] > max) {
            max = classWeight[candidate.alias];
            electedClass = candidate.alias;
        }        
    }
    
    electedClass.specs.reputation = electedClass.specs.reputation + 1;
    
    return electedClass;
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
            var traningInstance = to.instances[j];
            var distance = dtwClassifier.getEuclideanDistance(
                    subject.data, 
                    traningInstance.data
                    );
            
            distances.push({
                'alias': to.item.alias,
                'specs': traningInstance.specs,
                'distance': distance
            });
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
    
    numberOfInquiries++;
    
    return candidates;
}

// Perform the cross validation of K-NN classification
function crossValidation(trainingData, voter, K, debug) {
    var characterBasedClassificationResult = {};
    var totalClassificationResult = {
        'correct': 0,  // Total number of correct classifications
        'incorrect': 0 // Total number of incorrect classifications
    };
    if (K === undefined) {
        K = knnConfig.K;
    }
    if (debug === undefined) {
        debug = true;
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
    
    if (debug) {
        console.log('The classification accuracy of each class "A, B, ... Z" for K[' + K + ']');
        for (var i = 0; i < trainingData.length; i++) {
            var alias = trainingData[i].item.alias;    
            // Print out classification accuracy result of each class 'A, B, ... Z'
            console.log(alias + ': ' + calculateAccuracy(characterBasedClassificationResult[alias]) + ',');
        }
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
exports.crossValidation = crossValidation;
exports.simpleVote = simpleVote;
exports.distanceBasedVote = distanceBasedVote;
exports.userBiasBasedVote = userBiasBasedVote;
exports.reputationBasedVote = reputationBasedVote;
