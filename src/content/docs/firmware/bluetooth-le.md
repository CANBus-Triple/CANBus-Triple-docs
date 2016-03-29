---
title: Bluetooth LE Firmware
docs: true
weight: 2
section: Firmware
---

### Overview

The Bluegiga BLE112 Bluetooth Low Energy Module enables the CANBus Triple to talk to cell phones, tablets, and any other BT-LE enabled hardware. Welcome to the internet of things!

This firmware talks to the MCU via a Serial UART line. The MCU can send values over to the module and those are in turn written to the GATT. When data is written to the GATT any listening bluetooth devices will receive the information over the air. It also features a service to talk directly to the MCU and give it Serial API commands, just like a USB connection. 

Bluetooth LE was chosen as it is a great standard to connect to modern devices. It is a very low bandwidth standard and is not capable of dumping all of the CAN packets. The MCU should process the data and send only useful data over the air. 

### Downloading Bluegiga SDK

The Bluegiga Bluetooth Smart SDK is available for Windows only. Download and install version 1.2.2 from the link below under the 'Software Releases' section.

[Bluetooth Smart Software and SDK](https://www.bluegiga.com/en-US/products/bluetooth-4.0-modules/bluegiga-bluetooth-smart-software/documentation/)


### Downloading Code

Clone the CBT BGScript code from [the git repo.](https://github.com/CANBus-Triple/CBT-BLE112-Firmware)

	git clone https://github.com/CANBus-Triple/CBT-BLE112-Firmware.git



### Building / Flashing with CC Debugger

The [CC Debugger](http://www.ti.com/tool/cc-debugger) is a development tool from Texas Insturments built to flash their CC line of RF devices. This is the main chip found on the BLE112. 

#### Connecting CC-Debugger to the CANBus Triple

![CANBus Triple Expansion](/images/cbt-pinout-exp.jpg "CANBus Triple Expansion")

The CC-Debugger comes with a 1.27mm cable and adapter that is pin comparable with the CANBus Triple. You will most likely need an adapter to help the 1.27mm header avoid the AVR ISP pins. Or you can gently push the pins out of the way. 

When the CC-Debugger is connected to the CANBus Triple the LED should illuminate green. If it does not try pressing the reset button on the CC-Debugger. Power to the CBT is not required, the CC-Debugger will supply enough power. 

#### Bluegiga BLE SW Update Tool

Open the project file 'CBT_ble112.bgproj' with the Bluegiga BLE SW Update Tool. The CC Debugger status LED should be green, indicating it has a connection to the BLE112 module. The SW Update tool will display your module information in the text area. Simply click the update button and the BGScript will be compiled and flashed to the BLE112. 





### Building Firmware for DFU Flashing
If you wish to flash the BLE112 over-the-air you will need to first generate the hex file to send or use the standard pre-compiled program (out.hex) [from the Git repo](https://github.com/CANBus-Triple/CBT-BLE112-Firmware/blob/master/out.hex). 

Open a windows command prompt and cd to the Bluegiga SDK bin folder:
	
	C:\
	cd\Bluegiga\ble-1.2.2-100\bin
	
Then execute the 'bgbuild' application to compile the code. Change the path to reflect the location you've checked out the firmware code to. 
	
	bgbuild c:\Users\derek\Documents\GitHub\CBT-BLE112-Firmware\CBT_ble112.bgproj
	
This will build the 'out.hex' file which is the complied program that runs on the BLE112. 

For more information refer to [the Bluegiga User Guides](https://www.bluegiga.com/en-US/products/bluetooth-4.0-modules/bluegiga-bluetooth-smart-software/documentation/).


### Flashing with Passthrough mode

If you do not own a CC Debugger from TI we've got your back! You can flash new BGScript Firmware to the BLE112 over USB without any extra hardware. You will need to put the MCU into 'Passthrough Mode' where all data will be sent directly to the BLE112 module. 

#### Using the app
You can use the [CANBus Triple App](/app/info.html) to enter DFU / Passthrough mode. Be sure your CBT is attached to the Windows computer with the Bluegiga SDK installed. Open the menu and navigate to the Hardware tab. Press the BLE DFU Mode button. This will reset the BLE112 into the DFU Bootloader and place the MCU into passthrough mode. 

#### Enter DFU mode without the app
Or use a Bluetooth LE debugging app such as [LightBlue](https://itunes.apple.com/us/app/lightblue-bluetooth-low-energy/id557428110?mt=8) you can place the BLE112 into DFU mode. Write a 1 to the characteristic detailed here:

	Service: 35e71686-b1c3-45e7-9da6-1ca2393a41f3
	Characteristic: 5fcd52b7-4cfb-4095-aeb2-5c5511646bbf 

Then you need to place the MCU into 'Passthrough Mode' by sending the command '0x08 0x02' over USB Serial, or over the BT LE Serial Characteristic (Before placing it into DFU mode).

The hardware is now ready to receive the new firmware.


#### Flashing the firmware

* Open the 'Bluegiga BLE GUI' from the Bluegiga Smart SDK.
* Select your CANBus Triple USB Serial port from the drop down
* Click the 'Attach' Button
* Navigate to Commands > DFU or press Alt+D to open the DFU dialog
* Select the 'UART Bootloader' Tab
* Click browse and select the HEX file to flash
* Click the 'Upload' Button. Flashing will start



	



