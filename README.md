# vWrite

## 1 Introduction
Recent advances in Internet of things and wearable sensing devices capable of gathering and transmitting kinematic data from human body directly to Internet have provided us with the feasibility of implementing online human activity recognition systems. The combination of these new wearable sensing devices on Internet is viewed as a great potential, especially if the provided platforms are designed to be flexible and easy to use by developers. However, a typical wearable device is extremely resource constrained [2]. For example, the mica family only includes 8-bit processors with 4 Kbytes of data or program memory and 128 Kbytes of memory. This makes the implementation of hand gesture inference and classification algorithms impossible on such tiny devices especially for lazy learning algorithms like K-NN. Therefore, in this project (Fig.1) a web based API learning and classification platform is introduced from which received hand's gestures and particularly hand's writing related features are deduced and used to classify the user hand's movement in the air to the corresponding alphabet letters over the cloud. This cloud based API platform can be used by developers to leverage the use of kinematic wearable sensing devices in their game, communication, or health care applications.

![vWrite API](https://github.com/SamanShafigh/vWrite/blob/master/img/main.png "vWrite API")

Fig.1 Accelerometer sensor attached to the user wrist (1) captures user hands movement and send raw data to user mobile phone (2) mobile phone then will send these data to the classification API on the cloud (3). vWrite receives sensor raw data (4) and will classify it to the corresponding letters (5). The letters will send it back to the client (6) to be used for other applications (7).


## 2 Definition of Learning Problem

The definition of machine learning problem in this work is to define and implement a system, which I call it 'vWrite' (Void Write) in the context of this work. It maps user's hand movements in the air to its corresponding alphabet letter and improves its knowledge and performance as it gains more experience. The key issues that have been addressed in this work regarding to the implementation of such system are explained in the following sub sections.


## 3 Collection of Training Data

To obtain data, a Shimmer 9DOF (9 degree of freedom) wireless sensor shown in Fig. 3 has been used which combines the features of a 3-axis MEMS accelerometer, a 3-axis MEMS gyroscope and a 3-axis MEMS magnetometer to provide a kinematic wireless sensing solution.
The Shimmer 9DOF wireless sensor is placed on a user's wrist and transmits its data through the ZigBee protocol to the base station (base station could be a user's smart phone or even a direct Internet connection if the sensor supports necessary protocols). A simple Python program is used to receive data on the USB port and saves them in a .csv file as the raw training data.
