/* declare global {
    interface Navigator {
        usb: {
            getDevices(): Promise<any[]>
            requestDevice(filters: Object): Promise<any>

        }
    }
}
*/
import { Buffer } from 'buffer'
declare global {
    type direction = 'in' | 'out'
}
let outDirection: direction = 'out'
let inDirection: direction = 'in'

import {} from '../../node_modules/@types/chrome/chrome-app'

const kMessageType_PC_to_RDR_IccPowerOn = 0x62
const kMessageType_PC_to_RDR_IccPowerOff = 0x63
const kMessageType_PC_to_RDR_GetSlotStatus = 0x65
const kMessageType_PC_to_RDR_XfrBlock = 0x6F
const kMessageType_PC_to_RDR_GetParameters = 0x6C
const kMessageType_PC_to_RDR_ResetParameters = 0x6D
const kMessageType_PC_to_RDR_SetParameters = 0x61
const kMessageType_PC_to_RDR_Escape = 0x6B
const kMessageType_PC_to_RDR_IccClock = 0x6E
const kMessageType_PC_to_RDR_T0APDU = 0x6A
const kMessageType_PC_to_RDR_Secure = 0x69
const kMessageType_PC_to_RDR_Mechanical = 0x71
const kMessageType_PC_to_RDR_Abort = 0x72
const kMessageType_PC_to_RDR_SetDataRateAndClockFrequency = 0x73

let _seq = 0
let _slot = 0
let VID: number = 0x1FC9
let PID: number = 0x0117
let endpointIn: any
let endpointOut: any
let device:chrome.usb.Device
let connectionHandle: chrome.usb.ConnectionHandle

function openDeviceAsync() {
    return new Promise((resolve, reject) => {
        chrome.usb.openDevice(this.device, (handle) => {
        console.log('HANDLE', handle)
        })
    })
}
export function initTransmit() {
    sendPowerOffMessage().then(sendPowerOnMessage).then(sendSetParameterMessage)
}
function sendPowerOffMessage() {
    return new Promise((resolve) => {
        let message = new Array(10)
        message[0] = kMessageType_PC_to_RDR_IccPowerOff
        message[5] = _slot
        message[6] = _seq
        let data = new Uint8Array(message).buffer
        ++_seq
        transreceive(data).then(() => {
            resolve()
        })
    })
}
function sendPowerOnMessage() {
    return new Promise((resolve) => {
        let message = new Array(10)
        message[0] = kMessageType_PC_to_RDR_IccPowerOn;
        message[5] = _slot;
        message[6] = _seq;
        message[7] = 0
        let data = new Uint8Array(message).buffer
        ++_seq
        transreceive(data).then(() => {
            resolve()
        })
    })

}
function sendSetParameterMessage() {
    return new Promise((resolve) => {
        let message = new Uint8Array(17)
        message[1] = 7
        message[7] = 1
        message[10] = 0x95
        message[11] = 0x10
        message[12] = 0x00
        message[13] = 0x4D
        message[14] = 0x00
        message[15] = 0xFE
        message[16] = 0x00
        message[0] = kMessageType_PC_to_RDR_SetParameters
        let data = message.buffer
        ++_seq
        transreceive(data).then(() => {
            console.log('Transmit inited!')
            resolve()
        })
    })


}
function newXfrBlockMessage(data: any) {
    let message = new Array(10)
    message[0] = kMessageType_PC_to_RDR_XfrBlock
    let data_length = data.length
    message[1] = data_length & 0xFF
    message[2] = (data_length >> 8) & 0xFF
    message[3] = (data_length >> 16) & 0xFF
    message[4] = (data_length >> 24) & 0xFF
    message[5] = _slot
    message[6] = _seq
    message = message.concat(data)
    return new Uint8Array(message).buffer

}
function sendXfrBlockMessage(message: any) {
    let data = newXfrBlockMessage(message)
    _seq++
    return transreceive(data)
}
export function sendAPDU(data) {
    return sendXfrBlockMessage(data)
}
export function getAddressPCSC(currencyId: number): Promise<string> {
    return new Promise((resolve, reject) => {

    })
}
export function findDevicesAsync() {

}
function hexToArrayBuffer(h: any) {
    var result = new ArrayBuffer(h.length / 2);
    var hexchars = "0123456789ABCDEFabcdef";
    var res = new Uint8Array(result);
    for (var i = 0; i < h.length; i += 2) {
      if (hexchars.indexOf(h.substring(i, i + 1)) == -1) break;
      res[i / 2] = parseInt(h.substring(i, i + 2), 16);
    }
    return result;
}

