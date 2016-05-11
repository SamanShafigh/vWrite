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
            
            row.push(math.number(data[i][offset[0]]));
            row.push(math.number(data[i][offset[1]]));
            row.push(math.number(data[i][offset[2]]));
            // Sensor raw data
            var rawData = math.matrix(
                [
                    [math.number(data[i][offset[0]])], 
                    [math.number(data[i][offset[1]])], 
                    [math.number(data[i][offset[2]])]
                ]);
            // Sensor calibrated data
            var calData = math.multiply(
                    math.multiply(calibrationMatrix.iRa, calibrationMatrix.iKa), 
                    math.subtract(rawData, calibrationMatrix.Ba)
                );
        
            row.push(math.round(calData.subset(math.index(0, 0)), 3));
            row.push(math.round(calData.subset(math.index(1, 0)), 3));
            row.push(math.round(calData.subset(math.index(2, 0)), 3));
        }

        calibratedData.push(row);
    }
    
    return calibratedData;
};