var math = require('mathjs');

var frame = 10;
var recall = 10;
var thresholdValue = 200;
var thresholdFrame = 5;

exports.getInstances = function (dataBag, boundary, isTraining, length) {
    var instances = [];
    if (length === undefined) {
        length = boundary.length;
    }
    if (isTraining === undefined) {
        isTraining = true;
    }
    
    for (var i = 0; i < length; i++) {
        instances.push({
            'data': dataBag.slice(boundary[i][0], boundary[i][1]), 
            'specs': {
                'isTraining': isTraining
                }
            });
    }
    
    return instances;
};

exports.getOneDimension = function(dataBag, dimension) {
    var data = [];
    for (var i = 0; i < dataBag.length; i++) {
        data.push(dataBag[i][dimension]);
    }
    
    return data;
};

exports.getDimensionDiversity = function (trainingInfo) {
    var dimensionDiversity = [];
    for (var i = 0; i < trainingInfo.length; i++) {
        var set = trainingInfo[i];
        var max = null;
        var min = null;
        var sum = 0;
        for (var j = 0; j < set.boundary.length; j++) {
            var boundary = set.boundary[j];
            var size = boundary[1] - boundary[0];
            sum = sum + size;
            if (size > max || max === null) {
                max = size;
            }
            if (size < min || min === null) {
                min = size;
            }
        }
        console.log((i + 1) + '    ' + min + '    ' + math.round(sum/set.boundary.length) + '    ' + max);
        dimensionDiversity.push({
            'alias': set.alias,
            'min': min,
            'avre': math.round(sum/set.boundary.length),
            'max': max
        });
    }
    
    return dimensionDiversity;
};

exports.split = function (dataBag) {
    var data = [];
    var distanceData = [];
    var frameIndex = 0;
    
    var framesH = 0;
    var framesL = 0;
    
    var buffering = {
        start: true,
        end: true,
        startIndex: null,
        endIndex: null
    };
    
    var buffer = [];
    var bufferInfo = [];
    var splittedData = [];
    
    var length = dataBag.length;
    for (var i = 0; i < length; i+=recall) {
        if ((i + frame) < length) {
            frameIndex++;
            
            var sum = 0;
            for (var j = i; j < (i + frame); j++) {
                sum = sum + dataBag[j];
            }
            var mean = Math.round(sum / frame);
            var distance = 0;
            for (var j = i; j < (i + frame); j++) {
                distance = distance + Math.abs(dataBag[j] - mean);
            }
            distanceData.push(distance);
            
            if (thresholdValue < distance) {
                framesH++;
                if (thresholdFrame < framesH) {
                    buffering.end = true;
                    framesH = 0;
                    framesL = 0;
                    if (buffering.start === true) {
                        buffering.start = false;
                        buffering.startIndex = i;
                        buffer = [];
                    }
                    for (var j = i; j < (i + frame); j++) {
                        buffer.push(dataBag[j]);
                    }
                }
            } else {
                framesL++;
                if (thresholdFrame < framesL) {
                    if (buffering.end === true) {
                        buffering.end = false;
                        buffering.endIndex = i;
                        splittedData.push(buffer);
                        bufferInfo.push({
                            startIndex: buffering.startIndex,
                            endIndex: buffering.endIndex                            
                        });
                    }
                    buffering.start = true;
                    framesL = 0;
                    framesH = 0;
                }
            }
        }
    }
   
    return splittedData;
};