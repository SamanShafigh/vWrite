var yaml =          require('yamljs');
var ploter =        require('./module/ploter');
var extractor =     require('./module/extractor');
var splitter =      require('./module/splitter');
var calibrator =    require('./module/calibrator');
var dtwClassifier = require('./module/classifier/dtw');
var knn =           require('./module/classifier/knn');
var math = require('mathjs');

var config = yaml.load('config.yml');
var trainingClasses = config.training;
trainingClasses = trainingClasses.slice(0, 13);

var trainingData = [];
for (var key in trainingClasses) {
    if (trainingClasses.hasOwnProperty(key)) {
        var item = trainingClasses[key];
        extractor.extract(item, function(data, item) {
            data = splitter.get(calibrator.calibrate(data), item.boundary, 10);
            //ploter.plotRawData(item, data, 1);
            
            trainingData.push({'item': item, 'data': data});
            if (trainingData.length == trainingClasses.length) {
                var accuracy = knn.crossValidation(trainingData, knn.distanceBasedVote);
                console.log(accuracy);
                //var distanceMatrix = dtwClassifier.getDistanceMatrix(trainingData);
                //ploter.plotDtwData(distanceMatrix);
            }
        });
    }
}