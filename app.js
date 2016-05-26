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
//trainingClasses = trainingClasses.slice(0, 2);
splitter.getDimensionDiversity(trainingClasses);

var trainingData = [];
for (var key in trainingClasses) {
    if (trainingClasses.hasOwnProperty(key)) {
        // Preparing training data
        // Extracting and splitting training sets of each character
        var item = trainingClasses[key];
        extractor.extract(item, function(data, item) {
            // Extracting, calibrating and selecting training data for each character
            console.log("Extracting, calibrating and selecting training data for character: " + item.alias);
            var calibratedDate = calibrator.calibrate(data);
            
            // Plot some of training instances in one plot
            ploter.plotData(item, calibratedDate, item.boundary, 4);
            data = splitter.get(calibratedDate, item.boundary);
            
            // Generate plots for each training instance
            console.log("Extracting and splitting character " + item.alias);
            ploter.plotTrainingData(item, data);
            
            // Aggregating all training data
            trainingData.push({'item': item, 'data': data});
            if (trainingData.length == trainingClasses.length) {
                // Calculate the distance of each training instance from other 
                // training instances
                console.log("Calculating distance matrix ...");
                var distanceMatrix = dtwClassifier.getDistanceMatrix(trainingData);
                ploter.plotDtwData(distanceMatrix);
                
                // Performing cross validation for K = 1 to K = 20
                console.log("Performing cross validation: ");
                for (var K = 1; K < 20; K++) {
                    console.log("Calculate cross validation for K = " + K + " ...");
                    var accuracy = knn.crossValidation(
                        trainingData, // Training data
                        knn.simpleVote, // Voting method for the k nearest neighbors
                        K // Number of neighbors
                        );
                    console.log("Accuracy K[" + K + "]: " + accuracy);
                }                
            }
        });
    }
}