clc
Ra = [-1,0,0.01;-0.01,-1,0.01;0,-0.04,1];
Ka = [96,0,0;0,100,0;0,0,98];
Ba = [1926;2150;1695];
iRa = inv(Ra);
iKa = inv(Ka);

Rg = [-0.01,-1,0.03;-1,0.01,-0.01;0.02,-0.01,-1];
Kg = [2.77,0,0;0,2.77,0;0,0,2.8];
Bg = [1830;1836;1881];
iRg = inv(Rg);
iKg = inv(Kg);

Rm = [1,0,0;0,1,0;0,0,-1];
Km = [706,0,0;0,708,0;0,0,629];
Bm = [-9;149;90];
iRm = inv(Rm);
iKm = inv(Km);

Alphabet='ABCDEFGHIJKLMNOPQRSTUVWXYZ';

for j=1:26,
    
    j
    clearvars A;
    clearvars m;
    clearvars n;
    clearvars openFileName;
    clearvars saveFileName;
    clearvars a_row_final_calibrated;
    
    openFileName  = ['./uncalibrated/',Alphabet(j),'/',Alphabet(j),'-10cm-100Hz.xlsx'];
    saveFileName  = ['./calibrated/',Alphabet(j),'-10cm-100Hz-calibrated.xlsx'];

    A = xlsread(openFileName, 1);

    A = A(1:end,2:end);
    [m,n] = size(A);

    for i=1:m,
        A_row_a = rot90(A(i,1:3),3);
        A_row_ca = iRa * iKa * (A_row_a-Ba);
        A_row_ca = rot90(A_row_ca);
        Axyz2 = sqrt(power(A_row_ca(1),2)+power(A_row_ca(2),2)+power(A_row_ca(3),2));

        A_row_g = rot90(A(i,4:6),3);
        A_row_cg = iRg * iKg * (A_row_g-Bg);
        A_row_cg = rot90(A_row_cg);
        Gxyz2 = sqrt(power(A_row_cg(1),2)+power(A_row_cg(2),2)+power(A_row_cg(3),2));

        A_row_m = rot90(A(i,7:9),3);
        A_row_cm = iRm * iKm * (A_row_m-Bm);
        A_row_cm = rot90(A_row_cm);
        Mxyz2 = sqrt(power(A_row_cm(1),2)+power(A_row_cm(2),2)+power(A_row_cm(3),2));


        AGxyz2 = sqrt(power(Axyz2,2)+power(Gxyz2,2));
        AGMxyz2 = sqrt(power(Axyz2,2)+power(Gxyz2,2)+power(Mxyz2,2));

        a_row_final_calibrated(i,:) = [i,A(i,1:3),A_row_ca,A(i,4:6),A_row_cg,A(i,7:9),A_row_cm,Axyz2,Gxyz2,Mxyz2,AGxyz2,AGMxyz2];

    end
    xlswrite(saveFileName,a_row_final_calibrated);
end

%{
figure(1);
plot(a_row_final_calibrated); grid on;
legend('Ax','Ay','Az','Gx','Gy','Gz','Mx','My','Mz');
axis([1000 7000 -100 100]);
xlabel('Samples'); 
ylabel('');


figure(2);
plot(a_row_final_calibrated(:,1)); grid on;
legend('Acceleration along X axis');
axis([1000 7000 -20 20]);
xlabel('Samples'); 
ylabel('Acceleration (m/sec^2)');

figure(3);
plot(a_row_final_calibrated(:,2)); grid on;
legend('Acceleration along Y axis');
axis([1000 7000 -20 20]);
xlabel('Samples'); 
ylabel('Acceleration (m/sec^2)');


figure(4);
plot(a_row_final_calibrated(:,3)); grid on;
legend('Acceleration along Z axis');
axis([1000 7000 -20 20]);
xlabel('Samples'); 
ylabel('Acceleration (m/sec^2)');

figure(5);
plot(a_row_final_calibrated(:,4)); grid on;
legend('Angular velocity along X axis');
axis([1000 7000 -100 100]);
xlabel('Samples'); 
ylabel('Angular Velocity (deg/sec)');


figure(6);
plot(a_row_final_calibrated(:,5)); grid on;
legend('Angular velocity along Y axis');
axis([1000 7000 -100 100]);
xlabel('Samples'); 
ylabel('Angular Velocity (deg/sec)');


figure(7);
plot(a_row_final_calibrated(:,6)); grid on;
legend('Angular velocity along Z axis');
axis([1000 7000 -100 100]);
xlabel('Samples'); 
ylabel('Angular Velocity (deg/sec)');



figure(8);
plot(a_row_final_calibrated(:,7)); grid on;
legend('magnetic field strength along X axis');
axis([1000 7000 -1.5 0.5]);
xlabel('Samples'); 
ylabel('Magnetic Field Strength (local)');

figure(9);
plot(a_row_final_calibrated(:,8)); grid on;
legend('magnetic field strength along Y axis');
axis([1000 7000 -1.5 0.5]);
xlabel('Samples'); 
ylabel('Magnetic Field Strength (local)');

figure(10);
plot(a_row_final_calibrated(:,9)); grid on;
legend('magnetic field strength along Z axis');
axis([1000 7000 -1.5 0.5]);
xlabel('Samples'); 
ylabel('Magnetic Field Strength (local)');


figure(11);
plot(a_row_final_calibrated(:,10)); grid on;
legend('Acceleration along X,Y,Z axis');
%axis([1000 7000 -20 20]);
xlabel('Samples'); 
ylabel('Acceleration (m/sec^2)');

figure(12);
plot(a_row_final_calibrated(:,11)); grid on;
legend('Angular velocity along X,Y,Z axis');
%axis([1000 7000 -100 100]);
xlabel('Samples'); 
ylabel('Angular Velocity (deg/sec)');

figure(13);
plot(a_row_final_calibrated(:,12)); grid on;
legend('magnetic field strength along X,Y,Z axis');
%axis([1000 7000 -1.5 0.5]);
xlabel('Samples'); 
ylabel('Magnetic Field Strength (local)');

figure(14);
plot(a_row_final_calibrated(:,13)); grid on;
legend('Acceleration and Angular velocity along X,Y,Z axis');
%axis([1000 7000 -1.5 0.5]);
xlabel('Samples'); 
ylabel('Magnetic Field Strength (local)');

figure(15);
plot(a_row_final_calibrated(:,14)); grid on;
legend('Acceleration, Angular velocity and Magnetic Field along X,Y,Z axis');
%axis([1000 7000 -1.5 0.5]);
xlabel('Samples'); 
ylabel('Magnetic Field Strength (local)');
%}


