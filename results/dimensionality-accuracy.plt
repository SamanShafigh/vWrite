set terminal svg size 650,620 font "arial,8" 
set terminal postscript eps enhanced color font "Times Roman,18"
set output 'dimensionality-diversity.eps'
set ylabel "Accuracy"

set xtics ("A-X" 1, "A-Y" 2, "A-Z" 3, "A-XY" 4, "A-XZ" 5, "A-YZ" 6, "A-XYZ" 7, "G-X" 8, "G-Y" 9, "G-Z" 10, "G-XYZ" 11, "A-XYZ, G-XYZ     " 12) rotate by 45 right

set boxwidth 0.5
set style fill solid
plot "dimensionality-accuracy.dat" using 1:3 title 'Accuracy' with boxes