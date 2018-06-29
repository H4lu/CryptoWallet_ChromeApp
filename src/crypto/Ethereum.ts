import * as rpc from 'ethrpc'
import * as ethers from 'ethers'
import { getAddress } from '../hardware/DeviceAPI'
import { get } from 'web-request'

declare global {
    interface Window {
        ethers: any,
        Web3: any,
        ethereumjs: any
    }
}

let connectionConfiguration = {
    httpAddresses: ['https://api.myetherapi.com/rop'],
    wsAddresses:[],
    ipcAddresses: [], // optional, default empty array
    errorHandler: function (err) { 
        console.log('ERROR OCCURED',err)
     }, // optional, used for errors that can't be correlated back to a request
  };
let address = ''

export function getETBALANCE() {
    // let web3 = new window.Web3(new window.Web3.providers.HttpProvider('https://ropsten.infura.io/hgAaKEDG9sIpNHqt8UYM'))
    // console.log('web3 object', web3)
    let eth = ethers
    console.log('ETH', eth)
    console.log('ETHERERER', ethers)
    console.log('ETHERS', (<any> window).ethers)
    console.log('Window', window,window.ethers,window['ethers'])
    let prov = new ethers.providers.InfuraProvider('ropsten','hgAaKEDG9sIpNHqt8UYM')
    console.log('PROV', prov)
    let provider = eth.providers.getDefaultProvider()
    console.log('DEFAULT PROVIDER', provider)
    prov.getBalance('0x619B30BE614ce453035058736cd2B83c34373Ddd').then(value => {
        console.log('GOT THIS BALANCE',ethers.utils.formatEther(value))
    })
    // console.log(web3.eth.getBalance('0x619B30BE614ce453035058736cd2B83c34373Ddd'))
}

export function handleEthereum(address: string, amount: number, fee: number, gasPrice: number, redirect: Function) {

}
export function getEthereumAddress(): string {
    return
}
export async function initEthereumAddress(): Promise<any> {
    return new Promise(async (resolve) => {
        let addr = await getAddress(1)
        address = addr
        console.log('ETHEREUM ADDRESS', address)
        resolve()
    })

}
export async function getEthereumLastTx() {
    try {
        const requestURL: string = 'https://api.ethplorer.io/getAddressTransactions/' + address + '?apiKey=freekey&limit=50'
        let response = await get(requestURL)
        return response 
    } catch (err) {
        console.log(err)
    }
}
export function setETHBalance( balance: number ) {

}
function getNonce() {

}
async function createTransaction(paymentAddress: string, amount: number, gasPrice: number, gasLimit: number, redirect: any) {
    let rawTransaction = {
        nonce: await ethers.getTransactionCount('0x619B30BE614ce453035058736cd2B83c34373Ddd'),
        gasLimit: 21000,
        gasPrice: ethers.utils.bigNumberify('5000000000'),
        to: 0x30C533986Ed809a312e0CC8e9f6186b68bd62B5e,
        value: ethers.utils.parseEther('0.004'),
        data: '0x',
        chainId: 3
    }
}
export function getETHBalance(): Promise<any> {
    return new Promise((resolve) => {
        let eth = ethers
        console.log('ETH', eth)
        console.log('ETHERERER', ethers)
        console.log('ETHERS', (<any> window).ethers)
        console.log('Window', window,window.ethers,window['ethers'])
        let prov = new ethers.providers.InfuraProvider('ropsten','hgAaKEDG9sIpNHqt8UYM')
        console.log('PROV', prov)
        let provider = eth.providers.getDefaultProvider()
        console.log('DEFAULT PROVIDER', provider)
        prov.getBalance('0x619B30BE614ce453035058736cd2B83c34373Ddd').then(value => {
            console.log('GOT THIS BALANCE',ethers.utils.formatEther(value))
            resolve(ethers.utils.formatEther(value))
        })
    })

}
export function setETHPrice(price: number) {

}