function transreceive(message: ArrayBuffer): Promise<chrome.usb.TransferResultInfo> {
    return new Promise((resolve, reject) => {
        let out_info = {
            direction: outDirection,
            endpoint: endpointOut,
            data: message
        }
        chrome.usb.bulkTransfer(connectionHandle, out_info, (res) => {
            console.log('RES IN SEND DATA', res)
            console.log(res.toString())
            console.log(Buffer.from(res.data).toString('hex'))
            let in_info = {
                direction: inDirection,
                endpoint: endpointIn,
                length:128
            }
            chrome.usb.bulkTransfer(connectionHandle, in_info, (result) => {
                if (chrome.runtime.lastError) {
                    console.log('Error occured', chrome.runtime.lastError.message)
                    reject()
                }
                console.log('GOT RESULT', result)
                console.log(Buffer.from(result.data).toString('hex'))
                resolve(result)
            })
        })
    })
}

export function sendData() {
    return new Promise((resolve, reject) => {
        let out_info = {
            direction: outDirection,
            endpoint: endpointOut,
            data: hexToArrayBuffer("B130000100")
        }
        chrome.usb.bulkTransfer(connectionHandle, out_info, (res) => {
            console.log('RES IN SEND DATA', res)
            console.log(res.toString())
            console.log(Buffer.from(res.data).toString('hex'))
            let in_info = {
                direction: inDirection,
                endpoint: endpointIn,
                length:128
            }
            chrome.usb.bulkTransfer(connectionHandle, in_info, (result) => {
                if (chrome.runtime.lastError) {
                    console.log('Error occured', chrome.runtime.lastError.message)
                    reject()
                }
                console.log('GOT RESULT', result)
                console.log(Buffer.from(result.data).toString('hex'))
                resolve()
            })

        })
   

    })
}
export function setConfiguration() {
    return new Promise((resolve, reject) => {
        chrome.usb.setConfiguration(connectionHandle, 0, () => {
            console.log('CONFIGURATION SELECTED')
        })
    })
}
export function claimInterface() {
    return new Promise((resolve, reject) => {
        chrome.usb.claimInterface(connectionHandle,0, () => {
                if (chrome.runtime.lastError) {
                    console.log('Error', chrome.runtime.lastError);
                }
            console.log('INTERFACE CLAIMED')
            resolve()
        })
    })

}
export function listInterfaces() {
    return new Promise((resolve, reject) => {
        chrome.usb.listInterfaces(connectionHandle, descriptors => {
            console.log('INTERFACE DESCRIPTORS', descriptors)
            endpointIn = descriptors[0].endpoints[0].address
            endpointOut = descriptors[0].endpoints[1].address
            console.log('ENDPOINT IN', endpointIn, 'ENDPOINT OUT', endpointOut)
            resolve()
        })
    })
}
export function getConfiguration() {
    return new Promise((resolve, reject) => {
        chrome.usb.getConfiguration(connectionHandle, (config) => {
            console.log('GOT THIS CONFIG', config)
            resolve()
        })
    })
}

export function openDevice() {
    return new Promise((resolve, reject) => {
        chrome.usb.openDevice(device, handle => {
            connectionHandle = handle
            console.log('DEVICE OPENED', connectionHandle)
            resolve()
        })
    })
   
}
export function sig(id: number, address: string, amount: number): Promise<Buffer> {
    return
}
export async function findDevice() {
    return new Promise((resolve, reject) => {
        chrome.usb.getDevices({vendorId: this.VID, productId:this.PID }, (handles) => {
            console.log('GOT THIS HANDLES', handles,'HANDLES LENGTH', handles.length)
            if (handles.length > 0) {
                device = handles[0]
            }

            resolve(handles.length)
        } )
    })

}
export function closeDevice() {
    chrome.usb.releaseInterface(connectionHandle, 0, () => {
        console.log('Interface released!')
        chrome.usb.closeDevice(connectionHandle, () => {
            console.log('Device closed!')
        })
    })
}

export function releaseInterface() {
    chrome.usb.releaseInterface(connectionHandle, 0, () => {
        console.log('INTERFACE RELEASED!')
    })
}
export function getInfoPCSC(): Promise<number> {
    return new Promise((resolve, reject) => {

    })
}
export function UpdateHWStatusPCSC(...data) {

}

