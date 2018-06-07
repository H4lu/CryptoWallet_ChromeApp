declare global {
    interface Navigator {
        usb: {
            getDevices(): Promise<any[]>
            requestDevice(filters: Object): Promise<any>

        }
    }
}
import {} from '../../node_modules/@types/chrome/chrome-app'

export default class CCid {
    private VID: number = 0x055C
    private PID: number = 0xF727
    device:chrome.usb.Device
    constructor() {

    }
    public  sendData() {

    }

    public async  findDevices() {
        chrome.usb.getDevices({vendorId: this.VID, productId:this.PID }, (handles) => {
            console.log('GOT THIS HANDLES', handles)
        } )
    }

}