set terminal svg size 750,320 font "arial,8" 
set terminal postscript eps enhanced color font "Times Roman,18"
set output 'dimensionality-diversity.eps'
set ylabel "Size"

set boxwidth 0.2 absolute
set title "Diversity in the dimension size of training data" 
#set xrange [ 0 : 27 ] noreverse nowriteback
set yrange [ 70 : 350 ] noreverse nowriteback
x = 0.0

set grid ytics lc rgb "#d8d8d8" lw 1 lt 0
set grid xtics lc rgb "#d8d8d8" lw 1 lt 0

set xtics ("A" 1,"B" 2,"C" 3,"D" 4,"E" 5,"F" 6,"G" 7,"H" 8,"I" 9,"J" 10,"K" 11,"L" 12,"M" 13,"N" 14,"O" 15,"P" 16,"Q" 17,"R" 18,"S" 19,"T" 20,"U" 21,"V" 22,"W" 23,"X" 24,"Y" 25,"Z" 26)

plot 'dimensionality-diversity.dat' using 1:3:2:4:3 with candlesticks lt 3 lw 5 title 'dimension size' whiskerbars, '' using 1:3:3:3:3 with candlesticks lt -1 lw 4 notitle