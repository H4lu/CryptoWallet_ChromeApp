/* declare global {
    interface Navigator {
        usb: {
            getDevices(): Promise<any[]>
            requestDevice(filters: Object): Promise<any>

        }
    }
}
*/

import {} from '../../node_modules/@types/chrome/chrome-app'
import { promisify } from 'util';

    let  VID: number = 0x055C
    let  PID: number = 0xF727
    let device:chrome.usb.Device
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
    export function sendData() {

    }
    export function openDevice() {
 
    }
    export function sig(id: number, address: string, amount: number): Promise<Buffer> {
        return
    }
    export async function findDevice() {

        chrome.usb.getDevices({vendorId: this.VID, productId:this.PID }, (handles) => {
            console.log('GOT THIS HANDLES', handles)
            this.device = handles[0]
        } )
    }
    export function getInfoPCSC(): Promise<number> {
        return new Promise((resolve, reject) => {

        })
    }
    export function UpdateHWStatusPCSC(...data) {

    }

