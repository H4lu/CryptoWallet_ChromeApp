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

export default class CCid {
    private VID: number = 0x055C
    private PID: number = 0xF727
    device:chrome.usb.Device
    constructor() {
        console.log('CCID CREATED')
    }
    private openDeviceAsync() {

        return new Promise((resolve, reject) => {
            chrome.usb.openDevice(this.device, (handle) => {
                console.log('HANDLE', handle)
            })
        })
    }
    private findDevicesAsync() {

    }
    public  sendData() {

    }
    public openDevice() {
 
    }
    public async  findDevice() {

        chrome.usb.getDevices({vendorId: this.VID, productId:this.PID }, (handles) => {
            console.log('GOT THIS HANDLES', handles)
            this.device = handles[0]
        } )
    }

}