---
title: Main Firmware
docs: true
weight: 1
section: Firmware
---

### Overview

The CANBus Triple MCU firmware is the heart of the system. It talks to the MCP2515 CAN Controllers and the BLE112 Bluetooth LE module. It's also where you define your custom logic for your own applications. 

This Firmware is provided as a base to get you started. I fully expect developers to fork and modify the code to create new and amazing things. If you improve the code please submit a pull request so others can benefit from the improvements. 


### Arduino setup

To lower the barrier of entry the CANBus Triple is compatible with the Arduino platform and IDE. This is not required, you could write your application in C with the AVR library if you choose to do so. 

If you do not have the Arduino IDE installed download and install it from here:

[Arduino Downloads](http://arduino.cc/en/Main/Software) (Current Version 1.6.0)

Connect your CANBus Triple via the supplied USB cable to your Mac or PC. 
In the Arduino IDE Select these configuration options. 

**Tools > Board > Arduino Leonardo**

**Tools > Port > [The CBT Port]**

The CBT Port will be something like COM5 on windows, or /dev/cu.usbserialXXXXX on MacOS X or Linux.

Now lets test your setup. Open the Blink sketch by selecting:  
**File > Examples > 01.Basics > Blink**

This will load the example Blink demo. The CANBus Triple uses the same Digital Pin for the LED as the Arduino Leonardo, so this Blink code will work unmodified. 

Click the button in the upper left corner of the Arduino IDE with an arrow pointing to the right. This is the upload button. It compile and upload the code in the editor to your CANBus Triple. 

A few seconds after compiling/uploading the code the editor should say 'Done.' and the <span style="color:red;">Red</span> boot led will begin to flash.


### Clone the repo

Clone the Git repo from Github, or [download a zip file](https://github.com/CANBus-Triple/CANBus-Triple/archive/master.zip). 

	git clone https://github.com/CANBus-Triple/CANBus-Triple.git

If you're unfamiliar with Git [you can read more about it here](https://www.atlassian.com/git/tutorials/setting-up-a-repository/git-init). Usage of Git is recommend as we cannot merge in any improvements you make if you're not working under version control. 

Clone this repo / download to your Arduino Sketchbook/hardware folder. The path should look like this

	Documents/Arduino/hardware/CANBus-Triple

### Setup Arduino IDE 

Launch the Arduino IDE and select the newly available board variant from the menu bar under **Tools > Board > CANBus Triple**

### Add required libraries

[About Arduino Libraries](http://arduino.cc/en/Guide/Libraries)

To install the CAN Library select this menu option in the Arduino IDE:  
**Sketch > Import Library > Add Library...**

Arduino will display a file browser. Navigate to the folder containing the CANBus Triple Firmware, and select the 'CANBus' folder inside of the 'library' folder within. Then repeat this process and select the 'QueueArray' folder. Both of these libraries are required to build the firmware code. 

You can also simply copy the 'CANBus' and 'QueueArray' folders to the 'libraries' folder that the Arduino IDE creates in your Documents folder. That is all the Arduino IDE does when you use the previously outlined method. 

You should now be able to open the base sketch by selecting **File > Sketchbook > hardware > CANBus-Triple > avr > CANBusTriple** and clicking the upload button to compile and flash it onto the CANBus Triple hardware. 


### How the firmware works

This is a brief overview of how the base firmware functions in its current state. It’s been running in daily drivers and is considered safe. Functionality is still being added.


The main code sets up the hardware as seen here:
These instances of the CANBus library control each bus. It allows us to send and receive CAN packets, read the status of the CAN controller, and more.

	CANBus CANBus1(CAN1SELECT, CAN1RESET, 1, "Bus 1");
	CANBus CANBus2(CAN2SELECT, CAN2RESET, 2, "Bus 2");
	CANBus CANBus3(CAN3SELECT, CAN3RESET, 3, "Bus 3");

Here each bus is initialized. The begin method resets the CAN controller and places it in 'configuration' mode. Then the baud rate is set, and the controller is set to normal operation. The controller will not operate until it is set to normal or listen mode. You can find other modes of operation in the [data sheet for the MCP2515](http://ww1.microchip.com/downloads/en/DeviceDoc/21801e.pdf).

	// Setup CAN Busses 
	CANBus1.begin();
	CANBus1.baudConfig(125);
	CANBus1.setRxInt(true);
	CANBus1.setMode(NORMAL);
 
	CANBus2.begin();
	CANBus2.baudConfig(500);
	CANBus1.setRxInt(true);
	CANBus2.setMode(NORMAL);
 
	CANBus3.begin();
	CANBus3.baudConfig(125);
	CANBus1.setRxInt(true);
	CANBus3.setMode(NORMAL);

On to the main loop. Here we process input and control logic for our application, such as listening to the steering wheel buttons and reacting to the input. Then we process all the Middleware classes on each incoming CAN packet. More on middleware in the next section.

	void loop() {
	...
	}







### Middleware system

Middleware
The CAN packets are processed through a [Middleware](http://en.wikipedia.org/wiki/Middleware) pattern. This pattern allows developers to easily add and remove functionality to the system. ChannelSwap, MazdaLED, and SerialCommand are Middleware implementations.

To create your own functionality, extend the Middleware Class and add the required processing calls to the main sketch. The processing calls are:

	Middleware::process(msg)
	
Here your class can augment the incoming CAN messages.

	Middleware::tick()
	
Similar to the main codes loop function, updates time sensitive things. This is not always required, as some implementations may work on just the process method alone. An example of this is the ChannelSwap middleware.


#### SerialCommand
Takes commands from the serial port. Actual commands will be detailed here soon. The Chrome extension relies on this middleware to get CAN data over the serial port.

#### MazdaLED
Watches for messages to the red screen in the Gen 2 Mazda3 (Probably compatible with the Gen 1 as well). It also listens for sensor data from the High Speed CAN bus to get sensor data from the passive CAN messages. It formats and re-dispatches its own augmented data to display on the red display. If you want to change what shows up on your red display, this is where you start!

#### ChannelSwap
This middleware listens to the CAN busses that are physically separated by the CANBus Triple. It filters and echoes messages between the two busses to ensure functionality on the bus that we’re not augmenting continues to function. In the Mazda3 base firmware this middleware class filters out all messages to the red display, as the MazdaLED class is managing this.


#### ServiceCall

ServiceCall Middleware dispatches CAN packets to services provided by other CAN nodes and listens for the response. 
TODO Expand on this

### Hardware Sleep

To allow the CANBus Triple to stay powered up and use small amounts of power we're implementing sleep mode on the Atmega MCU, BLE112, and MCP2515 CAN controllers. More on this coming soon.

TODO


