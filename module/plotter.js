var plot = require('plotter').plot;
var math = require('mathjs');
var splitter =   require('./splitter');

// Plot each training instances in a seprate file
exports.plotTrainingData = function(item, instances, dimension) {
    if (dimension === undefined) {
        dimension = 1;
    }

    for (var i = 0; i < instances.length; i++) {
        var data = splitter.getOneDimension(instances[i].data, dimension);
        
        plot({
            data:       data,
            filename:   './plot/raw/' + item.alias + '-' + dimension + '-' + i + '.eps',
            options: [
                'grid xtics lt 0 lw 0 lc rgb "#eeeeee"', 
                'xrange [0:' + data.length + ']',
                'xlabel "Time"',
                'ylabel "Acceleration"',
                'grid ytics lt 0 lw 0 lc rgb "#eeeeee"',
                'terminal postscript eps enhanced color font "Times Roman,18"'
            ]            
        });
    }
};

// Plot all training instances of each class in one file
exports.plotData = function(item, data, boundary, numberOfSamples, dimension) {
    if (numberOfSamples === undefined) {
        numberOfSamples = boundary.length;
    }
    if (dimension === undefined) {
        dimension = 1;
    }
    
    var offset = 100;
    var start = boundary[0][0] - offset;
    var end = boundary[numberOfSamples][1] + offset;
    data = splitter.getOneDimension(data.slice(start, end), dimension);
    
    plot({
        data:       data,
        filename:   './plot/raw/' + item.alias + '-' + dimension + '.eps',
        options: [
            'grid xtics lt 0 lw 0 lc rgb "#eeeeee"', 
            'xrange [0:' + data.length + ']',
            'xlabel "Time"',
            'ylabel "Acceleration"',
            'grid ytics lt 0 lw 0 lc rgb "#eeeeee"',
            'terminal postscript eps enhanced color font "Times Roman,18"'
        ]            
    });
};

// Plot distance of one arbitrary instance form others. 
// 
// Note: this is not the plot of instances from each other. It is the plot of 
// one instance form the other
exports.plotDtwData = function(distanceMatrix) {
    for (var ii = 0; ii < 9; ii++) {
        for (var i = 0; i < distanceMatrix.length; i++) {
            var from = distanceMatrix[i];
            var distanceTo = from.distances;
            var data = new Object();
            for (var j = 0; j < distanceTo.length; j++) {
                var to = distanceTo[j];
                data[to.alias] = new Object();
                console.log(from.alias + " -> " + to.alias + ":");
                var df = to.value[ii];
                for (var jj = 0; jj < df.length; jj++) {     
                    var dt = df[jj];
                    data[to.alias][dt[0]] = dt[1];
                }   
            }
            
            plot({
                data:       data,
                filename:   './plot/dtw/' + from.alias + '-' + ii + '.eps',
                style: 'points',
                options: [
                    'grid xtics lt 0 lw 0 lc rgb "#eeeeee"', 
                    'grid ytics lt 0 lw 0 lc rgb "#eeeeee"',
                    'xlabel "Accelerometer distance"',
                    'ylabel "Gyroscope distance"',
                    'size 1.2,1.4',
                    'terminal postscript eps enhanced color font "Times Roman,18"'
                ]
            });
        }
    }    
};