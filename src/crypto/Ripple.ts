import * as crypto from 'crypto'
import * as keypairs from 'ripple-keypairs'
import * as binary from 'ripple-binary-codec'
import { getSignature } from '../hardware/DeviceAPI'
const BN = require('bn.js')

declare global {
    interface Window {
        ripple: any
    }
}

let address = 'rB9AWyzAJQ7DwVTvLmAe5XjtUKExxogAkV'
const sourceNumber = 6
console.log('RIPPLE',window,Window)
const Ripple = new window.ripple.RippleAPI({server: 'wss://s.altnet.rippletest.net:51233'})
let pubkey = '0223254fe57496571e79d92c69f3a9e928e5b2e045a237752166801336084f5b38'

export function initRippleAddress() {
    return
}
export function getRippleAddress(): string {
    return
}
export function getRippleBalance() {
    return new Promise(async (resolve) => {
        console.log(window.ripple)
        let balance = await Ripple.getBalances(address)
        console.log('GOT THIS BALANCE', balance)
        console.log(JSON.stringify(balance,null,2))
        resolve(JSON.stringify(balance,null,2))
    })
}

export function connectToRipple() {
    return new Promise((resolve, reject) => {
        Ripple.connect().then(() => {
            console.log('CONNECTED TO RIPPLE')
            resolve()
        }).catch((err) => {
            console.log('Error during connection to Ripple', err)
            reject()
        })
    })
}

export async function getRippleLastTx() {
    const serverInfo = await Ripple.getServerInfo()
    const ledgers = serverInfo.completeLedgers.split('-')
    const minLedgerVersion = Number(ledgers[0])
    const maxLedgerVersion = Number(ledgers[1])
    
    const transactions = await Ripple.getTransactions(address, { minLedgerVersion, maxLedgerVersion })
    return transactions
}

export function createTransaction(paymentAddress: string, amount: number) {
    console.log('INSIDE CREATE')
    let payment = {
        source: {
            address: address,
            maxAmount : {
                value: amount.toString(10),
                currency: 'XRP'
            }
        },
        destination: {
            address: paymentAddress,
            amount: {
                value: amount.toString(10),
                currency: 'XRP'
            }
        }
    }
    let instructions = {
        maxLedgerVersionOffset: 5
    }

    Ripple.preparePayment(address, payment, instructions).then(prepared => {
        console.log('RIPPLE OBJECT', Ripple)
        console.log('Payment transaction prepared', prepared.txJSON, prepared)  
        console.log('ENCODED', binary.encode(JSON.parse(prepared.txJSON)))
        console.log('FOR SIGNING', binary.encodeForSigning(JSON.parse(prepared.txJSON)))
        let tx = JSON.parse(prepared.txJSON)
        tx.SigningPubKey = pubkey.toUpperCase()
        let signingData = binary.encodeForSigning(tx)

        const bytes = hexToBytes(signingData)
        console.log('BYTES', bytes)
        console.log('BUFFER', Buffer.from(signingData, 'hex'))
        console.log('MY SIGNED DATA', signingData)
        console.log('MY HASH', crypto.createHash('sha512').update(Buffer.from(signingData, 'hex')).digest().slice(0,32))
        const cryptoHash = crypto.createHash('sha512').update(Buffer.from(signingData, 'hex')).digest().slice(0,32)
        const { signedTransaction } = Ripple.sign(prepared.txJSON, 'saBcAo6XXRx84PYWGNrdkHvgFZWSh')
        console.log('Signed transaction', signedTransaction)
        console.log('Decoded', binary.decode(signedTransaction))
        console.log('CRYPTOHASH', cryptoHash)
        const message = new Array<Buffer>()
        message.push(cryptoHash)
        const sig: Buffer = getSignature(3, message, paymentAddress, amount, 1)[0]
        // console.log(keypairs.sign(new Buffer(prepared.txJSON).toString('hex'),'fb9345b069ba185ec2028206d0ddfd64f0634123acd83ca1ad843a6f23c7be840'))
        // console.log('SLICED', sig.slice(2, sig.length - 35).toString('hex').toUpperCase())
        console.log('SLICED', sig.toString('hex').toUpperCase())
        // console.log('Verify', keypairs.verify(prepared.txJSON,sig.slice(2,sig.length-35).toString('hex'), pubkey.toUpperCase() ))
        // console.log('Verify lib', keypairs.verify(binary.encode(JSON.parse(prepared.txJSON)),binary.decode(signedTransaction).TxnSignature,binary.decode(signedTransaction).SigningPubKey))
        // console.log('Verify lib', keypairs.verify(binary.encode(JSON.parse(prepared.txJSON)),binary.decode(signedTransaction).TxnSignature,pubkey))
        console.log(keypairs.deriveAddress(pubkey))
        console.log(keypairs.deriveAddress(binary.decode(signedTransaction).SigningPubKey))
        // tx.TxnSignature = sig.slice(2, sig.length - 35).toString('hex').toUpperCase()
        tx.TxnSignature = sig.toString('hex').toUpperCase()
        console.log('Tx after insert', tx)
        const bin = binary.encode(tx)
        console.log('My bin', bin)
        Ripple.submit(bin).then((res, err) => {
            console.log('Error in submit', err)
            console.log('Response of submit', res)
        })
    }).catch(err => {
        console.log('Error during preparing transaction', err)
    })
    console.log(payment)
}

function hexToBytes(a) {
    return  new BN(a, 16).toArray(null, a.length / 2);
}