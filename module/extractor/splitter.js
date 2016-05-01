var frame = 20;
var recall = 20;

exports.split = function (dataBag) {
    //return dataBag;
    var data = [];
    var frameIndex = 0;
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
            data.push(distance);
        }
    }
    
    return data;
};