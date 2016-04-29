var fann = require('fann');
var yaml = require('yamljs');
var extractor = require('./module/extractor');
var plot = require('plotter').plot;

var config = yaml.load('config.yml');
var training = config.training;

for (var key in training) {
    if (training.hasOwnProperty(key)) {
        var item = training[key];
        extractor.extract(item, function(data, item) {
            /*
            plot({
                data:       data,
                filename:   './plot/' + item.alias + '.png'
            });
            */
        });
    }
}

/*
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