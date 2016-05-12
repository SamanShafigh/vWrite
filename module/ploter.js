var plot = require('plotter').plot;
var splitter =   require('./splitter');
           
exports.plotRawData = function(item, data, dimension) {
    for (var i = 0; i < data.length; i++) {
        plot({
            data:       splitter.getOneDimension(data[i], dimension),
            filename:   './plot/raw/' + item.alias + '-' + dimension + '-' + i + '.svg',
            options: [
                //'yrange [1400:2200]',
                'grid xtics lt 0 lw 0 lc rgb "#eeeeee"', 
                'grid ytics lt 0 lw 0 lc rgb "#eeeeee"',
                'terminal svg size 800, 500'
            ]            
        });
    }
};

exports.plotDtwData = function(distanceMatrix) {
    for (var i = 0; i < distanceMatrix.length; i++) {
        var from = distanceMatrix[i];
        var distanceTo = from.distances;
        var data = new Object();
        for (var j = 0; j < distanceTo.length; j++) {
            var to = distanceTo[j];
            data[to.alias] = new Object();
            console.log(from.alias + " -> " + to.alias + ":");
            for (var ii = 0; ii < to.value.length; ii++) {
                var df = to.value[ii];
                for (var jj = 0; jj < df.length; jj++) {     
                    var dt = df[jj];
                    data[to.alias][dt[0]] = dt[1];
                }   
            }
        }
        
        plot({
            data:       data,
            filename:   './plot/dtw/' + from.alias + '.svg',
            style: 'points',
            options: [
                'grid xtics lt 0 lw 0 lc rgb "#eeeeee"', 
                'grid ytics lt 0 lw 0 lc rgb "#eeeeee"',
                'terminal svg size 800, 800'
            ]
        });
    }    
};