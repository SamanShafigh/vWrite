var plot = require('plotter').plot;
var splitter =   require('../splitter');
           
exports.plotRawData = function(item, data) {
    for (var i = 0; i < data.length; i++) {
        plot({
            data:       splitter.getOneDimension(data[i], 1),
            filename:   './plot/' + item.alias + '-' + i + 'g.png',
            //options: ['yrange [1400:2200]']
        });
    }
};