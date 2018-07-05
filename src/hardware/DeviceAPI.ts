import * as CCID from './CCID'
import { Buffer } from 'buffer'

export async function getStatus() {
    return new Promise( async (resolve) => {
        let answer = await CCID.sendAPDU([0xB1,0x10,0x00,0x00,0x00])
        console.log('RESULT', Buffer.from(answer).slice(answer.byteLength-2, answer.byteLength).toString('hex'))
        switch(Buffer.from(answer).slice(answer.byteLength-2, answer.byteLength).toString('hex')) {
            case '9000': {
                resolve(0)
                break
            }
            case '6b80': {
                resolve(1)
                break
            }
            case '6b81': {
                resolve(2)
                break
            }
            case '6b82': {
                resolve(3)
                break
            }
            case '6b83': {
                resolve(4)
                break
            }
        }
    }) 
}

export async function getAddress(id: number): Promise<string> {
    console.log('ADDRESS REQUEST',[0xB1,0x30,0x00,'0x'+id,0x00])
    let answer: Buffer = await CCID.sendAPDU([0xB1,0x30,0x00,'0x'+id,0x00])
    return answer.slice(13, answer.byteLength-3).toString()
}

export async function updateHWStatus(...data) {
    let message: Buffer = new Buffer([])
    let xorData: Array<any> = []
    for (let item in data) {
      xorData.push(data[item].toString())
    }
    for ( let item in data ) {
        let tempBuffer: Buffer = new Buffer(16)
        tempBuffer.write(data[item].toString(),0,data[item].length,'ascii')
        message = Buffer.concat([message, tempBuffer])
    }
    let xor: number = 0
    for (let i in xorData) {
        for (let j in xorData[i]) {
            xor ^= xorData[i][j].toString().charCodeAt(0)
        }
    }
    const xorBuf = Buffer.from([xor])
    const dataBuf = Buffer.concat([Buffer.from([0xB1,0x50,0x00]), xorBuf, Buffer.from([0x60]), message])
    console.log('DATABUF', dataBuf, dataBuf.buffer)
    await CCID.sendBuffer(dataBuf)
    return
}

export async function getSignature(id: number, message: Array<Buffer>, address: string, amount: number, numberOfInputs: number) {
    return new Promise(async (resolve, reject ) => {
        let currencyId: number
        switch (id) {
            case 0: {
              currencyId = 0x00
              break
            }
            case 1: {
              currencyId = 0x01
              break
            }
            case 2: {
              currencyId = 0x02
              break
            }
        }
        let amountBuf = new Buffer(16)
        amountBuf.write(amount.toString(),0,amount.toString().length,'ascii')
        let xor: number = 0
        const data: any = amount.toString() + address
        for (let i in data) {
            xor ^= data.charCodeAt(i)
        }
        const xorBuf: Buffer = Buffer.from([xor])
        const numberOfInputsBuf: Buffer = Buffer.from([numberOfInputs])
        const idBuf: Buffer = Buffer.from([currencyId])
        const Le = Buffer.from(address).length + xorBuf.length + amountBuf.length
        const LeBuf = Buffer.from([Le])
        const dataBuf = Buffer.from([0xB1,0x40,numberOfInputsBuf, idBuf, LeBuf, amountBuf, Buffer.from(address), xorBuf])
        const initMessage = Buffer.concat([Buffer.from([0xB1,0x40,numberOfInputsBuf, idBuf, LeBuf, amountBuf]), Buffer.from(address), xorBuf])
        const answer = await CCID.sendBuffer(initMessage)
        if (answer.toString('hex') === '9000') {
            let sigArray: Array<Buffer> = []
            for (let i = 0; i < numberOfInputs; i++) {
                const answer = await sendDataMessage(Buffer.from([i]), Buffer.from([currencyId]), message[i])
            }
            resolve(sigArray)
        }   
    })
} 

function sendDataMessage(inputNumber: Buffer, currencyId: Buffer, hash: Buffer): Promise<Buffer> {
    let xor: number = 0
    const xorData: any = hash.toString('hex')
    for (let i in xorData) {
        xor ^= xorData[i].charCodeAt(0)
    }
    const xorBuf = Buffer.from([xor])
    return new Promise(async (resolve, reject) => {
        const dataBuf = Buffer.from([0xB1, 0x41, inputNumber, currencyId, 0x20, hash, xorBuf])
        const answer = await CCID.sendBuffer(dataBuf)
        resolve(answer) 
    })
}
