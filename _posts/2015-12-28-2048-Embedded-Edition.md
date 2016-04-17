---
layout: post
title: 2048 Embedded Edition on Arduino
comments: true
redirect_from: /2015/12/28/2048-Embedded-Edition
permalink: 2048-Embedded-Edition
---

2048 is one of the most popular mobile game in the world, so I decided to imagrate this amamzing game to Arduino.

##Image
![2048 image](https://michaellin.me/img/2048_embedded_edition.jpg)

Honestly, I'm pretty bad at this game. Never got a chance to reach 2048 :(

##Setup
###Stuff you need  
1. Download the source code  
```
$ git clone https://github.com/ExiaSR/2048_embedded_edition.git
```
2. Or download the zipped file.
3. Edit the pin setting in config.h, in case you have different Arduino, or whatever..

###Compling
Builing with a Makefile is recommended.
Open up the terminal, and run  
```
$ make upload
```  
Or you may edit or rename the main.cpp by yourself, then use Arduino IDE to complie instead.

###Wiring Instruction
Hardware you need:   
1. Arduino board   
2. LCD screen with ST7735 chip  
3. A joystick  
4. A push button  
5. Serval wires  
