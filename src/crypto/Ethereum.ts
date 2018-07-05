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
const provider = new ethers.providers.InfuraProvider('mainnet','hgAaKEDG9sIpNHqt8UYM')
let address = ''
const connectionConfiguration = {
    httpAddresses: ['https://api.myetherapi.com/rop'],
    wsAddresses:[],
    ipcAddresses: [], // optional, default empty array
    errorHandler: function (err) { 
        console.log('ERROR OCCURED',err)
     }, // optional, used for errors that can't be correlated back to a request
  };


export async function getETHBalance() {
    return new Promise( async (resolve) => {
        console.log('provider', provider)
        const balance = await provider.getBalance(address)
        let arr = []
        arr.push('ETH')
        arr.push(ethers.utils.formatEther(balance))
        resolve(arr)
    })
    // let web3 = new window.Web3(new window.Web3.provideriders.Httpproviderider('https://ropsten.infura.io/hgAaKEDG9sIpNHqt8UYM'))
    // console.log('web3 object', web3)

    // console.log(web3.eth.getBalance('0x619B30BE614ce453035058736cd2B83c34373Ddd'))
}

export function handleEthereum(address: string, amount: number, fee: number, gasPrice: number, redirect: Function) {

}
export function getEthereumAddress(): string {
    return address
}
export async function initEthereumAddress(): Promise<any> {
    return new Promise(async (resolve) => {
        let status = false
        while (!status) {
            const addr = await getAddress(1)
            if (addr.length > 38) {
                address = ethers.utils.getAddress(addr)
                console.log('ETHEREUM ADDRESS', address)
                status = true
                resolve()
            } 
        }
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
/*export function getETHBalance(): Promise<any> {
    return new Promise((resolve) => {
        let eth = ethers
        console.log('ETH', eth)
        console.log('ETHERERER', ethers)
        console.log('ETHERS', (<any> window).ethers)
        console.log('Window', window,window.ethers,window['ethers'])
        let provider = new ethers.provideriders.Infuraproviderider('ropsten','hgAaKEDG9sIpNHqt8UYM')
        console.log('provider', provider)
        let providerider = eth.provideriders.getDefaultproviderider()
        console.log('DEFAULT providerIDER', providerider)
        provider.getBalance('0x619B30BE614ce453035058736cd2B83c34373Ddd').then(value => {
            console.log('GOT THIS BALANCE',ethers.utils.formatEther(value))
            resolve(ethers.utils.formatEther(value))
        })
    })

}
*/
export function setETHPrice(price: number) {

}
