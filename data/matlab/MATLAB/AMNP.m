
a1=rot90(A1)
a2=rot90(A2)
a3=rot90(A3)
a4=rot90(A4)
a5=rot90(A5)

m1=rot90(M1)
m2=rot90(M2)
m3=rot90(M3)
m4=rot90(M4)
m5=rot90(M5)

n1=rot90(N1)
n2=rot90(N2)
n3=rot90(N3)
n4=rot90(N4)
n5=rot90(N5)

p1=rot90(P1)
p2=rot90(P2)
p3=rot90(P3)
p4=rot90(P4)
p5=rot90(P5)

DistAA(1)=dtw(a1,a1)
DistAA(2)=dtw(a1,a2)
DistAA(3)=dtw(a1,a3)
DistAA(4)=dtw(a1,a4)
DistAA(5)=dtw(a1,a5)


DistAM(1)=dtw(a1,m1)
DistAM(2)=dtw(a1,m2)
DistAM(3)=dtw(a1,m3)
DistAM(4)=dtw(a1,m4)
DistAM(5)=dtw(a1,m5)

DistAN(1)=dtw(a1,n1)
DistAN(2)=dtw(a1,n2)
DistAN(3)=dtw(a1,n3)
DistAN(4)=dtw(a1,n4)
DistAN(5)=dtw(a1,n5)

DistAP(1)=dtw(a1,p1)
DistAP(2)=dtw(a1,p2)
DistAP(3)=dtw(a1,p3)
DistAP(4)=dtw(a1,p4)
DistAP(5)=dtw(a1,p5)

figure(1);
i = 1:5;
plot([rot90(DistAA),rot90(DistAM),rot90(DistAN),rot90(DistAP)]); grid on;
legend('AA','AM','AN','AP');