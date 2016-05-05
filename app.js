var fann = require('fann');
var yaml = require('yamljs');
var plot = require('plotter').plot;
var extractor = require('./module/extractor');
var splitter = require('./module/splitter');

var config = yaml.load('config.yml');
var training = config.training;

var item = {
    'sample': './data/test.csv',
    'map': [0, 0, 0, 0, 0],
    'alias': 'A',
    'boundary': [
            [2970, 3090],
            [3470, 3590],
            [3870, 3990],
            [4315, 4435],
            [4735, 4855],
            [5095, 5215],
            [5480, 5600],
            [6250, 6370],
            [6595, 6715]
        ]
  };
  
extractor.extract(item, function(data, item) {
    data = splitter.get(data, item.boundary);
    for (var i = 0; i < data.length; i++) {
        plot({
            data:       data[i],
            filename:   './plot/' + item.alias + '-' + i + '.png',
            options: ['yrange [1400:2400]']
        });
        
    }
});

/*
for (var key in training) {
    if (training.hasOwnProperty(key)) {
        var item = training[key];
        extractor.extract(item, function(data, item) {
            data = splitter.get(data, item.boundary);
            for (var i = 0; i < data.length; i++) {
                plot({
                    data:       data[i],
                    filename:   './plot/' + item.alias + '-' + i + '.png',
                    options: ['yrange [1400:2200]']
                });

            }
        });
    }
}

/*
var net = new fann.standard(2,8,2);

//"FANN_LINEAR",
//"FANN_THRESHOLD",
//"FANN_THRESHOLD_SYMMETRIC",
//"FANN_SIGMOID",
//"FANN_SIGMOID_STEPWISE",
//"FANN_SIGMOID_SYMMETRIC",
//"FANN_SIGMOID_SYMMETRIC_STEPWISE",
//"FANN_GAUSSIAN",
//"FANN_GAUSSIAN_SYMMETRIC",
//"FANN_GAUSSIAN_STEPWISE",
//"FANN_ELLIOT",
//"FANN_ELLIOT_SYMMETRIC",
//"FANN_LINEAR_PIECE",
//"FANN_LINEAR_PIECE_SYMMETRIC",
//"FANN_SIN_SYMMETRIC",
//"FANN_COS_SYMMETRIC",
//"FANN_SIN",
//"FANN_COS"

net.activation_function_hidden('FANN_SIGMOID_SYMMETRIC');

var data = [
    [[0, 0], [0, 0]],
    [[0, 1], [1, 1]],
    [[1, 0], [1, 1]],
    [[1, 1], [0, 0]],
];
net.train(data, {error: 0.00001});

var result = net.run([0, 0]);
net.save('model/fann.txt');
console.log('\nTraining....');
[0,1].forEach(function(a) {
  [0,1].forEach(function(b) {
    var c = net.run([a, b]);
    console.log("xor test (" + a + "," + b + ") -> " + c)
  });
});

var netLive = new fann.load('model/fann.txt');
console.log('\nLive....');
[0,1].forEach(function(a) {
  [0,1].forEach(function(b) {
    var c = netLive.run([a, b]);
    console.log("xor test (" + a + "," + b + ") -> " + c)
  });
});
*/