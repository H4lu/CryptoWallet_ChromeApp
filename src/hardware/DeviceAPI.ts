import * as CCID from './CCID'

export async function getStatus() {
    return new Promise( async (resolve) => {
        let answer = await CCID.sendAPDU([0xB1,0x10,0x00,0x00,0x00])
        console.log('RESULT', Buffer.from(answer.data).slice(answer.data.byteLength-2, answer.data.byteLength).toString('hex'))
        switch(Buffer.from(answer.data).slice(answer.data.byteLength-2, answer.data.byteLength).toString('hex')) {
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

export async function getAddress(id: number) {
    console.log('ADDRESS REQUEST',[0xB1,0x30,0x00,'0x'+id,0x00])
    let answer = await CCID.sendAPDU([0xB1,0x30,0x00,'0x'+id,0x00])
    return Buffer.from(answer.data).slice(13, answer.data.byteLength-3).toString()
}
