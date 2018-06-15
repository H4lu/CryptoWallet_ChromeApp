/* declare global {
    interface Navigator {
        usb: {
            getDevices(): Promise<any[]>
            requestDevice(filters: Object): Promise<any>

        }
    }
}
*/
declare global {
    type direction = 'in' | 'out'
}
let outDirection: direction = 'out'
import {} from '../../node_modules/@types/chrome/chrome-app'
import { promisify } from 'util';

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
export function sendData() {
    return new Promise((resolve, reject) => {
        let out_info = {
            direction: outDirection,
            endpoint: endpointOut,
            data: hexToArrayBuffer("0b000102")
        }
        chrome.usb.bulkTransfer(connectionHandle, out_info, (res) => {
            console.log('RES IN SEND DATA', res)
            resolve()
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
        })
    })
}
export function getConfiguration() {
    return new Promise((resolve, reject) => {
        chrome.usb.getConfiguration(connectionHandle, (config) => {
            console.log('GOT THIS CONFIG', config)
        })
    })
}
export function sendAPDU() {
    return new Promise ((resolve, reject) => {
        let outInfo = {
            direction: 'out'
        }
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
            console.log('GOT THIS HANDLES', handles)
            device = handles[0]
            resolve()
        } )
    })

}
export function getInfoPCSC(): Promise<number> {
    return new Promise((resolve, reject) => {

    })
}
export function UpdateHWStatusPCSC(...data) {

}

