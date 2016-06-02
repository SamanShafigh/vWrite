var plot = require('plotter').plot;


plot({
    data:  {'Execution time per nth training data': {
        234: 579,    
        468: 1148,
        702: 1625,
        936: 2140,
        1170: 2915,
        1404: 3546,
        1638: 4199,
        1872: 4650,
        2106: 4949,
        2340: 5619
    }},
    filename:   './execution-time-number-of-training-data.eps',
    style:      'linespoints',
    options: [
        'xtics 2',
        'yrange [500:6000]',
        'xrange [200:2340]',
        'xlabel "nth training data"',
        'ylabel "Accuracy %"',
        'xtics ("234" 234, "468" 468, "702" 702, "936" 936, "1170" 1170, "1404" 1404, "1638" 1638, "1872" 1872, "2106" 2106, "2340" 2340)',
        'style line 1 lc rgb "#0060ad" lt 1 lw 2 pt 7 ps 1.5',
        'grid ytics lc rgb "#bbbbbb" lw 1 lt 0',
        'grid xtics lc rgb "#bbbbbb" lw 1 lt 0',
        'terminal postscript eps enhanced color font "Times Roman,18"'
    ]            
});

plot({
    data:  {
        'Distance based voting': {
            1: 94,    
            2: 94,
            3: 95,
            4: 95,
            5: 95,
            6: 95,
            7: 94,
            8: 94,
            9: 94,
            10: 94,
            11: 94,    
            12: 94,
            13: 94,
            14: 94,
            15: 94,
            16: 94,
            17: 94,
            18: 94,
            19: 94,
            20: 94
        },
        'Simple avrage voting': {
            1: 94,    
            2: 94,
            3: 95,
            4: 95,
            5: 95,
            6: 95,
            7: 93,
            8: 93,
            9: 92,
            10: 92,
            11: 90,    
            12: 90,
            13: 87,
            14: 86,
            15: 84,
            16: 82,
            17: 79,
            18: 77,
            19: 76,
            20: 73
        }
    },
    filename:   './accuracy-number-of-k.eps',
    style:      'linespoints',
    options: [
        'xtics 2',
        'yrange [50:100]',
        'xrange [1:20]',
        'xlabel "K"',
        'ylabel "Accuracy %"',
        'style line 1 lc rgb "#0060ad" lt 1 lw 2 pt 7 ps 1.5',
        'grid ytics lc rgb "#bbbbbb" lw 1 lt 0',
        'grid xtics lc rgb "#bbbbbb" lw 1 lt 0',
        'terminal postscript eps enhanced color font "Times Roman,18"'
    ]            
});

plot({
    data:  {'Accuracy per nth training data': {
        0: 0,    
        1: 85,
        2: 92,
        3: 93,
        4: 92,
        5: 94,
        6: 93,
        7: 95,
        8: 94,
        9: 95
    }},
    filename:   './accuracy-number-of-training-data.eps',
    style:      'linespoints',
    options: [
        'xtics 2',
        'yrange [60:100]',
        'xrange [0:9]',
        'xlabel "nth training data"',
        'ylabel "Accuracy %"',
        'xtics ("0" 0, "1" 1, "2" 2, "3" 3, "4" 4, "5" 5, "6" 6, "7" 7, "8" 8, "9" 9, "10" 10)',
        'style line 1 lc rgb "#0060ad" lt 1 lw 2 pt 7 ps 1.5',
        'grid ytics lc rgb "#bbbbbb" lw 1 lt 0',
        'grid xtics lc rgb "#bbbbbb" lw 1 lt 0',
        'terminal postscript eps enhanced color font "Times Roman,18"'
    ]            
});

plot({
    data:  {
    'C++ (ms)': {
        28: 2,
        30: 4,
        32: 10,
        34: 10,
        36: 62,
        38: 162,
        40: 420,
        42: 1088,
        44: 2881,
        46: 7491,
        48: 19680
        },
    'JavaScript (ms)': {
        28: 6,
        30: 13,
        32: 29,
        34: 74,
        36: 189,
        38: 497,
        40: 1297,
        42: 3389,
        44: 8890,
        46: 23374,
        48: 61145
        }
    },
    filename:   './nodejs-addons-performance-evaluation.eps',
    style:      'linespoints',
    options: [
        'xtics 2',
        'yrange [0:61145]',
        'xrange [28:48]',
        'xlabel "nth Fibonacci number"',
        'ylabel "Time (ms)"',
        'grid ytics lc rgb "#cccccc" lw 2 lt 0',
        'grid xtics lc rgb "#cccccc" lw 2 lt 0',
        'terminal postscript eps enhanced color font "Times Roman,18"'
    ]            
});