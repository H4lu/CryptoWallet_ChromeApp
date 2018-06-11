import { TransactionBuilder } from 'bitcoinjs-lib'
import * as webRequest from 'web-request'

export function buildTx() {
    let txb = new TransactionBuilder()
    let api
    txb.setVersion(1)
    txb.addInput('61d520ccb74288c96bc1a2b20ea1c0d5a704776dd0164a396efec3ea7040349d', 0) // Alice's previous transaction output, has 15000 satoshis
    txb.addOutput('1cMh228HTCiwS8ZsaakH8A8wze1JR5ZsP', 12000)
    console.log('UNBUILDED', txb.buildIncomplete().toHex())
}

let myAddr = '1zbuwh5ytgY2KUAstjTa7UtAwrLgsmoS2'

export async function getBitcoinSmartBitBalance(): Promise<webRequest.Response<string>> {
    let url = 'https://api.smartbit.com.au/v1/blockchain/address/' + myAddr
    try {
      const response = await webRequest.get(url)
      console.log('RESPONSE OF SMARTBIT',response)
      return (response)
    } catch (error) {
      return error
    }
  }
export function handleBitcoin(address: string, amount: number, fee: number, redirect: Function) {

}

export function getBitcoinBalance() {

}
export function getBitcoinAddress (): string {
    return ''
}