var yaml =          require('yamljs');
var ploter =        require('./module/ploter');
var extractor =     require('./module/extractor');
var splitter =      require('./module/splitter');
var calibrator =    require('./module/calibrator');
var dtwClassifier = require('./module/classifier/dtw');

var config = yaml.load('config.yml');
var training = config.training;
//training = training.slice(0, 3);

var classes = [];
for (var key in training) {
    if (training.hasOwnProperty(key)) {
        var item = training[key];
        extractor.extract(item, function(data, item) {
            data = splitter.get(calibrator.calibrate(data), item.boundary, 5);
            ploter.plotRawData(item, data, 1);
            
            classes.push({'item': item, 'data': data});
            if (classes.length == training.length) {
                var distanceMatrix = dtwClassifier.getDistance(classes);
                ploter.plotDtwData(distanceMatrix);
            }
        });
    }
}