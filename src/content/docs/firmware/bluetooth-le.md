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



### Flashing with Passthrough mode

If you do not own a CC Debugger from TI we've got your back! You can flash new BGScript Firmware to the BLE112 over USB without any extra hardware. You will need to put the MCU into 'Passthrough Mode' where all data will be sent directly to the BLE112 module. 

TODO: Add building from windows command line notes. 

Using the CANBus Triple App... (TODO)


Or use a Bluetooth LE debugging app such as [LightBlue](https://itunes.apple.com/us/app/lightblue-bluetooth-low-energy/id557428110?mt=8) you can place the BLE112 into DFU mode. Write a 1 to the characteristic detailed here:

	Service: 35e71686-b1c3-45e7-9da6-1ca2393a41f3
	Characteristic: 5fcd52b7-4cfb-4095-aeb2-5c5511646bbf 

Then you need to place the MCU into 'Passthrough Mode' by sending the command '0x08 0x03' over USB Serial, or over the BT LE Serial Characteristic (Before placing it into DFU mode).

The hardware is now ready to receive the new firmware.

* Open the 'Bluegiga BLE GUI' from the Bluegiga Smart SDK.
* Select your CANBus Triple USB Serial port from the drop down
* Click the 'Attach' Button
* Navigate to Commands > DFU or press Alt+D to open the DFU dialog
* Select the 'UART Bootloader' Tab
* Click browse and select the HEX file to flash
* Click the 'Upload' Button. Flashing will start



	



### Building / Flashing with CC Debugger

The [CC Debugger](http://www.ti.com/tool/cc-debugger) is a development tool from Texas Insturments built to flash their CC line of RF devices. This is the main chip found on the BLE112. 

TODO: Add pinout info to connect CC Debugger

Open the project file 'CBT_ble112.bgproj' with the Bluegiga BLE SW Update Tool. The CC Debugger status LED should be green, indicating it has a connection to the BLE112 module. The SW Update tool will display your module information in the text area. Simply click the update button and the BGScript will be compiled and flashed to the BLE112. 
