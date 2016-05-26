var plot = require('plotter').plot;

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
    filename:   './accuracy-number-of-k.svg',
    style:      'linespoints',
    options: [
        'xtics 2',
        'yrange [50:100]',
        'xrange [1:20]',
        'xlabel "K"',
        'ylabel "Accuracy"',
        'style line 1 lc rgb "#0060ad" lt 1 lw 2 pt 7 ps 1.5',
        'grid ytics lc rgb "#bbbbbb" lw 1 lt 0',
        'grid xtics lc rgb "#bbbbbb" lw 1 lt 0',
        'terminal svg size 800, 500'
    ]            
});

plot({
    data:  {'accuracy': {
        2: 85,
        3: 92,
        4: 93,
        5: 92,
        6: 94,
        7: 93,
        8: 95,
        9: 94
    }},
    filename:   './accuracy-number-of-training-data.svg',
    style:      'linespoints',
    options: [
        'xtics 2',
        'yrange [50:100]',
        'xrange [1:10]',
        'xlabel "nth training data"',
        'ylabel "Accuracy"',
        'style line 1 lc rgb "#0060ad" lt 1 lw 2 pt 7 ps 1.5',
        'grid ytics lc rgb "#bbbbbb" lw 1 lt 0',
        'grid xtics lc rgb "#bbbbbb" lw 1 lt 0',
        'terminal svg size 800, 500'
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
    filename:   './nodejs-addons-performance-evaluation.svg',
    style:      'linespoints',
    options: [
        'xtics 2',
        'yrange [0:61145]',
        'xrange [28:48]',
        'xlabel "nth Fibonacci number"',
        'ylabel "Time (ms)"',
        'style line 1 lc rgb "#0060ad" lt 1 lw 2 pt 7 ps 1.5',
        'style line 2 lc rgb "#dd181f" lt 1 lw 2 pt 5 ps 1.5',
        'grid ytics lc rgb "#bbbbbb" lw 1 lt 0',
        'grid xtics lc rgb "#bbbbbb" lw 1 lt 0',
        'terminal svg size 800, 500'
    ]            
});