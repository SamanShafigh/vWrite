var math = require('mathjs');
var yaml = require('yamljs');
var config = yaml.load('config.yml');

// Get calibration parameters and generate calibration matrix
var calibrationParams = config.calibration;
var calibrationMatrixs = [];
for (var j = 0; j < 3; j++) {
    var calParam = calibrationParams[j];
    calibrationMatrixs.push({
        'Ba': math.matrix(calParam.Ba),
        'iRa': math.inv(math.matrix(calParam.Ra)),
        'iKa': math.inv(math.matrix(calParam.Ka))
    });
}

// calibrate sensor data
exports.calibrate = function (data) {
    var calibratedData = [];
    for (var i = 0; i < data.length; i++) {
        var row = [];
        row.push(i);
        for (var j = 0; j < 2; j++) {
            var calibrationMatrix = calibrationMatrixs[j];
            var calibrationParam = calibrationParams[j];
            var offset = calibrationParam.offset;
            
            var x = math.number(data[i][offset[0]]);
            var y = math.number(data[i][offset[1]]);
            var z = math.number(data[i][offset[2]]);
            
            // Sensor raw data
            var rawData = math.matrix([[x], [y], [z]]);
            // Sensor calibrated data
            var calData = math.multiply(
                    math.multiply(calibrationMatrix.iRa, calibrationMatrix.iKa), 
                    math.subtract(rawData, calibrationMatrix.Ba)
                );
        
            var cx = math.round(calData.subset(math.index(0, 0)), 3);
            var cy = math.round(calData.subset(math.index(1, 0)), 3);
            var cz = math.round(calData.subset(math.index(2, 0)), 3);
            var cxyz = math.round(math.sqrt(math.pow(cx, 2) + math.pow(cy, 2) + math.pow(cz, 2)), 3);
            
            row.push(cxyz);
            row.push(cx);
            row.push(cy);
            row.push(cz);
            row.push(x);
            row.push(y);
            row.push(z);
        }
        calibratedData.push(row);
    }
    
    return calibratedData;
};