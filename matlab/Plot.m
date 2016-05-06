clc

figure(1)
bar(distanceAv(1:6,1:26)); 
set(gca,'XTick',1:1:26)
set(gca,'XTickLabel',{'A','B','C','D','E','F',''})
xlabel('Alphabets');
ylabel('Distance Value');
legend('A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z');
set(legend,'Position',[0.7926 0.1195 0.06708 0.8046],'FontSize',5);
set(gca,'YLim',[0 35000]);


figure(2)
bar(distanceAv(7:12,1:26)); 
set(gca,'XTick',1:1:26)
set(gca,'XTickLabel',{'G','H','I','J','K','L',''})
xlabel('Alphabets');
ylabel('Distance Value');
legend('A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z');
set(legend,'Position',[0.7926 0.1195 0.06708 0.8046],'FontSize',5);
set(gca,'YLim',[0 35000]);


figure(3)
bar(distanceAv(13:19,1:26)); 
set(gca,'XTick',1:1:26)
set(gca,'XTickLabel',{'M','N','O','P','Q','R','S',''})
xlabel('Alphabets');
ylabel('Distance Value');
legend('A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z');
set(legend,'Position',[0.7926 0.1195 0.06708 0.8046],'FontSize',5);
set(gca,'YLim',[0 35000]);


figure(4)
bar(distanceAv(20:26,1:26)); 
set(gca,'XTick',1:1:26)
set(gca,'XTickLabel',{'T','U','V','W','X','Y','Z',''})
xlabel('Alphabets');
ylabel('Distance Value');
legend('A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z');
set(legend,'Position',[0.7926 0.1195 0.06708 0.8046],'FontSize',5);
set(gca,'YLim',[0 35000]);


