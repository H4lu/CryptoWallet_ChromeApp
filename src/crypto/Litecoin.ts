import { getAddress } from '../hardware/DeviceAPI'
import * as webRequest from 'web-request'

const rootURL = 'https://chain.so/api/v2'
let address = ''
const NETWORK = 'LTC'
export function handleLitecoin(address: string, amount: number, fee: number, redirect: Function) {

}
export function getLitecoinAddress(): string {
    return address
}
export function initLitecoinAddress() {
    return new Promise(async (resolve) => {
      let status = false
      while (!status) {
        let addr = await getAddress(2)
        if (addr.length > 16 && addr[0] === 'L') {
          address = addr
          status = true
          console.log('LITECOIN ADDRESS', address)
          resolve()
        }

      }
  
    })

}
export async function getLitecoinLastTx() {
  try {
    const requestUrl = rootURL + '/address/' + NETWORK + '/' + address
    const response = await webRequest.get(requestUrl)
    return response
  } catch (err) {
  }
}

export function setLTCBalance (balance: number) {

}

export async function getLTCBalance(): Promise<Array<Number | String>> {
    /* Задаём параметры запроса
      Network - тип сети, testnet или mainnet
      address - наш адрес
      0 - количество подтверждений транзакций
    */
    let requestUrl = 'https://chain.so/api/v2/get_address_balance/' + NETWORK + '/' + address + '/' + 0
    console.log(requestUrl)
    try {
      // Делаем запрос и отдаём в виде Promise
      const response = await webRequest.get(requestUrl)
      return parseValueCrypto(response)
    } catch (error) {
      Promise.reject(error).catch(error => {
        console.log(error)
      })
    }
  }
  function parseValueCrypto(response: webRequest.Response<string>): Array<Number | String> {
    let parsedResponse = JSON.parse(response.content).data
    let balance: Number = Number(parsedResponse.confirmed_balance) + Number(parsedResponse.unconfirmed_balance)
    let arr = []
    arr.push('LTC')
    arr.push(Number(balance.toFixed(8)))
    return arr
  }
  
export function setLTCPrice(price: number) {

}
