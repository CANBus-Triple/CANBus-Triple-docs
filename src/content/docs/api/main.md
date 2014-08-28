---
title: Serial API
docs: true
section: API
---


System Info and EEPROM
----------------------
0x01 0x01        Print System Debug to Serial
0x01 0x02        Dump eeprom value
0x01 0x03        read and save eeprom
0x01 0x04        restore eeprom to stock values
0x01 0x10 0x01   Print Bus 1 Debug to Serial
0x01 0x10 0x02   Print Bus 1 Debug to Serial
0x01 0x10 0x03   Print Bus 1 Debug to Serial
0x01 0x16        Reboot to bootloader


Send CAN Packet
---------------
Cmd    Bus id  PID    data 0-7                  length
0x02   01      290    00 00 00 00 00 00 00 00   8


Set logging output (Filters are optional)
--------------------------------------------------
Cmd  Bus  On/Off Message ID 1   Message ID 2
0x03 0x01 0x01   0x290          0x291   // Set logging on Bus 1 to ON
0x03 0x01 0x00                          // Set logging on Bus 1 to OFF


Set Bluetooth Message ID filter
----------------------------------------
Cmd  Bus  Message ID 1 Message ID 2
0x04 0x01 0x290        0x291          // Enable Message ID 290 output over BT
0x04 0x01 0x0000       0x0000         // Disable


Bluetooth Functions
-------------------
Cmd  Function
0x08  0x01 Reset BLE112
0x08  0x02 Enter pass through mode to talk to BLE112
0x08  0x03 Exit pass through mode [Not yet implemented]