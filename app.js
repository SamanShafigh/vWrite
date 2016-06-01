var yaml =          require('yamljs');
var ploter =        require('./module/plotter');
var extractor =     require('./module/extractor');
var splitter =      require('./module/splitter');
var calibrator =    require('./module/calibrator');
var dtwClassifier = require('./module/classifier/dtw');
var knn =           require('./module/classifier/knn');
var math =          require('mathjs');

var config = yaml.load('config.yml');
var trainingClasses = config.training;
//trainingClasses = trainingClasses.slice(0, 6);

main2();

function main2() {
    var trainingData = [];
    for (var key in trainingClasses) {
        if (trainingClasses.hasOwnProperty(key)) {
            // Preparing training data
            // Extracting and splitting training sets of each character
            var item = trainingClasses[key];
            extractor.extract(item, function(data, item) {
                var calibratedDate = calibrator.calibrate(data);
                // Plot some of training instances in one plot
                var instances = splitter.getInstances(calibratedDate, item.boundary);

                // Aggregating all training instances
                trainingData.push({'item': item, 'instances': instances});
                if (trainingData.length === trainingClasses.length) {
                    // Performing cross validation for K = 1 to K = 20
                    var K = 4;
                    var accuracy = knn.crossValidation(
                        trainingData, // Training data
                        knn.distanceBasedVote, // Voting method for the k nearest neighbors
                        K, // Number of neighbors
                        false // Debug mode
                        );

                    console.log(K + ": " + accuracy);
                }
            });
        }
    }
}

function main() {
    splitter.getDimensionDiversity(trainingClasses);

    var trainingData = [];
    for (var key in trainingClasses) {
        if (trainingClasses.hasOwnProperty(key)) {
            // Preparing training data
            // Extracting and splitting training sets of each character
            var item = trainingClasses[key];
            extractor.extract(item, function(data, item) {
                // Extracting, calibrating and selecting training data for each character
                console.log("Extracting, calibrating and selecting " +
                            "training data for character: " + item.alias);
                var calibratedDate = calibrator.calibrate(data);

                // Plot some of training instances in one plot
                ploter.plotData(item, calibratedDate, item.boundary, 4);
                var instances = splitter.getInstances(calibratedDate, item.boundary);

                // Generate plots for each training instance
                console.log("Extracting and splitting character " + item.alias);
                ploter.plotTrainingData(item, instances);

                // Aggregating all training instances
                trainingData.push({'item': item, 'instances': instances});
                if (trainingData.length === trainingClasses.length) {
                    // Calculate the distance of each training instance from other 
                    // training instances
                    console.log("Calculating distance matrix ...");
                    var distanceMatrix = dtwClassifier.getDistanceMatrix(trainingData);
                    ploter.plotDtwData(distanceMatrix);
                    
                    // Performing cross validation for K = 1 to K = 20
                    console.log("Performing cross validation: ");
                    /*
                    for (var K = 1; K < 20; K++) {
                        console.log("Calculate cross validation for K = " + K + " ...");
                        var accuracy = knn.crossValidation(
                            trainingData, // Training data
                            knn.simpleVote, // Voting method for the k nearest neighbors
                            K // Number of neighbors
                            );
                    
                        console.log("Accuracy K[" + K + "]: " + accuracy);
                    } 
                    */
                }
            });
        }
    }
}